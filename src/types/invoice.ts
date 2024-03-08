export type CreateInvoice = {
  client: {
    name: string;
    email: string;
    address: Address;
  }
  sender: {
    address: Address;
  }
  description: string;
  status: StatusEnum;
  items: Items[]
  paymentTerms: number;
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