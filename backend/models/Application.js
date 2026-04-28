import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        education: {
            type: String,
            required: true,
            trim: true,
        },

        passedOutYear: {
            type: Number,
            required: true,
        },

        resume: {
            type: String,
            required: true, // file path or url
        },

        status: {
            type: String,
            enum: ["PENDING", "ACCEPTED", "REJECTED"],
            default: "PENDING",
        },

        password: {
            type: String,
            default: null, // generated when HR accepts
        },
    },
    { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
