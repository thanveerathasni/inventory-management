import type { Product } from '../../../services/api';

import { PRODUCT_LIST_TEXT } from '../product.types';

import { ProductTableRow } from './ProductTableRow';

interface ProductTableProps {
  readonly products: readonly Product[];
}

export const ProductTable = ({ products }: ProductTableProps) => (
  <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-slate-100 text-slate-700">
        <tr>
          <th className="px-4 py-3 font-semibold" scope="col">
            {PRODUCT_LIST_TEXT.NAME}
          </th>
          <th className="px-4 py-3 font-semibold" scope="col">
            {PRODUCT_LIST_TEXT.CATEGORY}
          </th>
          <th className="px-4 py-3 font-semibold" scope="col">
            {PRODUCT_LIST_TEXT.QUANTITY}
          </th>
          <th className="px-4 py-3 font-semibold" scope="col">
            {PRODUCT_LIST_TEXT.PRICE}
          </th>
          <th className="px-4 py-3 font-semibold" scope="col">
            {PRODUCT_LIST_TEXT.ACTIONS}
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductTableRow key={product._id} product={product} />
        ))}
      </tbody>
    </table>
  </div>
);
