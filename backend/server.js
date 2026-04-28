import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import applicationRoutes from "./routes/applicationRoutes.js";
import connectDB from "./config/db.js";
import hrRoutes from "./routes/hrRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import startDeadlineScheduler from "./utils/deadlineScheduler.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/api/applications", applicationRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/hr", hrRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/submissions", submissionRoutes);



app.get("/", (req, res) => {
    res.send("SculpXTechlabs Backend running...");
});

connectDB();
startDeadlineScheduler();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
