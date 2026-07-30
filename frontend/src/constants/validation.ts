export const PASSWORD_RULES = {
  MIN_LENGTH: 6,
} as const;

export const PRODUCT_RULES = {
  CATEGORY: { MAX_LENGTH: 50 },
  NAME: { MAX_LENGTH: 100, MIN_LENGTH: 1 },
  PRICE: { MIN: 0 },
  QUANTITY: { MIN: 0 },
} as const;
