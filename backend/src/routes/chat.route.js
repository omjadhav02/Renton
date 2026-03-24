import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getMessages, markAsSeen } from "../controllers/chat.controller.js";


const router = express.Router();

router.get("/:userId", authenticate, getMessages);
router.put("/seen/:userId",authenticate,markAsSeen);

export default router;