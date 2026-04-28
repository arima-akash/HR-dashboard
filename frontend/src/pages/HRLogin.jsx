import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HRLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:5000/api/hr/login",
                { email, password }
            );

            localStorage.setItem("hrToken", res.data.token);

            alert("Login Successful");

            navigate("/hr/dashboard");

        } catch (error) {

            alert("Invalid credentials");

        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-black">

            <form
                onSubmit={handleLogin}
                className="bg-zinc-900 p-8 rounded-xl w-96 shadow-lg"
            >

                <h2 className="text-2xl text-orange-500 font-bold mb-6 text-center">
                    HR Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 rounded bg-zinc-800 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 rounded bg-zinc-800 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default HRLogin;