import express from "express";
import authRoutes from "./authRoutes.js";
import taskRoutes from "./taskRoutes.js";
import profileRoutes from "./profileRoutes.js";

const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "API is healthy", timestamp: new Date().toISOString() });
});

// Mount routes
router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/profile", profileRoutes);

export default router;
