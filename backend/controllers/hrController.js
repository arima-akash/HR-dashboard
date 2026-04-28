import jwt from "jsonwebtoken";
import Application from "../models/Application.js";
import generatePassword from "../utils/generatePassword.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

export const hrLogin = async (req,res)=>{
    try {
        const{email, password } = req.body;

        if (email !== process.env.HR_EMAIL || password !== process.env.HR_PASSWORD){
            return res.status(401).json({message:"Invalid HR credentials"})
        }

        const token = jwt.sign(
            {role:"HR",email},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }

        );

        res.status(200).json({
            message: "HR login successful",
            token,
        });

    }catch (error) {
        res.status(500).json({message: error.message });
    }
};

export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const acceptApplication = async (req, res) => {
    try {
        const { id } = req.params;

        const applicant = await Application.findById(id);

        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        if (applicant.status === "ACCEPTED") {
            return res.status(400).json({ message: "Applicant already accepted" });
        }

        // generate password
        const plainPassword = generatePassword();

        // hash password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        applicant.status = "ACCEPTED";
        applicant.password = hashedPassword;
        await applicant.save();
        await sendEmail(applicant.email, plainPassword);

        res.status(200).json({
            message: "Applicant accepted successfully",
            generatedPassword: plainPassword, // for now we return it
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const rejectApplication = async (req, res) => {
    try {
        const { id } = req.params;

        const applicant = await Application.findById(id);

        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        if (applicant.status === "REJECTED") {
            return res.status(400).json({ message: "Applicant already rejected" });
        }

        applicant.status = "REJECTED";
        applicant.password = null;

        await applicant.save();

        res.status(200).json({
            message: "Applicant rejected successfully",
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const resetCandidatePassword = async (req, res) => {
    try {
        const { id } = req.params;

        // find candidate
        const candidate = await Application.findById(id);

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        if (candidate.status !== "ACCEPTED") {
            return res.status(400).json({
                message: "Candidate is not accepted",
            });
        }

        // generate new password
        const plainPassword = generatePassword();

        // hash password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // update DB
        candidate.password = hashedPassword;
        await candidate.save();

        // send email
        await sendEmail(candidate.email, plainPassword);

        res.status(200).json({
            message: "Password reset successful and email sent",
            
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};