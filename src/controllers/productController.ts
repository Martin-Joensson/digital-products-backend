import { Request, Response } from "express";
import { Product } from "../models/Product";

// Admin-only: create a product
export const createProduct = async (req: Request, res: Response) => {
    console.log("req.files:", req.files);
    console.log("req.body:", req.body);

  try {
    const { title, description, price, fileUrl } = req.body;

    // multer saves files to req.files
    const mainImage = req.files?.mainImage?.[0]?.path;
    const images = req.files?.images?.map((f) => f.path) || [];

    if (!title || !price || !fileUrl) {
      return res
        .status(400)
        .json({ message: "Title, price, and fileUrl are required" });
    }

    if (!mainImage) {
      return res.status(400).json({ message: "Main image is required" });
    }

    const product = await Product.create({
      title,
      description,
      price,
      fileUrl,
      mainImage,
      images,
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
