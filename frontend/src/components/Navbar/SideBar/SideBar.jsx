import {
  IoHomeOutline,
  IoNotificationsOutline,
  IoSettingsSharp,
  IoLogOutOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineAddHome } from "react-icons/md";
import { GiIsland } from "react-icons/gi";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { iconSize } from "../../../themes/icon"

const SideBar = ({ onLogout, collapsed, setCollapsed }) => {
  const location = useLocation();

  const menu = [
    { name: "Home", icon: <IoHomeOutline size={iconSize}/>, path: "/" },
    { name: "Dashboard", icon: <RxDashboard size={iconSize}/>, path: "/owner/dashboard" },
    { name: "My Properties", icon: <GiIsland size={iconSize}/>, path: "/owner/my-properties" },
    { name: "Requests", icon: <IoNotificationsOutline size={iconSize}/>, path: "/owner/requests" },
    { name: "Add Property", icon: <MdOutlineAddHome size={iconSize}/>, path: "/owner/create-property" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-100 transition-all duration-100 flex flex-col 
        ${collapsed ? "w-16" : "w-80"}`}
    >
      {/* Toggle Button */}
      <div
        className="p-4 cursor-pointer text-gray-700 "
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <TbLayoutSidebarRightCollapseFilled size={iconSize}/> : (
            <div className="flex justify-between items-center">
                <div className="">Renton</div>
                <div><TbLayoutSidebarLeftCollapseFilled size={iconSize}/></div>
            </div>
        )}
      </div>

      {/* NAV */}
      <div className="flex flex-col gap-2 px-2 flex-1">
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link to={item.path} key={item.name}>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg transition
                ${active ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-200"}`}
              >
                <span className="text-xl">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="p-2 ">
        <div className="flex flex-col gap-2">
            <Link to="/settings">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <IoSettingsSharp size={iconSize}/>
                    {!collapsed && <span>Settings</span>}
                </div>
            </Link>

          <div
            onClick={onLogout}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 cursor-pointer text-red-500"
          >
            <IoLogOutOutline size={iconSize}/>
            {!collapsed && <span>Logout</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

