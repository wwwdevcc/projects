import { loginSchema, registerSchema } from '@/features/auth/shared/schema'
import { z } from 'zod'

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
