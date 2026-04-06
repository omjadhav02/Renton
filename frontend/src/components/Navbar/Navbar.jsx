import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { IoMenu, IoClose } from "react-icons/io5";

function Navbar() {

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged Out!");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">

        {/* Brand */}
        <Link to="/" className="flex flex-col">
          <span className="text-2xl md:text-4xl font-bold text-blue-600">
            Renton
          </span>
          <span className="text-xs md:text-xl text-gray-500">
            Find. Book. Move In.
          </span>
        </Link>

        {/* Desktop */}
        <DesktopMenu user={user} onLogout={handleLogout} />

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? <IoClose size={28}/> : <IoMenu size={28}/>}
        </button>

      </div>

      {/* Mobile */}
      {mobileOpen && (
        <MobileMenu
          user={user}
          onLogout={handleLogout}
          closeMenu={() => setMobileOpen(false)}
        />
      )}

    </nav>
  );
}

export default Navbar;