import { Request, Response } from "express";
import { Product } from "../models/Product";

// Admin-only: create a product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price, fileUrl } = req.body;

    if (!title || !price || !fileUrl) {
      return res
        .status(400)
        .json({ message: "Title, price, and fileUrl are required" });
    }

    const product = await Product.create({
      title,
      description,
      price,
      fileUrl,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Public: list all products
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
