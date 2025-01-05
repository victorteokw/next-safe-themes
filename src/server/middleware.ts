import { NextRequest, NextResponse } from "next/server"
import { THEME_COOKIE_KEY } from "../constants"

export const THEME_HEADER_KEY = 'X-NEXT-THEME'

function emptyMiddleware(request: NextRequest): NextResponse {
  /* istanbul ignore next */
  return NextResponse.next({
    request: {
      headers: request.headers
    }
  })
}

export function createThemesMiddleware(middleware: (request: NextRequest) => NextResponse = emptyMiddleware) {
  return (request: NextRequest) => {
    const cookie = request.cookies.get(THEME_COOKIE_KEY)
    request.headers.set(THEME_HEADER_KEY, cookie?.value || 'system')
    return middleware(request)
  }
}
