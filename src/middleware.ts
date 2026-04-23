import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Enforce superadmin for the /admin console
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const role = (req.nextauth?.token as any)?.role
      if (role !== 'superadmin') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

// Protect app routes — leave landing, login, register, sign/[token] public
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
    '/admin/:path*',
  ],
}
