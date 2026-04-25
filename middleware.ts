import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isAdminRoute = nextUrl.pathname.startsWith('/karakar')
  const isLoginPage = nextUrl.pathname === '/karakar/login'

  if (isAdminRoute && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/karakar/login', nextUrl))
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/karakar/dashboard', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/karakar/:path*'],
}
