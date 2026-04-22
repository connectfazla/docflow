/**
 * Server-side in-memory user store.
 * Users persist across requests within the same server process.
 *
 * For production with persistence across restarts, replace with
 * a database (PostgreSQL + Prisma, SQLite, Supabase, etc.).
 */

import bcrypt from 'bcryptjs'

export interface StoredUser {
  id: string
  name: string
  email: string
  passwordHash: string
  role: 'user' | 'admin' | 'superadmin'
  plan: 'starter' | 'pro' | 'business'
  createdAt: string
}

// Module-level Map — lives for the lifetime of the server process
const users = new Map<string, StoredUser>()

export function getUser(email: string): StoredUser | undefined {
  return users.get(email.toLowerCase())
}

export function userExists(email: string): boolean {
  return users.has(email.toLowerCase())
}

export async function createUser(data: {
  name: string
  email: string
  password: string
  plan?: StoredUser['plan']
}): Promise<StoredUser> {
  const passwordHash = await bcrypt.hash(data.password, 12)
  const user: StoredUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: data.name,
    email: data.email.toLowerCase(),
    passwordHash,
    role: 'user',
    plan: data.plan ?? 'starter',
    createdAt: new Date().toISOString(),
  }
  users.set(user.email, user)
  return user
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function getAllUsers(): StoredUser[] {
  return Array.from(users.values())
}
