import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = Router();

// Only admins can access
router.get("/secret", protect, authorize("admin"), (_req, res) => {
  res.json({ message: "Welcome, admin!" });
});

export default router;
