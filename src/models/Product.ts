import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number; // in cents
  fileUrl: string;
  mainImage: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    fileUrl: { type: String, required: true },
    mainImage: { type: String, required: true },
    images: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
