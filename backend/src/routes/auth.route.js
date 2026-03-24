import express from "express"
import { getMe, login, logout, register, updateUser } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);
router.put("/update-user",authenticate, updateUser);

export default router;