import { registerSchema } from '@/features/auth/shared/schema'
import { RegisterFormValues } from '@/features/auth/shared/types'
import {
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
import { Link } from '@tanstack/react-router'
import classes from './Register.module.css'

export function Register(props: PaperProps) {
  const form = useForm<RegisterFormValues>({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: zodResolver(registerSchema),
  })

  return (
    <Container size="xs" mt={40}>
      <Stack gap={4} mb={12}>
        <Title ta="center" className={classes.title}>
          Welcome, new user!
        </Title>
        <Text c="dimmed" size="sm" ta="center">
          Already have an account?{' '}
          <Link from="/register" to="/login" className={classes.unstyled_link}>
            Login
          </Link>
        </Text>
      </Stack>
      <Paper radius="md" p="xl" withBorder {...props}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
            />
            <Button type="submit" radius="sm">
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
