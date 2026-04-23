/**
 * Postgres-backed user store (via Prisma).
 * The API is kept backward compatible with the previous in-memory version.
 */

import bcrypt from 'bcryptjs'
import { db } from './db'
import type { PlanTier, Role, User } from '@prisma/client'

export type StoredUser = User

const planMap: Record<string, PlanTier> = {
  starter: 'STARTER',
  pro: 'PRO',
  business: 'BUSINESS',
  enterprise: 'ENTERPRISE',
}

export async function getUser(email: string): Promise<StoredUser | null> {
  return db.user.findUnique({ where: { email: email.toLowerCase() } })
}

export async function userExists(email: string): Promise<boolean> {
  const u = await db.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true },
  })
  return !!u
}

export async function createUser(data: {
  name: string
  email: string
  password: string
  plan?: string
  role?: Role
  company?: string
}): Promise<StoredUser> {
  const passwordHash = await bcrypt.hash(data.password, 12)
  const plan: PlanTier = planMap[data.plan ?? 'starter'] ?? 'STARTER'
  return db.user.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash,
      role: data.role ?? 'USER',
      plan,
      company: data.company,
    },
  })
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function getAllUsers(): Promise<StoredUser[]> {
  return db.user.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function updateUser(id: string, data: Partial<StoredUser>): Promise<StoredUser> {
  return db.user.update({ where: { id }, data })
}

export async function deleteUser(id: string): Promise<void> {
  await db.user.delete({ where: { id } })
}

export async function touchLastLogin(email: string) {
  try {
    await db.user.update({
      where: { email: email.toLowerCase() },
      data: { lastLoginAt: new Date() },
    })
  } catch {}
}

/**
 * Ensures the super admin (from env) exists in the DB.
 * Safe to call on every auth attempt — cheap upsert.
 */
export async function ensureSuperAdmin() {
  const email = (process.env.ADMIN_EMAIL ?? 'admin@docflow.pro').toLowerCase()
  const name = process.env.ADMIN_NAME ?? 'Super Admin'
  const plainPw = process.env.ADMIN_PASSWORD ?? 'Admin@DocFlow2024!'

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) {
    if (existing.role !== 'SUPERADMIN') {
      await db.user.update({ where: { email }, data: { role: 'SUPERADMIN' } })
    }
    return
  }

  const passwordHash = await bcrypt.hash(plainPw, 12)
  await db.user.create({
    data: {
      email,
      name,
      passwordHash,
      role: 'SUPERADMIN',
      plan: 'ENTERPRISE',
    },
  })
}
