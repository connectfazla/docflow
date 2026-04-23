import type { NextRequest } from 'next/server'
import { db } from './db'

export async function logAudit(params: {
  userId?: string | null
  action: string
  target?: string
  metadata?: Record<string, unknown>
  req?: NextRequest | Request
}) {
  try {
    const ipAddress = params.req
      ? ((params.req as NextRequest).headers.get('x-forwarded-for') ??
         (params.req as NextRequest).headers.get('x-real-ip') ??
         undefined)
      : undefined
    const userAgent = params.req
      ? (params.req as NextRequest).headers.get('user-agent') ?? undefined
      : undefined

    await db.auditLog.create({
      data: {
        userId: params.userId ?? null,
        action: params.action,
        target: params.target,
        ipAddress,
        userAgent,
        metadata: params.metadata ? (params.metadata as object) : undefined,
      },
    })
  } catch (err) {
    console.error('[audit]', err)
  }
}
