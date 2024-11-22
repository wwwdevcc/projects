import { userQuery } from '@/features/auth/api/auth'
import { PasswordReset } from '@/features/auth/password-reset/PasswordReset'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/password-reset_/$token')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(userQuery)

    if (user) {
      throw redirect({
        from: '/password-reset/$token',
        to: '/',
      })
    }
  },
  component: PasswordReset,
})
