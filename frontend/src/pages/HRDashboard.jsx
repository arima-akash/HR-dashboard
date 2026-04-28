import { useEffect, useState } from "react";
import axios from "axios";

function HRDashboard() {

    // 🔹 STATE
    const [applications, setApplications] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    // 🔹 FETCH APPLICATIONS
    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("hrToken");

            const res = await axios.get(
                "http://localhost:5000/api/hr/applications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setApplications(res.data);

        } catch (error) {
            console.error(error);
        }
    };

    // 🔹 FETCH SUBMISSIONS
    const fetchSubmissions = async () => {
        try {
            const token = localStorage.getItem("hrToken");

            const res = await axios.get(
                "http://localhost:5000/api/submissions",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSubmissions(res.data);

        } catch (error) {
            console.error(error);
        }
    };

    // 🔹 ACCEPT
    const acceptApplicant = async (id) => {
        try {
            const token = localStorage.getItem("hrToken");

            await axios.patch(
                `http://localhost:5000/api/hr/applications/${id}/accept`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Accepted");
            fetchApplications();

        } catch (error) {
            console.error(error);
        }
    };

    // 🔹 REJECT
    const rejectApplicant = async (id) => {
        try {
            const token = localStorage.getItem("hrToken");

            await axios.patch(
                `http://localhost:5000/api/hr/applications/${id}/reject`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Rejected");
            fetchApplications();

        } catch (error) {
            console.error(error);
        }
    };

    // 🔹 RESEND PASSWORD
    const resendPassword = async (id) => {
        try {
            const token = localStorage.getItem("hrToken");

            await axios.patch(
                `http://localhost:5000/api/hr/applications/${id}/reset-password`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Password sent");

        } catch (error) {
            console.error(error);
        }
    };

    // 🔹 ASSIGN TASK
    const handleAssignTask = async () => {
        try {
            const token = localStorage.getItem("hrToken");

            await axios.post(
                "http://localhost:5000/api/tasks",
                {
                    title,
                    description,
                    deadline,
                    candidateId: selectedId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Task Assigned");
            setShowModal(false);

        } catch (error) {
            console.error(error);
        }
    };

    // 🔹 LOAD DATA
    useEffect(() => {
        fetchApplications();
        fetchSubmissions();
    }, []);

    // 🔹 UI
    return (
        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-3xl text-orange-500 mb-6">
                HR Dashboard
            </h1>

            {/* ================= APPLICATIONS ================= */}
            <h2 className="text-xl mb-3 text-orange-400">Applications</h2>

            <table className="w-full bg-zinc-900 mb-10">
                <tbody>
                    {applications.map((app) => (
                        <tr key={app._id} className="border-b border-zinc-700">

                            <td className="p-3">{app.fullName}</td>
                            <td className="p-3">{app.email}</td>
                            <td className="p-3">{app.phone}</td>

                            <td className="p-3">{app.status}</td>

                            <td className="p-3 flex gap-2">

                                {app.status === "PENDING" && (
                                    <>
                                        <button onClick={() => acceptApplicant(app._id)} className="bg-green-600 px-2 py-1">Accept</button>
                                        <button onClick={() => rejectApplicant(app._id)} className="bg-red-600 px-2 py-1">Reject</button>
                                    </>
                                )}

                                {app.status === "ACCEPTED" && (
                                    <>
                                        <button
                                            onClick={() => {
                                                setSelectedId(app._id);
                                                setShowModal(true);
                                            }}
                                            className="bg-blue-600 px-2 py-1"
                                        >
                                            Assign
                                        </button>

                                        <button
                                            onClick={() => resendPassword(app._id)}
                                            className="bg-yellow-600 px-2 py-1"
                                        >
                                            Password
                                        </button>
                                    </>
                                )}

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ================= SUBMISSIONS ================= */}
            <h2 className="text-xl mb-3 text-orange-400">Submissions</h2>

            <table className="w-full bg-zinc-900">
                <tbody>
                    {submissions.map((sub) => (
                        <tr key={sub._id} className="border-b border-zinc-700">

                            <td className="p-3">{sub.candidateId?.fullName}</td>
                            <td className="p-3">{sub.candidateId?.email}</td>

                            <td className="p-3">
                                <a href={sub.githubLink} target="_blank" className="text-blue-400">
                                    GitHub
                                </a>
                            </td>

                            <td className="p-3">
                                <a
                                    href={`http://localhost:5000/${sub.candidateId?.resume}`}
                                    target="_blank"
                                    className="text-orange-400"
                                >
                                    Resume
                                </a>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ================= MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70">

                    <div className="bg-zinc-900 p-6 rounded">

                        <input
                            placeholder="Title"
                            className="block mb-2 p-2 bg-zinc-800"
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <input
                            placeholder="Description"
                            className="block mb-2 p-2 bg-zinc-800"
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input
                            type="date"
                            className="block mb-2 p-2 bg-zinc-800"
                            onChange={(e) => setDeadline(e.target.value)}
                        />

                        <button onClick={handleAssignTask} className="bg-orange-500 px-3 py-1">
                            Submit
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
}

export default HRDashboard;