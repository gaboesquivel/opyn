import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/compare') {
    return NextResponse.redirect(
      new URL('/trade/perps/ETH-USDC-0x1?dialog=compare', request.url),
    )
  }

  if (request.nextUrl.pathname !== '/') return NextResponse.next()

  return NextResponse.redirect(
    new URL('/trade/perps/ETH-USDC-0x1', request.url),
  )
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
