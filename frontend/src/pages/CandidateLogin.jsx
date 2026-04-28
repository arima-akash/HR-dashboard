import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CandidateLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:5000/api/candidate/login",
                { email, password }
            );

            localStorage.setItem("candidateToken", res.data.token);

            alert("Login Successful");

            navigate("/candidate/dashboard");

        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">

            <form
                onSubmit={handleLogin}
                className="bg-zinc-900 p-8 rounded-xl w-96"
            >

                <h2 className="text-2xl text-orange-500 mb-6 text-center">
                    Candidate Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 bg-zinc-800 text-white rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 bg-zinc-800 text-white rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-orange-500 p-2 rounded"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default CandidateLogin;