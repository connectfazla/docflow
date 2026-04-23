import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { logAudit } from '@/lib/audit'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as { id?: string }).id
  const role = (session.user as { role?: string }).role

  const where = role === 'superadmin' ? {} : { ownerId: userId }

  const docs = await db.document.findMany({
    where,
    include: { recipients: true, template: { select: { title: true } } },
    orderBy: { updatedAt: 'desc' },
  })

  return NextResponse.json({ documents: docs })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as { id?: string }).id!
  const body = await req.json()

  const doc = await db.document.create({
    data: {
      title: body.title ?? 'Untitled Document',
      content: body.content ?? '',
      templateId: body.templateId ?? null,
      tags: body.tags ?? [],
      ownerId: userId,
    },
  })

  await db.activityItem.create({
    data: { documentId: doc.id, type: 'CREATED', actorName: session.user.name ?? 'User' },
  })

  await logAudit({ userId, action: 'document.create', target: doc.id, req })

  return NextResponse.json({ document: doc })
}
