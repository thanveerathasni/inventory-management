import type { Product, UpdateProductRequest } from "../../../services/api";

import { toCreateProductRequest } from "../ProductCreate";

import type { EditProductFormValues } from "./EditProduct.types";

export const findProductById = (
  products: readonly Product[],
  productId: string,
): Product | null =>
  products.find((product) => product._id === productId) ?? null;

export const toEditProductFormValues = (
  product: Product,
): EditProductFormValues => ({
  category: product.category ?? "",
  name: product.name,
  price: product.price,
  quantity: product.quantity,
});

export const toUpdateProductRequest = (
  values: EditProductFormValues,
): UpdateProductRequest => toCreateProductRequest(values);
