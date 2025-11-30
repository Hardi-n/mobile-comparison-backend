import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import phoneRoutes from "./routes/phones.js";
import recommendRoutes from "./routes/recommendRoutes.js";   // <-- ADD THIS

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API base routes
app.use("/phones", phoneRoutes);
app.use("/recommend", recommendRoutes);   // <-- ADD THIS

app.get("/", (req, res) => {
  res.send("SmartChoice Backend Running");
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
