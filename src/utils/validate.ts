import { ErrorMultipleFields } from "../errors/ErrorMultipleFields"
import { InvoiceInput } from "../types/invoice"
import { getClientCondition, getItemsCondition, getSenderCondition } from "./conditionIfExist"

export const hasNotEmptyFields = (client, sender, items, description, status, paymentTerms) => {
  const hasClient = getClientCondition(client)
  const hasSender = getSenderCondition(sender)
  const hasItems = getItemsCondition(items)
  const hasDescription = !!description
  const hasStatus = !!status
  const hasPaymentTerms = !!paymentTerms
  return {
    condition: hasClient && hasSender && hasItems && hasDescription && hasStatus && hasPaymentTerms,
    hasItems
  }
}

export const validateRequest = ({ client, sender, items, description, status, paymentTerms }: InvoiceInput) => {
  const { condition, hasItems } = hasNotEmptyFields(client, sender, items, description, status, paymentTerms)
  if(condition) {
    return
  }
 
  if(!hasItems) {
    throw new ErrorMultipleFields(['An item must be added', 'All fields must be added'])
  }

  throw new ErrorMultipleFields(['All fields must be added']);
}