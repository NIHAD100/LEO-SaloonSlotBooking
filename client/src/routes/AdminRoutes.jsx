import React from "react";
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AdminLogin from "../pages/admin/adminLogin";
import SalonManage from "../pages/admin/SalonManage";
import VMManage from "../pages/admin/VMManage";
import UsersManage from "../pages/admin/UsersManage";
import AuthenticatedRoute from "../util/admin/authenticatedRoute";
import UnAuthenticatedRoute from "../util/admin/unauthenticatedRoute";
import { Route, Routes } from "react-router-dom";
import BookingManage from '../pages/admin/BookingManage'

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>} />
        <Route path="signin" element={<UnAuthenticatedRoute><AdminLogin /></UnAuthenticatedRoute>} />
        <Route path="salons" element={<AuthenticatedRoute><SalonManage /></AuthenticatedRoute>} />
        <Route path="vm" element={<AuthenticatedRoute><VMManage /></AuthenticatedRoute>} />
        <Route path="users" element={<AuthenticatedRoute><UsersManage /></AuthenticatedRoute>} />
        <Route path="bookings" element={<BookingManage />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
