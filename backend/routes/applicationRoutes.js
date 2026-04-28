import express from "express";
import upload from "../middleware/uploadMiddleware.js"
import { applyJob } from "../controllers/applicationController.js";

const router = express.Router();

//  job seeker Apply API
router.post("/apply", upload.single("resume"), applyJob);


export default router;