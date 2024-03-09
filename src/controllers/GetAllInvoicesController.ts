import { Request, Response } from "express";
import { GetAllInvoicesService } from "../services/GetAllInvoicesService";


export class GetAllInvoicesController {
  async handle(_: Request, response: Response) {
    const getAllInvoicesService = new GetAllInvoicesService();
    const result = await getAllInvoicesService.execute();
    
    return response.json({ invoices: result });
  }
}