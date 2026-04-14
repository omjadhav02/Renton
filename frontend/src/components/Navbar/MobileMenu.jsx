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
    <div className="md:hidden px-4 pb-4 space-y-3 bg-white border-t border-slate-200 text-slate-700">

  <Link to="/" onClick={closeMenu}>Home</Link>

  {user && user.role === "tenant" && (
    <>
      <Link to="/favorites" onClick={closeMenu}>Favorites</Link>
      <Link to="/my-bookings" onClick={closeMenu}>Bookings</Link>
    </>
  )}

  {!user ? (
    <>
      <Link to="/login" onClick={closeMenu}>Login</Link>
      <Link to="/register" onClick={closeMenu} className="text-indigo-600 font-medium">Register</Link>
    </>
  ) : (
    <button onClick={onLogout} className="text-red-500">
      Logout
    </button>
  )}

</div>
  );
}

export default MobileMenu;