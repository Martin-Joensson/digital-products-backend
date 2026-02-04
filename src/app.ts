import express from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
