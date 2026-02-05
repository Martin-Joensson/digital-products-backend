import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { Product } from "../models/Product";
import { Purchase } from "../models/Purchase";

export const downloadProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const purchase = await Purchase.findOne({
      user: req.user!._id,
      product: product._id,
      status: "paid",
    });

    if (!purchase) {
      return res
        .status(403)
        .json({ message: "You do not have access to this product" });
    }

    // Assume fileUrl is a relative path like "files/test.pdf"
    const filePath = path.join(
      __dirname,
      "../../files",
      path.basename(product.fileUrl),
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found on server" });
    }

    res.download(filePath, path.basename(product.fileUrl));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to download file" });
  }
};
