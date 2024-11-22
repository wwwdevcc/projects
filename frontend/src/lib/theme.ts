import { createTheme, PasswordInput, TextInput } from '@mantine/core'

export const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        styles: {
          label: {
            marginBottom: '8px',
            fontWeight: 600,
          },
        },
        size: 'md',
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        styles: {
          label: {
            marginBottom: '8px',
            fontWeight: 600,
          },
        },
      },
    }),
  },
})
