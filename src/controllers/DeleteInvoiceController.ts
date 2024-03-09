import { Request, Response } from "express";
import { DeleteInvoiceService } from "../services/DeleteInvoiceService";

export class DeleteInvoiceController {
  async handle(request: Request, response: Response) {
    const deleteInvoiceService = new DeleteInvoiceService();

    const result = await deleteInvoiceService.execute({ id: request.params.id });

    if(result instanceof Error){
      return response.status(400).json({ error: result.message });
    }

    return response.status(204).json();
  }
}