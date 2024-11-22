import { useUserQuery } from '@/features/auth/api/auth'
import { User } from '@/features/auth/shared/types'
type AuthStatus = 'PENDING' | 'AUTHENTICATED' | 'UNAUTHENTICATED'

export interface AuthState {
  status: AuthStatus
  user: User | null
  isLoading: boolean
  error: Error | null
}

export function useAuth(): AuthState {
  const { data: user, isLoading, error } = useUserQuery()

  if (isLoading) {
    return {
      status: 'PENDING',
      user: null,
      isLoading: true,
      error: null,
    }
  }

  if (error) {
    return {
      status: 'UNAUTHENTICATED',
      user: null,
      isLoading: false,
      error: error as Error,
    }
  }

  if (!user) {
    return {
      status: 'UNAUTHENTICATED',
      user: null,
      isLoading: false,
      error: null,
    }
  }

  return {
    status: 'AUTHENTICATED',
    user,
    isLoading: false,
    error: null,
  }
}
