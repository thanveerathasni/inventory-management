import { NavLink } from "react-router-dom";

import type { Product } from "../../../services/api";
import { PROTECTED_ROUTES } from "../../../constants/routes";
import { isLowStock, LowStockBadge } from "../ProductBadges";
import { PRODUCT_LIST_TEXT } from "../product.types";

interface ProductTableRowProps {
  readonly isDeleting: boolean;
  readonly onDelete: (product: Product) => void;
  readonly product: Product;
}

export const ProductTableRow = ({
  isDeleting,
  onDelete,
  product,
}: ProductTableRowProps) => (
  <tr
    className={
      isLowStock(product.quantity)
        ? "border-t border-amber-200 bg-amber-50"
        : "border-t border-slate-200"
    }
  >
    <td className="px-4 py-3 font-medium text-slate-900">{product.name}</td>
    <td className="px-4 py-3">
      {product.category ?? PRODUCT_LIST_TEXT.UNCATEGORIZED}
    </td>
    <td className="px-4 py-3">{product.quantity}</td>
    <td className="px-4 py-3">{product.price}</td>
    <td className="px-4 py-3">
      <LowStockBadge quantity={product.quantity} />
    </td>
    <td className="px-4 py-3">
      <NavLink to={PROTECTED_ROUTES.productEdit(product._id)}>
        {PRODUCT_LIST_TEXT.EDIT}
      </NavLink>
      <button
        disabled={isDeleting}
        onClick={() => onDelete(product)}
        type="button"
      >
        Delete
      </button>
    </td>
  </tr>
);
