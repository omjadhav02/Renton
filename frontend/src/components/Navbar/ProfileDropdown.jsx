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
      
      <button
  onClick={() => setOpen((prev) => !prev)}
  className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl hover:shadow-sm transition"
>
  <IoPersonCircleOutline size={22} className="text-slate-600"/>
  <span className="text-sm text-slate-800">{user.name}</span>
</button>

{open && (
  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50">

    <Link to="/settings" className="block px-4 py-2 hover:bg-slate-50 text-sm">
      Settings
    </Link>

    <button
      onClick={onLogout}
      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 text-sm"
    >
      Logout
    </button>

  </div>
)}
    </div>
  );
}

export default ProfileDropdown;