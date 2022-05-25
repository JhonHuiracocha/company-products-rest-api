import { Router } from "express";

import { verifyToken } from "../middlewares/authJwt";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller";

const router = Router();

router.post("/", verifyToken, addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", verifyToken, updateProductById);
router.delete("/:id", verifyToken, deleteProductById);

export default router;
