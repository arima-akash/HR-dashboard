import express from "express";
import { protectHR } from "../middleware/authMiddleware.js";
import { hrLogin, getAllApplications, acceptApplication, rejectApplication } from "../controllers/hrController.js";
import { resetCandidatePassword } from "../controllers/hrController.js";        
const router = express.Router();

// HR Login
router.post("/login", hrLogin);

// HR View All Applicants (Protected)
router.get("/applications", protectHR, getAllApplications);
router.patch("/applications/:id/reject", protectHR, rejectApplication);
router.patch("/applications/:id/accept", protectHR, acceptApplication);
router.patch(
    "/applications/:id/reset-password",
    protectHR,
    resetCandidatePassword
);

export default router;
