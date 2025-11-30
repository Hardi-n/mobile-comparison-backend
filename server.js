import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import phoneRoutes from "./routes/phones.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API base route
app.use("/phones", phoneRoutes);

app.get("/", (req, res) => {
  res.send("SmartChoice Backend Running");
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
