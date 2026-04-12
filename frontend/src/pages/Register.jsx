import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "tenant",
        phone: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await axiosInstance.post("/auth/register", form);

            toast.success("Account created 🎉");
            navigate("/login");

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed");
        } finally {
            setLoading(false);
        }
    };

    // ONLY UI CHANGED — LOGIC SAME

return (
  <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950">

    {/* LEFT */}
    <div className="hidden lg:flex w-1/2 relative">

      <img
        src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-emerald-900/60"></div>

      <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">

        <div>
          <h1 className="text-4xl font-bold mb-2">VerdeStay</h1>
          <p className="text-slate-300 text-sm">
            Start your journey
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold mb-3">
            Join VerdeStay
          </h2>

          <p className="text-sm text-slate-300 mb-4">
            Discover smarter renting.
          </p>

          <ul className="space-y-2 text-sm text-slate-300">
            <li>✔ Premium homes</li>
            <li>✔ Easy booking</li>
            <li>✔ Verified owners</li>
          </ul>
        </div>

        <p className="text-xs text-slate-400">
          Built for modern living
        </p>

      </div>
    </div>

    {/* RIGHT */}
    <div className="flex-1 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md space-y-6">

        {/* MOBILE */}
        <div className="lg:hidden text-center">
          <h1 className="text-3xl font-bold text-white">VerdeStay</h1>
          <p className="text-slate-400 text-sm">
            Live Better. Stay Smarter.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">

          <h2 className="text-2xl font-semibold text-white mb-2">
            Create account
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Get started in seconds
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 p-3 mb-4 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-white"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 p-3 mb-4 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-white"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 p-3 mb-4 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-white"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 p-3 mb-4 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-white"
              required
            />

            <div className="mb-6">
              <p className="text-sm text-slate-400 mb-2">
                Select account type
              </p>

              <div className="flex bg-slate-800 p-1 rounded-xl">

                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, role: "tenant" }))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                    ${form.role === "tenant"
                      ? "bg-emerald-600 text-white shadow"
                      : "text-slate-400"}
                  `}
                >
                  🏠 Tenant
                </button>

                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, role: "owner" }))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                    ${form.role === "owner"
                      ? "bg-emerald-600 text-white shadow"
                      : "text-slate-400"}
                  `}
                >
                  🏢 Owner
                </button>

              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition font-medium shadow-lg"
            >
              {loading ? "Creating..." : "Register"}
            </button>

          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-400 font-medium">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>

  </div>
);
}

export default Register;