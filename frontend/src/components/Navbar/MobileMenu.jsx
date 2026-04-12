import { Link } from "react-router-dom";
import {
  IoHomeOutline,
  IoHeartOutline,
  IoCalendarOutline,
  IoBusinessOutline,
  IoLogInOutline,
  IoPersonAddOutline,
  IoLogOutOutline,
  IoPersonCircleOutline,
  IoAdd
} from "react-icons/io5";

function MobileMenu({ user, onLogout, closeMenu }) {

  return (
    <div className="md:hidden px-4 pb-4 space-y-3 bg-slate-950 border-t border-slate-800 text-slate-300">

      <Link to="/" onClick={closeMenu} className="flex items-center gap-2 hover:text-emerald-400 transition">
        <IoHomeOutline/> Home
      </Link>

      {user && user.role === "tenant" && (
        <>
          <Link to="/favorites" onClick={closeMenu} className="flex items-center gap-2 hover:text-emerald-400 transition">
            <IoHeartOutline/> Favorites
          </Link>

          <Link to="/my-bookings" onClick={closeMenu} className="flex items-center gap-2 hover:text-emerald-400 transition">
            <IoCalendarOutline/> My Bookings
          </Link>
        </>
      )}

      {user && user.role === "owner" && (
        <>
          <Link
            to="/owner/create-property"
            onClick={closeMenu}
            className="flex items-center gap-2 text-emerald-400 font-medium"
          >
            <IoAdd/> Add Property
          </Link>

          <Link to="/owner/my-properties" onClick={closeMenu} className="flex items-center gap-2 hover:text-emerald-400 transition">
            <IoBusinessOutline/> My Properties
          </Link>

          <Link to="/owner/requests" onClick={closeMenu} className="flex items-center gap-2 hover:text-emerald-400 transition">
            <IoCalendarOutline/> Requests
          </Link>
        </>
      )}

      {!user ? (
        <>
          <Link to="/login" onClick={closeMenu} className="flex items-center gap-2 hover:text-emerald-400 transition">
            <IoLogInOutline/> Login
          </Link>

          <Link to="/register" onClick={closeMenu} className="flex items-center gap-2 text-emerald-400 font-medium">
            <IoPersonAddOutline/> Register
          </Link>
        </>
      ) : (
        <div className="border-t border-slate-800 pt-3 mt-3 space-y-3">

          <div className="flex items-center gap-2 text-white font-medium">
            <IoPersonCircleOutline/>
            {user.name}
          </div>

          <button className="flex gap-2 w-full text-left hover:text-emerald-400 transition">
            Edit Profile
          </button>

          <button className="flex gap-2 w-full text-left hover:text-emerald-400 transition">
            Settings
          </button>

          <button
            onClick={onLogout}
            className="flex gap-2 text-red-500 hover:text-red-400 transition"
          >
            <IoLogOutOutline/> Logout
          </button>

        </div>
      )}

    </div>
  );
}

export default MobileMenu;