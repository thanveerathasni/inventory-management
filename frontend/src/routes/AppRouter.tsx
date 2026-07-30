import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "../constants/routes";
import { initializeAuth } from "../features/auth";
import { useAuth } from "../hooks";
import { DashboardLayout } from "../layouts";
import { LoginPage } from "../pages/Login";
import type { AppDispatch } from "../store/store";

import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isSessionRestoring } = useAuth();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (isSessionRestoring) {
    return <p role="status">Restoring session…</p>;
  }

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route
          element={<Navigate replace to={PUBLIC_ROUTES.LOGIN} />}
          path={PUBLIC_ROUTES.HOME}
        />
        <Route element={<LoginPage />} path={PUBLIC_ROUTES.LOGIN} />
        <Route element={null} path={PUBLIC_ROUTES.REGISTER} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route element={null} path={PROTECTED_ROUTES.DASHBOARD} />
          <Route element={null} path={PROTECTED_ROUTES.PRODUCTS} />
        </Route>
      </Route>
    </Routes>
  );
};
