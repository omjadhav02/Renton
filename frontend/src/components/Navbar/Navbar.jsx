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
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">

  <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">

    {/* BRAND */}
    <Link to="/" className="flex flex-col leading-tight">
      <span className="text-2xl font-semibold text-slate-900">
        Renton
      </span>
      <span className="text-xs text-slate-500">
        Find. Book. MoveIn.
      </span>
    </Link>

    <div className="hidden md:flex items-center gap-6">
      <DesktopMenu user={user} onLogout={handleLogout} />
    </div>

    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      className="md:hidden text-slate-700"
    >
      {mobileOpen ? <IoClose size={28}/> : <IoMenu size={28}/>}
    </button>

  </div>

  {mobileOpen && (
    <div className="border-t border-slate-200 bg-white">
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