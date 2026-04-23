import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { db } from '@/lib/db'
import { getSettings } from '@/lib/settings'

export async function POST(req: NextRequest) {
  const s = await getSettings(['payments.ziina.webhookSecret'])
  const secret = s['payments.ziina.webhookSecret']
  const sig = req.headers.get('ziina-signature') ?? ''
  const body = await req.text()

  if (secret) {
    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex')
    if (sig !== expected) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    const event = JSON.parse(body)
    if (event.type === 'payment_intent.completed') {
      const userId = event.data?.metadata?.userId
      if (userId) {
        await db.subscription.updateMany({
          where: { userId },
          data: { status: 'ACTIVE', provider: 'ZIINA', providerSubscriptionId: event.data.id },
        })
      }
    }
  } catch (e) {
    console.error('[ziina-webhook]', e)
  }
  return NextResponse.json({ received: true })
}
