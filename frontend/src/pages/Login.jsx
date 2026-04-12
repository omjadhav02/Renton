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

    // ONLY UI CHANGED — LOGIC SAME

return (
  <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950">

    {/* LEFT */}
    <div className="hidden lg:flex w-1/2 relative">

      <img
        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-emerald-900/60"></div>

      <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">

        <div>
          <h1 className="text-4xl font-bold mb-2">VerdeStay</h1>
          <p className="text-slate-300 text-sm">
            Live Better. Stay Smarter.
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold mb-3">Welcome back</h2>
          <p className="text-sm text-slate-300 mb-4">
            Your next home is just a click away.
          </p>

          <ul className="space-y-2 text-sm text-slate-300">
            <li>✔ Verified homes</li>
            <li>✔ Instant booking</li>
            <li>✔ Trusted owners</li>
          </ul>
        </div>

        <p className="text-xs text-slate-400">
          Designed for modern renters
        </p>

      </div>
    </div>

    {/* RIGHT */}
    <div className="flex-1 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md space-y-6">

        {/* MOBILE BRAND */}
        <div className="lg:hidden text-center">
          <h1 className="text-3xl font-bold text-white">VerdeStay</h1>
          <p className="text-slate-400 text-sm">
            Live Better. Stay Smarter.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">

          <h2 className="text-2xl font-semibold text-white mb-2">
            Login
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-slate-800 border border-slate-700 p-3 mb-4 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-slate-800 border border-slate-700 p-3 mb-6 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition font-medium shadow-lg">
              Login
            </button>

          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-400 font-medium">
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