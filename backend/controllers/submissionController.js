import Submission  from "../models/Submission.js";
import Task from "../models/Task.js";

// Create a new submission
export const submitProject = async (req, res) => {
    try {
        const {githubLink} = req.body;

        // find assigned task 
        const task = await Task.findOne({assignedTo: req.candidateId});

        if (!task) {
            return res.status(404).json({message: "No assigned task found for the candidate"});
        }

        // deadline check
        if (new Date() > task.deadline) {
            return res.status(400).json({message: "Submission deadline has passed"});
        }

        //prevent multiple submissions
        const existingSubmission = await Submission.findOne({
            taskId: task._id,
            candidateId: req.candidateId,
        });
        if (existingSubmission) {
            return res.status(400).json({message: "You have already submitted a project for this task"});
        }
        // create submission 
        const submission =  await Submission.create({
            taskId: task._id,
            candidateId: req.candidateId,
            githubLink,
        });

        // update task status to submitted 
        task.status = "SUBMITTED";
        await task.save();

        res.status(201).json({message: "Project submitted successfully", submission});
    } catch (error) {
        console.error("Error submitting project:", error);
        res.status(500).json({message: "Server error while submitting project"});
    } 
         
};
export const getAllSubmissions = async (req, res) => {
    try {

        const submissions = await Submission.find()
            .populate("candidateId")   // 🔥 THIS IS THE KEY
            .populate("taskId");       // optional (task details)

        res.status(200).json(submissions);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching submissions" });
    }
};