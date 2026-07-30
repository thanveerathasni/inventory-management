import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { registerSchema, type RegisterFormValues } from "../../features/auth";
import { Button, Input } from "../../components/ui";

interface RegisterFormProps {
  readonly isLoading: boolean;
  readonly onSubmit: (values: RegisterFormValues) => void;
}

export const RegisterForm = ({ isLoading, onSubmit }: RegisterFormProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form className="space-y-6" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">
          Full name
        </label>
        <Input
          autoComplete="name"
          error={errors.name?.message ?? ""}
          id="name"
          type="text"
          {...register("name")}
        />
      </div>

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
          autoComplete="new-password"
          error={errors.password?.message ?? ""}
          id="password"
          type="password"
          {...register("password")}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="confirmPassword">
          Confirm password
        </label>
        <Input
          autoComplete="new-password"
          error={errors.confirmPassword?.message ?? ""}
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
      </div>

      <Button
        className="w-full"
        isLoading={isLoading}
        type="submit"
      >
        Sign up
      </Button>
    </form>
  );
};
