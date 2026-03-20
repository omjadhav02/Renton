import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createBooking, getMyBookings, getOwnerBookings, updateBookingStatus } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", authenticate, createBooking);
router.get("/my", authenticate, getMyBookings);
router.get("/owner", authenticate, getOwnerBookings);
router.put("/:id", authenticate, updateBookingStatus);



export default router;