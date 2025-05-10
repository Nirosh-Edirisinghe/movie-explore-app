import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { createTheme } from '@mui/material/styles'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    // Get the saved theme from localStorage or use the default (light)
    const savedMode = localStorage.getItem('themeMode')
    return savedMode || 'light'
  })

  useEffect(() => {
    // Save the theme mode to localStorage whenever it changes
    localStorage.setItem('themeMode', mode)
  }, [mode])

  // Create a theme based on the current mode
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        light: '#e6f4ff',
        main: '#3399FF',
        dark: '#0A1929',
      },
      secondary: {
        light: '#ffedd5',
        main: '#ff9800',
        dark: '#e65100',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 500, fontSize: '2.5rem', lineHeight: 1.2 },
      h2: { fontWeight: 500, fontSize: '2rem', lineHeight: 1.2 },
      h3: { fontWeight: 500, fontSize: '1.75rem', lineHeight: 1.2 },
      h4: { fontWeight: 500, fontSize: '1.5rem', lineHeight: 1.2 },
      h5: { fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.2 },
      h6: { fontWeight: 500, fontSize: '1rem', lineHeight: 1.2 },
      body1: { fontSize: '1rem', lineHeight: 1.5 },
      body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            padding: '8px 16px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            overflow: 'hidden',
          },
        },
      },
    },
  }), [mode])

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light')
  }

  const value = {
    theme,
    mode,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}