import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyDetails from "./pages/PropertyDetails";
import Navbar from "./components/Navbar/Navbar";
import MyBookings from "./pages/MyBookings";
import OwnerBookings from "./pages/OwnerBookings";
import OwnerProperties from "./pages/OwnerProperties";
import Footer from "./components/Footer/Footer";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {
  return (
    
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route  path="/property/:id" element={<PropertyDetails/>}/>
        

        <Route path="/my-bookings" element={<ProtectedRoute role="tenant">
          <MyBookings/>
          </ProtectedRoute>}/>


        <Route path="/owner/properties" element={<ProtectedRoute role="owner">
          <OwnerProperties/>
          </ProtectedRoute>}/>
        <Route path="/owner/bookings" element={<ProtectedRoute role="owner">
          <OwnerBookings/>
          </ProtectedRoute>}/>
        <Route path="/owner/create-property" element={<ProtectedRoute role="owner">
          <AddProperty/>
          </ProtectedRoute>}/>
        <Route path="/owner/edit-property/:id" element={<ProtectedRoute role="owner">
          <EditProperty/>
          </ProtectedRoute>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;