'use client'
import { SettingForm } from '@/components/admin/setting-form'
import { useState } from 'react'

export function PaymentsForm({ initial }: { initial: Record<string, string> }) {
  const [provider, setProvider] = useState(initial['payments.provider'] || 'free')

  return (
    <div className="space-y-6">
      <SettingForm
        title="Active payment provider"
        description="Start on the Free plan. Switch to Stripe or Ziina once you’re ready to charge customers. Switching is non-destructive — existing subscriptions are preserved."
        fields={[{
          key: 'payments.provider', label: 'Provider', type: 'select',
          options: [
            { value: 'free',   label: 'Free — no billing (default)' },
            { value: 'stripe', label: 'Stripe (global)' },
            { value: 'ziina',  label: 'Ziina (UAE / MENA)' },
          ],
          hint: 'The selected provider will be used for all new checkouts.',
        }]}
        initialValues={{ 'payments.provider': provider }}
      />

      <div className={provider === 'stripe' ? '' : 'opacity-50 pointer-events-none'}>
        <SettingForm
          title="Stripe"
          description="Find your keys at https://dashboard.stripe.com/apikeys. Use restricted keys in production."
          fields={[
            { key: 'payments.stripe.secretKey',      label: 'Secret Key',      type: 'password', placeholder: 'sk_live_…' },
            { key: 'payments.stripe.publishableKey', label: 'Publishable Key', placeholder: 'pk_live_…' },
            { key: 'payments.stripe.webhookSecret',  label: 'Webhook Secret',  type: 'password', placeholder: 'whsec_…', hint: 'Point your Stripe webhook to /api/webhooks/stripe' },
          ]}
          initialValues={initial}
        />
      </div>

      <div className={provider === 'ziina' ? '' : 'opacity-50 pointer-events-none'}>
        <SettingForm
          title="Ziina"
          description="Get your API key from https://dashboard.ziina.com/api-keys. Ziina supports AED and regional payment methods (Apple Pay, cards)."
          fields={[
            { key: 'payments.ziina.apiKey',         label: 'API Key',        type: 'password', placeholder: 'zi_live_…' },
            { key: 'payments.ziina.webhookSecret',  label: 'Webhook Secret', type: 'password', placeholder: 'whsec_…', hint: 'Point your Ziina webhook to /api/webhooks/ziina' },
          ]}
          initialValues={initial}
        />
      </div>

      <div className="flex items-center gap-2 bg-white rounded-2xl border border-black/[0.06] p-4 text-xs text-slate-500">
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
        >
          <option value="free">Preview: Free</option>
          <option value="stripe">Preview: Stripe</option>
          <option value="ziina">Preview: Ziina</option>
        </select>
        <span>← Toggles which provider section is editable. (Actual value saved above.)</span>
      </div>
    </div>
  )
}
