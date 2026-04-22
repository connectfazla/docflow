import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getUser, verifyPassword } from '@/lib/user-store'

// Super admin credentials from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@docflow.pro'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ?? ''
const ADMIN_PLAIN = process.env.ADMIN_PASSWORD ?? 'Admin@DocFlow2024!'
const ADMIN_NAME = process.env.ADMIN_NAME ?? 'Super Admin'

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

        const email = credentials.email.toLowerCase()

        // ── 1. Check super admin (env-based) ─────────────────────────
        if (email === ADMIN_EMAIL.toLowerCase()) {
          let valid = false
          if (ADMIN_PASSWORD_HASH) {
            valid = await bcrypt.compare(credentials.password, ADMIN_PASSWORD_HASH)
          } else {
            valid = credentials.password === ADMIN_PLAIN
          }
          if (!valid) return null
          return {
            id: 'superadmin',
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            role: 'superadmin',
          }
        }

        // ── 2. Check registered users (in-memory store) ───────────────
        const user = getUser(email)
        if (!user) return null

        const valid = await verifyPassword(credentials.password, user.passwordHash)
        if (!valid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
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
