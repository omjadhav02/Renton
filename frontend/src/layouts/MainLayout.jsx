import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthContext";
import OwnerLayout from "./OwnerLayout";

const MainLayout = () => {
  const { user, logout, loading } = useAuth();

  if (loading) return null;

  // 🏠 OWNER VIEW
  if (user?.role === "owner") {
    return (
      <>
        <OwnerLayout logout={logout}/>
      </>
    );
  }

  // 🌍 TENANT / PUBLIC VIEW
  return (
    <div className="bg-slate-950 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;