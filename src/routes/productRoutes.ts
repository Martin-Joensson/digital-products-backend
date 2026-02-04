import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = Router();

// Public
router.get("/", getProducts);

// Admin-only
router.post("/", protect, authorize("admin"), createProduct);

export default router;
