import { Request, Response } from "express";
import { InvoiceInput } from "../types/invoice";
import { UpdateInvoiceService } from "../services/UpdateInvoiceService";
import { ErrorMultipleFields } from "../errors/ErrorMultipleFields";

export class UpdateInvoiceController {
  async handle(request: Request, response: Response){
    const { client, sender, description, status, items, paymentTerms } = request.body as InvoiceInput;
    const updateInvoiceService = new UpdateInvoiceService();

    const result = await updateInvoiceService.execute({
      id: request.params.id,
      client,
      sender,
      description,
      status,
      items,
      paymentTerms
    })

    if(result instanceof ErrorMultipleFields){
      return response.status(400).json({ errors: result.getFields() });
    }

    return response.json({ result: 'updated' })
  }
}