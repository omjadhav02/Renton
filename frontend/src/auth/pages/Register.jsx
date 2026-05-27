import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../mutations/useRegister";

function Register() {
    const [loading, setLoading] = useState(false);
    const registerMutation = useRegister();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "tenant",
        phone: ""
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        registerMutation.mutate(
          form,
        )
    };

return (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

    <div className="w-full max-w-md">

      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8">

        {/* BRAND */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">
            Renton
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Find. Book. MoveIn.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          {/* ROLE */}
          <div>
            <p className="text-sm text-slate-500 mb-2">
              Account type
            </p>

            <div className="flex border border-slate-200 rounded-xl overflow-hidden">

              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, role: "tenant" }))}
                className={`flex-1 py-2 text-sm font-medium transition
                  ${form.role === "tenant"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100"}
                `}
              >
                Tenant
              </button>

              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, role: "owner" }))}
                className={`flex-1 py-2 text-sm font-medium transition
                  ${form.role === "owner"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100"}
                `}
              >
                Owner
              </button>

            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition shadow-sm"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>

      </div>

    </div>

  </div>
);
}

export default Register;