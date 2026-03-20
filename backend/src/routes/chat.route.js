import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getMessages } from "../controllers/chat.controller.js";


const router = express.Router();

router.get("/:userId", authenticate, getMessages);

export default router;