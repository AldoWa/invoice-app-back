import AppDataSource from "../config/database";
import { Address } from "../entites/Address";

import { Address as AddressInput} from "../types/invoice";

export class CreateAddressService {
  async execute({ city, country, postCode, street }: AddressInput){
    const addressRepository = AppDataSource.getRepository(Address);
    
    const address = addressRepository.create({
      city,
      country,
      post_code: postCode,
      street
    })

    await addressRepository.save(address)

    return address;
  }
}