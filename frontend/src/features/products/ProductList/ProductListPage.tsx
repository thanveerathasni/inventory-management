import { useLocation } from "react-router-dom";

import {
  selectProductListError,
  selectProductListProducts,
  selectProductListStatus,
} from "../product.selectors";
import {
  isProductListRouteState,
  PRODUCT_LIST_STATUS,
  PRODUCT_LIST_TEXT,
} from "../product.types";

import { ProductEmptyState } from "./ProductEmptyState";
import { ProductLoading } from "./ProductLoading";
import { ProductTable } from "./ProductTable";
import { useProductList } from "./useProductList";

export const ProductListPage = () => {
  const { state } = useLocation();
  const productListState = useProductList();
  const error = selectProductListError(productListState);
  const products = selectProductListProducts(productListState);
  const status = selectProductListStatus(productListState);
  const successMessage = isProductListRouteState(state)
    ? state.successMessage
    : undefined;

  let content = <ProductTable products={products} />;

  if (status === PRODUCT_LIST_STATUS.LOADING) {
    content = <ProductLoading />;
  } else if (status === PRODUCT_LIST_STATUS.ERROR) {
    content = (
      <section
        aria-live="polite"
        className="rounded-lg border border-red-200 bg-red-50 p-4"
      >
        <h1 className="font-semibold text-red-900">
          {PRODUCT_LIST_TEXT.ERROR_TITLE}
        </h1>
        <p className="mt-1 text-sm text-red-700">
          {error ?? PRODUCT_LIST_TEXT.LOAD_ERROR}
        </p>
      </section>
    );
  } else if (products.length === 0) {
    content = <ProductEmptyState />;
  }

  return (
    <>
      {successMessage === undefined ? null : (
        <p
          aria-live="polite"
          className="mb-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700"
        >
          {successMessage}
        </p>
      )}
      {content}
    </>
  );
};
