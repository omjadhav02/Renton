import express from "express";
import { chatBot } from "../controllers/bot.controller.js";
import { authenticate } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/", authenticate, chatBot);

export default router;