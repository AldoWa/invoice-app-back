import { Router } from "express";
import { CreateInvoiceController } from "./controllers/CreateInvoiceController";
import { GetAllInvoicesController } from "./controllers/GetAllInvoicesController";

const routes = Router();

routes.post('/invoices', new CreateInvoiceController().handle);
routes.get('/invoices', new GetAllInvoicesController().handle);


export { routes }