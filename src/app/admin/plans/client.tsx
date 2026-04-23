'use client'

import { useState } from 'react'
import { Plus, Trash2, Save, Star, Loader2 } from 'lucide-react'

type PlanLite = {
  id: string
  slug: string
  name: string
  description: string
  priceMonthly: number
  priceYearly: number
  currency: string
  features: string[]
  docLimit: number
  teamLimit: number
  aiEnabled: boolean
  isActive: boolean
  isPopular: boolean
  sortOrder: number
  stripePriceId?: string | null
}

export function PlansManager({ initial }: { initial: PlanLite[] }) {
  const [plans, setPlans] = useState<PlanLite[]>(initial as any)
  const [savingId, setSavingId] = useState<string | null>(null)

  const update = (id: string, patch: Partial<PlanLite>) =>
    setPlans((ps) => ps.map((p) => p.id === id ? { ...p, ...patch } : p))

  const save = async (p: PlanLite) => {
    setSavingId(p.id)
    try {
      const res = await fetch('/api/admin/plans', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(p),
      })
      if (!res.ok) alert('Save failed')
    } finally { setSavingId(null) }
  }

  const remove = async (p: PlanLite) => {
    if (!confirm(`Delete plan "${p.name}"?`)) return
    const res = await fetch(`/api/admin/plans?id=${p.id}`, { method: 'DELETE' })
    if (res.ok) setPlans((ps) => ps.filter((x) => x.id !== p.id))
  }

  const add = async () => {
    const slug = prompt('Plan slug (e.g. enterprise)')
    if (!slug) return
    const name = prompt('Plan name', slug[0].toUpperCase() + slug.slice(1)) ?? slug
    const res = await fetch('/api/admin/plans', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug, name, sortOrder: plans.length + 1 }),
    })
    const data = await res.json()
    if (res.ok) setPlans((ps) => [...ps, data.plan])
    else alert(data.error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Plans &amp; Pricing</h1>
          <p className="text-sm text-slate-500 mt-1">Control what each tier offers and how it’s priced. Shown publicly on /pricing and signup.</p>
        </div>
        <button onClick={add} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-slate-900 text-white hover:bg-slate-800">
          <Plus className="w-4 h-4" /> New Plan
        </button>
      </div>

      <div className="space-y-3">
        {plans.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-black/[0.06] p-5">
            <div className="grid grid-cols-[1fr_auto] gap-6">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Name">
                  <input value={p.name} onChange={(e) => update(p.id, { name: e.target.value })} className={inp} />
                </Field>
                <Field label="Slug">
                  <input value={p.slug} disabled className={`${inp} bg-slate-50 text-slate-500`} />
                </Field>
                <Field label="Monthly price (cents)">
                  <input type="number" value={p.priceMonthly} onChange={(e) => update(p.id, { priceMonthly: Number(e.target.value) })} className={inp} />
                </Field>
                <Field label="Yearly price (cents)">
                  <input type="number" value={p.priceYearly} onChange={(e) => update(p.id, { priceYearly: Number(e.target.value) })} className={inp} />
                </Field>
                <Field label="Document limit (-1 = unlimited)">
                  <input type="number" value={p.docLimit} onChange={(e) => update(p.id, { docLimit: Number(e.target.value) })} className={inp} />
                </Field>
                <Field label="Team limit (-1 = unlimited)">
                  <input type="number" value={p.teamLimit} onChange={(e) => update(p.id, { teamLimit: Number(e.target.value) })} className={inp} />
                </Field>
                <Field label="Stripe Price ID (optional)">
                  <input value={p.stripePriceId ?? ''} onChange={(e) => update(p.id, { stripePriceId: e.target.value })} placeholder="price_…" className={inp} />
                </Field>
                <Field label="Sort order">
                  <input type="number" value={p.sortOrder} onChange={(e) => update(p.id, { sortOrder: Number(e.target.value) })} className={inp} />
                </Field>
                <Field label="Description" className="col-span-2">
                  <textarea value={p.description} onChange={(e) => update(p.id, { description: e.target.value })} className={`${inp} h-20 resize-none`} />
                </Field>
                <Field label="Features (one per line)" className="col-span-2">
                  <textarea
                    value={(p.features ?? []).join('\n')}
                    onChange={(e) => update(p.id, { features: e.target.value.split('\n').filter(Boolean) })}
                    className={`${inp} h-24 resize-none`}
                  />
                </Field>
              </div>

              <div className="flex flex-col gap-3 w-40">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" checked={p.isActive} onChange={(e) => update(p.id, { isActive: e.target.checked })} />
                  Active
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" checked={p.isPopular} onChange={(e) => update(p.id, { isPopular: e.target.checked })} />
                  <Star className="w-3.5 h-3.5 text-amber-500" /> Popular
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" checked={p.aiEnabled} onChange={(e) => update(p.id, { aiEnabled: e.target.checked })} />
                  AI enabled
                </label>

                <button
                  onClick={() => save(p)}
                  disabled={savingId === p.id}
                  className="mt-2 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {savingId === p.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save
                </button>
                <button onClick={() => remove(p)} className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const inp = 'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="block text-[12px] font-medium text-slate-500 mb-1">{label}</span>
      {children}
    </label>
  )
}
