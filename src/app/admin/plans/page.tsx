export const dynamic = 'force-dynamic'
import { db } from '@/lib/db'
import { PlansManager } from './client'

export default async function PlansPage() {
  const plans = await db.plan.findMany({ orderBy: { sortOrder: 'asc' } })
  return <PlansManager initial={plans} />
}