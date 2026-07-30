import { type ButtonHTMLAttributes, forwardRef } from "react";

import { Spinner } from "./Spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly isLoading?: boolean;
  readonly variant?: "danger" | "ghost" | "outline" | "primary" | "secondary";
}

const getVariantClasses = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-500";
    case "danger":
      return "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600";
    case "ghost":
      return "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-500";
    case "outline":
      return "border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-500";
    case "primary":
    default:
      return "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-600 shadow-sm";
  }
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className = "", disabled, isLoading, variant = "primary", ...props },
    ref,
  ) => {
    const variantClasses = getVariantClasses(variant);
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses} ${className}`}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner className="mr-2" size={16} />
            <span aria-atomic="true" aria-live="assertive" className="sr-only">
              Loading
            </span>
          </>
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
