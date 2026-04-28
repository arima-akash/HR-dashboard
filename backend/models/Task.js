import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        deadline: {
            type: Date,
            required: true,
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true,
        },

        status: {
            type: String,
            enum: ["ASSIGNED", "SUBMITTED", "COMPLETED", "EXPIRED"],
            default: "ASSIGNED",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
         