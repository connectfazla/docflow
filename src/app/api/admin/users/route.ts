import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isSuperAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { logAudit } from '@/lib/audit'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!isSuperAdmin((session?.user as any)?.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      subscription: { include: { plan: { select: { name: true, slug: true } } } },
      _count: { select: { documents: true } },
    },
  })
  // Strip password hash
  const safe = users.map(({ passwordHash, ...rest }) => rest)
  return NextResponse.json({ users: safe })
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isSuperAdmin((session?.user as any)?.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id, ...updates } = await req.json()
  const user = await db.user.update({
    where: { id },
    data: {
      ...(updates.name && { name: updates.name }),
      ...(updates.role && { role: updates.role }),
      ...(updates.plan && { plan: updates.plan }),
    },
  })
  await logAudit({ userId: (session?.user as any)?.id, action: 'admin.user.update', target: id, req })
  const { passwordHash, ...safe } = user
  return NextResponse.json({ user: safe })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isSuperAdmin((session?.user as any)?.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await db.user.delete({ where: { id } })
  await logAudit({ userId: (session?.user as any)?.id, action: 'admin.user.delete', target: id, req })
  return NextResponse.json({ success: true })
}
