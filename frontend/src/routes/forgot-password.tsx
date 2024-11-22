import { userQuery } from '@/features/auth/api/auth'
import { ForgotPassword } from '@/features/auth/forgot-password/ForgotPassword'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/forgot-password')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(userQuery)

    if (user) {
      throw redirect({
        from: '/forgot-password',
        to: '/',
      })
    }
  },
  component: ForgotPassword,
})
