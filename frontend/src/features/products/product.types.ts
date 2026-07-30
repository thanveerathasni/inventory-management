import type { Product } from "../../services/api";

export const PRODUCT_LIST_STATUS = {
  ERROR: "error",
  LOADING: "loading",
  SUCCESS: "success",
} as const;

export type ProductListStatus =
  (typeof PRODUCT_LIST_STATUS)[keyof typeof PRODUCT_LIST_STATUS];

export interface ProductListState {
  readonly error: string | null;
  readonly products: readonly Product[];
  readonly status: ProductListStatus;
}

export interface ProductListRouteState {
  readonly successMessage?: string;
}

export const isProductListRouteState = (
  value: unknown,
): value is ProductListRouteState => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const { successMessage } = value as Record<string, unknown>;

  return successMessage === undefined || typeof successMessage === "string";
};

export const PRODUCT_LIST_TEXT = {
  ACTIONS: "Actions",
  ACTION_UNAVAILABLE: "No actions available",
  CATEGORY: "Category",
  EMPTY_DESCRIPTION: "Add products to begin managing your inventory.",
  EMPTY_TITLE: "No products yet",
  ERROR_TITLE: "Unable to load products",
  LOAD_ERROR: "Products could not be loaded. Please try again.",
  NAME: "Name",
  PRICE: "Price",
  QUANTITY: "Quantity",
  UNCATEGORIZED: "Uncategorized",
} as const;
