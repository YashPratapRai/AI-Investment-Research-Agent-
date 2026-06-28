import express from "express";
import { investInCompany } from "../controllers/investmentController.js";

const router = express.Router();

router.post("/", investInCompany);

export default router;