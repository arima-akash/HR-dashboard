import express from "express";
import { submitProject } from "../controllers/submissionController.js";
import { protectCandidate } from "../middleware/protectCandidate.js";
import { getAllSubmissions } from "../controllers/submissionController.js";
import { protectHR } from "../middleware/authMiddleware.js";
const router = express.Router();

// candidate submits project
router.post("/", protectCandidate, submitProject);
router.get("/", protectHR, getAllSubmissions);

export default router;