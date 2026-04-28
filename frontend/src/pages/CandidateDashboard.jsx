import { useEffect, useState } from "react";
import axios from "axios";


function CandidateDashboard() {

    const [task, setTask] = useState(null);
    const [githubLink, setGithubLink] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {

        const fetchTask = async () => {

            try {

                const token = localStorage.getItem("candidateToken");

                console.log("TOKEN:", token); // debug

                const res = await axios.get(
                    "http://localhost:5000/api/tasks/my-task",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("TASK DATA:", res.data); // debug

                setTask(res.data);

            } catch (error) {
                console.error(error);
            }

        };

        fetchTask();

    }, []);
    const handleSubmit = async () => {

        try {   
            const token = localStorage.getItem("candidateToken");

            await axios.post(   
                "http://localhost:5000/api/submissions",
                {
                    githubLink
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Project submitted successfully!");
            setSubmitted(true);

        } catch (error) {
            console.error(error);
            alert("Failed to submit project. Please try again.");
        }

    };

    return (

        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-3xl text-orange-500 mb-6">
                Candidate Dashboard
            </h1>

            {task ? (
                <div className="bg-zinc-900 p-6 rounded-lg">

                    {/* TASK DETAILS */}
                    <h2 className="text-xl mb-2">{task.title}</h2>

                    <p className="mb-2">{task.description}</p>

                    <p className="mb-2">
                        Deadline: {new Date(task.deadline).toLocaleDateString()}
                    </p>

                    <p className="mb-4">
                        Status: {task.status}
                    </p>

                    {/* 🔥 SUBMISSION SECTION */}
                    <div className="mt-8 bg-zinc-800 p-5 rounded-xl">

                        <h3 className="text-lg text-orange-400 mb-3">
                            Submit Your Project
                        </h3>

                        <input
                            type="text"
                            placeholder="https://github.com/your-repo"
                            className="w-full p-3 mb-4 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={githubLink}
                            onChange={(e) => setGithubLink(e.target.value)}
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={submitted}
                            className={`w-full py-3 rounded font-semibold ${submitted
                                    ? "bg-green-600 cursor-not-allowed"
                                    : "bg-orange-500 hover:bg-orange-600"
                                }`}
                        >
                            {submitted ? "✅ Submitted" : "🚀 Submit Project"}
                        </button>

                    </div>

                </div>
            ) : (
                <p>No task assigned</p>
            )}

        </div>
        
    );
}

export default CandidateDashboard;