import { userQuery } from '@/features/auth/api/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(userQuery)
    if (user) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: () => {
    return <Outlet />
  },
})
