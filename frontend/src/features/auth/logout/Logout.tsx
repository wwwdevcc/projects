import { useLogout } from '@/features/auth/api/auth'
import { Button } from '@mantine/core'
import { useRouter } from '@tanstack/react-router'

export function Logout() {
  const logout = useLogout()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout.mutateAsync()
      router.navigate({ to: '/login' })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <Button onClick={handleLogout} loading={logout.isPending} variant="light">
      Logout
    </Button>
  )
}
