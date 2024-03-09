import AppDataSource from "../config/database";
import { InvoiceInput, Items, StatusEnum } from "../types/invoice";

import { Invoice } from "../entites/Invoice";

import { CreateAddressService } from "./CreateAddressService";

import { add, startOfToday } from "date-fns";

import { validateRequest } from "../utils/validate";


export class CreateInvoiceService {
  async execute({ client, sender, items, description, status, paymentTerms }: InvoiceInput) {

    const addressService = new CreateAddressService()
    
    try {
      if(status === StatusEnum.PENDING) {
        validateRequest({ client, sender, items, description, status, paymentTerms })
      }
      const [clientAddress, senderAddress] = await Promise.all([
        addressService.execute(client.address),
        addressService.execute(sender.address),
      ])
  
      const invoiceRepo = AppDataSource.getRepository(Invoice)
  
      const invoiceCreated = invoiceRepo.create({
        client_address_id: clientAddress.id,
        sender_address_id: senderAddress.id,
        client_email: client.email,
        client_name: client.name,
        description,
        status,
        paymentDue: add(startOfToday(), { days: paymentTerms }),
        total: items.reduce((acc, item) => acc + item.total, 0),
        items
      })
      
      await invoiceRepo.save(invoiceCreated)

      return { ok: true }
    } catch(error) {
      return error
    }
  }
}