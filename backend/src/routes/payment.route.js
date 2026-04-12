import express from "express";
import { createOrder, getPayments, verifyPayment } from "../controllers/payment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createOrder);
router.post("/verify-payment", authenticate, verifyPayment)
router.get("/", authenticate, getPayments);

export default router;