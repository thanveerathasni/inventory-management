import type { CreateProductRequest } from "../../../services/api";

import type { CreateProductFormValues } from "./CreateProduct.types";

export const toCreateProductRequest = (
  values: CreateProductFormValues,
): CreateProductRequest => {
  const category = values.category.trim();
  const product = {
    name: values.name.trim(),
    price: values.price,
    quantity: values.quantity,
  };

  return category === "" ? product : { ...product, category };
};
