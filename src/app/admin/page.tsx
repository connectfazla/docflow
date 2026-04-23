import Link from 'next/link'
import { db } from '@/lib/db'
import { getSettings } from '@/lib/settings'
import { Mail, CreditCard, Sparkles, Users, FileText, CheckCircle2, AlertCircle } from 'lucide-react'

async function getStats() {
  const [userCount, docCount, templateCount, planCount, settings] = await Promise.all([
    db.user.count(),
    db.document.count(),
    db.template.count(),
    db.plan.count(),
    getSettings(['smtp.host', 'ai.apiKey', 'payments.provider', 'payments.stripe.secretKey', 'payments.ziina.apiKey']),
  ])
  return {
    userCount, docCount, templateCount, planCount,
    smtpOk: !!settings['smtp.host'],
    aiOk: !!settings['ai.apiKey'],
    paymentsOk: settings['payments.provider'] === 'stripe'
      ? !!settings['payments.stripe.secretKey']
      : settings['payments.provider'] === 'ziina'
        ? !!settings['payments.ziina.apiKey']
        : true, // 'free' is always OK
    paymentsProvider: settings['payments.provider'] || 'free',
  }
}

export default async function AdminOverview() {
  const s = await getStats()

  const cards = [
    { label: 'Users',       value: s.userCount,     icon: Users,    href: '/admin/users' },
    { label: 'Documents',   value: s.docCount,      icon: FileText, href: '/dashboard' },
    { label: 'Templates',   value: s.templateCount, icon: FileText, href: '/templates' },
    { label: 'Plans',       value: s.planCount,     icon: CreditCard, href: '/admin/plans' },
  ]

  const integrations = [
    { label: 'SMTP',     ok: s.smtpOk,     href: '/admin/smtp',     icon: Mail,      hint: s.smtpOk ? 'Configured' : 'Not configured' },
    { label: 'AI',       ok: s.aiOk,       href: '/admin/ai',       icon: Sparkles,  hint: s.aiOk ? 'API key set' : 'API key missing' },
    { label: 'Payments', ok: s.paymentsOk, href: '/admin/payments', icon: CreditCard, hint: `Provider: ${s.paymentsProvider}` },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Admin Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Full control over your DocFlow Pro instance.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href}
            className="bg-white rounded-2xl p-5 border border-black/[0.06] hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 uppercase tracking-wider">{c.label}</span>
              <c.icon className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-3xl font-semibold text-slate-900 tracking-tight">{c.value}</div>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Integrations</h2>
        <div className="bg-white rounded-2xl border border-black/[0.06] divide-y divide-black/[0.05]">
          {integrations.map((i) => (
            <Link key={i.label} href={i.href}
              className="flex items-center justify-between p-4 hover:bg-black/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                  <i.icon className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{i.label}</div>
                  <div className="text-xs text-slate-500">{i.hint}</div>
                </div>
              </div>
              {i.ok ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" /> Ready
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
                  <AlertCircle className="w-4 h-4" /> Setup needed
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
