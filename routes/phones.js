import express from "express";
import { getPhones, getPhoneById, searchPhones } from "../controllers/phonesController.js";

const router = express.Router();

router.get("/", getPhones);               // GET all phones
router.get("/search", searchPhones);      // GET phones by search query
router.get("/:id", getPhoneById);         // GET single phone by ID
// router.get("/highest-rated", getHighestRatedPhone); // GET highest-rated phone

export default router;
