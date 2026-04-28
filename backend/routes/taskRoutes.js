import express from "express";
import { createTask } from "../controllers/taskController.js";
import { protectHR } from "../middleware/authMiddleware.js";
import { getMyTask } from "../controllers/taskController.js";
import { protectCandidate } from "../middleware/protectCandidate.js";

const router = express.Router();

// HR assign task
router.post("/", protectHR, createTask);
router.get("/my-task", protectCandidate, getMyTask);

export default router;