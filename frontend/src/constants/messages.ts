export const ERROR_MESSAGES = {
  GENERIC: "Something went wrong. Please try again.",
} as const;

export const PRODUCT_MESSAGES = {
  CREATED: "Product created successfully.",
} as const;

export const VALIDATION_MESSAGES = {
  INVALID_EMAIL: "Enter a valid email address.",
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters long.",
  PRODUCT_NAME_REQUIRED: "Product name is required.",
  PRODUCT_PRICE_NEGATIVE: "Product price cannot be negative.",
  PRODUCT_QUANTITY_NEGATIVE: "Product quantity cannot be negative.",
} as const;
