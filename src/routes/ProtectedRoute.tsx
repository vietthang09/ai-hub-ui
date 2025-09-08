import type { JSX } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";

interface RouteGuardProps {
  type: "protected" | "guest";
  children?: JSX.Element; // chỉ dùng cho guest
}

export default function RouteGuard({ type, children }: RouteGuardProps) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Guard for protected routes
  if (type === "protected") {
    return isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  }

  // Guard for guest routes
  if (type === "guest") {
    return isLoggedIn ? <Navigate to="/" replace /> : children!;
  }

  return null;
}
