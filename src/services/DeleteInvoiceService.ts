import AppDataSource from "../config/database";
import { Address } from "../entites/Address";
import { Invoice } from "../entites/Invoice";

export class DeleteInvoiceService {
  async execute({ id }) {
    const invoiceRepository = AppDataSource.getRepository(Invoice);
    const addressRepository = AppDataSource.getRepository(Address);

    const invoice = await invoiceRepository.findOne({
      select: ['id', 'client_address_id', 'sender_address_id'],
      where: {
        id,
      },
      relations: {
        client_address: true,
        sender_address: true,
      }
    });


    if(!invoice) {
      return new Error('Invoice not found');
    }

    const [clientAddress, senderAddress] = await Promise.all(
      [
        addressRepository.find({
          where:{
            id: invoice.client_address_id
          }
        }),
        addressRepository.find({
          where:{
            id: invoice.sender_address_id
          }
        })
      ]
    )

    await Promise.all([
      invoiceRepository.remove(invoice),
      addressRepository.remove(clientAddress),
      addressRepository.remove(senderAddress)
    ])
  }
}