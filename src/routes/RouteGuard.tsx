import type { JSX } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface RouteGuardProps {
  type: "protected" | "guest";
  children?: JSX.Element;
}

export default function RouteGuard({ type, children }: RouteGuardProps) {
  const location = useLocation();
  const { authUser, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <div>Loading...</div>;

  // Guard cho route protected
  if (type === "protected") {
    return authUser?.access_token ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  }

  // Guard cho route guest
  if (type === "guest") {
    return authUser?.access_token ? (
      <Navigate to="/" replace />
    ) : (
      <>{children}</>
    );
  }

  return null;
}
