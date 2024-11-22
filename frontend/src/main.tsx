import { createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AuthState } from '@/features/auth/hooks/use-auth'
import { routeTree } from '@/routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterWithContext } from '@/router/RouterWithContext'

export const queryClient = new QueryClient()

export interface RouterContext {
  queryClient: QueryClient
  auth: AuthState
}

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    // Will be provided by RouterWithContext component
    auth: undefined!,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterWithContext />
      </QueryClientProvider>
    </StrictMode>
  )
}
