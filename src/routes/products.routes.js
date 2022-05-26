import { Router } from "express";

import { auth, verifyRole } from "../middlewares/index";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller";

const router = Router();

router.post("/", [auth.verifyToken, verifyRole.isModerator], addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put(
  "/:id",
  [auth.verifyToken, verifyRole.isModerator],
  updateProductById
);
router.delete(
  "/:id",
  [auth.verifyToken, verifyRole.isAdmin],
  deleteProductById
);

export default router;
