import { Router } from "express";

import { signIn, signUp } from "../controllers/auth.controller";

const router = Router();

router.post("/login", signIn);
router.post("/register", signUp);

export default router;
