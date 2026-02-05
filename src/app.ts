import express from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import productRoutes from "./routes/productRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";
import stripeRoutes from "./routes/stripeRoutes";
import downloadRoutes from "./routes/downloadRoutes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/products", productRoutes);

app.use("/api/purchases", purchaseRoutes);
app.use("/api/stripe", stripeRoutes);

app.use("/api/download", downloadRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
