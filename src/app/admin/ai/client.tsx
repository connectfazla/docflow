'use client'
import { SettingForm } from '@/components/admin/setting-form'

export function SettingFormClient({ initial }: { initial: Record<string, string> }) {
  return (
    <SettingForm
      title="AI Integration"
      description="Connect an OpenAI or Anthropic API key to enable AI-powered document generation throughout the app. Keys are encrypted at rest."
      fields={[
        {
          key: 'ai.provider', label: 'Provider', type: 'select',
          options: [
            { value: 'openai',    label: 'OpenAI (gpt-4o, gpt-4o-mini)' },
            { value: 'anthropic', label: 'Anthropic (Claude)' },
            { value: 'kimi',      label: 'Kimi / Moonshot AI (moonshot-v1-8k)' },
          ],
          hint: 'Pick the provider that matches your API key.',
        },
        { key: 'ai.apiKey', label: 'API Key', type: 'password', placeholder: 'sk-…', hint: 'Stored encrypted. Leave unchanged to keep existing key.' },
        { key: 'ai.model', label: 'Model (optional)', placeholder: 'gpt-4o-mini / claude-3-5-sonnet-latest / moonshot-v1-8k', hint: 'Defaults: gpt-4o-mini · claude-3-5-sonnet-latest · moonshot-v1-8k' },
      ]}
      initialValues={initial}
    />
  )
}
