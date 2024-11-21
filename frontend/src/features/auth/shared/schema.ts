import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password should have at least 8 characters' }),
})

export const registerSchema = loginSchema.extend({
  username: z
    .string()
    .min(3, { message: 'Username should have at least 3 characters' })
    .max(16, { message: 'Username should have at most 16 characters' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Username can only contain letters and numbers',
    }),
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
