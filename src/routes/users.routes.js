import { Router } from "express";

import { authJwt, verifyRole } from "../middlewares/index";
import {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/users.controller";

const router = Router();

router.post("/", [authJwt.verifyToken, verifyRole.isModerator], addUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put(
  "/:id",
  [authJwt.verifyToken, verifyRole.isModerator],
  updateUserById
);
router.delete(
  "/:id",
  [authJwt.verifyToken, verifyRole.isAdmin],
  deleteUserById
);

export default router;
