import { useAuth } from '@/features/auth/hooks/use-auth'
import { Logout } from '@/features/auth/logout/Logout'
import { Button, Group, Loader, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'

export function AuthNav() {
  const { status, user } = useAuth()

  if (status === 'PENDING') {
    return (
      <Group gap="sm" justify="center">
        <Loader size="sm" type="dots" />
      </Group>
    )
  }

  if (status === 'AUTHENTICATED' && user) {
    return (
      <Group gap="sm">
        <Text fw={500}>Hey, {user.username}</Text>
        <Logout />
      </Group>
    )
  }

  return (
    <Group gap={8}>
      <Button component={Link} to="/login">
        Login
      </Button>
      <Button component={Link} to="/register" variant="light">
        Register
      </Button>
    </Group>
  )
}
