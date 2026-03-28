import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createBooking, deleteBookingRequest, getBookingRequests, getMyBookings, updateBookingStatus } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", authenticate, createBooking);
router.get("/my", authenticate, getMyBookings);
router.get("/owner", authenticate, getBookingRequests);
router.put("/:id", authenticate, updateBookingStatus);
router.delete("/:id",authenticate, deleteBookingRequest);


export default router;