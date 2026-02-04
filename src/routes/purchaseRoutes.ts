import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { createPurchase, getUserPurchases } from "../controllers/purchaseController";

const router = Router();

// Auth required
router.post("/", protect, createPurchase);
router.get("/", protect, getUserPurchases);

export default router;
