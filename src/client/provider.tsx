'use client'
import { createContext, ReactNode, useEffect, useState } from "react"
import { THEME_COOKIE_KEY } from "../constants"
import reactUseCookie from "react-use-cookie"
import { defaultConfig, ThemeConfig } from "../config"
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

function updateHtmlTag(theme: string, config: ThemeConfig = defaultConfig) {
  const html = window.document.querySelector("html")
  if (!html) return
  if (theme === 'system') {
    html.removeAttribute('class')
    html.removeAttribute('data-theme')
    html.removeAttribute('style')
    return
  }
  let dataTheme: string | undefined = undefined
  let style: string | undefined = undefined
  const classList = []
  if (config.class) {
    classList.push(theme)
  }
  if (config.dataTheme) {
    dataTheme = theme
  }
  if (config.additionalClassPrefix) {
    classList.push(`${config.additionalClassPrefix}${theme}`)
  }
  if (config.style) {
    style = `color-scheme: ${theme};`
  }
  if (classList.length) {
    html.setAttribute("class", classList.join(" "))
  }
  if (style) {
    html.setAttribute("style", style)
  }
  if (dataTheme) {
    html.setAttribute("data-theme", dataTheme)
  }
}

export function ThemeProvider({ initialTheme, themeConfig, children }: ThemeProviderProps) {
  const [cookie, setCookie] = reactUseCookie(THEME_COOKIE_KEY, initialTheme)
  const [local, setLocal] = useLocalStorage(THEME_COOKIE_KEY, initialTheme)
  const [shouldUpdateLocal, setShouldUpdateLocal] = useState(true)
  if (shouldUpdateLocal) {
    if (local !== cookie) {
      setLocal(cookie)
    }
    setShouldUpdateLocal(false)
  }
  useEffect(() => {
    updateHtmlTag(local, themeConfig)
  }, [local])
  return <Context.Provider value={{
    theme: local,
    setTheme: (theme: string) => {
      setCookie(theme)
      setLocal(theme)
    }
  }}>
    {children}
  </Context.Provider>
}
