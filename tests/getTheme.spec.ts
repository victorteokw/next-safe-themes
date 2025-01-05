import { describe, it, expect } from '@jest/globals'
import { getTheme } from '../src/server/theme'

describe('getTheme', () => {

  it('get default value if value not in headers', () => {
    const theme = getTheme({
      get: () => undefined
    } as any)
    expect(theme).toBe('system')
  })

  it('get value from headers', () => {
    const theme = getTheme({
      get: () => 'dark'
    } as any)
    expect(theme).toBe('dark')
  })
})
