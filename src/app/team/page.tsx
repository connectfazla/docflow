'use client'

import { useState } from 'react'
import { UserPlus, MoreHorizontal, Mail, Shield, Crown, Search, X, Check, Users } from 'lucide-react'
import { TopBar } from '@/components/layout/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal, ModalBody, ModalFooter } from '@/components/ui/modal'
import { useAppStore } from '@/store'
import { cn, getInitials } from '@/lib/utils'

const roleColors: Record<string, string> = {
  owner: 'bg-amber-100 text-amber-700',
  admin: 'bg-purple-100 text-purple-700',
  manager: 'bg-blue-100 text-blue-700',
  member: 'bg-slate-100 text-slate-600',
  viewer: 'bg-green-100 text-green-700',
}

const mockTeam = [
  { id: 'u1', name: 'Alex Morgan', email: 'alex@company.com', role: 'owner', avatar: 'from-blue-400 to-blue-600', docsSent: 14, joined: '2025-09-01', lastActive: '2 min ago', status: 'active' },
  { id: 'u2', name: 'Sarah Kim', email: 'sarah@company.com', role: 'admin', avatar: 'from-pink-400 to-rose-500', docsSent: 9, joined: '2025-10-15', lastActive: '1h ago', status: 'active' },
  { id: 'u3', name: 'James Liu', email: 'james@company.com', role: 'manager', avatar: 'from-emerald-400 to-teal-600', docsSent: 12, joined: '2025-11-01', lastActive: '3h ago', status: 'active' },
  { id: 'u4', name: 'Priya Nair', email: 'priya@company.com', role: 'member', avatar: 'from-violet-400 to-purple-600', docsSent: 6, joined: '2026-01-10', lastActive: '1d ago', status: 'active' },
  { id: 'u5', name: 'Tom Walsh', email: 'tom@company.com', role: 'member', avatar: 'from-amber-400 to-orange-500', docsSent: 3, joined: '2026-02-20', lastActive: '5d ago', status: 'pending' },
]

const rolePermissions: Record<string, string[]> = {
  owner: ['Full access', 'Billing management', 'Delete workspace', 'Manage all members'],
  admin: ['Manage members', 'All document access', 'Template management', 'Integrations'],
  manager: ['View team documents', 'Manage team templates', 'Analytics access'],
  member: ['Send documents', 'Use templates', 'View own analytics'],
  viewer: ['View shared documents', 'View dashboards'],
}

export default function TeamPage() {
  const { showToast } = useAppStore()
  const [search, setSearch] = useState('')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('member')
  const [inviting, setInviting] = useState(false)

  const filtered = mockTeam.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleInvite = async () => {
    if (!inviteEmail.includes('@')) {
      showToast({ type: 'error', title: 'Invalid email', message: 'Please enter a valid email address.' })
      return
    }
    setInviting(true)
    await new Promise((r) => setTimeout(r, 1000))
    showToast({
      type: 'success',
      title: 'Invitation sent!',
      message: `${inviteEmail} has been invited as ${inviteRole}.`,
    })
    setInviting(false)
    setInviteOpen(false)
    setInviteEmail('')
  }

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Team"
        actions={
          <Button size="sm" onClick={() => setInviteOpen(true)}>
            <UserPlus className="w-3.5 h-3.5" /> Invite Member
          </Button>
        }
      />

      <div className="p-6 max-w-5xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total members', value: mockTeam.length, sub: '1 pending' },
            { label: 'Active this week', value: 4, sub: '80% of team' },
            { label: 'Docs sent (team)', value: 44, sub: 'This month' },
            { label: 'Avg. completion', value: '85%', sub: 'Signing rate' },
          ].map((stat) => (
            <Card key={stat.label} className="p-4">
              <p className="text-xs font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
          />
        </div>

        {/* Members Table */}
        <Card>
          <div className="px-6 py-3 border-b border-slate-100 grid grid-cols-12 gap-4 bg-slate-50 rounded-t-xl">
            <span className="col-span-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member</span>
            <span className="col-span-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</span>
            <span className="col-span-2 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:block">Docs Sent</span>
            <span className="col-span-2 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:block">Last Active</span>
            <span className="col-span-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filtered.map((member) => (
              <div key={member.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors group">
                <div className="col-span-4 flex items-center gap-3">
                  <div className={`w-9 h-9 bg-gradient-to-br ${member.avatar} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-sm font-bold">{getInitials(member.name)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{member.name}</p>
                    <p className="text-xs text-slate-400 truncate">{member.email}</p>
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center gap-1.5">
                    {member.role === 'owner' && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                    {member.role === 'admin' && <Shield className="w-3.5 h-3.5 text-purple-500" />}
                    <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full capitalize', roleColors[member.role])}>
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="col-span-2 hidden md:block">
                  <span className="text-sm text-slate-700 font-medium">{member.docsSent}</span>
                </div>

                <div className="col-span-2 hidden lg:block">
                  <span className="text-xs text-slate-500">{member.lastActive}</span>
                </div>

                <div className="col-span-2 flex items-center justify-between">
                  <span className={cn(
                    'text-xs font-medium px-2 py-0.5 rounded-full',
                    member.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  )}>
                    {member.status === 'active' ? 'Active' : 'Pending'}
                  </span>
                  {member.role !== 'owner' && (
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Role Permissions */}
        <div className="mt-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Role Permissions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {Object.entries(rolePermissions).map(([role, perms]) => (
              <Card key={role} className="p-4">
                <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full capitalize', roleColors[role])}>
                  {role}
                </span>
                <ul className="mt-3 space-y-1.5">
                  {perms.map((p) => (
                    <li key={p} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <Check className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite Team Member" size="md">
        <ModalBody className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="colleague@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin — Full workspace access</option>
              <option value="manager">Manager — Team documents & templates</option>
              <option value="member">Member — Own documents & templates</option>
              <option value="viewer">Viewer — View only</option>
            </select>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-800 font-medium mb-1">Permissions for {inviteRole}:</p>
            <ul className="space-y-0.5">
              {(rolePermissions[inviteRole] || []).map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-xs text-blue-700">
                  <Check className="w-3 h-3 text-blue-500" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
          <Button onClick={handleInvite} loading={inviting}>
            <Mail className="w-4 h-4" /> Send Invitation
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
