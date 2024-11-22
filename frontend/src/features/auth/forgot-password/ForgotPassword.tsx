import { useForgotPassword } from '@/features/auth/api/auth'
import { forgotPasswordSchema } from '@/features/auth/shared/schema'
import { ForgotPasswordFormValues } from '@/features/auth/shared/types'
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import classes from './ForgotPassword.module.css'
import { useDocumentTitle } from '@mantine/hooks'

export function ForgotPassword() {
  const forgotPassword = useForgotPassword()
  const form = useForm<ForgotPasswordFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },
    validate: zodResolver(forgotPasswordSchema),
  })

  const handleSubmit = (values: ForgotPasswordFormValues) => {
    forgotPassword.mutate(values)
  }
  useDocumentTitle('Forgot Password')

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Your email"
            placeholder="me@mantine.dev"
            required
            key={form.key('email')}
            disabled={forgotPassword.isPending}
            {...form.getInputProps('email')}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor
              c="dimmed"
              size="sm"
              className={classes.control}
              component={Link}
              from="/forgot-password"
              to="/login"
            >
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button
              type="submit"
              className={classes.control}
              loading={forgotPassword.isPending}
            >
              Reset password
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
