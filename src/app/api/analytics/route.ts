import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = session.user.id as string

  // Pipeline status counts (real documents for this user)
  const [draft, sent, viewed, signed, completed] = await Promise.all([
    db.document.count({ where: { ownerId: userId, status: 'DRAFT' } }),
    db.document.count({ where: { ownerId: userId, status: 'SENT' } }),
    db.document.count({ where: { ownerId: userId, status: 'VIEWED' } }),
    db.document.count({ where: { ownerId: userId, status: 'SIGNED' } }),
    db.document.count({ where: { ownerId: userId, status: 'COMPLETED' } }),
  ])

  const pipelineData = [
    { name: 'Draft',     value: draft,     color: '#94a3b8' },
    { name: 'Sent',      value: sent,      color: '#3b82f6' },
    { name: 'Viewed',    value: viewed,    color: '#f59e0b' },
    { name: 'Signed',    value: signed,    color: '#8b5cf6' },
    { name: 'Completed', value: completed, color: '#10b981' },
  ]

  // Chart data: last 6 months — docs sent / signed / completed
  const now = new Date()
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    return {
      label: d.toLocaleString('default', { month: 'short' }),
      start: new Date(d.getFullYear(), d.getMonth(), 1),
      end: new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59),
    }
  })

  const chartData = await Promise.all(
    months.map(async ({ label, start, end }) => {
      const [sentCount, signedCount, completedCount] = await Promise.all([
        db.document.count({ where: { ownerId: userId, sentAt: { gte: start, lte: end } } }),
        db.document.count({ where: { ownerId: userId, status: { in: ['SIGNED', 'COMPLETED'] }, updatedAt: { gte: start, lte: end } } }),
        db.document.count({ where: { ownerId: userId, completedAt: { gte: start, lte: end } } }),
      ])
      return { month: label, sent: sentCount, signed: signedCount, completed: completedCount }
    })
  )

  // Recent activity from ActivityItem table
  const activityRows = await db.activityItem.findMany({
    where: { document: { ownerId: userId } },
    include: { document: { select: { title: true } } },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })

  const activity = activityRows.map((a) => ({
    id: a.id,
    type: a.type.toLowerCase(),
    actorName: a.actorName ?? 'Unknown',
    documentTitle: a.document?.title ?? 'Untitled',
    timestamp: a.createdAt.toISOString(),
  }))

  return NextResponse.json({ pipelineData, chartData, activity })
}
