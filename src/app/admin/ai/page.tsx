import { getSettings } from '@/lib/settings'
import { maskSecret } from '@/lib/crypto'
import { SettingFormClient } from './client'

export default async function AiPage() {
  const s = await getSettings(['ai.provider', 'ai.apiKey', 'ai.model'])
  return <SettingFormClient
    initial={{
      'ai.provider': s['ai.provider'] || 'openai',
      'ai.apiKey': s['ai.apiKey'] ? maskSecret(s['ai.apiKey']) : '',
      'ai.model': s['ai.model'] || '',
    }}
  />
}
