'use client'

import { useState } from 'react'
import { Trash2, Loader2, Shield, User as UserIcon } from 'lucide-react'

type UserRow = {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN' | 'SUPERADMIN'
  plan: 'STARTER' | 'PRO' | 'BUSINESS' | 'ENTERPRISE'
  company: string | null
  createdAt: string
  lastLoginAt: string | null
  docCount: number
}

export function UsersManager({ initial }: { initial: UserRow[] }) {
  const [users, setUsers] = useState<UserRow[]>(initial)
  const [busy, setBusy] = useState<string | null>(null)

  const update = async (u: UserRow, patch: Partial<UserRow>) => {
    setBusy(u.id)
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: u.id, ...patch }),
      })
      if (res.ok) setUsers((us) => us.map((x) => x.id === u.id ? { ...x, ...patch } : x))
    } finally { setBusy(null) }
  }

  const remove = async (u: UserRow) => {
    if (!confirm(`Delete ${u.email}? This also deletes their documents.`)) return
    setBusy(u.id)
    try {
      const res = await fetch(`/api/admin/users?id=${u.id}`, { method: 'DELETE' })
      if (res.ok) setUsers((us) => us.filter((x) => x.id !== u.id))
    } finally { setBusy(null) }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Users</h1>
        <p className="text-sm text-slate-500 mt-1">{users.length} total accounts.</p>
      </div>

      <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[12px] uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3 font-medium">User</th>
              <th className="text-left px-4 py-3 font-medium">Role</th>
              <th className="text-left px-4 py-3 font-medium">Plan</th>
              <th className="text-left px-4 py-3 font-medium">Docs</th>
              <th className="text-left px-4 py-3 font-medium">Last Login</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.05]">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${u.role === 'SUPERADMIN' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                      {u.role === 'SUPERADMIN' ? <Shield className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={u.role}
                    onChange={(e) => update(u, { role: e.target.value as UserRow['role'] })}
                    disabled={u.role === 'SUPERADMIN'}
                    className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="SUPERADMIN">Superadmin</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={u.plan}
                    onChange={(e) => update(u, { plan: e.target.value as UserRow['plan'] })}
                    className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                  >
                    <option value="STARTER">Starter</option>
                    <option value="PRO">Pro</option>
                    <option value="BUSINESS">Business</option>
                    <option value="ENTERPRISE">Enterprise</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-slate-500">{u.docCount}</td>
                <td className="px-4 py-3 text-slate-500">
                  {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  {busy === u.id ? (
                    <Loader2 className="w-4 h-4 animate-spin inline text-slate-400" />
                  ) : u.role !== 'SUPERADMIN' ? (
                    <button onClick={() => remove(u)} className="text-red-600 hover:bg-red-50 rounded-lg p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
