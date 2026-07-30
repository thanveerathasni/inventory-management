import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginFormValues } from "../../features/auth";

interface LoginFormProps {
  readonly error: string | null;
  readonly isLoading: boolean;
  readonly onSubmit: (values: LoginFormValues) => void;
}

export const LoginForm = ({ error, isLoading, onSubmit }: LoginFormProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className="login-form__field" htmlFor="email">
        Email
        <input
          autoComplete="email"
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email?.message === undefined ? null : (
          <span className="login-form__validation">{errors.email.message}</span>
        )}
      </label>

      <label className="login-form__field" htmlFor="password">
        Password
        <input
          autoComplete="current-password"
          id="password"
          type="password"
          {...register("password")}
        />
        {errors.password?.message === undefined ? null : (
          <span className="login-form__validation">
            {errors.password.message}
          </span>
        )}
      </label>

      {error === null ? null : <p role="alert">{error}</p>}

      <button disabled={isLoading} type="submit">
        {isLoading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
};
