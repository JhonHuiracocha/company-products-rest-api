import { Router } from "express";

import { auth, verifyRole } from "../middlewares/index";
import {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/users.controller";

const router = Router();

router.post("/", [auth.verifyToken, verifyRole.isModerator], addUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", [auth.verifyToken, verifyRole.isModerator], updateUserById);
router.delete("/:id", [auth.verifyToken, verifyRole.isAdmin], deleteUserById);

export default router;
