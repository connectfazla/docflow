import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isSuperAdmin } from '@/lib/auth'
import { getSettings, setSettings, type SettingKey } from '@/lib/settings'
import { maskSecret } from '@/lib/crypto'
import { logAudit } from '@/lib/audit'

const ALL_KEYS: SettingKey[] = [
  'smtp.host', 'smtp.port', 'smtp.secure', 'smtp.user', 'smtp.password', 'smtp.from',
  'ai.provider', 'ai.apiKey', 'ai.model',
  'payments.provider',
  'payments.stripe.secretKey', 'payments.stripe.publishableKey', 'payments.stripe.webhookSecret',
  'payments.ziina.apiKey', 'payments.ziina.webhookSecret',
  'branding.companyName', 'branding.supportEmail',
]

const SECRET_KEYS = new Set([
  'smtp.password',
  'ai.apiKey',
  'payments.stripe.secretKey',
  'payments.stripe.webhookSecret',
  'payments.ziina.apiKey',
  'payments.ziina.webhookSecret',
])

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!isSuperAdmin((session?.user as any)?.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const values = await getSettings(ALL_KEYS)
  // Mask secrets in the response
  const masked = Object.fromEntries(
    Object.entries(values).map(([k, v]) =>
      SECRET_KEYS.has(k) ? [k, v ? maskSecret(v) : ''] : [k, v]
    )
  )
  return NextResponse.json({
    settings: masked,
    configured: Object.fromEntries(
      ALL_KEYS.map((k) => [k, !!values[k]])
    ),
  })
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isSuperAdmin((session?.user as any)?.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  // Filter to allowed keys only & skip secrets that weren't actually changed (still masked)
  const updates: Partial<Record<SettingKey, string>> = {}
  for (const k of ALL_KEYS) {
    if (!(k in body)) continue
    const v = body[k]
    if (typeof v !== 'string') continue
    // Don't overwrite a secret with its masked form
    if (SECRET_KEYS.has(k) && v.includes('••••')) continue
    updates[k] = v
  }

  await setSettings(updates, (session?.user as any)?.email)
  await logAudit({
    userId: (session?.user as any)?.id,
    action: 'admin.settings.update',
    metadata: { keys: Object.keys(updates) },
    req,
  })

  return NextResponse.json({ success: true, updated: Object.keys(updates) })
}
