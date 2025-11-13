import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function ProtectedRoute() {
  const { user, loading, tag } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-6">Loading…</div>;
  console.log("PR tag=", tag, "user=", user, "loading=", loading);
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}
