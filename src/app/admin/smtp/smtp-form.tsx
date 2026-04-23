'use client'

import { useState } from 'react'
import { SettingForm } from '@/components/admin/setting-form'

export function SmtpForm({ initial }: { initial: Record<string, string> }) {
  const [testTo, setTestTo] = useState('')

  return (
    <div className="space-y-6">
      <SettingForm
        title="SMTP / Outbound Email"
        description="Used for sending signing invitations, notifications, and password resets."
        fields={[
          { key: 'smtp.host', label: 'SMTP Host', placeholder: 'smtp.mailgun.org', required: true },
          { key: 'smtp.port', label: 'Port',      type: 'number', placeholder: '587', required: true },
          { key: 'smtp.secure', label: 'Use TLS (SSL)', type: 'toggle', hint: 'Enable for port 465' },
          { key: 'smtp.user', label: 'Username' },
          { key: 'smtp.password', label: 'Password', type: 'password', hint: 'Leave untouched to keep the existing password' },
          { key: 'smtp.from', label: 'From Address', placeholder: 'DocFlow Pro <no-reply@docflow.pro>' },
        ]}
        initialValues={initial}
        onTest={async () => {
          if (!testTo) return { ok: false, error: 'Enter a test recipient first.' }
          const r = await fetch('/api/admin/smtp-test', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ to: testTo }),
          })
          const d = await r.json()
          return d
        }}
      />

      <div className="bg-white rounded-2xl border border-black/[0.06] p-6">
        <h3 className="text-sm font-semibold text-slate-900">Send test email</h3>
        <p className="text-xs text-slate-500 mt-1 mb-3">Save your settings first, then test-send to verify they work.</p>
        <div className="flex gap-2">
          <input
            value={testTo}
            onChange={(e) => setTestTo(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">Click “Test connection” above after entering a recipient.</p>
      </div>
    </div>
  )
}
