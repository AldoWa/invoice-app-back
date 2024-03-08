import AppDataSource from "../config/database";
import { CreateInvoice } from "../types/invoice";

import { Invoice } from "../entites/Invoice";

import { CreateAddressService } from "./CreateAddressService";
import { CreateItemService } from "./CreateItemService";

export class CreateInvoiceService {
  async execute({ client, sender, items }: CreateInvoice) {

    const addressService = new CreateAddressService()
    const itemService = new CreateItemService()

    const [itemsExecutedPromise, clientAddress, senderAddress] = await Promise.all([
      items.flatMap(item => {
        const itemExecuted = itemService.execute(item)
        return itemExecuted
      }),
      addressService.execute(client.address),
      addressService.execute(sender.address),
    ])

    const invoiceRepo = AppDataSource.getRepository(Invoice)
    


    console.log(teste[0])
  }
}