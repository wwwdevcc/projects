import { PasswordReset } from '@/features/auth/password-reset/PasswordReset'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
  email: z.string().email().optional().catch(undefined),
})

export const Route = createFileRoute('/_guest/password-reset/$token')({
  validateSearch: (search) => searchSchema.parse(search),
  component: PasswordReset,
})
