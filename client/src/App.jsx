import React from "react";
import Navbar from "./compontes/Navbar";
import { Route, useLocation, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import AllRooms from "./pages/AllRooms";
import Footer from "./compontes/Footer";
import RoomDetails from "./pages/RoomDetails";
import MyBooking from "./pages/MyBooking";
import HotalReg from "./compontes/HotalReg";
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import ListRoom from "./pages/hotelOwner/ListRoom";
import AddRoom from "./pages/hotelOwner/AddRoom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const {showHotelReg} = useAppContext()

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotalReg />}
      <div className="min-h-[70vh]">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBooking />} />

          {/* Owner Dashboard routes */}
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} /> 
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;
