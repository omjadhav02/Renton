import express from "express";
import {
  createReview,
  getPropertyReviews,
  deleteReview
} from "../controllers/review.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createReview);

router.get("/property/:id", getPropertyReviews);

router.delete("/:id", authenticate, deleteReview);

export default router;