import { useState } from "react";
import axios from "axios";

function CandidateApply() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        education: "",
        passedOutYear: "",
    });

    const [resume, setResume] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        data.append("resume", resume);

        try {
            axios.post(`${import.meta.env.VITE_API_URL}/api/applications/apply`, data)

            alert("Application submitted successfully");

        } catch (error) {
            console.error(error);
            alert("Submission failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-black text-white">

            <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded w-96">

                <h2 className="text-2xl text-orange-500 mb-6">
                    Apply Now
                </h2>

                <input name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-2 mb-3 bg-zinc-800" />
                <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-3 bg-zinc-800" />
                <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 mb-3 bg-zinc-800" />
                <input name="education" placeholder="Education" onChange={handleChange} className="w-full p-2 mb-3 bg-zinc-800" />
                <input name="passedOutYear" placeholder="Year" onChange={handleChange} className="w-full p-2 mb-3 bg-zinc-800" />

                <input type="file" onChange={(e) => setResume(e.target.files[0])} className="mb-4" />

                <button className="bg-orange-500 w-full p-2 rounded">
                    Submit Application
                </button>

            </form>

        </div>
    );
}

export default CandidateApply;