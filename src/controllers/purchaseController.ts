import { Request, Response } from "express";
import { Purchase } from "../models/Purchase";
import { Product } from "../models/Product";

// For testing: create a purchase (simulate payment)
export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    if (!productId)
      return res.status(400).json({ message: "Product ID required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const purchase = await Purchase.create({
      user: req.user!._id,
      product: product._id,
      price: product.price,
      status: "paid",
    });

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ message: "Purchase creation failed" });
  }
};

// List all purchases for current user
export const getUserPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await Purchase.find({ user: req.user!._id }).populate(
      "product",
    );
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch purchases" });
  }
};
