import type { ProductListState } from './product.types';

export const selectProductListError = (state: ProductListState) => state.error;
export const selectProductListProducts = (state: ProductListState) => state.products;
export const selectProductListStatus = (state: ProductListState) => state.status;
