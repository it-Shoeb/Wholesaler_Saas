import e from "express";
const router = e.Router();

import {
  createInvoice,
  getInvoices,
  getInvoice,
  putInvoice,
  deleteInvoice,
} from "../controllers/invoiceController.js";

router.post("/", createInvoice);
router.get("/", getInvoices);
router.get("/:id", getInvoice);
router.put("/:id", putInvoice);
router.delete("/:id", deleteInvoice);

export default router;
