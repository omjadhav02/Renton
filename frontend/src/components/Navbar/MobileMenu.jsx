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
    <div className="md:hidden px-4 pb-4 space-y-3 bg-white border-t">

      <Link to="/" onClick={closeMenu} className="flex gap-2">
        <IoHomeOutline/> Home
      </Link>

      {user && user.role === "tenant" && (
        <>
          <Link to="/favorites" onClick={closeMenu} className="flex gap-2">
            <IoHeartOutline/> Favorites
          </Link>

          <Link to="/my-bookings" onClick={closeMenu} className="flex gap-2">
            <IoCalendarOutline/> My Bookings
          </Link>
        </>
      )}

      {user && user.role === "owner" && (
        <>
          <Link to="/owner/create-property" onClick={closeMenu} className="flex gap-2 text-blue-600">
            <IoAdd/> Add Property
          </Link>

          <Link to="/owner/my-properties" onClick={closeMenu} className="flex gap-2">
            <IoBusinessOutline/> My Properties
          </Link>

          <Link to="/owner/requests" onClick={closeMenu} className="flex gap-2">
            <IoCalendarOutline/> Requests
          </Link>
        </>
      )}

      {!user ? (
        <>
          <Link to="/login" onClick={closeMenu} className="flex gap-2">
            <IoLogInOutline/> Login
          </Link>

          <Link to="/register" onClick={closeMenu} className="flex gap-2 text-blue-600">
            <IoPersonAddOutline/> Register
          </Link>
        </>
      ) : (
        <div className="border-t pt-3 mt-3 space-y-2">

          <div className="flex items-center gap-2">
            <IoPersonCircleOutline/>
            {user.name}
          </div>

          <button className="flex gap-2 w-full text-left">
            Edit Profile
          </button>

          <button className="flex gap-2 w-full text-left">
            Settings
          </button>

          <button
            onClick={onLogout}
            className="flex gap-2 text-red-600"
          >
            <IoLogOutOutline/> Logout
          </button>

        </div>
      )}

    </div>
  );
}

export default MobileMenu;