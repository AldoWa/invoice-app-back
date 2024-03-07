import { CreateInvoice } from "../types/invoice";
import { CreateAddressService } from "./CreateAddressService";

export class CreateInvoiceService {
  async execute({ client, sender }: CreateInvoice) {
    const addressService = new CreateAddressService()

    const [clientAddress, senderAddress] = await Promise.all([
      addressService.execute(client.address),
      addressService.execute(sender.address),
    ])

    console.log(clientAddress, senderAddress)
  }
}