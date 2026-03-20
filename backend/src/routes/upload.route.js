import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { deletePropertyImage, uploadPropertyImages } from "../controllers/upload.controller.js";


const router = express.Router();

router.post("/property/:propertyId", authenticate, authorizeRoles("owner"), upload.array("images", 5),
uploadPropertyImages);

router.delete("/image/:imageId",authenticate, authorizeRoles("owner"), deletePropertyImage)


export default router;