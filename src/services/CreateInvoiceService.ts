import AppDataSource from "../config/database";
import { CreateInvoice, Items, StatusEnum } from "../types/invoice";

import { Invoice } from "../entites/Invoice";

import { CreateAddressService } from "./CreateAddressService";
import { CreateItemService } from "./CreateItemService";

import { add, startOfToday } from "date-fns";
import { getClientCondition, getSenderCondition } from "../utils/conditionIfExist";

import { ErrorMultipleFields } from "../errors/ErrorMultipleFields";

const addItems = async (items: Items[], idInvoiceCreated: string) => {
  const itemService = new CreateItemService()
  if(items.length) {
    await Promise.all(items.flatMap(item => itemService.execute(item, idInvoiceCreated)))
  }
}

const hasNotEmptyFields = (client, sender, items, description, status, paymentTerms) => {
  const hasClient = getClientCondition(client)
  const hasSender = getSenderCondition(sender)
  const hasItems = !!items.length
  const hasDescription = !!description
  const hasStatus = !!status
  const hasPaymentTerms = !!paymentTerms
  return {
    condition: hasClient && hasSender && hasItems && hasDescription && hasStatus && hasPaymentTerms,
    hasItems
  }
}

const validateRequest = ({ client, sender, items, description, status, paymentTerms }: CreateInvoice) => {
  const { condition, hasItems } = hasNotEmptyFields(client, sender, items, description, status, paymentTerms)
  if(condition) {
    return
  }
 
  if(!hasItems) {
    throw new ErrorMultipleFields(['An item must be added', 'All fields must be added'])
  }

  throw new ErrorMultipleFields(['All fields must be added']);
}

export class CreateInvoiceService {
  async execute({ client, sender, items, description, status, paymentTerms }: CreateInvoice) {

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
      })
      
      await invoiceRepo.save(invoiceCreated)

      addItems(items, invoiceCreated.id)

      return { ok: true }
    } catch(error) {
      return error
    }
  }
}