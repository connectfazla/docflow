export const dynamic = 'force-dynamic'
import { getSettings } from '@/lib/settings'
import { maskSecret } from '@/lib/crypto'
import { PaymentsForm } from './client'

export default async function PaymentsPage() {
  const s = await getSettings([
    'payments.provider',
    'payments.stripe.secretKey',
    'payments.stripe.publishableKey',
    'payments.stripe.webhookSecret',
    'payments.ziina.apiKey',
    'payments.ziina.webhookSecret',
  ])
  return <PaymentsForm initial={{
    'payments.provider': s['payments.provider'] || 'free',
    'payments.stripe.secretKey':      s['payments.stripe.secretKey']      ? maskSecret(s['payments.stripe.secretKey']) : '',
    'payments.stripe.publishableKey': s['payments.stripe.publishableKey'] || '',
    'payments.stripe.webhookSecret':  s['payments.stripe.webhookSecret']  ? maskSecret(s['payments.stripe.webhookSecret']) : '',
    'payments.ziina.apiKey':          s['payments.ziina.apiKey']          ? maskSecret(s['payments.ziina.apiKey']) : '',
    'payments.ziina.webhookSecret':   s['payments.ziina.webhookSecret']   ? maskSecret(s['payments.ziina.webhookSecret']) : '',
  }} />
}