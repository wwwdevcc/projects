import { Button, Container, Group, Text, Title } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { useNavigate } from '@tanstack/react-router'

export const NotFound = () => {
  const navigate = useNavigate()

  const handleNavigation = () => {
    if (window.history.length > 1) {
      navigate({ to: '..' })
    } else {
      navigate({ to: '/' })
    }
  }
  useDocumentTitle('Not Found')
  return (
    <Container
      h="60vh"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Title order={1} size="4rem">
          404
        </Title>
        <Text size="xl" mb="xl">
          Page not found
        </Text>
        <Group justify="center">
          <Button variant="filled" size="md" onClick={handleNavigation}>
            Take me back
          </Button>
        </Group>
      </div>
    </Container>
  )
}
