'use client'

import { useState } from 'react'
import {
  User, Building2, Bell, Shield, CreditCard, Palette,
  Save, Upload, Check, Eye, EyeOff, Trash2, Plus,
  Globe, Mail, Smartphone, Key, LogOut, AlertTriangle
} from 'lucide-react'
import { TopBar } from '@/components/layout/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppStore } from '@/store'
import { useSession } from 'next-auth/react'
import { cn, getInitials } from '@/lib/utils'

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'workspace', label: 'Workspace', icon: Building2 },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
]

export default function SettingsPage() {
  const { showToast } = useAppStore()
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const sessionName = session?.user?.name ?? 'Admin'
  const sessionEmail = session?.user?.email ?? ''

  // Profile state
  const [name, setName] = useState(sessionName)
  const [email, setEmail] = useState(sessionEmail)
  const [bio, setBio] = useState('Building great software and automating workflows.')
  const [phone, setPhone] = useState('+1 (555) 000-0000')
  const [timezone, setTimezone] = useState('America/New_York')

  // Workspace state
  const [workspaceName, setWorkspaceName] = useState('DocFlow Workspace')
  const [workspaceDomain, setWorkspaceDomain] = useState('docflow')
  const [workspaceSize, setWorkspaceSize] = useState('11-50')

  // Notifications state
  const [notifications, setNotifications] = useState({
    docSigned: true,
    docViewed: true,
    docExpiring: true,
    teamActivity: false,
    weeklyDigest: true,
    productUpdates: false,
    smsAlerts: false,
  })

  // Security state
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  const handleSave = () => {
    setSaved(true)
    showToast({ type: 'success', title: 'Settings saved', message: 'Your changes have been applied.' })
    setTimeout(() => setSaved(false), 2000)
  }

  const handlePasswordChange = () => {
    if (!currentPw || !newPw || newPw !== confirmPw) {
      showToast({ type: 'error', title: 'Password mismatch', message: 'New passwords do not match.' })
      return
    }
    showToast({ type: 'success', title: 'Password updated', message: 'Your password has been changed successfully.' })
    setCurrentPw('')
    setNewPw('')
    setConfirmPw('')
  }

  const planFeatures = {
    Business: ['Unlimited documents', 'Advanced analytics', 'AI assistant', 'API access', 'Custom branding', 'Priority support'],
  }

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Settings"
        actions={
          <Button size="sm" onClick={handleSave}>
            {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        }
      />

      <div className="flex min-h-[calc(100vh-57px)]">
        {/* Settings Sidebar */}
        <nav className="w-52 border-r border-slate-200 bg-white p-4 flex-shrink-0">
          <div className="space-y-0.5">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left',
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <tab.icon className={cn('w-4 h-4', activeTab === tab.id ? 'text-blue-600' : 'text-slate-400')} />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 p-8 max-w-3xl">

          {/* ── PROFILE ── */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Profile Settings</h2>
                <p className="text-sm text-slate-500 mt-1">Update your personal information and preferences.</p>
              </div>

              <Card className="p-6">
                <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-100">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{getInitials(name)}</span>
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{name}</h3>
                    <p className="text-sm text-slate-500">{email}</p>
                    <p className="text-xs text-slate-400 mt-0.5 capitalize">Super Admin · DocFlow Pro</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                    />
                  </div>
                  <Input label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} leftIcon={<Smartphone className="w-4 h-4" />} />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Timezone</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Signature Style</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['Draw', 'Type', 'Upload'].map((mode) => (
                    <button
                      key={mode}
                      className={cn(
                        'py-8 border-2 rounded-xl text-sm font-medium transition-all',
                        mode === 'Type' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      )}
                    >
                      {mode === 'Type' && (
                        <div className="text-2xl font-signature mb-1 italic" style={{ fontFamily: 'Georgia, serif' }}>{name.split(' ')[0]}</div>
                      )}
                      {mode}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* ── WORKSPACE ── */}
          {activeTab === 'workspace' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Workspace Settings</h2>
                <p className="text-sm text-slate-500 mt-1">Manage your organization settings and preferences.</p>
              </div>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">General</h3>
                <div className="space-y-4">
                  <Input label="Workspace name" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Workspace URL</label>
                    <div className="flex items-center">
                      <span className="px-3.5 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-sm text-slate-500">docflow.pro/</span>
                      <input
                        value={workspaceDomain}
                        onChange={(e) => setWorkspaceDomain(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Company size</label>
                    <select
                      value={workspaceSize}
                      onChange={(e) => setWorkspaceSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {['1-10', '11-50', '51-200', '201-500', '500+'].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Default Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Auto-remind unsigned recipients after 3 days', defaultChecked: true },
                    { label: 'Require email verification for all signers', defaultChecked: false },
                    { label: 'Allow recipients to decline documents', defaultChecked: true },
                    { label: 'CC me on all signed documents', defaultChecked: true },
                    { label: 'Attach signed PDF to completion email', defaultChecked: true },
                  ].map((setting) => (
                    <label key={setting.label} className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-slate-700">{setting.label}</span>
                      <div className="relative">
                        <input type="checkbox" defaultChecked={setting.defaultChecked} className="sr-only peer" />
                        <div className="w-10 h-6 bg-slate-200 rounded-full peer-checked:bg-blue-600 transition-colors cursor-pointer" />
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm peer-checked:translate-x-4 transition-transform" />
                      </div>
                    </label>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-red-200 bg-red-50/30">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Danger Zone
                </h3>
                <p className="text-sm text-red-700 mb-4">Permanently delete this workspace and all its data. This cannot be undone.</p>
                <Button variant="danger" size="sm">
                  <Trash2 className="w-4 h-4" /> Delete Workspace
                </Button>
              </Card>
            </div>
          )}

          {/* ── BRANDING ── */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Branding & White Label</h2>
                <p className="text-sm text-slate-500 mt-1">Customize the appearance of documents and signing pages.</p>
              </div>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Logo & Colors</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company logo</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl flex items-center justify-center">
                        <span className="text-white text-xl font-bold">AC</span>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <Upload className="w-4 h-4" /> Upload Logo
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">PNG or SVG, max 2MB, min 200×200px</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary color</label>
                      <div className="flex items-center gap-3">
                        <input type="color" defaultValue="#2563eb" className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer" />
                        <input defaultValue="#2563eb" className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Accent color</label>
                      <div className="flex items-center gap-3">
                        <input type="color" defaultValue="#7c3aed" className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer" />
                        <input defaultValue="#7c3aed" className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Email Customization</h3>
                <div className="space-y-4">
                  <Input label="Sender name" defaultValue="Acme Corp via DocFlow" />
                  <Input label="Reply-to email" defaultValue="contracts@acmecorp.com" type="email" />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email footer text</label>
                    <textarea
                      defaultValue="This document was securely sent via DocFlow Pro. Questions? Contact us at support@acmecorp.com"
                      rows={3}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300" />
                    <span className="text-sm text-slate-700">Hide "Powered by DocFlow" watermark</span>
                    <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">Business</span>
                  </label>
                </div>
              </Card>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
                <p className="text-sm text-slate-500 mt-1">Choose what updates you want to receive and how.</p>
              </div>

              {[
                {
                  section: 'Document Activity',
                  items: [
                    { key: 'docSigned', label: 'Document signed', desc: 'When a recipient signs your document' },
                    { key: 'docViewed', label: 'Document viewed', desc: 'When a recipient opens your document' },
                    { key: 'docExpiring', label: 'Document expiring', desc: '3 days before a document expires' },
                  ],
                },
                {
                  section: 'Team',
                  items: [
                    { key: 'teamActivity', label: 'Team activity', desc: 'When team members send or complete documents' },
                  ],
                },
                {
                  section: 'DocFlow Updates',
                  items: [
                    { key: 'weeklyDigest', label: 'Weekly digest', desc: 'Summary of your document activity every Monday' },
                    { key: 'productUpdates', label: 'Product updates', desc: 'New features and improvements' },
                  ],
                },
              ].map((group) => (
                <Card key={group.section} className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">{group.section}</h3>
                  <div className="space-y-4">
                    {group.items.map((item) => (
                      <label key={item.key} className="flex items-center justify-between cursor-pointer group">
                        <div>
                          <p className="text-sm font-medium text-slate-800">{item.label}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications((n) => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                          className={cn(
                            'relative w-11 h-6 rounded-full transition-colors flex-shrink-0',
                            notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-slate-200'
                          )}
                        >
                          <span className={cn(
                            'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform',
                            notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0.5'
                          )} />
                        </button>
                      </label>
                    ))}
                  </div>
                </Card>
              ))}

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Delivery Channels</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">Email</p>
                        <p className="text-xs text-slate-500">{email}</p>
                      </div>
                    </div>
                    <div className="w-11 h-6 bg-blue-600 rounded-full relative">
                      <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow-sm" />
                    </div>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">SMS Alerts</p>
                        <p className="text-xs text-slate-500">Critical signing events only</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifications((n) => ({ ...n, smsAlerts: !n.smsAlerts }))}
                      className={cn(
                        'relative w-11 h-6 rounded-full transition-colors',
                        notifications.smsAlerts ? 'bg-blue-600' : 'bg-slate-200'
                      )}
                    >
                      <span className={cn(
                        'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform',
                        notifications.smsAlerts ? 'translate-x-5' : 'translate-x-0.5'
                      )} />
                    </button>
                  </label>
                </div>
              </Card>
            </div>
          )}

          {/* ── SECURITY ── */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Security</h2>
                <p className="text-sm text-slate-500 mt-1">Manage your password, 2FA, and active sessions.</p>
              </div>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <Input
                    label="Current password"
                    type={showCurrentPw ? 'text' : 'password'}
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    rightIcon={
                      <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)}>
                        {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                  <Input
                    label="New password"
                    type={showNewPw ? 'text' : 'password'}
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    hint="Minimum 8 characters, include numbers and symbols"
                    rightIcon={
                      <button type="button" onClick={() => setShowNewPw(!showNewPw)}>
                        {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                  <Input
                    label="Confirm new password"
                    type="password"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    error={confirmPw && newPw !== confirmPw ? 'Passwords do not match' : undefined}
                  />
                  <Button variant="secondary" onClick={handlePasswordChange}>
                    <Key className="w-4 h-4" /> Update Password
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-900">Two-Factor Authentication</h3>
                  <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', twoFAEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                    {twoFAEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-4">Add an extra layer of security to your account with authenticator app or SMS verification.</p>
                <Button
                  variant={twoFAEnabled ? 'outline' : 'primary'}
                  onClick={() => {
                    setTwoFAEnabled(!twoFAEnabled)
                    showToast({
                      type: 'success',
                      title: twoFAEnabled ? '2FA disabled' : '2FA enabled',
                      message: twoFAEnabled ? 'Two-factor authentication has been turned off.' : 'Your account is now more secure.',
                    })
                  }}
                >
                  <Shield className="w-4 h-4" />
                  {twoFAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: 'MacBook Pro', location: 'New York, US', time: 'Current session', current: true },
                    { device: 'iPhone 15', location: 'New York, US', time: '2 hours ago', current: false },
                    { device: 'Chrome on Windows', location: 'Chicago, US', time: '3 days ago', current: false },
                  ].map((session) => (
                    <div key={session.device} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                          {session.device}
                          {session.current && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">This device</span>}
                        </p>
                        <p className="text-xs text-slate-400">{session.location} · {session.time}</p>
                      </div>
                      {!session.current && (
                        <button
                          onClick={() => showToast({ type: 'info', title: 'Session revoked', message: `${session.device} has been signed out.` })}
                          className="text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <LogOut className="w-4 h-4 text-red-500" /> Sign Out
                </h3>
                <p className="text-sm text-slate-500 mb-4">Sign out of your account on this device.</p>
                <Button variant="outline" onClick={() => window.location.href = '/login'}>
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </Card>
            </div>
          )}

          {/* ── BILLING ── */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Billing & Plan</h2>
                <p className="text-sm text-slate-500 mt-1">Manage your subscription, payment method, and invoices.</p>
              </div>

              <Card className="p-6 bg-gradient-to-br from-blue-600 to-violet-600 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium mb-1">Current plan</p>
                    <h3 className="text-2xl font-bold">Business</h3>
                    <p className="text-blue-200 mt-1">$79/user/month · Billed annually</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(planFeatures.Business || []).map((f) => (
                        <div key={f} className="flex items-center gap-1.5 text-sm text-blue-100">
                          <Check className="w-3.5 h-3.5 text-blue-300" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    Upgrade
                  </button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Usage This Month</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Documents sent', used: 41, limit: 'Unlimited' },
                    { label: 'Team members', used: 4, limit: 25 },
                    { label: 'Storage', used: 2.3, limit: 50, unit: 'GB' },
                    { label: 'API calls', used: 1847, limit: 50000 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-slate-700">{item.label}</span>
                        <span className="text-sm font-medium text-slate-900">
                          {item.used}{item.unit ? ` ${item.unit}` : ''} / {item.limit}{item.unit ? ` ${item.unit}` : ''}
                        </span>
                      </div>
                      {typeof item.limit === 'number' && (
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${Math.min(100, (Number(item.used) / item.limit) * 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Payment Method</h3>
                <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl mb-4">
                  <div className="w-12 h-8 bg-blue-700 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Visa ending in 4242</p>
                    <p className="text-xs text-slate-400">Expires 12/2027</p>
                  </div>
                  <button className="ml-auto text-sm text-blue-600 hover:text-blue-700 font-medium">Change</button>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-3.5 h-3.5" /> Add Payment Method
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Recent Invoices</h3>
                <div className="space-y-2">
                  {[
                    { date: 'Apr 1, 2026', amount: '$316.00', status: 'Paid' },
                    { date: 'Mar 1, 2026', amount: '$316.00', status: 'Paid' },
                    { date: 'Feb 1, 2026', amount: '$316.00', status: 'Paid' },
                  ].map((inv) => (
                    <div key={inv.date} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{inv.date}</p>
                        <p className="text-xs text-slate-400">Business Plan · 4 users</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-900">{inv.amount}</span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{inv.status}</span>
                        <button className="text-sm text-blue-600 hover:text-blue-700">PDF</button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Save Button at Bottom */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <Button onClick={handleSave} className="px-8">
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
