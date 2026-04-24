export const dynamic = 'force-dynamic'
import { db } from '@/lib/db'
import { UsersManager } from './client'

export default async function UsersPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { documents: true } } },
  })
  const safe = users.map(({ passwordHash, ...rest }) => ({
    ...rest,
    createdAt: rest.createdAt.toISOString(),
    updatedAt: rest.updatedAt.toISOString(),
    lastLoginAt: rest.lastLoginAt?.toISOString() ?? null,
    emailVerified: rest.emailVerified?.toISOString() ?? null,
    docCount: rest._count.documents,
  }))
  return <UsersManager initial={safe as any} />
}