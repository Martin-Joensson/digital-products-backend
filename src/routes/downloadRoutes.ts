import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { downloadProduct } from "../controllers/downloadController";

const router = Router();

router.get("/:productId", protect, downloadProduct);

export default router;
