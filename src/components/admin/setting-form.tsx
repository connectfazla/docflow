'use client'

import { useState } from 'react'
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export interface SettingField {
  key: string
  label: string
  type?: 'text' | 'password' | 'email' | 'number' | 'select' | 'textarea' | 'toggle'
  placeholder?: string
  hint?: string
  options?: { value: string; label: string }[]
  required?: boolean
}

export function SettingForm({
  title,
  description,
  fields,
  initialValues,
  onTest,
}: {
  title: string
  description?: string
  fields: SettingField[]
  initialValues: Record<string, string>
  onTest?: (values: Record<string, string>) => Promise<{ ok: boolean; error?: string }>
}) {
  const [values, setValues] = useState<Record<string, string>>(initialValues)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState<'ok' | 'err' | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ ok: boolean; error?: string } | null>(null)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }))

  const save = async () => {
    setSaving(true)
    setSaved(null)
    setErrorMsg('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error ?? 'Save failed')
      }
      setSaved('ok')
      setTimeout(() => setSaved(null), 2500)
    } catch (e: any) {
      setSaved('err')
      setErrorMsg(e.message)
    } finally {
      setSaving(false)
    }
  }

  const test = async () => {
    if (!onTest) return
    setTesting(true)
    setTestResult(null)
    try {
      const r = await onTest(values)
      setTestResult(r)
    } catch (e: any) {
      setTestResult({ ok: false, error: e.message })
    } finally {
      setTesting(false)
    }
  }

  return (
    <section className="bg-white rounded-2xl border border-black/[0.06]">
      <div className="p-6 border-b border-black/[0.05]">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h2>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>

      <div className="p-6 space-y-5">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
              {f.label}
              {f.required && <span className="text-red-500"> *</span>}
            </label>
            {f.type === 'select' ? (
              <select
                value={values[f.key] ?? ''}
                onChange={set(f.key)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{f.placeholder ?? 'Select…'}</option>
                {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea
                value={values[f.key] ?? ''}
                onChange={set(f.key)}
                placeholder={f.placeholder}
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : f.type === 'toggle' ? (
              <label className="inline-flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={values[f.key] === 'true'}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.checked ? 'true' : 'false' }))}
                  className="w-5 h-5 rounded"
                />
                <span className="text-sm text-slate-600">{f.hint}</span>
              </label>
            ) : (
              <input
                type={f.type ?? 'text'}
                value={values[f.key] ?? ''}
                onChange={set(f.key)}
                placeholder={f.placeholder}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            {f.hint && f.type !== 'toggle' && <p className="mt-1 text-xs text-slate-500">{f.hint}</p>}
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-black/[0.05] flex items-center justify-between">
        <div className="text-xs">
          {saved === 'ok' && <span className="text-emerald-600 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Saved</span>}
          {saved === 'err' && <span className="text-red-600 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> {errorMsg}</span>}
          {testResult?.ok && <span className="text-emerald-600 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Test succeeded</span>}
          {testResult?.error && <span className="text-red-600 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> {testResult.error}</span>}
        </div>
        <div className="flex items-center gap-2">
          {onTest && (
            <button
              onClick={test}
              disabled={testing}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Test connection'}
            </button>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save
          </button>
        </div>
      </div>
    </section>
  )
}
