import { Client, Items, Sender } from "../types/invoice";

export const getClientCondition = (client: Client) => {
  const hasClient = client.name && client.email && client.address.city && client.address.country && client.address.postCode && client.address.street
  return hasClient;
}

export const getSenderCondition = (sender: Sender) => {
  const hasSender =  sender.address.city && sender.address.country && sender.address.postCode && sender.address.street
  return hasSender;
}

export const getItemsCondition = (items: Items[]) => {
  const hasItems = !!items.length && items.every(item => !!item.name && !!item.quantity && !!item.price)

  return hasItems;
}