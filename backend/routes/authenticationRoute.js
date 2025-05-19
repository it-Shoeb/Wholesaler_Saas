import e from "express";
const router = e.Router();

import { body, validationResult } from "express-validator";

import {
  loginController,
  registerController,
  logoutController,
} from "../controllers/authenticationController.js";

router.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("invalid email"),
  body("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 8 })
    .withMessage("Password must be least 5 characters"),
  (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.status(501).send(error.array);
    }

    loginController(req, res);
  }
);

router.post(
  "/register",
  body("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("invalid email"),
  body("username").notEmpty().withMessage("username required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("password must be least 5 characters ")
    .matches(/[0-9]/)
    .withMessage("password must contain a numbers")
    .matches(/[a-z]/)
    .withMessage("password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("password must contain an uppercase letter"),
  (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: error.array(),
      });
    }

    registerController(req, res);
  }
);

router.post("/logout", logoutController);

export default router;
