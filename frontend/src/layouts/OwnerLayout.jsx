import SideBar from "../components/Navbar/SideBar/SideBar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import { FaHouseUser } from "react-icons/fa";

function OwnerLayout({ logout }) {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* SIDEBAR */}
      <SideBar
        onLogout={logout}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* MAIN CONTENT */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300
          ${collapsed ? "ml-16" : "ml-72"}`}
      >

        {/* TOP BAR */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md">

          <h1 className="text-white font-semibold text-lg tracking-tight">
            Owner Dashboard
          </h1>

          <Link to="/settings">
            <div className="p-2 rounded-xl border border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-slate-800 transition cursor-pointer">
              <FaHouseUser size={20}/>
            </div>
          </Link>

        </div>

        {/* CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        {/* FOOTER */}
        <Footer />

      </div>
    </div>
  );
}

export default OwnerLayout;