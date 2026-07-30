import { z } from "zod";

import { VALIDATION_MESSAGES } from "../../constants/messages";
import { PASSWORD_RULES } from "../../constants/validation";

export const loginSchema = z.object({
  email: z.string().trim().email(VALIDATION_MESSAGES.INVALID_EMAIL),
  password: z
    .string()
    .min(PASSWORD_RULES.MIN_LENGTH, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH),
});

export const registerSchema = z
  .object({
    confirmPassword: z.string().min(1, VALIDATION_MESSAGES.REQUIRED_FIELD),
    email: z.string().trim().email(VALIDATION_MESSAGES.INVALID_EMAIL),
    name: z.string().trim().min(1, VALIDATION_MESSAGES.REQUIRED_FIELD),
    password: z
      .string()
      .min(PASSWORD_RULES.MIN_LENGTH, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH,
    path: ["confirmPassword"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
