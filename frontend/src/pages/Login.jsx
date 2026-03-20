import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {

    const navigate = useNavigate();
    const { setUser, user } = useAuth();

    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post("/auth/login", {
                email,
                password
            });

            setUser(res.data.user);
            toast.success("Welcome back 👋");
            navigate("/");

        } catch {
            toast.error("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">

            {/* LEFT - GLASS IMAGE */}
            <div className="hidden lg:flex w-1/2 relative">

                <img
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">

                    <div>
                        <h1 className="text-4xl font-bold mb-2">Renton</h1>
                        <p className="text-gray-200 text-sm">
                            Find. Book. Move In.
                        </p>
                    </div>

                    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg">

                        <h2 className="text-2xl font-semibold mb-3">
                            Welcome back
                        </h2>

                        <p className="text-sm text-gray-200 mb-4">
                            Continue your journey to find the perfect home.
                        </p>

                        <ul className="space-y-2 text-sm text-gray-200">
                            <li>✔ Verified listings</li>
                            <li>✔ Easy booking</li>
                            <li>✔ Direct owner contact</li>
                        </ul>

                    </div>

                    <p className="text-xs text-gray-300">
                        Trusted by renters across cities
                    </p>

                </div>
            </div>

            {/* RIGHT - FORM */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-10">

                <div className="w-full max-w-md">

                    {/* MOBILE BRAND */}
                    <div className="lg:hidden text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-600">
                            Renton
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Find. Book. Move In.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl ">

                        <h2 className="text-2xl font-semibold mb-2">
                            Login to your account
                        </h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Welcome back! Please enter your details.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border p-3 mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full border p-3 mb-6 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium">
                                Login
                            </button>

                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-600 font-medium">
                                Register
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;