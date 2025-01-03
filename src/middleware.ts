import { NextRequest, NextResponse } from "next/server";

export const THEME_COOKIE_KEY = 'NEXT_THEME'

export const THEME_HEADER_KEY = 'X-NEXT-THEME'

function emptyMiddleware(request: NextRequest): NextResponse {
  return NextResponse.next({
    request: {
      headers: request.headers
    }
  })
}

export function themesMiddleware(middleware: (request: NextRequest) => NextResponse = emptyMiddleware) {
  return (request: NextRequest) => {
    const cookie = request.cookies.get(THEME_COOKIE_KEY)
    request.headers.set(THEME_HEADER_KEY, cookie?.value || 'system')
    return middleware(request)
  }
}
