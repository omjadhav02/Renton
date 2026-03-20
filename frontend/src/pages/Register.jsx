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

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">

            {/* LEFT - GLASS IMAGE */}
            <div className="hidden lg:flex w-1/2 relative">

                <img
                    src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">

                    <div>
                        <h1 className="text-4xl font-bold mb-2">Renton</h1>
                        <p className="text-gray-200 text-sm">
                            Start your journey
                        </p>
                    </div>

                    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg">

                        <h2 className="text-2xl font-semibold mb-3">
                            Join Renton today
                        </h2>

                        <p className="text-sm text-gray-200 mb-4">
                            Create your account and explore rental opportunities.
                        </p>

                        <ul className="space-y-2 text-sm text-gray-200">
                            <li>✔ Discover homes easily</li>
                            <li>✔ Book without hassle</li>
                            <li>✔ Connect with owners</li>
                        </ul>

                    </div>

                    <p className="text-xs text-gray-300">
                        Safe. Reliable. Modern renting.
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
                            Create account
                        </h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Get started in seconds
                        </p>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border p-3 mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border p-3 mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full border p-3 mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border p-3 mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />

                            {/* PREMIUM ROLE SELECTOR */}
                            <div className="mb-6">
                                <p className="text-sm text-gray-600 mb-2">
                                    Select account type
                                </p>

                                <div className="flex bg-gray-100 p-1 rounded-xl">

                                    <button
                                        type="button"
                                        onClick={() => setForm(prev => ({ ...prev, role: "tenant" }))}
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                                            ${form.role === "tenant"
                                                ? "bg-white shadow text-blue-600"
                                                : "text-gray-600"}
                                        `}
                                    >
                                        🏠 Tenant
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setForm(prev => ({ ...prev, role: "owner" }))}
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                                            ${form.role === "owner"
                                                ? "bg-white shadow text-blue-600"
                                                : "text-gray-600"}
                                        `}
                                    >
                                        🏢 Owner
                                    </button>

                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
                            >
                                {loading ? "Creating..." : "Register"}
                            </button>

                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 font-medium">
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