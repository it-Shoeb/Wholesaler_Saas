import e from "express";
const router = e.Router();

import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

import { body, validationResult } from "express-validator";

router.post(
  "/",
  body("customerName").notEmpty().withMessage("customerName required").trim(),
  body("customerEmail")
    .notEmpty()
    .withMessage("customerEmail required")
    .isEmail()
    .withMessage("invalid email")
    .trim(),
  body("whatsappnumber")
    .isMobilePhone()
    .withMessage("ismobilenumber")
    .notEmpty()
    .withMessage("whatsappnumber required")
    .matches(/[0-9]/)
    .withMessage("must be number")
    .isLength({ min: 10, max: 15 })
    .withMessage("whatsapp number must 10 to 15 numbers only"),
  body("specialCard").optional().trim(),
  body("card").isArray({ min: 1 }).withMessage("at least one card required"),
  body("card.*.cardName").notEmpty().withMessage("cardname required"),
  body("card.*.quantity")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("invalid quantity"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "validation errors",
        error: error.array(),
      });
    }
    createOrder(req, res, next);
  }
);
router.get("/", getOrders);
router.get("/:id", getOrder);
router.put(
  "/:id",
  body("customerName").notEmpty().withMessage("customerName required").trim(),
  body("customerEmail")
    .notEmpty()
    .withMessage("customerEmail required")
    .isEmail()
    .withMessage("invalid email")
    .trim(),
  body("whatsappnumber")
    .notEmpty()
    .withMessage("whatsappnumber required")
    .isInt()
    .isMobilePhone()
    .withMessage("is should be a number")
    .trim(),
  body("card").isArray({ min: 1 }).withMessage("card required"),
  body("card.*.cardName").notEmpty().withMessage("cardName required"),
  body("card.*.quantity")
    .notEmpty()
    .isInt()
    .withMessage("quantity required")
    .trim(),
  body("card.*.language").notEmpty().withMessage("language required").trim(),
  body("card.*.color").notEmpty().withMessage("color required").trim(),
  body("card.*.designImage")
    .notEmpty()
    .withMessage("designImage required")
    .trim(),
  body("specialCard").optional().trim(),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(202).json({
        success: false,
        message: "validation error",
        error: error.array(),
      });
    }
    updateOrder(req, res, next);
  }
);
router.delete("/:id", deleteOrder);

export default router;
