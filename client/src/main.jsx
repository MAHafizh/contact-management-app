import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import Register from "./page/Register";
import Login from "./page/Login";
import DashboardLayout from "./components/Layout/DashboardLayout";
import UserProfile from "./page/UserProfile";
import Contact from "./page/Contact";
import CreateContact from "./components/Contact/CreateContact";
import EditContact from "./components/Contact/EditContact";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users">
            <Route index element={<></>} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          <Route path="contacts">
            <Route index element={<Contact />} />
            <Route path="create" element={<CreateContact/>} />
            <Route path="edit/:id" element={<EditContact/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
