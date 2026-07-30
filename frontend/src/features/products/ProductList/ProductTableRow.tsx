import { NavLink } from "react-router-dom";

import type { Product } from "../../../services/api";

import { PROTECTED_ROUTES } from "../../../constants/routes";
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
      <NavLink
        className="font-medium text-slate-700 hover:text-slate-950"
        to={PROTECTED_ROUTES.productEdit(product._id)}
      >
        {PRODUCT_LIST_TEXT.EDIT}
      </NavLink>
    </td>
  </tr>
);
