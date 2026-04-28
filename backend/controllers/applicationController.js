import Application from "../models/Application.js";

export const applyJob = async (req, res) => {
    try {
        const fullName = req.body.fullName;
        const email = req.body.email;
        const phone = req.body.phone;
        const education = req.body.education;
        const passedOutYear = req.body.passedOutYear;

        if (!fullName || !email || !phone || !education || !passedOutYear) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Resume PDF is required" });
        }

        const existingApplicant = await Application.findOne({ email });

        if (existingApplicant) {
            return res.status(400).json({ message: "This email already applied" });
        }

        const application = await Application.create({
            fullName,
            email,
            phone,
            education,
            passedOutYear,
            resume: req.file.path,
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
