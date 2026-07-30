import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

import type { Product } from "../../../services/api";
import { PROTECTED_ROUTES } from "../../../constants/routes";
import { isLowStock, LowStockBadge } from "../ProductBadges";
import { PRODUCT_LIST_TEXT } from "../product.types";
import { Button } from "../../../components/ui";

interface ProductTableRowProps {
  readonly isDeleting: boolean;
  readonly onDelete: (product: Product) => void;
  readonly product: Product;
}

export const ProductTableRow = memo(({
  isDeleting,
  onDelete,
  product,
}: ProductTableRowProps) => (
  <tr
    className={`transition-colors hover:bg-slate-50 ${
      isLowStock(product.quantity) ? "bg-amber-50" : ""
    }`}
  >
    <td className="px-4 py-4 font-medium text-slate-900">{product.name}</td>
    <td className="px-4 py-4 text-slate-600">
      {product.category ?? PRODUCT_LIST_TEXT.UNCATEGORIZED}
    </td>
    <td className="px-4 py-4 text-slate-600">{product.quantity}</td>
    <td className="px-4 py-4 text-slate-600">{product.price}</td>
    <td className="px-4 py-4">
      <LowStockBadge quantity={product.quantity} />
    </td>
    <td className="px-4 py-4">
      <div className="flex items-center gap-2">
        <NavLink to={PROTECTED_ROUTES.productEdit(product._id)}>
          <Button aria-label={`Edit ${product.name}`} className="h-8 w-8 !p-0" variant="ghost">
            <Edit className="h-4 w-4" />
          </Button>
        </NavLink>
        <Button
          aria-label={`Delete ${product.name}`}
          className="h-8 w-8 !p-0 text-red-600 hover:text-red-700"
          disabled={isDeleting}
          isLoading={isDeleting}
          onClick={() => onDelete(product)}
          variant="ghost"
        >
          {isDeleting ? null : <Trash2 className="h-4 w-4" />}
        </Button>
      </div>
    </td>
  </tr>
));

ProductTableRow.displayName = "ProductTableRow";
