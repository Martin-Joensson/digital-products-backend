import "dotenv/config"; // 👈 MUST be first

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
