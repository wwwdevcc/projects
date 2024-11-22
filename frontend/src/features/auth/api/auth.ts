/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AuthResponse,
  ForgotPasswordFormValues,
  ForgotPasswordResponse,
  LoginFormValues,
  PasswordResetFormValues,
  PasswordResetResponse,
  RegisterFormValues,
  User,
} from '@/features/auth/shared/types'
import { auth } from '@/features/auth/shared/utils'
import { api, initCSRF } from '@/lib/api-client'
import { notifications } from '@mantine/notifications'
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export const authKeys = {
  user: ['auth-user'] as const,
}

export const userQuery = queryOptions({
  queryKey: authKeys.user,
  queryFn: async () => {
    if (!auth.hasToken()) {
      return null
    }
    const token = auth.getToken()
    const response = await api
      .get('user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<User>()
    return response
  },
  retry: false,
  staleTime: 5 * 60 * 1000,
  gcTime: 5 * 60 * 1000,
})

export function useUserQuery() {
  return useQuery({
    ...userQuery,
    enabled: auth.hasToken(),
  })
}

export function useUser(): User | null {
  const query = useUserQuery()
  return query.data ?? null
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: LoginFormValues): Promise<AuthResponse> => {
      await initCSRF()
      return await api.post('login', { json: credentials }).json()
    },
    onSuccess: (data) => {
      auth.setToken(data.token)
      queryClient.setQueryData(authKeys.user, data.user)
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RegisterFormValues): Promise<AuthResponse> => {
      return await api.post('register', { json: data }).json()
    },
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.user, data.user)
      notifications.show({
        title: 'Success',
        message: data.message,
        color: 'green',
      })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await api.post('logout').json()
      queryClient.setQueryData(authKeys.user, null)
      auth.removeToken()
    },
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (
      data: ForgotPasswordFormValues
    ): Promise<ForgotPasswordResponse> => {
      return await api.post('forgot-password', { json: data }).json()
    },
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Password recovery link has been sent to your email address.',
        color: 'green',
      })
    },
  })
}

export function useResetPassword() {
  const navigate = useNavigate()
  const login = useLogin()

  return useMutation({
    mutationFn: async (
      data: PasswordResetFormValues
    ): Promise<PasswordResetResponse> => {
      return await api.post('reset-password', { json: data }).json()
    },
    onSuccess: async (_, variables) => {
      notifications.show({
        title: 'Success',
        message: 'Your password has been reset successfully.',
        color: 'green',
      })

      await login.mutateAsync({
        email: variables.email,
        password: variables.password,
      })

      navigate({ to: '/' })
    },
  })
}
