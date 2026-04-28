import Application from "../models/Application.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const candidateLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find candidate
        const candidate = await Application.findOne({ email });

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // allow only accepted candidates
        if (candidate.status !== "ACCEPTED") {
            return res.status(403).json({
                message: "Application not approved yet",
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, candidate.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // generate token
        const token = jwt.sign(
            {
                id: candidate._id,
                role: "CANDIDATE",
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Candidate login successful",
            token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};