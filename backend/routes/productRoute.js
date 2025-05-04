import e from "express";
const router = e.Router();

import {
  postProduct,
  getProduct,
  getAProduct,
  updateAProduct,
  deleteAProduct,
} from "../controllers/productController.js";

router.post("/", postProduct);
router.get("/", getProduct);
router.get("/:id", getAProduct);
router.put("/:id", updateAProduct);
router.delete("/:id", deleteAProduct);

export default router;
