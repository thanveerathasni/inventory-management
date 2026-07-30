import { z } from "zod";

import { VALIDATION_MESSAGES } from "../../../constants/messages";
import { PRODUCT_RULES } from "../../../constants/validation";

export const createProductSchema = z.object({
  category: z.string().trim().max(PRODUCT_RULES.CATEGORY.MAX_LENGTH),
  name: z
    .string()
    .trim()
    .min(
      PRODUCT_RULES.NAME.MIN_LENGTH,
      VALIDATION_MESSAGES.PRODUCT_NAME_REQUIRED,
    )
    .max(PRODUCT_RULES.NAME.MAX_LENGTH),
  price: z
    .number()
    .min(PRODUCT_RULES.PRICE.MIN, VALIDATION_MESSAGES.PRODUCT_PRICE_NEGATIVE),
  quantity: z
    .number()
    .min(
      PRODUCT_RULES.QUANTITY.MIN,
      VALIDATION_MESSAGES.PRODUCT_QUANTITY_NEGATIVE,
    ),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
