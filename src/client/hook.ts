import { useContext } from "react"
import { Context } from "./provider"

export function useTheme(): [string, (theme: string) => void] {
  const context = useContext(Context)
  return [context.theme, context.setTheme]
}
