export const dynamic = 'force-dynamic'
import { getSettings } from '@/lib/settings'
import { maskSecret } from '@/lib/crypto'
import { SmtpForm } from './smtp-form'

export default async function SmtpPage() {
  const s = await getSettings(['smtp.host', 'smtp.port', 'smtp.secure', 'smtp.user', 'smtp.password', 'smtp.from'])
  // Don't send raw secret to the client — send mask
  const initial = {
    'smtp.host': s['smtp.host'] ?? '',
    'smtp.port': s['smtp.port'] ?? '587',
    'smtp.secure': s['smtp.secure'] ?? 'false',
    'smtp.user': s['smtp.user'] ?? '',
    'smtp.password': s['smtp.password'] ? maskSecret(s['smtp.password']) : '',
    'smtp.from': s['smtp.from'] ?? '',
  }
  return <SmtpForm initial={initial} />
}