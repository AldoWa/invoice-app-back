import AppDataSource from "../config/database";
import { Items } from "../entites/Items";

import { Items as ItemsInput } from "../types/invoice";

export class CreateItemService {
  async execute({ name, price, quantity, total }: ItemsInput){
    const itemsRepository = AppDataSource.getRepository(Items);
    
    const item = await itemsRepository.create({
      name, price, quantity, total
    })

    await itemsRepository.save(item)

    return item;
  }
}