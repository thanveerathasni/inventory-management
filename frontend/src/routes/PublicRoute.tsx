import { Navigate, Outlet } from "react-router-dom";

import { PROTECTED_ROUTES } from "../constants/routes";
import { useAuth } from "../hooks";

export const PublicRoute = () => {
  const { isAuthenticated, isSessionRestoring } = useAuth();

  if (isSessionRestoring) {
    return <p role="status">Restoring session…</p>;
  }

  if (isAuthenticated) {
    return <Navigate replace to={PROTECTED_ROUTES.DASHBOARD} />;
  }

  return <Outlet />;
};
