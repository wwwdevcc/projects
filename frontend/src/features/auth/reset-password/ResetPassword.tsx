import { resetPasswordSchema } from '@/features/auth/shared/schema'
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
import classes from './ResetPassword.module.css'
import { ResetPasswordFormValues } from '@/features/auth/shared/types'

export function ResetPassword() {
  const form = useForm<ResetPasswordFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(resetPasswordSchema),
  })

  const handleSubmit = (values: ResetPasswordFormValues) => {
    console.log('Resetting password:', values.password, `Token: ${mockToken}`)
  }

  const mockToken = 'token' // Replace with token from searchParams

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
              required
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm password"
              placeholder="Confirm your new password"
              required
              key={form.key('confirmPassword')}
              {...form.getInputProps('confirmPassword')}
            />

            <Button type="submit" className={classes.control} mt={4}>
              Reset password
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
