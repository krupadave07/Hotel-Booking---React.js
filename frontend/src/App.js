import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/HomeTemp";
import Rooms from "./pages/Rooms";
import Restaurant from "./pages/Restaurant";
import Spa from "./pages/Spa";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRestaurant from "./pages/AdminRestaurant";
import AdminContact from "./pages/AdminContact";
import AdminBookings from "./pages/AdminBookings";
import AdminSpa from "./pages/AdminSpa";
import AdminLogin from "./pages/AdminLogin";

import AdminUsers from "./pages/AdminUsers";

import Payment from "./pages/Payment";

import MyBookings from "./pages/MyBookings";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Hide navbar on admin pages */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* ========= PUBLIC ROUTES ========= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        {/* ========= USER PROTECTED ========= */}
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant"
          element={
            <ProtectedRoute>
              <Restaurant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/spa"
          element={
            <ProtectedRoute>
              <Spa />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        {/* ========= ADMIN LOGIN ========= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ========= ADMIN PROTECTED ROUTES ========= */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/contact"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminContact />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminBookings />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/spa"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminSpa />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        <Route
  path="/admin/users"
  element={
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminUsers />
      </AdminLayout>
    </AdminProtectedRoute>
  }
/>

        <Route
          path="/admin/restaurant"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminRestaurant />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
