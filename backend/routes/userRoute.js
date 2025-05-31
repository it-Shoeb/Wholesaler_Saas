import express from "express";
const router = express.Router();
import { getUsers, getUser, postUser } from "../controllers/userController.js";

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/:id", postUser);

export default router;
