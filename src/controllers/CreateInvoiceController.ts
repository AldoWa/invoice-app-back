import { Request, Response } from "express";
import { CreateInvoiceService } from "../services/CreateInvoiceService";

import { CreateInvoice } from "../types/invoice";

export class CreateInvoiceController {
  async handle(request: Request, response: Response) {
    const { client, sender, description, status, items, paymentTerms } = request.body as CreateInvoice;

    const createInvoiceService = new CreateInvoiceService();

    const invoice = await createInvoiceService.execute({
      client,
      sender,
      description,
      status,
      items,
      paymentTerms
    });

    return response.json(invoice);
  }
}