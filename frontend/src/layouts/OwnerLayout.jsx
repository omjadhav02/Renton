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
        <div className="flex justify-end items-center ">
        
          <Link to="/settings">
            <div className="p-4 mr-8 hover:cursor-pointer hover:shadow-xl">
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