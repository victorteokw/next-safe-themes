# Next Safe Themes
[![NPM version][npm-image]][npm-url]
[![Build Status][github-ci-image]][github-ci-url]
[![Test Coverage][cov-image]][cov-url]
[![License][license-image]][license-url]
[![PR Welcome][pr-image]][pr-url]

Themes for Next.js, safe, no hydration errors.

## Features

* ✅ Any number of themes with a default one
* ✅ Sync with multiple tabs
* ✅ Supports Next.js app router
* ✅ No flash on load
* ✅ Server rendering
* ✅ No hydration errors
* ✅ Custom configurations
* ✅ `useTheme` hook

## Motivation

I can't find yet another theming library for Next.js besides next-themes.
Next-themes has hydration errors. It encourage developers to put
`suppressHydrationWarning` on the root HTML tag. And it encourage developers to
flash the theme switch after page loaded. I want my website to render correctly.
Thus, I created this library.

## Installation

```sh
npm i next-safe-themes
```

## Usage

Follow these steps, to theme your website without hydration errors.

### 1. Update Middleware

Update your `src/middleware.ts` like this.

```ts
import { createThemesMiddleware } from 'next-safe-themes/server/middleware'

const themesMiddleware = createThemesMiddleware(yourPreviousMiddleware)

export function middleware(request: NextRequest) {
  return themesMiddleware(request)
}
```

### 2. Update Layout

Update your layout file like this.

```ts
import { headers } from "next/headers"
import { getTheme } from "next-safe-themes/server/theme"
import { htmlThemeProps } from "next-safe-themes/props"
import { ThemeProvider } from "next-safe-themes/client/provider"

export default async function Layout({ children }) {

  // 1. get theme from middleware updated headers
  const theme = getTheme(await headers())

  // 2. render HTML attributes with the theme value
  return <html lang={locale} {...htmlThemeProps(theme)}>
    <head>
    ...
    </head>
    <body>
      <ThemeProvider initialTheme={theme}>
        {children}
      </ThemeProvider>
    </body>
  </html>
}
```

### 3. Theme Switch

Next-safe-themes provides a hook for you to write your custom theme switch.

```ts
const MyThemeSwitch = () => {
  const [theme, setTheme] = useTheme()
  return <div>
    <div>Current theme is: {theme}</div>
    <button onClick={() => setTheme('light')}>Light</button>
    <button onClick={() => setTheme('dark')}>Dark</button>
    <button onClick={() => setTheme('system')}>System</button>
  </div>
}
```

## Configuration

You can customize the generated HTML attributes. Pass this configuration object
as the second parameter to `htmlThemeProps` and `ThemeProvider`.

```ts
const themeConfig = {
  dataTheme: true, // data-theme="light"
  class: true, // class="light"
  additionalClassPrefix: "scheme-", // class="scheme-light"
  style: true, // style="color-scheme: light;"
}
```

Do not specify all 4, normally you may need 2 of them according to your CSS
settings.

Pass the config to the functions like this.

```ts
export default async function Layout({ children }) {
  return <html lang={locale} {...htmlThemeProps(theme, themeConfig)}>
    <head>
    ...
    </head>
    <body>
      <ThemeProvider initialTheme={theme} themeConfig={themeConfig}>
        {children}
      </ThemeProvider>
    </body>
  </html>
}
```

## License

This package is an open-sourced software licensed under the
[MIT License][license-url].

## Contributing

Issues and PRs are obviously welcomed and encouraged, for bug fixing, more
accurate type definitions, new features as well as documentation.

[npm-image]: https://img.shields.io/npm/v/next-safe-themes.svg?style=flat-square&color=ff69b4&logo=react
[npm-url]: https://npmjs.org/package/next-safe-themes
[github-ci-image]: https://img.shields.io/github/actions/workflow/status/victorteokw/next-safe-themes/CI.yml.svg?style=flat-square&color=green&logo=github
[github-ci-url]: https://github.com/victorteokw/next-safe-themes/actions/
[cov-image]: https://img.shields.io/codecov/c/github/victorteokw/next-safe-themes/main.svg?style=flat-square&logo=codecov
[cov-url]: https://codecov.io/gh/victorteokw/next-safe-themes
[license-image]: https://img.shields.io/github/license/victorteokw/next-safe-themes.svg?style=flat-square&color=blue
[license-url]: https://github.com/victorteokw/next-safe-themes/blob/master/LICENSE
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square&color=orange
[pr-url]: https://github.com/victorteokw/next-safe-themes/blob/master/CONTRIBUTING.md
