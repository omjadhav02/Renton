import {
  IoHomeOutline,
  IoNotificationsOutline,
  IoSettingsSharp,
  IoLogOutOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineAddHome, MdOutlineMonetizationOn } from "react-icons/md";
import { GiIsland } from "react-icons/gi";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { iconSize } from "../../../themes/icon";
import { BsStars } from "react-icons/bs";

const SideBar = ({ onLogout, collapsed, setCollapsed }) => {
  const location = useLocation();

  const menu = [
    { name: "Home", icon: <IoHomeOutline size={iconSize} />, path: "/" },
    { name: "Dashboard", icon: <RxDashboard size={iconSize} />, path: "/owner/dashboard" },
    { name: "My Properties", icon: <GiIsland size={iconSize} />, path: "/owner/my-properties" },
    { name: "Requests", icon: <IoNotificationsOutline size={iconSize} />, path: "/owner/requests" },
    { name: "Add Property", icon: <MdOutlineAddHome size={iconSize} />, path: "/owner/create-property" },
    { name: "Transactions", icon: <MdOutlineMonetizationOn size={iconSize} />, path: "/owner/transactions" },
    { name: "Ask AI", icon: <BsStars size={iconSize} />, path: "/bot" },
  ];

  return (
    <div
  className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 transition-all duration-200 flex flex-col shadow-sm
    ${collapsed ? "w-16" : "w-72"}`}
>

  {/* HEADER */}
  <div
    className="p-4 cursor-pointer hover:bg-slate-50 transition"
    onClick={() => setCollapsed(!collapsed)}
  >
    {collapsed ? (
      <TbLayoutSidebarRightCollapseFilled size={26} className="text-slate-600"/>
    ) : (
      <div className="flex justify-between items-center">
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-xl font-semibold text-slate-900">
            Renton
          </span>
          <span className="text-xs text-slate-500">
            Owner Panel
          </span>
        </Link>

        <TbLayoutSidebarLeftCollapseFilled size={22} className="text-slate-500"/>
      </div>
    )}
  </div>

  {/* NAV */}
  <div className="flex flex-col gap-1 px-2 flex-1">

    {menu.map((item) => {
      const active = location.pathname === item.path;

      return (
        <Link to={item.path} key={item.name}>
          <div
            className={`flex items-center gap-3 p-3 rounded-xl transition-all
              ${
                active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
          >
            <span>{item.icon}</span>

            {!collapsed && (
              <span className="text-sm font-medium">
                {item.name}
              </span>
            )}
          </div>
        </Link>
      );
    })}

  </div>

  {/* BOTTOM */}
  <div className="p-2 border-t border-slate-200">

    <Link to="/settings">
      <div className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-slate-100 transition">
        <IoSettingsSharp size={iconSize} />
        {!collapsed && <span className="text-sm">Settings</span>}
      </div>
    </Link>

    <div
      onClick={onLogout}
      className="flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition cursor-pointer"
    >
      <IoLogOutOutline size={iconSize} />
      {!collapsed && <span className="text-sm">Logout</span>}
    </div>

  </div>
</div>
  );
};

export default SideBar;