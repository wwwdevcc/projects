import { createFileRoute } from '@tanstack/react-router'
import { Register } from '@/features/auth/register/Register'

export const Route = createFileRoute('/_guest/register')({
  component: Register,
})
