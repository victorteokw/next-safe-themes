import "global-jsdom/register"
import { describe, it, expect } from '@jest/globals'
import React from 'react'
import { act, render } from '@testing-library/react'
import { useTheme } from '../src/client/hook'
import { ThemeProvider } from '../src/client/provider'

const wait = (n = 0) => {
  return new Promise(function(resolve) {
    setTimeout(resolve, n)
  })
}

describe('useTheme', () => {

  it('read from local storage and cookie', async () => {
    document.cookie = 'NEXT_THEME=dark'
    localStorage.setItem('NEXT_THEME', '"dark"')
    const Component = () => {
      const [theme, setTheme] = useTheme()
      return <div data-data={theme}>
        <button onClick={() => setTheme('dark')}>Set Dark</button>
      </div>
    }
    const Layout = () => {
      return <ThemeProvider initialTheme="system">
        <Component />
      </ThemeProvider>
    }
    const { container } = await act(async () => {
      return render(<Layout />)
    })
    expect(
      container.querySelector("div")?.getAttribute("data-data")
    ).toBe('dark')
  })

  it('updates local storage and cookie', async () => {
    document.cookie = 'NEXT_THEME=light'
    localStorage.setItem('NEXT_THEME', '"light"')
    const Component = () => {
      const [theme, setTheme] = useTheme()
      return <div data-data={theme}>
        <button onClick={() => setTheme('dark')}>Set Dark</button>
      </div>
    }
    const Layout = () => {
      return <ThemeProvider initialTheme="system">
        <Component />
      </ThemeProvider>
    }
    const { container } = await act(async () => {
      return render(<Layout />)
    })
    await act(async () => {
      container.querySelector('button')?.click()
    })
    expect(
      container.querySelector("div")?.getAttribute("data-data")
    ).toBe('dark')
    expect(document.cookie).toBe('NEXT_THEME=dark')
    expect(localStorage.getItem('NEXT_THEME')).toBe('"dark"')
  })
})
