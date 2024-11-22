import { registerSchema } from '@/features/auth/shared/schema'
import { RegisterFormValues } from '@/features/auth/shared/types'
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
import { Link, useNavigate } from '@tanstack/react-router'
import { useRegister } from '@/features/auth/api/auth'
import { AlertCircle } from 'lucide-react'
import { useDocumentTitle } from '@mantine/hooks'

export function Register(props: PaperProps) {
  const form = useForm<RegisterFormValues>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
    },
    validate: zodResolver(registerSchema),
  })
  const navigate = useNavigate({ from: '/register' })
  const registerFn = useRegister()

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await registerFn.mutateAsync(values)
      navigate({ to: '/login' })
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }
  useDocumentTitle('Register')

  return (
    <Container size="xs" mt={40}>
      <Stack gap={4} mb={12}>
        <Title ta="center">Welcome, new user!</Title>
        <Text c="dimmed" size="sm" ta="center">
          Already have an account?{' '}
          <Link from="/register" to="/login" style={{ color: 'inherit' }}>
            Login
          </Link>
        </Text>
      </Stack>
      <Paper radius="md" p="xl" withBorder {...props}>
        {registerFn.isError && (
          <Alert
            icon={<AlertCircle size={16} />}
            color="red"
            mb="md"
            title="Registration Error"
          >
            {registerFn.error?.message ||
              'An error occurred during registration'}
          </Alert>
        )}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap={16}>
            <TextInput
              required
              label="Username"
              placeholder="Your username"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue('username', event.currentTarget.value)
              }
              error={form.errors.username}
              radius="md"
              disabled={registerFn.isPending}
            />
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
              disabled={registerFn.isPending}
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
              disabled={registerFn.isPending}
            />
            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Confirm your password"
              value={form.values.password_confirmation}
              onChange={(event) =>
                form.setFieldValue(
                  'password_confirmation',
                  event.currentTarget.value
                )
              }
              error={form.errors.password_confirmation}
              radius="md"
              disabled={registerFn.isPending}
            />
            <Button type="submit" radius="sm" loading={registerFn.isPending}>
              {registerFn.isPending ? 'Creating Account...' : 'Register'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
