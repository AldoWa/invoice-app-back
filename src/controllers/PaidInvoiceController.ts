import { Request, Response } from "express";
import { PaidInvoiceService } from "../services/PaidInvoiceService";

export class PaidInvoiceController {
  async handle(request: Request, response: Response) {
    const paidInvoiceService = new PaidInvoiceService();
    const result = await paidInvoiceService.execute({ id: request.params.id });
    
    if(result instanceof Error){
      return response.status(400).json({ error: result.message });
    }

    return response.json({ message: result });
  }
}