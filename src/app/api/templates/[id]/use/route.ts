import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

/** Creates a new document from a template. */
export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const tpl = await db.template.findUnique({ where: { id: params.id } })
  if (!tpl) return NextResponse.json({ error: 'Template not found' }, { status: 404 })

  const doc = await db.document.create({
    data: {
      title: tpl.title,
      content: tpl.content,
      templateId: tpl.id,
      tags: tpl.tags,
      ownerId: session.user.id as string,
    },
  })

  await db.template.update({
    where: { id: tpl.id },
    data: { usageCount: { increment: 1 } },
  })

  return NextResponse.json({ document: doc })
}
