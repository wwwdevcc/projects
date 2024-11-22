import { auth } from '@/features/auth/shared/utils'
import ky from 'ky'
import Cookies from 'js-cookie'
import { notifications } from '@mantine/notifications'

interface ApiErrorResponse {
  message?: string
  errors?: Record<string, string[]>
}

export function hasCSRFToken() {
  return !!Cookies.get('XSRF-TOKEN')
}

export const api = ky.create({
  prefixUrl: 'http://localhost:8000/api',
  credentials: 'include',
  hooks: {
    beforeRequest: [
      (request) => {
        const token = auth.getToken()
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          auth.removeToken()
        }
      },
    ],
    beforeError: [
      async (error) => {
        if (error.response) {
          try {
            const data = (await error.response.json()) as ApiErrorResponse
            const errorMessage = data.errors
              ? Object.values(data.errors).flat()[0]
              : (data.message ??
                'Something went wrong. Please try again later.')

            notifications.show({
              title: 'Error',
              message: errorMessage,
              color: 'red',
            })
          } catch {
            notifications.show({
              title: 'Error',
              message: 'Something went wrong. Please try again later.',
              color: 'red',
            })
          }
        }
        return error
      },
    ],
  },
})

export async function initCSRF() {
  if (!hasCSRFToken()) {
    await ky.get('http://localhost:8000/sanctum/csrf-cookie', {
      credentials: 'include',
    })
  }
}
