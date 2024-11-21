import { loginSchema } from '@/features/auth/shared/schema'
import { LoginFormValues } from '@/features/auth/shared/types'
import {
  Button,
  Checkbox,
  Container,
  Flex,
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
import classes from './Login.module.css'

export function Login(props: PaperProps) {
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  })

  return (
    <Container size="xs" mt={40}>
      <Stack gap={4} mb={12}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center">
          Do not have an account yet?{' '}
          <Link from="/login" to="/register" className={classes.unstyled_link}>
            Register
          </Link>
        </Text>
      </Stack>
      <Paper radius="md" p="xl" withBorder {...props}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
            <Flex justify="space-between">
              <Checkbox label="Remember me?" />
              <Link
                from="/login"
                to="/forgot-password"
                className={classes.unstyled_link}
              >
                Forgot your password?
              </Link>
            </Flex>
            <Button type="submit" radius="sm">
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
