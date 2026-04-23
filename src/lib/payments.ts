import Stripe from 'stripe'
import { getSettings } from './settings'

/**
 * Thin abstraction over Stripe + Ziina. Returns null when the active provider
 * is "free" so callers can treat the operation as a no-op.
 */

export async function getActiveProvider(): Promise<'free' | 'stripe' | 'ziina'> {
  const s = await getSettings(['payments.provider'])
  return (s['payments.provider'] as any) || 'free'
}

export async function getStripe(): Promise<Stripe | null> {
  const s = await getSettings(['payments.stripe.secretKey'])
  const key = s['payments.stripe.secretKey']
  if (!key) return null
  return new Stripe(key, { apiVersion: '2024-11-20.acacia' as any })
}

export async function createStripeCheckout(params: {
  priceId: string
  customerEmail: string
  successUrl: string
  cancelUrl: string
  userId: string
}) {
  const stripe = await getStripe()
  if (!stripe) throw new Error('Stripe is not configured')
  return stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: params.priceId, quantity: 1 }],
    customer_email: params.customerEmail,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: { userId: params.userId },
  })
}

// ── Ziina ──
// Docs: https://docs.ziina.com

export async function createZiinaCheckout(params: {
  amountAed: number // in fils (1 AED = 100 fils)
  customerEmail: string
  successUrl: string
  cancelUrl: string
  userId: string
  message?: string
}) {
  const s = await getSettings(['payments.ziina.apiKey'])
  const key = s['payments.ziina.apiKey']
  if (!key) throw new Error('Ziina is not configured')

  const res = await fetch('https://api-v2.ziina.com/api/payment_intent', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      amount: params.amountAed,
      currency_code: 'AED',
      message: params.message ?? 'DocFlow Pro subscription',
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      test: process.env.NODE_ENV !== 'production',
      metadata: { userId: params.userId, email: params.customerEmail },
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Ziina error: ${err}`)
  }
  return res.json() as Promise<{ id: string; redirect_url: string }>
}
