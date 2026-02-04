import { Router } from "express";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

export default router;
