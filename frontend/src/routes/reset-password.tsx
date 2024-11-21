import { ResetPassword } from '@/features/auth/reset-password/ResetPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reset-password')({
  component: ResetPassword,
})
