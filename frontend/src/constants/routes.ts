export const PUBLIC_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
} as const;

export const PROTECTED_ROUTES = {
  PRODUCT_CREATE: "/products/create",
  PRODUCT_EDIT: "/products/:productId/edit",
  productEdit: (productId: string) => `/products/${productId}/edit`,
  DASHBOARD: "/dashboard",
  PRODUCTS: "/products",
} as const;
