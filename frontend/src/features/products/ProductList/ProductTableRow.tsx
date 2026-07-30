import type { Product } from "../../../services/api";

import { PRODUCT_LIST_TEXT } from "../product.types";

interface ProductTableRowProps {
  readonly product: Product;
}

export const ProductTableRow = ({ product }: ProductTableRowProps) => (
  <tr className="border-t border-slate-200">
    <td className="px-4 py-3 font-medium text-slate-900">{product.name}</td>
    <td className="px-4 py-3 text-slate-600">
      {product.category ?? PRODUCT_LIST_TEXT.UNCATEGORIZED}
    </td>
    <td className="px-4 py-3 text-slate-600">{product.quantity}</td>
    <td className="px-4 py-3 text-slate-600">{product.price}</td>
    <td className="px-4 py-3 text-slate-500">
      {PRODUCT_LIST_TEXT.ACTION_UNAVAILABLE}
    </td>
  </tr>
);
