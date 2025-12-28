import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import Register from "./page/Register";
import Login from "./page/Login";
import DashboardLayout from "./components/Layout/DashboardLayout";
import UserProfile from "./page/UserProfile";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route path="contacts" element={<div>Contacts</div>} />
          <Route path="users/profile" element={<UserProfile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
