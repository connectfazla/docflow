import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

// Protect all app routes — leave landing, login, register, sign pages public
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/documents/:path*',
    '/editor/:path*',
    '/templates/:path*',
    '/analytics/:path*',
    '/team/:path*',
    '/integrations/:path*',
    '/settings/:path*',
  ],
}
