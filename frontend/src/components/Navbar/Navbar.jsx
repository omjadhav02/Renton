import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { IoMenu, IoClose } from "react-icons/io5";

function Navbar() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged Out!");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/60">

      {/* subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">

        {/* BRAND */}
        <Link to="/" className="group flex flex-col leading-tight">

          <span className="text-2xl md:text-3xl font-semibold tracking-tight text-white group-hover:text-emerald-400 transition">
            VerdeStay
          </span>

          <span className="text-[11px] md:text-xs text-slate-400 group-hover:text-emerald-300 transition">
            Live Better. Stay Smarter.
          </span>

        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <DesktopMenu user={user} onLogout={handleLogout} />
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white hover:text-emerald-400 transition"
        >
          {mobileOpen ? <IoClose size={28}/> : <IoMenu size={28}/>}
        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-slate-800/60 bg-slate-950/95 backdrop-blur-xl">
          <MobileMenu
            user={user}
            onLogout={handleLogout}
            closeMenu={() => setMobileOpen(false)}
          />
        </div>
      )}

    </nav>
  );
}

export default Navbar;