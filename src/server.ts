import "dotenv/config"; // 👈 MUST be first

import app from "./app";
import { connectDB } from "./config/db";
import path from "path";
import express from "express";

// Serve uploads folder at /uploads URL
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
