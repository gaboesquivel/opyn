import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/compare') {
    return NextResponse.redirect(
      new URL('/t/perps/ETHUSDC?dialog=compare', request.url),
    )
  }

  if (request.nextUrl.pathname !== '/') return NextResponse.next()

  return NextResponse.redirect(new URL('/t/perps/ETHUSDC', request.url))
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
