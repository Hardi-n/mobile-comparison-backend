import express from "express";
import { recommendPhones } from "../controllers/recommendController.js";

const router = express.Router();

router.post("/", recommendPhones); // POST request for ML recommendations

export default router;
