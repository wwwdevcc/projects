import Cookies from 'js-cookie'

const AUTH_TOKEN_KEY = 'auth_token'

export const auth = {
  getToken: () => {
    const token = Cookies.get('auth_token')
    return token
  },
  setToken: (token: string) => {
    Cookies.set(AUTH_TOKEN_KEY, token, {
      expires: 30,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
  },
  removeToken: () => {
    Cookies.remove(AUTH_TOKEN_KEY)
  },
  hasToken: () => {
    const hasToken = !!Cookies.get(AUTH_TOKEN_KEY)
    return hasToken
  },
}
