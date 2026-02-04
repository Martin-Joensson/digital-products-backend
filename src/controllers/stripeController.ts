import { Request, Response } from "express";
import Stripe from "stripe";
import { Product } from "../models/Product";
import { Purchase } from "../models/Purchase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-01-28.clover",
});

console.log("Stripe key:", !!process.env.STRIPE_SECRET_KEY);

// Create Checkout session
export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    if (!productId)
      return res.status(400).json({ message: "Product ID required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: req.user?.email, // optional
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: product.title },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (error: any) {
  console.error("Stripe error:", error.message || error);
  res.status(500).json({ message: error.message || "Failed to create checkout session" });
  }
};

// Webhook to mark purchase as paid
export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_email;
    const productName = session.display_items?.[0].custom?.name;

    // Find product and user
    const product = await Product.findOne({ title: productName });
    const user = await User.findOne({ email });

    if (product && user) {
      await Purchase.create({
        user: user._id,
        product: product._id,
        price: session.amount_total!,
        status: "paid",
      });
    }
  }

  res.json({ received: true });
};
