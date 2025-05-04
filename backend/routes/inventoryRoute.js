import e from "express";
const router = e.Router();

import {
  createInventoryItem,
  getInventoryItems,
  getInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../controllers/inventoryController.js";

router.post("/", createInventoryItem);
router.get("/", getInventoryItems);
router.get("/:id", getInventoryItem);
router.put("/:id", updateInventoryItem);
router.delete("/:id", deleteInventoryItem);

export default router;
