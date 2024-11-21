import { Register } from '@/features/auth/register/Register'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: Register,
})

