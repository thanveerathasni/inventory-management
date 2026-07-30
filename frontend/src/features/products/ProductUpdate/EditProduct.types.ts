import type { CreateProductFormValues } from "../ProductCreate";

export type EditProductFormValues = CreateProductFormValues;

export const EDIT_PRODUCT_TEXT = {
  EDIT: "Edit",
  SAVING: "Saving changes…",
  SAVE: "Save changes",
  TITLE: "Edit product",
  LOADING: "Loading product…",
} as const;
