export interface CreateProductFormValues {
  readonly category: string;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
}

export const CREATE_PRODUCT_DEFAULT_VALUES: CreateProductFormValues = {
  category: "",
  name: "",
  price: 0,
  quantity: 0,
};

export const CREATE_PRODUCT_TEXT = {
  CATEGORY: "Category",
  CREATE: "Create product",
  CREATING: "Creating product…",
  NAME: "Name",
  PRICE: "Price",
  QUANTITY: "Quantity",
  TITLE: "Create product",
} as const;
