import { describe, it, expect } from '@jest/globals'
import { createThemesMiddleware } from '../src/server/middleware'

const middleware = createThemesMiddleware((request) => request as any)

describe('createThemesMiddleware', () => {
  it('set theme header to system if no cookie is set', () => {
    const headers: Record<string, string> = { }
    const request = {
      cookies: { get: () => undefined },
      headers: {
        set: (key: string, value: string) => headers[key] = value,
        get: (key: string) => headers[key]
      },
    }
    middleware(request as any)
    expect(headers['X-NEXT-THEME']).toBe('system')
  })

  it('set theme header to cookie value', () => {
    const headers: Record<string, string> = { }
    const request = {
      cookies: { get: () => ({ value: 'dark' }) },
      headers: {
        set: (key: string, value: string) => headers[key] = value,
        get: (key: string) => headers[key]
      },
    }
    middleware(request as any)
    expect(headers['X-NEXT-THEME']).toBe('dark')
  })
})
