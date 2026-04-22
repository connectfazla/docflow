'use client'

import { useState } from 'react'
import { Check, ExternalLink, Plus, Settings, Zap, RefreshCw } from 'lucide-react'
import { TopBar } from '@/components/layout/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Modal, ModalBody, ModalFooter } from '@/components/ui/modal'
import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'

const integrations = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Auto-fill contacts, companies, and deals. Trigger document sends from HubSpot workflows.',
    category: 'CRM',
    logo: '🟠',
    color: 'from-orange-400 to-orange-600',
    connected: true,
    popular: true,
    features: ['Auto-fill contact data', 'Trigger from workflows', 'Sync signed documents', 'Track in HubSpot'],
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Connect your Salesforce CRM to auto-populate fields and sync document status.',
    category: 'CRM',
    logo: '☁️',
    color: 'from-blue-400 to-blue-600',
    connected: false,
    popular: true,
    features: ['Opportunity sync', 'Contact auto-fill', 'Document status sync', 'AppExchange listing'],
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Collect payments directly inside your documents with embedded payment blocks.',
    category: 'Payments',
    logo: '💳',
    color: 'from-violet-400 to-violet-600',
    connected: true,
    popular: true,
    features: ['Embedded payment blocks', 'Subscriptions', 'Multi-currency', 'Webhooks'],
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get instant Slack notifications when documents are viewed, signed, or need approval.',
    category: 'Notifications',
    logo: '💬',
    color: 'from-purple-400 to-pink-500',
    connected: true,
    popular: false,
    features: ['Signing notifications', 'Approval requests', 'Custom channels', 'Bot commands'],
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect DocFlow to 6,000+ apps with no-code automation workflows.',
    category: 'Automation',
    logo: '⚡',
    color: 'from-amber-400 to-orange-500',
    connected: false,
    popular: true,
    features: ['Trigger on sign', 'Create documents', 'Add recipients', '6,000+ app connections'],
  },
  {
    id: 'googledrive',
    name: 'Google Drive',
    description: 'Import files from Drive and automatically save completed documents.',
    category: 'Storage',
    logo: '📁',
    color: 'from-blue-400 to-green-500',
    connected: false,
    popular: false,
    features: ['Import DOCX/PDF', 'Auto-save completed', 'Folder organization', 'Real-time sync'],
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    description: 'Auto-populate deal and contact information from your Pipedrive pipeline.',
    category: 'CRM',
    logo: '🎯',
    color: 'from-teal-400 to-emerald-600',
    connected: false,
    popular: false,
    features: ['Deal auto-fill', 'Contact merge', 'Activity logging'],
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Receive document alerts and approval requests directly in Teams channels.',
    category: 'Notifications',
    logo: '🟦',
    color: 'from-blue-600 to-indigo-700',
    connected: false,
    popular: false,
    features: ['Channel notifications', 'Adaptive cards', 'Approval flow'],
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Sync invoice documents and payment status with QuickBooks accounting.',
    category: 'Finance',
    logo: '🟩',
    color: 'from-green-500 to-green-700',
    connected: false,
    popular: false,
    features: ['Invoice sync', 'Payment tracking', 'Client matching'],
  },
]

const categories = ['All', 'CRM', 'Payments', 'Automation', 'Notifications', 'Storage', 'Finance']

export default function IntegrationsPage() {
  const { showToast } = useAppStore()
  const [activeCategory, setActiveCategory] = useState('All')
  const [connected, setConnected] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map((i) => [i.id, i.connected]))
  )
  const [configuring, setConfiguring] = useState<string | null>(null)
  const [connecting, setConnecting] = useState<string | null>(null)

  const filtered = integrations.filter(
    (i) => activeCategory === 'All' || i.category === activeCategory
  )

  const handleConnect = async (id: string) => {
    setConnecting(id)
    await new Promise((r) => setTimeout(r, 1200))
    setConnected((c) => ({ ...c, [id]: !c[id] }))
    const integration = integrations.find((i) => i.id === id)!
    showToast({
      type: connected[id] ? 'info' : 'success',
      title: connected[id] ? `${integration.name} disconnected` : `${integration.name} connected!`,
      message: connected[id] ? 'Integration has been removed.' : 'Your integration is now active.',
    })
    setConnecting(null)
  }

  const configIntegration = integrations.find((i) => i.id === configuring)

  return (
    <div className="animate-fade-in">
      <TopBar title="Integrations" />

      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Connect Your Tools</h2>
            <p className="text-sm text-slate-500 mt-1">
              {Object.values(connected).filter(Boolean).length} of {integrations.length} integrations active
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              {Object.values(connected).filter(Boolean).length} Connected
            </div>
          </div>
        </div>

        {/* API Key Card */}
        <Card className="p-5 mb-6 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">REST API</p>
              <h3 className="text-white font-semibold">Build Custom Integrations</h3>
              <p className="text-slate-400 text-sm mt-0.5">Full CRUD API with OAuth2 and webhooks.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-700 rounded-lg px-4 py-2">
                <code className="text-slate-300 text-sm font-mono">dfp_live_••••••••••••4k9x</code>
              </div>
              <Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-0">
                <ExternalLink className="w-3.5 h-3.5" /> API Docs
              </Button>
            </div>
          </div>
        </Card>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((integration) => (
            <Card key={integration.id} className="p-5 relative">
              {integration.popular && (
                <span className="absolute top-4 right-4 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Popular</span>
              )}
              <div className="flex items-start gap-3 mb-4">
                <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl flex-shrink-0', integration.color)}>
                  {integration.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{integration.name}</h3>
                    {connected[integration.id] && (
                      <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" title="Connected" />
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{integration.category}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4 leading-relaxed">{integration.description}</p>

              <ul className="space-y-1 mb-5">
                {integration.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2">
                <Button
                  variant={connected[integration.id] ? 'outline' : 'primary'}
                  size="sm"
                  loading={connecting === integration.id}
                  onClick={() => handleConnect(integration.id)}
                  className={cn('flex-1 justify-center', connected[integration.id] && 'border-emerald-200 text-emerald-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200')}
                >
                  {connected[integration.id] ? (
                    <><Check className="w-3.5 h-3.5" /> Connected</>
                  ) : (
                    <><Plus className="w-3.5 h-3.5" /> Connect</>
                  )}
                </Button>
                {connected[integration.id] && (
                  <Button variant="ghost" size="icon" onClick={() => setConfiguring(integration.id)}>
                    <Settings className="w-4 h-4 text-slate-500" />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Config Modal */}
      {configIntegration && (
        <Modal
          open={!!configuring}
          onClose={() => setConfiguring(null)}
          title={`${configIntegration.name} Settings`}
          description="Configure your integration settings"
          size="md"
        >
          <ModalBody className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm text-emerald-800 font-medium">Connected and syncing</span>
              <button
                onClick={() => showToast({ type: 'info', title: 'Syncing...', message: 'Re-syncing data from ' + configIntegration.name })}
                className="ml-auto text-emerald-700 hover:text-emerald-900"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Sync frequency</label>
              <select className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Real-time (webhooks)</option>
                <option>Every 15 minutes</option>
                <option>Every hour</option>
                <option>Daily</option>
              </select>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Sync options</p>
              {['Auto-fill from contacts', 'Sync signed documents back', 'Log document events', 'Trigger automation on sign'].map((opt) => (
                <label key={opt} className="flex items-center gap-2.5 py-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                  <span className="text-sm text-slate-700">{opt}</span>
                </label>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setConfiguring(null)}>Close</Button>
            <Button onClick={() => {
              showToast({ type: 'success', title: 'Settings saved', message: configIntegration.name + ' configuration updated.' })
              setConfiguring(null)
            }}>
              Save Settings
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  )
}
