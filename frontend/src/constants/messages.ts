export const ERROR_MESSAGES = {
  GENERIC: "Something went wrong. Please try again.",
} as const;

export const PRODUCT_MESSAGES = {
  CREATED: "Product created successfully.",
  DELETED: "Product deleted successfully.",
  NOT_FOUND: "Product not found.",
  UPDATED: "Product updated successfully.",
} as const;

export const VALIDATION_MESSAGES = {
  INVALID_EMAIL: "Enter a valid email address.",
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters long.",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match.",
  REQUIRED_FIELD: "This field is required.",
  PRODUCT_NAME_REQUIRED: "Product name is required.",
  PRODUCT_PRICE_NEGATIVE: "Product price cannot be negative.",
  PRODUCT_QUANTITY_NEGATIVE: "Product quantity cannot be negative.",
} as const;
