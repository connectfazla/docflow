import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSettings } from '@/lib/settings'
import { getStripe } from '@/lib/payments'

export async function POST(req: NextRequest) {
  const stripe = await getStripe()
  if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 400 })

  const s = await getSettings(['payments.stripe.webhookSecret'])
  const sig = req.headers.get('stripe-signature') ?? ''
  const body = await req.text()

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, s['payments.stripe.webhookSecret'])
  } catch (e: any) {
    return NextResponse.json({ error: `Invalid signature: ${e.message}` }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const cs = event.data.object as any
      const userId = cs.metadata?.userId
      const subId = cs.subscription
      if (userId && subId) {
        // minimal handling — extend as needed
        await db.subscription.updateMany({
          where: { userId },
          data: { status: 'ACTIVE', provider: 'STRIPE', providerSubscriptionId: subId },
        })
      }
    }
    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as any
      await db.subscription.updateMany({
        where: { providerSubscriptionId: sub.id },
        data: { status: 'CANCELED' },
      })
    }
  } catch (e: any) {
    console.error('[stripe-webhook]', e)
  }

  return NextResponse.json({ received: true })
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
