import { colorsTuple, createTheme, PasswordInput, TextInput, virtualColor } from '@mantine/core'

export const theme = createTheme({
  colors: {
    darkPrimary: colorsTuple('#111111'),
    darkSecondary: colorsTuple('#1c1c1c'),
    darkCard: colorsTuple('#232323'),
    lightPrimary: colorsTuple('#f6f4ef'),
    lightSecondary: colorsTuple('#fff'),
    lightCard: colorsTuple('#fff'),
    primary: virtualColor({
      name: 'primary',
      dark: 'darkPrimary',
      light: 'lightPrimary',
    }),
    secondary: virtualColor({
      name: 'secondary',
      dark: 'darkSecondary',
      light: 'lightSecondary',
    }),
    card: virtualColor({
      name: 'card',
      dark: 'darkCard',
      light: 'lightCard',
    }),
  },
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
