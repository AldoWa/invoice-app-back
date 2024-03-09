import { Router } from "express";
import { CreateInvoiceController } from "./controllers/CreateInvoiceController";
import { GetAllInvoicesController } from "./controllers/GetAllInvoicesController";
import { PaidInvoiceController } from "./controllers/PaidInvoiceController";
import { UpdateInvoiceController } from "./controllers/UpdateInvoiceController";
import { DeleteInvoiceController } from "./controllers/DeleteInvoiceController";

const routes = Router();

// Post
routes.post('/invoices', new CreateInvoiceController().handle);

// Get
routes.get('/invoices', new GetAllInvoicesController().handle);

// Put
routes.put('/invoices/:id/paid', new PaidInvoiceController().handle);
routes.put('/invoices/:id', new UpdateInvoiceController().handle);

routes.delete('/invoices/:id', new DeleteInvoiceController().handle);


export { routes }