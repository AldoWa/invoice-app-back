import { Router } from "express";
import { CreateInvoiceController } from "./controllers/CreateInvoiceController";

const routes = Router();

routes.post('/invoices', new CreateInvoiceController().handle);

export { routes }