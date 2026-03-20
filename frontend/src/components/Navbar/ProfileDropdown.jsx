import { useEffect, useRef, useState } from "react";
import { IoPersonCircleOutline, IoLogOutOutline } from "react-icons/io5";

function ProfileDropdown({ user, onLogout }) {

  const [open, setOpen] = useState(false);
  const ref = useRef();

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

  return (
    <div className="relative" ref={ref}>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        <IoPersonCircleOutline size={24}/>
        <span className="text-sm">{user.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg z-50">

          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Edit Profile
          </button>

          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Settings
          </button>

          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            <IoLogOutOutline className="inline mr-2"/>
            Logout
          </button>

        </div>
      )}

    </div>
  );
}

export default ProfileDropdown;