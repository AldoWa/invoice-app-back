import AppDataSource from "../config/database";
import { Invoice } from "../entites/Invoice";

import { StatusEnum } from "../types/invoice";

type PaidInput = {
  id: string;
}

export class PaidInvoiceService {
  async execute({ id }: PaidInput) {
    const invoiceRepository = AppDataSource.getRepository(Invoice);
    const invoice = await invoiceRepository.findOne({
      relations: {
        sender_address: true,
        client_address: true,
      },
      where: {
        id
      }
    });

    if(!invoice) {
      return new Error('Invoice not found');
    }

    if(invoice.status === StatusEnum.PAID) {
      return new Error('Invoice already paid');
    }

    if(invoice.status === StatusEnum.DRAFT) {
      return new Error('Draft invoice cannot be paid');
    }

    invoice.status = StatusEnum.PAID;

    invoiceRepository.save(invoice);

    return 'Invoice paid successfully';
  }
}