import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PROTECTED_ROUTES } from "../../constants/routes";
import {
  loginUser,
  selectIsAuthLoading,
  type LoginFormValues,
} from "../../features/auth";
import type { AppDispatch } from "../../store/store";

import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsAuthLoading);
  const navigate = useNavigate();

  const handleLogin = async (values: LoginFormValues): Promise<void> => {
    const result = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(result)) {
      navigate(PROTECTED_ROUTES.DASHBOARD);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <section
        aria-labelledby="login-title"
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 sm:p-10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900" id="login-title">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to your account to continue
          </p>
        </div>
        <LoginForm isLoading={isLoading} onSubmit={handleLogin} />
      </section>
    </main>
  );
};
