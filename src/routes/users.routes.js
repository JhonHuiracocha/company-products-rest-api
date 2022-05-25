import { Router } from "express";

import { verifyToken } from "../middlewares/authJwt";
import {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/users.controller";

const router = Router();

router.post("/", verifyToken, addUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", verifyToken, updateUserById);
router.delete("/:id", verifyToken, deleteUserById);

export default router;
