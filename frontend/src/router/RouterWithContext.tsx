import { useAuth } from '@/features/auth/hooks/use-auth'
import { router } from '@/main'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient } from '@/main'

export function RouterWithContext() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth, queryClient }} />
}
