import express from "express";
import { createOrder, getPaymentById, getPayments, getPaymentStatus, verifyPayment } from "../controllers/payment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/:paymentId", authenticate, getPaymentById);
router.post("/verify-payment", authenticate, verifyPayment)
router.get("/", authenticate, getPayments);
router.get("/status/:bookingId", authenticate, getPaymentStatus);

export default router;