import express from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} from "../controllers/property.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", authenticate, authorizeRoles("owner"), createProperty);

router.get("/", getProperties);

router.get("/:id", getPropertyById);

router.put("/:id", authenticate, authorizeRoles("owner"), updateProperty);

router.delete("/:id", authenticate, authorizeRoles("owner"), deleteProperty);

export default router;