import type { DetailedHTMLProps, HtmlHTMLAttributes } from "react"
import { ThemeConfig, defaultConfig } from "./config"

export function htmlThemeProps(theme: string, config: ThemeConfig = defaultConfig): DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement> {
  if (theme === 'system') {
    return { }
  }
  const className = []
  const retval: DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement> = { }
  if (config.class) {
    className.push(theme)
  }
  if (config.additionalClassPrefix) {
    className.push(`${config.additionalClassPrefix}${theme}`)
  }
  if (config.dataTheme) {
    (retval as any).datatheme = theme
  }
  if (config.style) {
    retval.style = {
      colorScheme: theme
    }
  }
  if (className.length) {
    retval.className = className.join(' ')
  }
  return retval
}
