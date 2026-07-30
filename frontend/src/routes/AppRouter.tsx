import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "../constants/routes";
import { initializeAuth } from "../features/auth";
import {
  CreateProductPage,
  EditProductPage,
  ProductListPage,
} from "../features/products";
import { PageLoader } from "../components/ui";
import { useAuth } from "../hooks";
import { DashboardLayout } from "../layouts";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { NotFoundPage } from "../pages/NotFoundPage";
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
    return <PageLoader message="Restoring session…" />;
  }

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route
          element={<Navigate replace to={PUBLIC_ROUTES.LOGIN} />}
          path={PUBLIC_ROUTES.HOME}
        />
        <Route element={<LoginPage />} path={PUBLIC_ROUTES.LOGIN} />
        <Route element={<RegisterPage />} path={PUBLIC_ROUTES.REGISTER} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route element={null} path={PROTECTED_ROUTES.DASHBOARD} />
          <Route
            element={<CreateProductPage />}
            path={PROTECTED_ROUTES.PRODUCT_CREATE}
          />
          <Route
            element={<EditProductPage />}
            path={PROTECTED_ROUTES.PRODUCT_EDIT}
          />
          <Route
            element={<ProductListPage />}
            path={PROTECTED_ROUTES.PRODUCTS}
          />
        </Route>
      </Route>

      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
};
