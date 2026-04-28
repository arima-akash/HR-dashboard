import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },

        candidateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true,
        },

        githubLink: {
            type: String,
            required: true,
        },

        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);