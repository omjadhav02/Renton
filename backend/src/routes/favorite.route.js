import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite
} from "../controllers/favorite.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, addFavorite);

router.get("/", authenticate, getFavorites);

router.delete("/:id", authenticate, removeFavorite);

export default router;