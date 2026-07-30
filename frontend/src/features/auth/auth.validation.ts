import { z } from 'zod';

import { VALIDATION_MESSAGES } from '../../constants/messages';
import { PASSWORD_RULES } from '../../constants/validation';

export const loginSchema = z.object({
  email: z.string().trim().email(VALIDATION_MESSAGES.INVALID_EMAIL),
  password: z
    .string()
    .min(PASSWORD_RULES.MIN_LENGTH, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH),
});

export type LoginSchema = z.infer<typeof loginSchema>;
