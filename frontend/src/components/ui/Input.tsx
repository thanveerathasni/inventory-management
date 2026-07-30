import { type InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    const errorClasses = error
      ? "border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
      : "border-slate-300 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500";

    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`block w-full rounded-lg bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50 ${errorClasses} ${className}`}
          {...props}
          aria-invalid={Boolean(error)}
        />
        {error ? (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
