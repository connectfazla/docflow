import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isSuperAdmin } from '@/lib/auth'
import { testSmtp } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isSuperAdmin((session?.user as any)?.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { to } = await req.json()
  if (!to) return NextResponse.json({ error: 'Recipient required' }, { status: 400 })
  const res = await testSmtp(to)
  return NextResponse.json(res)
}
