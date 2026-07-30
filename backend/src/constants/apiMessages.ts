export const AUTH_MESSAGES = {
  REGISTER_SUCCESS: 'User registered successfully.',
  LOGIN_SUCCESS: 'User logged in successfully.',

  EMAIL_ALREADY_EXISTS: 'Email already exists.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_NOT_FOUND: 'User not found.',

  UNAUTHORIZED: 'Unauthorized access.',
} as const;

export const PRODUCT_MESSAGES = {
  CREATED: 'Product created successfully.',
  UPDATED: 'Product updated successfully.',
  DELETED: 'Product deleted successfully.',
  FETCHED: 'Products fetched successfully.',

  NOT_FOUND: 'Product not found.',
} as const;

export const COMMON_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal server error.',
  VALIDATION_FAILED: 'Validation failed.',
};