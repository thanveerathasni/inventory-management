export { apiClient } from "./axios";
export {
  login,
  logout,
  type AuthenticatedUser,
  type LoginRequest,
  type LoginResponse,
} from "./auth.api";
export type { ApiResponse } from "./api.types";
export {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  type CreateProductRequest,
  type Product,
  type UpdateProductRequest,
} from "./product.api";
