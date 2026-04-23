import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUser, verifyPassword, ensureSuperAdmin, touchLastLogin } from '@/lib/user-store'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Make sure the super admin exists (idempotent)
        try { await ensureSuperAdmin() } catch (e) { console.error('[auth] ensureSuperAdmin failed', e) }

        const email = credentials.email.toLowerCase()
        const user = await getUser(email)
        if (!user) return null

        const valid = await verifyPassword(credentials.password, user.passwordHash)
        if (!valid) return null

        await touchLastLogin(email)

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.toLowerCase(),
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string; id?: string }).role = token.role as string
        ;(session.user as { role?: string; id?: string }).id = token.id as string
      }
      return session
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET ?? 'docflow-dev-secret-change-in-production',
}

/** Helper for API route guards. */
export function isSuperAdmin(role: string | undefined): boolean {
  return role === 'superadmin' || role === 'SUPERADMIN'
}

export function isAdmin(role: string | undefined): boolean {
  return role === 'admin' || role === 'ADMIN' || isSuperAdmin(role)
}
