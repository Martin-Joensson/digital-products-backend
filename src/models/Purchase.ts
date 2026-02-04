import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { IProduct } from "./Product";

export interface IPurchase extends Document {
  user: IUser["_id"];
  product: IProduct["_id"];
  price: number;
  status: "pending" | "paid";
  createdAt: Date;
  updatedAt: Date;
}

const PurchaseSchema = new Schema<IPurchase>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid"], default: "pending" },
  },
  { timestamps: true },
);

export const Purchase = mongoose.model<IPurchase>("Purchase", PurchaseSchema);
