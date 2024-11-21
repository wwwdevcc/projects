import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password should have at least 8 characters'),
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
