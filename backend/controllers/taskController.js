import Task from "../models/Task.js";
import Application from "../models/Application.js";

// HR assigns a task
export const createTask = async (req, res) => {
    try {

        console.log("BODY:", req.body);

        const { title, description, deadline, candidateId } = req.body;

        // find accepted candidate
        const candidate = await Application.findOne({
            _id: candidateId,
            status: "ACCEPTED",
        });

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        const task = await Task.create({
            title,
            description,
            deadline,
            assignedTo: candidateId,
        });

        res.status(201).json({
            message: "Task created successfully",
            task,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getMyTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            assignedTo: req.candidateId,
        });

        if (!task) {
            return res.status(404).json({ message: "No task assigned" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};