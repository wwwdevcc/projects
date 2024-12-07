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

export const passwordRequirements = [
  { re: /.{8,}/, label: 'At least 8 characters long' },
]

export function testPasswordStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1

  passwordRequirements.forEach((passwordRequirements) => {
    if (!passwordRequirements.re.test(password)) {
      multiplier += 1
    }
  })

  return Math.max(
    100 - (100 / (passwordRequirements.length + 1)) * multiplier,
    10
  )
}
