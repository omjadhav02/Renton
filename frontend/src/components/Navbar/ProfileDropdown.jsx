import { useEffect, useRef, useState } from "react";
import {
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoSettingsOutline
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const location = useLocation();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative" ref={ref}>
      
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl hover:border-emerald-500/40 hover:bg-slate-800 transition"
      >
        <IoPersonCircleOutline size={22} className="text-slate-300"/>
        <span className="text-sm text-slate-200">{user.name}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">

          <Link
            to="/settings"
            className="block px-4 py-2 hover:bg-slate-800 text-sm text-slate-300"
          >
            <IoSettingsOutline className="inline mr-2" />
            Settings
          </Link>

          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-slate-800 text-sm"
          >
            <IoLogOutOutline className="inline mr-2" />
            Logout
          </button>

        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;