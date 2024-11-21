import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as mantineCore from '@mantine/core'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual('@mantine/core')
  return {
    ...actual,
    useComputedColorScheme: vi.fn(),
    useMantineColorScheme: vi.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Button: ({ children, ...props }: any) => <button {...props}>{children}</button>
  }
})

describe('ThemeToggle', () => {
  const setColorSchemeMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(mantineCore.useComputedColorScheme).mockReturnValue('light')
    vi.mocked(mantineCore.useMantineColorScheme).mockReturnValue({
      setColorScheme: setColorSchemeMock,
      colorScheme: 'light' as mantineCore.MantineColorScheme,
      toggleColorScheme: vi.fn(),
      clearColorScheme: vi.fn()
    })
  })

  it('displays moon icon in light mode', () => {
    vi.mocked(mantineCore.useComputedColorScheme).mockReturnValue('light')
    render(<ThemeToggle />)
    
    expect(screen.getByTestId('moon')).toBeInTheDocument()
    expect(screen.queryByTestId('sun')).not.toBeInTheDocument()
  })

  it('displays sun icon in dark mode', () => {
    vi.mocked(mantineCore.useComputedColorScheme).mockReturnValue('dark')
    render(<ThemeToggle />)
    
    expect(screen.getByTestId('sun')).toBeInTheDocument()
    expect(screen.queryByTestId('moon')).not.toBeInTheDocument()
  })

  it('toggles from light to dark theme when clicked in light mode', () => {
    vi.mocked(mantineCore.useComputedColorScheme).mockReturnValue('light')
    render(<ThemeToggle />)
    
    const themeToggle = screen.getByTestId('moon')
    fireEvent.click(themeToggle)
    
    expect(setColorSchemeMock).toHaveBeenCalledWith('dark')
  })

  it('toggles from dark to light theme when clicked in dark mode', () => {
    vi.mocked(mantineCore.useComputedColorScheme).mockReturnValue('dark')
    render(<ThemeToggle />)
    
    const themeToggle = screen.getByTestId('sun')
    fireEvent.click(themeToggle)
    
    expect(setColorSchemeMock).toHaveBeenCalledWith('light')
  })
})