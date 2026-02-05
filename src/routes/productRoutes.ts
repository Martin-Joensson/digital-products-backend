import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";
import { upload } from "../config/multer";

const router = Router();

// Public
router.get("/", getProducts);

// Admin-only
router.post(
  "/",
  protect,
  authorize("admin"),
    upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 5 }, // optional extra images
  ]),
  createProduct,
);

export default router;
