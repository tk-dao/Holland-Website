// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Showcase from "./pages/Showcase.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EmployeePortalLayout from "./pages/EmployeePortal/Layout.jsx";
import Dashboard from "./pages/EmployeePortal/Dashboard.jsx";
import Chat from "./pages/EmployeePortal/Chat.jsx";
import Camera from "./pages/EmployeePortal/Camera.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Showcase />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route path="/portal" element={<EmployeePortalLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="cameras" element={<Camera />} />
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
