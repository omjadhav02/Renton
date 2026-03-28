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
    <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">

      <Link to="/" className="hover:text-blue-600">
        <IoHomeOutline size={24}/>
      </Link>

      {user && user.role === "tenant" && (
        <>
          <Link to="/favorites" className="flex gap-1 hover:text-blue-600">
            <IoHeartOutline/> Favorites
          </Link>

          <Link to="/my-bookings" className="flex gap-1 hover:text-blue-600">
            <IoCalendarOutline/> My Bookings
          </Link>
        </>
      )}

      {user && user.role === "owner" && (
        <>
          <Link
            to="/owner/create-property"
            className="flex gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <IoAdd/> Add Property
          </Link>

          <Link to="/owner/my-properties" className="flex gap-1 hover:text-blue-600">
            <IoBusinessOutline/> My Properties
          </Link>

          <Link to="/owner/requests" className="flex gap-1 hover:text-blue-600">
            <IoCalendarOutline/> Requests
          </Link>
        </>
      )}

      {!user ? (
        <>
          <Link to="/login" className="flex gap-1">
            <IoLogInOutline size={26} /> Login
          </Link>

          <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-1">
            <IoPersonAddOutline size={20}/> Register
          </Link>
        </>
      ) : (
        <div className="flex items-center gap-3">

          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {user.role === "owner" ? "Owner" : "Tenant"}
          </span>

          <ProfileDropdown user={user} onLogout={onLogout} />

        </div>
      )}

    </div>
  );
}

export default DesktopMenu;