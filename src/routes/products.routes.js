import { Router } from "express";

import { authJwt, verifyRole } from "../middlewares/index";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller";

const router = Router();

router.post("/", [authJwt.verifyToken, verifyRole.isModerator], addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put(
  "/:id",
  [authJwt.verifyToken, verifyRole.isModerator],
  updateProductById
);
router.delete(
  "/:id",
  [authJwt.verifyToken, verifyRole.isAdmin],
  deleteProductById
);

export default router;
