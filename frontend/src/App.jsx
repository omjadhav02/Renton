import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyDetails from "./pages/PropertyDetails";
import MyBookings from "./pages/Tenant/MyBookings";
import AddProperty from "./pages/Owner/AddProperty";
import EditProperty from "./pages/Owner/EditProperty";
import ProtectedRoute from "./pages/ProtectedRoute";

import MyProperties from "./pages/Owner/MyProperties";
import Requests from "./pages/Owner/Requests";
import ScrollToTop from "./utils/ScrollToTop";
import Favorites from "./pages/Tenant/Favorites";

import MainLayout from "./layouts/MainLayout";
import DashBoard from "./pages/Owner/DashBoard";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
        
        <Routes>

          <Route element={<MainLayout />}>

            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/property/:id" element={<PropertyDetails />} />

            {/* Tenant */}
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute role="tenant">
                  <MyBookings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute role="tenant">
                  <Favorites />
                </ProtectedRoute>
              }
            />

            {/* Owner */}
            <Route
              path="/owner/dashboard"
              element={
                <ProtectedRoute role="owner">
                  <DashBoard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/owner/my-properties"
              element={
                <ProtectedRoute role="owner">
                  <MyProperties />
                </ProtectedRoute>
              }
            />

            <Route
              path="/owner/requests"
              element={
                <ProtectedRoute role="owner">
                  <Requests />
                </ProtectedRoute>
              }
            />

            <Route
              path="/owner/create-property"
              element={
                <ProtectedRoute role="owner">
                  <AddProperty />
                </ProtectedRoute>
              }
            />

            <Route
              path="/owner/edit-property/:id"
              element={
                <ProtectedRoute role="owner">
                  <EditProperty />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings/>
                </ProtectedRoute>
              }
            />

          </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App;