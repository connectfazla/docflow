import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isSuperAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { logAudit } from '@/lib/audit'

async function loadAndAuthorize(id: string, session: any) {
  const doc = await db.document.findUnique({
    where: { id },
    include: { recipients: true, activity: { orderBy: { createdAt: 'desc' }, take: 50 } },
  })
  if (!doc) return { error: NextResponse.json({ error: 'Not found' }, { status: 404 }) }
  const userId = session?.user?.id as string | undefined
  const role = session?.user?.role as string | undefined
  if (!isSuperAdmin(role) && doc.ownerId !== userId) {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }
  return { doc }
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { doc, error } = await loadAndAuthorize(params.id, session)
  if (error) return error
  return NextResponse.json({ document: doc })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { doc, error } = await loadAndAuthorize(params.id, session)
  if (error) return error

  const body = await req.json()
  const updated = await db.document.update({
    where: { id: params.id },
    data: {
      title: body.title ?? doc!.title,
      content: body.content ?? doc!.content,
      tags: body.tags ?? doc!.tags,
      status: body.status ?? doc!.status,
    },
  })

  await logAudit({ userId: session.user.id as string, action: 'document.update', target: params.id, req })

  return NextResponse.json({ document: updated })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { error } = await loadAndAuthorize(params.id, session)
  if (error) return error

  await db.document.delete({ where: { id: params.id } })
  await logAudit({ userId: session.user.id as string, action: 'document.delete', target: params.id, req })

  return NextResponse.json({ success: true })
}
