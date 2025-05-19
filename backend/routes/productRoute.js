import e from "express";
const router = e.Router();
import { body, validationResult } from "express-validator";
import crypto from "crypto";

import {
  postProduct,
  getProduct,
  getAProduct,
  updateAProduct,
  deleteAProduct,
} from "../controllers/productController.js";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      crypto.randomBytes(12).toString("hex") +
        "-" +
        Date.now() +
        "-" +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  upload.single("images"),
  // body("title").notEmpty().withMessage("title required"),
  // body("description").notEmpty().withMessage("description required"),
  // body("size").notEmpty().withMessage("size required"),
  // body("category").notEmpty().withMessage("category required"),
  // body("price")
  //   .notEmpty()
  //   .withMessage("price required")
  //   .matches(/[0-9]/)
  //   .withMessage("price must be Number"),
  // body("available_stock")
  //   .notEmpty()
  //   .withMessage("available_stock required")
  //   .matches(/[0-9]/)
  //   .withMessage("available_stock must be Number"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ success: false, error: error.array() });
    }
    postProduct(req, res, next);
  }
);
router.get("/", getProduct);
router.get("/:id", getAProduct);
router.put("/:id", upload.single("images"), updateAProduct);
router.delete("/:id", deleteAProduct);

export default router;
