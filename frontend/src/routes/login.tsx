import { userQuery } from '@/features/auth/api/auth'
import { Login } from '@/features/auth/login/Login'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(userQuery)

    if (user) {
      throw redirect({
        from: '/login',
        to: '/',
      })
    }
  },
  component: Login,
})