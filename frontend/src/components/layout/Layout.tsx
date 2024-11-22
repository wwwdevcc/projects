import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { AppShell, Burger, Container, Flex, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link, Outlet } from '@tanstack/react-router'
import classes from './Layout.module.css'
import { AuthNav } from '@/features/auth/components/AuthNav'

export function Layout() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { desktop: true, mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Container size="lg">
            <Group h="100%">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="xs"
                size="sm"
              />
              <Group justify="space-between" style={{ flex: 1 }}>
                <Link to="/" className={classes.logo}>
                  <p>ProjectHub</p>
                </Link>

                <Group ml="xl" gap={8} visibleFrom="xs">
                  <AuthNav />
                </Group>
              </Group>
              <ThemeToggle />
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={24}>
          <Flex direction={{ base: 'row' }} gap="xs" w="100%" justify="center">
            <AuthNav />
          </Flex>
        </AppShell.Navbar>

        <AppShell.Main px={0}>
          <Container size="lg">
            <Outlet />
          </Container>
        </AppShell.Main>
      </AppShell>
    </>
  )
}
