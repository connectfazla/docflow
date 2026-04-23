import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getActiveProvider, createStripeCheckout, createZiinaCheckout } from '@/lib/payments'

/**
 * POST /api/billing/checkout
 * Body: { planSlug: string, interval?: 'month' | 'year' }
 */

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { planSlug, interval = 'month' } = await req.json()
  const plan = await db.plan.findUnique({ where: { slug: planSlug } })
  if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })

  const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3219'
  const provider = await getActiveProvider()
  const userId = (session.user as any).id as string
  const email = session.user.email as string

  // Free provider — just attach/move the subscription
  if (provider === 'free' || (plan.priceMonthly === 0 && plan.priceYearly === 0)) {
    await db.subscription.upsert({
      where: { userId },
      create: { userId, planId: plan.id, status: 'ACTIVE', provider: 'FREE' },
      update: { planId: plan.id, status: 'ACTIVE', provider: 'FREE' },
    })
    await db.user.update({ where: { id: userId }, data: { plan: plan.slug.toUpperCase() as any } })
    return NextResponse.json({ success: true, redirectUrl: `${baseUrl}/dashboard?upgraded=${plan.slug}` })
  }

  if (provider === 'stripe') {
    if (!plan.stripePriceId) {
      return NextResponse.json({ error: 'This plan has no Stripe Price ID configured.' }, { status: 400 })
    }
    const cs = await createStripeCheckout({
      priceId: plan.stripePriceId,
      customerEmail: email,
      successUrl: `${baseUrl}/dashboard?checkout=success`,
      cancelUrl: `${baseUrl}/pricing?checkout=canceled`,
      userId,
    })
    return NextResponse.json({ redirectUrl: cs.url })
  }

  if (provider === 'ziina') {
    const amountFils = interval === 'year' ? plan.priceYearly : plan.priceMonthly
    const pi = await createZiinaCheckout({
      amountAed: amountFils,
      customerEmail: email,
      successUrl: `${baseUrl}/dashboard?checkout=success`,
      cancelUrl: `${baseUrl}/pricing?checkout=canceled`,
      userId,
      message: `DocFlow Pro — ${plan.name}`,
    })
    return NextResponse.json({ redirectUrl: pi.redirect_url })
  }

  return NextResponse.json({ error: 'Unknown provider' }, { status: 500 })
}
