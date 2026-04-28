import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex flex-col items-center justify-center text-white">

            {/* Title */}
            <h1 className="text-5xl font-bold text-orange-500 mb-4 tracking-wide">
                Hiring Portal
            </h1>

            <p className="text-zinc-400 mb-10 text-center max-w-md">
                Welcome to the recruitment system. Choose your role or apply for a position.
            </p>

            {/* Cards */}
            <div className="flex gap-8 flex-wrap justify-center">

                {/* HR */}
                <div
                    onClick={() => navigate("/hr/login")}
                    className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 transition duration-300 p-8 rounded-2xl shadow-lg w-64 text-center border border-zinc-700 hover:border-orange-500"
                >
                    <h2 className="text-2xl font-semibold mb-3">HR</h2>
                    <p className="text-zinc-400 text-sm">
                        Manage candidates, assign tasks, and review submissions
                    </p>
                </div>

                {/* Candidate Login */}
                <div
                    onClick={() => navigate("/candidate/login")}
                    className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 transition duration-300 p-8 rounded-2xl shadow-lg w-64 text-center border border-zinc-700 hover:border-green-500"
                >
                    <h2 className="text-2xl font-semibold mb-3">Candidate</h2>
                    <p className="text-zinc-400 text-sm">
                        Login, view tasks, and submit your project
                    </p>
                </div>

                {/* Apply Now */}
                <div
                    onClick={() => navigate("/apply")}
                    className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 transition duration-300 p-8 rounded-2xl shadow-lg w-64 text-center border border-zinc-700 hover:border-purple-500"
                >
                    <h2 className="text-2xl font-semibold mb-3">Apply Now</h2>
                    <p className="text-zinc-400 text-sm">
                        Submit your application and get started
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Home;