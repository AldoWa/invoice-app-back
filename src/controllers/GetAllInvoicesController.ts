import { Request, Response } from "express";
import { GetAllInvoicesService } from "../services/GetAllInvoicesService";
import { compareAsc } from "date-fns";

export class GetAllInvoicesController {
  async handle(_: Request, response: Response) {
    const getAllInvoicesService = new GetAllInvoicesService();
    const result = await getAllInvoicesService.execute();
    const sortResult = result.sort((a, b) => compareAsc(new Date(a.paymentDue), new Date(b.paymentDue)))
    return response.json({ invoices: sortResult});
  }
}