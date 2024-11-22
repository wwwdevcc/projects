import { PasswordReset } from '@/features/auth/password-reset/PasswordReset'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/password-reset/_$token')({
  component: PasswordReset,
})
