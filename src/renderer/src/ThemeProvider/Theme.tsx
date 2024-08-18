/* eslint-disable prettier/prettier */
import React from 'react'
import { useContext, createContext } from 'react'

type Theme = {
  mode: 'light' | 'dark'
  currentTheme: 'default' | 'orange' | 'green'
  setMode: (mode: 'light' | 'dark') => void
  setTheme: (theme: 'default' | 'orange' | 'green') => void
  availableThemes: [
    { name: 'default'; hex: string },
    { name: 'orange'; hex: string },
    { name: 'green'; hex: string }
  ]
}

const ThemeContext = createContext<Theme>({} as Theme)

export const ThemeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [mode, setMode] = React.useState<Theme['mode']>(() => {
    const localData = window.localStorage.getItem('mode')
    document.body.classList.add(localData as Theme['mode'])
    return (localData as Theme['mode']) || 'light'
  })
  const [currentTheme, setcurrentTheme] = React.useState<Theme['currentTheme']>(() => {
    const localData = window.localStorage.getItem('theme')
    document.body.classList.add(localData as Theme['currentTheme'])
    return (localData as Theme['currentTheme']) || 'default'
  })

  const handleMode = (mode: 'light' | 'dark'): void => {
    document.body.classList.add('no-transition')
    setMode(mode)
    if (mode === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    window.localStorage.setItem('mode', mode)
    setTimeout(() => {
      document.body.classList.remove('no-transition')
    }, 100)
  }

  const handleTheme = (theme: 'default' | 'orange' | 'green'): void => {
    setcurrentTheme(theme)
    document.body.classList.forEach((className) => {
      if (className !== 'dark' && className !== 'light') {
        document.body.classList.remove(className)
      }
    })
    document.body.classList.add(theme)
    window.localStorage.setItem('theme', theme)
  }
  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode: handleMode,
        currentTheme,
        setTheme: handleTheme,
        availableThemes: [
          { name: 'default', hex: '#007bff' },
          { name: 'orange', hex: '#ff6f00' },
          { name: 'green', hex: '#4caf50' }
        ]
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): Theme => {
  return useContext(ThemeContext)
}
