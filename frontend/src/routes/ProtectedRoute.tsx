import { Navigate, Outlet, useLocation } from "react-router-dom";

import { PUBLIC_ROUTES } from "../constants/routes";
import { useAuth } from "../hooks";

export const ProtectedRoute = () => {
  const { isAuthenticated, isSessionRestoring } = useAuth();
  const location = useLocation();

  if (isSessionRestoring) {
    return <p role="status">Restoring session…</p>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate replace state={{ from: location }} to={PUBLIC_ROUTES.LOGIN} />
    );
  }

  return <Outlet />;
};
