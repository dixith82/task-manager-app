import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// All profile routes require authentication
router.use(authenticate);

// Profile routes
router.get("/", getProfile);
router.put("/", updateProfile);

export default router;
