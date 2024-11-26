import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  passwordResetSchema,
} from '@/features/auth/shared/schema'
import { z } from 'zod'

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type PasswordResetFormValues = z.infer<typeof passwordResetSchema>
export type PasswordResetSubmitValues = PasswordResetFormValues & {
  email: string
  token: string
}

export interface User {
  id: number
  username: string
  email: string
  email_verified_at: string
  created_at: string
  updated_at: string
  token: string
}

export interface AuthResponse {
  token: string
  user: User
  message: string
}

export interface ForgotPasswordResponse {
  status: string
}

export interface PasswordResetResponse {
  status: string
}
