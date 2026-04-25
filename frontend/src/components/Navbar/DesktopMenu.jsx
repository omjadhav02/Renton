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

import { BsStars } from "react-icons/bs";

import ProfileDropdown from "./ProfileDropdown";

function DesktopMenu({ user, onLogout }) {

  return (
    <div className="hidden md:flex items-center gap-6 text-slate-600 font-medium">

  <Link to="/" className="hover:text-indigo-600 transition">
    <IoHomeOutline size={22}/>
  </Link>

  {user && user.role === "tenant" && (
    <>
      <Link to="/favorites" className="flex items-center gap-1 hover:text-indigo-600 transition">
        <IoHeartOutline/> Favorites
      </Link>

      <Link to="/my-bookings" className="flex items-center gap-1 hover:text-indigo-600 transition">
        <IoCalendarOutline/> Bookings
      </Link>

      <Link to="/bot" className="flex items-center gap-1 hover:text-indigo-600 transition">
        <BsStars/> Renton AI Assistant
      </Link>
    </>
  )}

  {user && user.role === "owner" && (
    <>
      <Link
        to="/owner/create-property"
        className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow-sm transition"
      >
        <IoAdd/> Add Property
      </Link>

      <Link to="/owner/my-properties" className="hover:text-indigo-600 transition">
        Properties
      </Link>
    </>
  )}

  {!user ? (
    <>
      <Link to="/login" className="hover:text-indigo-600 transition">
        Login
      </Link>

      <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow-sm transition">
        Register
      </Link>
    </>
  ) : (
    <ProfileDropdown user={user} onLogout={onLogout} />
  )}

</div>
  );
}

export default DesktopMenu;