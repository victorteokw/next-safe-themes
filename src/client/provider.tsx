'use client'
import { createContext, ReactNode, useEffect, useState } from "react"
import { THEME_COOKIE_KEY } from "../constants"
import reactUseCookie from "react-use-cookie"
import { defaultConfig, ThemeConfig } from "../config"
import { insertClassNames, prefixedClassName, removeClassName } from './className'
import useLocalStorage from "use-local-storage"

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
  themeConfig?: ThemeConfig
  children?: ReactNode
}

function updateHtmlTag(
  previous: string,
  theme: string,
  config: ThemeConfig = defaultConfig
) {
  const html = window.document.querySelector("html")
  if (!html) return
  if (theme === 'system') {
    removeClassName(html, prefixedClassName(previous, config.additionalClassPrefix))
    html.removeAttribute('data-theme')
    html.style.colorScheme = ''
    return
  }
  let dataTheme: string | undefined = undefined
  const classList = []
  if (config.class) {
    classList.push(theme)
  }
  if (config.dataTheme) {
    dataTheme = theme
  }
  if (config.additionalClassPrefix) {
    classList.push(prefixedClassName(theme, config.additionalClassPrefix))
  }
  if (classList.length > 0) {
    insertClassNames(html, classList)
  }
  if (config.style) {
    html.style.colorScheme = theme
  }
  if (dataTheme) {
    html.setAttribute("data-theme", dataTheme)
  }
}

export function ThemeProvider({ initialTheme, themeConfig, children }: ThemeProviderProps) {
  const [cookie, setCookie] = reactUseCookie(THEME_COOKIE_KEY, initialTheme)
  const [local, setLocal] = useLocalStorage(THEME_COOKIE_KEY, initialTheme)
  const [previousLocal, setPreviousLocal] = useState(local)
  const [shouldUpdateLocal, setShouldUpdateLocal] = useState(true)
  if (shouldUpdateLocal) {
    if (local !== cookie) {
      setLocal(cookie)
    }
    setShouldUpdateLocal(false)
  }
  useEffect(() => {
    updateHtmlTag(previousLocal, local, themeConfig)
  }, [local])
  return <Context.Provider value={{
    theme: local,
    setTheme: (theme: string) => {
      setPreviousLocal(local)
      setCookie(theme)
      setLocal(theme)
    }
  }}>
    {children}
  </Context.Provider>
}
