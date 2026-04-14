import SideBar from "../components/Navbar/SideBar/SideBar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import { FaHouseUser } from "react-icons/fa";

function OwnerLayout({ logout }) {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">

  <SideBar
    onLogout={logout}
    collapsed={collapsed}
    setCollapsed={setCollapsed}
  />

  <div className={`flex flex-1 flex-col ${collapsed ? "ml-16" : "ml-72"}`}>

    <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-white">

      <h1 className="text-slate-900 font-semibold text-lg">
        Dashboard
      </h1>

      <Link to="/settings">
        <div className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50">
          <FaHouseUser size={20}/>
        </div>
      </Link>

    </div>

    <main className="flex-1 p-6">
      <Outlet />
    </main>

    <Footer />

  </div>
</div>
  );
}

export default OwnerLayout;