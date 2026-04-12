import { Link } from "react-router-dom";
import {
  IoHomeOutline,
  IoHeartOutline,
  IoCalendarOutline,
  IoBusinessOutline,
  IoLogInOutline,
  IoPersonAddOutline,
  IoAdd
} from "react-icons/io5";

import ProfileDropdown from "./ProfileDropdown";

function DesktopMenu({ user, onLogout }) {

  return (
    <div className="hidden md:flex items-center gap-6 text-slate-300 font-medium">

      <Link to="/" className="hover:text-emerald-400 transition">
        <IoHomeOutline size={24}/>
      </Link>

      {user && user.role === "tenant" && (
        <>
          <Link to="/favorites" className="flex items-center gap-1 hover:text-emerald-400 transition">
            <IoHeartOutline/> Favorites
          </Link>

          <Link to="/my-bookings" className="flex items-center gap-1 hover:text-emerald-400 transition">
            <IoCalendarOutline/> My Bookings
          </Link>
        </>
      )}

      {user && user.role === "owner" && (
        <>
          <Link
            to="/owner/create-property"
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-md transition"
          >
            <IoAdd/> Add Property
          </Link>

          <Link to="/owner/my-properties" className="flex items-center gap-1 hover:text-emerald-400 transition">
            <IoBusinessOutline/> My Properties
          </Link>

          <Link to="/owner/requests" className="flex items-center gap-1 hover:text-emerald-400 transition">
            <IoCalendarOutline/> Requests
          </Link>
        </>
      )}

      {!user ? (
        <>
          <Link to="/login" className="flex items-center gap-1 hover:text-emerald-400 transition">
            <IoLogInOutline size={22} /> Login
          </Link>

          <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center gap-1 shadow-md transition">
            <IoPersonAddOutline size={18}/> Register
          </Link>
        </>
      ) : (
        <div className="flex items-center gap-3">

          <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20">
            {user.role === "owner" ? "Owner" : "Tenant"}
          </span>

          <ProfileDropdown user={user} onLogout={onLogout} />

        </div>
      )}

    </div>
  );
}

export default DesktopMenu;