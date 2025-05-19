import e from "express";
const router = e.Router();

import path from "path";
import crypto from "crypto";

import {
  postCustomer,
  getCustomers,
  getCustomer,
  putCustomer,
  deleteCustomer,
} from "../controllers/CustomerControllers.js";

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/customers");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      // crypto.randomBytes(12).toString("hex") +
      // "-" +
      Date.now() + "-" + file.originalname
    );
    // Date.now() + "-" + path.extname(file.originalname)
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("customerImage"), postCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.put("/:id", upload.single("customerImage"), putCustomer);
router.delete("/:id", deleteCustomer);

export default router;
