import { useResetPassword } from '@/features/auth/api/auth'
import { passwordResetSchema } from '@/features/auth/shared/schema'
import { PasswordResetFormValues } from '@/features/auth/shared/types'
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDocumentTitle } from '@mantine/hooks'
import { useParams, useSearch } from '@tanstack/react-router'
import classes from './PasswordReset.module.css'

export function PasswordReset() {
  const searchParams = useSearch({ from: '/_guest/password-reset/$token' })
  const resetPassword = useResetPassword()
  const params = useParams({ from: '/_guest/password-reset/$token' })

  const form = useForm<PasswordResetFormValues>({
    initialValues: {
      password: '',
      password_confirmation: '',
    },
    validate: zodResolver(passwordResetSchema),
  })
  useDocumentTitle('Reset Password')

  const email = searchParams.email

  if (!email || !params.token) {
    return (
      <Container size={460} my={30}>
        <Text c="red" ta="center">
          Invalid password reset link
        </Text>
      </Container>
    )
  }

  const handleSubmit = async (values: PasswordResetFormValues) => {
    try {
      resetPassword.mutate({
        ...values,
        token: params.token!,
        email: searchParams.email!,
      })
    } catch (error) {
      form.setErrors({ password: 'Failed to reset password' })
    }
  }

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Reset your password
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your new password below
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap={12}>
            <PasswordInput
              label="New password"
              placeholder="Your new password"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm password"
              placeholder="Confirm your new password"
              key={form.key('password_confirmation')}
              {...form.getInputProps('password_confirmation')}
            />

            <Button
              type="submit"
              className={classes.control}
              mt={4}
              disabled={resetPassword.isPending}
            >
              Reset password
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
