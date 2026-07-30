import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Product name is required'),

    category: z
      .string()
      .trim()
      .optional(),

    quantity: z
      .number()
      .min(0, 'Quantity cannot be negative'),

    price: z
      .number()
      .min(0, 'Price cannot be negative'),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1)
      .optional(),

    category: z
      .string()
      .trim()
      .optional(),

    quantity: z
      .number()
      .min(0)
      .optional(),

    price: z
      .number()
      .min(0)
      .optional(),
  }),
});

export type CreateProductDto = z.infer<
  typeof createProductSchema
>['body'];

export type UpdateProductDto = z.infer<
  typeof updateProductSchema
>['body'];