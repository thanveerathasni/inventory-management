import type { Product } from "../../../services/api";

import { PRODUCT_LIST_TEXT } from "../product.types";

import { ProductTableRow } from "./ProductTableRow";

interface ProductTableProps {
  readonly deletingProductId: string | null;
  readonly onDelete: (product: Product) => void;
  readonly products: readonly Product[];
}

export const ProductTable = ({
  deletingProductId,
  onDelete,
  products,
}: ProductTableProps) => (
  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
    <table className="min-w-full text-left text-sm whitespace-nowrap">
      <thead className="bg-slate-100 text-slate-700">
        <tr>
          {[
            PRODUCT_LIST_TEXT.NAME,
            PRODUCT_LIST_TEXT.CATEGORY,
            PRODUCT_LIST_TEXT.QUANTITY,
            PRODUCT_LIST_TEXT.PRICE,
            "Status",
            PRODUCT_LIST_TEXT.ACTIONS,
          ].map((label) => (
            <th className="px-4 py-3 font-semibold" key={label} scope="col">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 bg-white">
        {products.map((product) => (
          <ProductTableRow
            isDeleting={deletingProductId === product._id}
            key={product._id}
            onDelete={onDelete}
            product={product}
          />
        ))}
      </tbody>
    </table>
  </div>
);
