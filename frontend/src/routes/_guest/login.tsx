import { Login } from '@/features/auth/login/Login'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const verificationSuccessSchema = z.object({
  verification: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/_guest/login')({
  validateSearch: (search) => verificationSuccessSchema.parse(search),
  component: Login,
})
