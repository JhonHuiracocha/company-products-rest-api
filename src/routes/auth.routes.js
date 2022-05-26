import { Router } from "express";

import { revalidateToken } from "../helpers/jwt";
import { signIn, signUp } from "../controllers/auth.controller";

const router = Router();

router.post("/login", signIn);
router.post("/register", signUp);
router.post("/renew", revalidateToken);

export default router;
