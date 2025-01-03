export type ThemeConfig = {
  dataTheme?: boolean
  class?: boolean
  additionalClassPrefix?: string
  style?: boolean
}

export const defaultConfig: ThemeConfig = { dataTheme: true, style: true }
