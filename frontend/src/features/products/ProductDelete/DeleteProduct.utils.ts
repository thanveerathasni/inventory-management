import type { Product } from "../../../services/api";

export const getDeleteConfirmationMessage = (product: Product): string =>
  `Delete ${product.name}? This action cannot be undone.`;
