import AppDataSource from "../config/database";
import { Invoice } from "../entites/Invoice";

export class GetAllInvoicesService {
  async execute(){
    const invoices = await AppDataSource.getRepository(Invoice).find(
      {
        relations: {
          sender_address: true,
          client_address: true,
        }
      }
    )

    return invoices
  }
}