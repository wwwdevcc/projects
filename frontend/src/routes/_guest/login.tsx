import { Login } from '@/features/auth/login/Login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/login')({
  component: Login,
})
