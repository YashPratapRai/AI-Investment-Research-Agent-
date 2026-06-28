import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import investmentRoutes from "./routes/investment.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/invest", investmentRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Investment Research Agent API is running 🚀",
  });
});

export default app;