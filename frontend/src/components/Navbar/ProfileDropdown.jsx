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

  // Close on outside click + ESC
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

  // ✅ Close dropdown on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <IoPersonCircleOutline size={24} />
        <span className="text-sm">{user.name}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg z-50 overflow-hidden">
          
          <Link
            to="/settings"
            className="block px-4 py-2 hover:bg-gray-100 text-sm"
          >
            <IoSettingsOutline className="inline mr-2" />
            Settings
          </Link>

          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 text-sm"
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