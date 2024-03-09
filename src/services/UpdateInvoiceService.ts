import { InvoiceInput, StatusEnum } from "../types/invoice"
import { Invoice } from "../entites/Invoice";
import AppDataSource from "../config/database";
import { validateRequest } from "../utils/validate";
import { ErrorMultipleFields } from "../errors/ErrorMultipleFields";
import { add, startOfToday } from "date-fns";

type UpdateInvoiceInput = {
  id: string;
} & InvoiceInput

export class UpdateInvoiceService{
  async execute({ client, description, id, items, paymentTerms, sender, status }: UpdateInvoiceInput){
    try {
      const invoiceRepository = AppDataSource.getRepository(Invoice);

      let invoice = await invoiceRepository.findOne({
        relations: {
          sender_address: true,
          client_address: true,
        },
        where: {
          id
        }
      })

      if(!invoice) {
        throw new ErrorMultipleFields(['Invoice not found']);
      }

      if(status === StatusEnum.DRAFT) {
        throw new ErrorMultipleFields(['Draft invoice cannot be updated']);
      }

      validateRequest({ client, description, items, paymentTerms, sender, status });


      invoice = {
        ...invoice,
        client_email: client.email,
        client_name: client.name,
        client_address: {
          ...invoice.client_address,
          ...client.address,
        },
        description,
        paymentDue: add(startOfToday(), { days: paymentTerms }),
        sender_address:  {
          ...invoice.sender_address,
          ...sender.address
        },
        status,
        total: items.reduce((acc, item) => acc + item.total, 0),
        items: JSON.stringify(items)
      }

      await invoiceRepository.save(invoice);

    } catch(error) {
      return error
    }

  }
}