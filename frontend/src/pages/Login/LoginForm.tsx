import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginFormValues } from "../../features/auth";
import { Button, Input } from "../../components/ui";

interface LoginFormProps {
  readonly isLoading: boolean;
  readonly onSubmit: (values: LoginFormValues) => void;
}

export const LoginForm = ({ isLoading, onSubmit }: LoginFormProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
          Email address
        </label>
        <Input
          autoComplete="email"
          error={errors.email?.message ?? ""}
          id="email"
          type="email"
          {...register("email")}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
          Password
        </label>
        <Input
          autoComplete="current-password"
          error={errors.password?.message ?? ""}
          id="password"
          type="password"
          {...register("password")}
        />
      </div>

      <Button
        className="w-full"
        isLoading={isLoading}
        type="submit"
      >
        Sign in
      </Button>
    </form>
  );
};
