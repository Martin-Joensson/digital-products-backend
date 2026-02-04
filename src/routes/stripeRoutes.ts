import express from "express";
import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createCheckoutSession,
  stripeWebhook,
} from "../controllers/stripeController";

const router = Router();

// Protected: only logged-in users can start checkout
router.post("/create-checkout-session", protect, createCheckoutSession);

// Stripe webhook: public endpoint
router.post(
  "/webhook",
  express.raw({ type: "application/json" }), // required for Stripe signature
  stripeWebhook,
);

export default router;
