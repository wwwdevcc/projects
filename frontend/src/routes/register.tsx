import { userQuery } from '@/features/auth/api/auth'
import { Register } from '@/features/auth/register/Register'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(userQuery)

    if (user) {
      throw redirect({
        from: '/register',
        to: '/',
      })
    }
  },
  component: Register,
})
