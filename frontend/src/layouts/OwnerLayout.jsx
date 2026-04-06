import SideBar from "../components/Navbar/SideBar/SideBar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import { FaHouseUser } from "react-icons/fa";

function OwnerLayout({ logout }) {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      
      <SideBar onLogout={logout} collapsed={collapsed} setCollapsed={setCollapsed} />

      <div 
      className={`flex flex-1 flex-col transition-all duation-300 ${collapsed ? "ml-16" : "ml-80"}`}
      > 
        <div className="flex justify-between items-center ">
          <Link to="/" className="flex flex-col items-start p-4">
            <span className="text-2xl md:text-4xl font-bold text-blue-600 leading-tight">
              Renton
            </span>
            <span className="text-xs md:text-sm text-gray-500">
              Find. Book. Move In.
            </span>
          </Link>
          <Link to="/settings">
            <div className="p-4 shadow-lg rounded-xl mr-8 hover:cursor-pointer hover:shadow-xl">
              <FaHouseUser size={26}/>
            </div>
          </Link>
          
        </div>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default OwnerLayout;