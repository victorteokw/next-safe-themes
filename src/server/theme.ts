import { THEME_HEADER_KEY } from './middleware'
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'

export function getTheme(headers: ReadonlyHeaders) {
  return headers.get(THEME_HEADER_KEY) ?? 'system'
}
