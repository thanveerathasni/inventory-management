import { isLowStock } from "./lowStock.utils";

interface LowStockBadgeProps {
  readonly quantity: number;
}

export const LowStockBadge = ({ quantity }: LowStockBadgeProps) =>
  isLowStock(quantity) ? (
    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
      Low stock
    </span>
  ) : null;
