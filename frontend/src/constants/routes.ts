export const PUBLIC_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
} as const;

export const PROTECTED_ROUTES = {
  PRODUCT_CREATE: "/products/create",
  DASHBOARD: "/dashboard",
  PRODUCTS: "/products",
} as const;
