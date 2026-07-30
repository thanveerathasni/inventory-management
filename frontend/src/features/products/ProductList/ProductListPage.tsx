import {
  selectProductListError,
  selectProductListProducts,
  selectProductListStatus,
} from '../product.selectors';
import { PRODUCT_LIST_STATUS, PRODUCT_LIST_TEXT } from '../product.types';

import { ProductEmptyState } from './ProductEmptyState';
import { ProductLoading } from './ProductLoading';
import { ProductTable } from './ProductTable';
import { useProductList } from './useProductList';

export const ProductListPage = () => {
  const productListState = useProductList();
  const error = selectProductListError(productListState);
  const products = selectProductListProducts(productListState);
  const status = selectProductListStatus(productListState);

  if (status === PRODUCT_LIST_STATUS.LOADING) {
    return <ProductLoading />;
  }

  if (status === PRODUCT_LIST_STATUS.ERROR) {
    return (
      <section aria-live="polite" className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h1 className="font-semibold text-red-900">{PRODUCT_LIST_TEXT.ERROR_TITLE}</h1>
        <p className="mt-1 text-sm text-red-700">{error ?? PRODUCT_LIST_TEXT.LOAD_ERROR}</p>
      </section>
    );
  }

  if (products.length === 0) {
    return <ProductEmptyState />;
  }

  return <ProductTable products={products} />;
};
