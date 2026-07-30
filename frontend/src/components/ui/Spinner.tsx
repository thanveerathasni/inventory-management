import { Loader2 } from "lucide-react";

interface SpinnerProps {
  readonly className?: string;
  readonly size?: number;
}

export const Spinner = ({ className = "", size = 20 }: SpinnerProps) => (
  <Loader2
    aria-hidden="true"
    className={`animate-spin ${className}`}
    size={size}
  />
);
