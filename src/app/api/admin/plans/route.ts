import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isSuperAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { logAudit } from '@/lib/audit'

export async function GET() {
  const plans = await db.plan.findMany({ orderBy: { sortOrder: 'asc' } })
  return NextResponse.json({ plans })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isSuperAdmin((session?.user as any)?.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const body = await req.json()
  const plan = await db.plan.create({
    data: {
      slug: body.slug,
      name: body.name,
      description: body.description ?? '',
      priceMonthly: Math.round(Number(body.priceMonthly ?? 0)),
      priceYearly: Math.round(Number(body.priceYearly ?? 0)),
      currency: body.currency ?? 'USD',
      features: body.features ?? [],
      docLimit: Number(body.docLimit ?? 5),
      teamLimit: Number(body.teamLimit ?? 1),
      aiEnabled: !!body.aiEnabled,
      isActive: body.isActive ?? true,
      isPopular: !!body.isPopular,
      sortOrder: Number(body.sortOrder ?? 99),
      stripePriceId: body.stripePriceId ?? null,
    },
  })
  await logAudit({ userId: (session?.user as any)?.id, action: 'plan.create', target: plan.id, req })
  return NextResponse.json({ plan })
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isSuperAdmin((session?.user as any)?.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const body = await req.json()
  const { id, ...rest } = body
  const plan = await db.plan.update({
    where: { id },
    data: {
      ...(rest.name && { name: rest.name }),
      ...(rest.description !== undefined && { description: rest.description }),
      ...(rest.priceMonthly !== undefined && { priceMonthly: Math.round(Number(rest.priceMonthly)) }),
      ...(rest.priceYearly !== undefined && { priceYearly: Math.round(Number(rest.priceYearly)) }),
      ...(rest.features && { features: rest.features }),
      ...(rest.docLimit !== undefined && { docLimit: Number(rest.docLimit) }),
      ...(rest.teamLimit !== undefined && { teamLimit: Number(rest.teamLimit) }),
      ...(rest.aiEnabled !== undefined && { aiEnabled: !!rest.aiEnabled }),
      ...(rest.isActive !== undefined && { isActive: !!rest.isActive }),
      ...(rest.isPopular !== undefined && { isPopular: !!rest.isPopular }),
      ...(rest.sortOrder !== undefined && { sortOrder: Number(rest.sortOrder) }),
      ...(rest.stripePriceId !== undefined && { stripePriceId: rest.stripePriceId }),
    },
  })
  await logAudit({ userId: (session?.user as any)?.id, action: 'plan.update', target: plan.id, req })
  return NextResponse.json({ plan })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isSuperAdmin((session?.user as any)?.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await db.plan.delete({ where: { id } })
  await logAudit({ userId: (session?.user as any)?.id, action: 'plan.delete', target: id, req })
  return NextResponse.json({ success: true })
}
