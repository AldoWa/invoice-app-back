import { Request, Response } from "express";
import { CreateInvoiceService } from "../services/CreateInvoiceService";

import { CreateInvoice } from "../types/invoice";

export class CreateInvoiceController {
  async handle(request: Request, response: Response) {
    const { client, sender, description, status, items, paymentTerms } = request.body as CreateInvoice;

    const createInvoiceService = new CreateInvoiceService();

    const result = await createInvoiceService.execute({
      client,
      sender,
      description,
      status,
      items,
      paymentTerms
    });

    if(result instanceof Error){
      return response.status(400).json({ error: result.message });
    }

    return response.json(result);
  }
}