'use client'
import { createContext, ReactNode } from "react"

type ContextProps = {
  theme: string
  setTheme: (theme: string) => void
}

export const Context = createContext<ContextProps>({
  theme: 'system',
  setTheme: () => {}
})

type ThemeProviderProps = {
  initialTheme: string
  children: ReactNode
}

export function ThemeProvider({ initialTheme, children }: ThemeProviderProps) {
  return <Context.Provider value={{
    theme: initialTheme,
    setTheme: () => {}
  }}>
    {children}
  </Context.Provider>
}
