import AppDataSource from "../config/database";
import { CreateInvoice } from "../types/invoice";

import { Invoice } from "../entites/Invoice";

import { CreateAddressService } from "./CreateAddressService";
import { CreateItemService } from "./CreateItemService";

export class CreateInvoiceService {
  async execute({ client, sender, items, description, status }: CreateInvoice) {

    const addressService = new CreateAddressService()
    const itemService = new CreateItemService()
    try {
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
        paymentDue: `2021-10-10T00:00:00.000Z`,
        total: items.reduce((acc, item) => acc + item.total, 0),
      })

      await Promise.all(items.flatMap(item => itemService.execute(item, invoiceCreated.id)))

      return { ok: true }
    } catch(error) {
      throw new Error(error)
    }
  }
}