import AppDataSource from "../config/database";
import { Items } from "../entites/Items";

import { Items as ItemsInput } from "../types/invoice";

export class CreateItemService {
  async execute({ name, price, quantity, total}: ItemsInput, invoice_id: string){
    const itemsRepository = AppDataSource.getRepository(Items);
    
    const item = itemsRepository.create({
      name, price, quantity, total, invoice_id
    })

    await itemsRepository.save(item)

    return item;
  }
}