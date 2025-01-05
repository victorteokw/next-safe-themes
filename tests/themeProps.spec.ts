import { describe, it, expect } from '@jest/globals'
import { htmlThemeProps } from '../src/props'

describe('htmlThemeProps', () => {

  it('generate data-theme attribute', () => {
    const props = htmlThemeProps('dark', { dataTheme: true })
    expect(props['data-theme']).toBe('dark')
  })

  it('generate style attribute', () => {
    const props = htmlThemeProps('dark', { style: true })
    expect(props.style).toEqual({ colorScheme: 'dark' })
  })

  it('generate className attribute', () => {
    const props = htmlThemeProps('dark', { class: true })
    expect(props.className).toBe('dark')
  })

  it('generate additionalClassPrefix attribute', () => {
    const props = htmlThemeProps('dark', { additionalClassPrefix: 'scheme-' })
    expect(props.className).toBe('scheme-dark')
  })

  it('generate both clases if additionalClassPrefix and class are set', () => {
    const props = htmlThemeProps('dark', { class: true, additionalClassPrefix: 'scheme-' })
    expect(props.className).toBe('dark scheme-dark')
  })

  it('generate empty object if theme is default', () => {
    const props = htmlThemeProps('system', { class: true })
    expect(props).toEqual({})
  })
})
