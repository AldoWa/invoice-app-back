export type CreateInvoice = {
  client: Client;
  sender: Sender;
  description: string;
  status: StatusEnum;
  items: Items[]
  paymentTerms: number;
}

export type Client = {
  name: string;
  email: string;
  address: Address;
}

export type Sender = {
  address: Address;
}

export type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export enum StatusEnum {
  PAID = 'paid',
  PENDING = 'pending',
  DRAFT = 'draft'
}

export type Items = {
  name: string;
  quantity: number;
  price: number;
  total: number;
}