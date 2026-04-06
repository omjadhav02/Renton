import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthContext";
import OwnerLayout from "./OwnerLayout";

const MainLayout = () => {
  const { user, logout, loading } = useAuth();

  if (loading) return null; // or loader

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
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;