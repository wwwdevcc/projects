import { Layout } from '@/components/layout/Layout'
import { theme } from '@/lib/theme'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient } from '@tanstack/react-query'
import { AuthState } from '@/features/auth/hooks/use-auth'
import '@mantine/notifications/styles.css'
import { Notifications } from '@mantine/notifications'
import { NotFound } from '@/components/NotFound'

export interface RouterContext {
  queryClient: QueryClient
  auth: AuthState
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications />
      <Layout />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools />
    </MantineProvider>
  )
}
