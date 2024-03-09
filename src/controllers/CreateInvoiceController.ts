import { Request, Response } from "express";
import { CreateInvoiceService } from "../services/CreateInvoiceService";

import { CreateInvoice } from "../types/invoice";

import { ErrorMultipleFields } from "../errors/ErrorMultipleFields";

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

    if(result instanceof ErrorMultipleFields){
      return response.status(400).json({ errors: result.getFields() });
    }

    return response.json(result);
  }
}