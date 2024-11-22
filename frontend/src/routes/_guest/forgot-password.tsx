import { ForgotPassword } from '@/features/auth/forgot-password/ForgotPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/forgot-password')({
  component: ForgotPassword,
})
