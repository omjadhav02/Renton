import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLogin } from "../mutations/useLogin";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { setUser, user } = useAuth();

    const loginMutaion = useLogin();

    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        loginMutaion.mutate({
          email,
          password
        })
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

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition shadow-sm" disabled={loginMutaion.isPending}>
            {loginMutaion.isPending ? "Signing in..." : "Continue"}
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Create one
          </Link>
        </p>

      </div>

    </div>

  </div>
);
}

export default Login;