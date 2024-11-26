import { useLogin } from '@/features/auth/api/auth'
import { loginSchema } from '@/features/auth/shared/schema'
import { LoginFormValues } from '@/features/auth/shared/types'
import {
  Alert,
  Button,
  Container,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDocumentTitle } from '@mantine/hooks'
import { Link, useRouter, useSearch } from '@tanstack/react-router'
import { CheckIcon } from 'lucide-react'

export function Login(props: PaperProps) {
  const searchParams = useSearch({ strict: false })  as { verification?: string };
  const login = useLogin()
  const router = useRouter()
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  })

  const handleSubmit = async (values: LoginFormValues) => {
    await login.mutateAsync(values)
    try {
      const searchParams = new URLSearchParams(window.location.search)
      const redirectTo = searchParams.get('redirect') || '/'
      router.history.push(redirectTo)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  useDocumentTitle('Login')
  return (
    <Container size="xs" mt={40}>
      <Stack gap={12} mb={12}>
        <Title ta="center">Welcome back!</Title>
        <Text c="dimmed" size="sm" ta="center">
          Do not have an account yet?{' '}
          <Link from="/login" to="/register" style={{ color: 'inherit' }}>
            Register
          </Link>
        </Text>
        {searchParams.verification === 'success' && (
          <Alert
            variant="light"
            color="green"
            title="Email verified successfully"
            icon={<CheckIcon />}
          >
            Email verified successfully. You can now log in.
          </Alert>
        )}
      </Stack>
      <Paper radius="md" p="xl" withBorder {...props}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email}
              radius="md"
              disabled={login.isPending}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={form.errors.password}
              radius="md"
              disabled={login.isPending}
            />
            <Button type="submit" radius="sm" loading={login.isPending}>
              Login
            </Button>
            <Link
              from="/login"
              to="/forgot-password"
              style={{ color: 'inherit', alignSelf: 'end' }}
            >
              Forgot your password?
            </Link>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
