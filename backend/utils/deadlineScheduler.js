import cron from "node-cron";
import Task from "../models/Task.js";

const startDeadlineScheduler = () => {

    // runs every minute
    cron.schedule("* * * * *", async () => {

        console.log("Checking deadlines...");

        try {

            const now = new Date();

            const expiredTasks = await Task.updateMany(
                {
                    deadline: { $lt: now },
                    status: "ASSIGNED",
                },
                {
                    $set: { status: "EXPIRED" },
                }
            );

            if (expiredTasks.modifiedCount > 0) {
                console.log(`${expiredTasks.modifiedCount} task(s) marked as EXPIRED`);
            }

        } catch (error) {
            console.error("Deadline Scheduler Error:", error);
        }

    });

};

export default startDeadlineScheduler;
      