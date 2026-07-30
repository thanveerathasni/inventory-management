import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { PUBLIC_ROUTES } from "../../constants/routes";
import {
  registerUser,
  selectIsAuthLoading,
  selectAuthError,
  type RegisterFormValues,
} from "../../features/auth";
import type { AppDispatch } from "../../store/store";

import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectIsAuthLoading);
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterFormValues): Promise<void> => {
    const result = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(result)) {
      toast.success("Registration successful. Please log in.");
      navigate(PUBLIC_ROUTES.LOGIN);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <section
        aria-labelledby="register-title"
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 sm:p-10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900" id="register-title">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign up to manage your inventory
          </p>
        </div>
        
        <RegisterForm isLoading={isLoading} onSubmit={handleRegister} />
        
        {error ? (
          <p className="mt-4 text-center text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            to={PUBLIC_ROUTES.LOGIN}
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};
