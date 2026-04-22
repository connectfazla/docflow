'use client'

import Link from 'next/link'
import {
  FileText, Clock, CheckCircle, TrendingUp, Eye, Send,
  ArrowRight, ChevronRight, Zap
} from 'lucide-react'
import { TopBar } from '@/components/layout/sidebar'
import { Card, StatCard } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store'
import { mockActivity, chartData, pipelineData } from '@/lib/mock-data'
import { formatRelative } from '@/lib/utils'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts'

const activityIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  sent: { icon: <Send className="w-3.5 h-3.5" />, color: 'text-blue-600 bg-blue-100' },
  viewed: { icon: <Eye className="w-3.5 h-3.5" />, color: 'text-amber-600 bg-amber-100' },
  signed: { icon: <CheckCircle className="w-3.5 h-3.5" />, color: 'text-emerald-600 bg-emerald-100' },
  completed: { icon: <CheckCircle className="w-3.5 h-3.5" />, color: 'text-green-600 bg-green-100' },
  declined: { icon: <FileText className="w-3.5 h-3.5" />, color: 'text-red-600 bg-red-100' },
  created: { icon: <FileText className="w-3.5 h-3.5" />, color: 'text-slate-600 bg-slate-100' },
  commented: { icon: <FileText className="w-3.5 h-3.5" />, color: 'text-purple-600 bg-purple-100' },
}

export default function DashboardPage() {
  const { documents, user } = useAppStore()

  const recentDocs = documents.slice(0, 5)
  const needsAttention = documents.filter(d => d.status === 'viewed' || d.status === 'sent').slice(0, 3)

  const totalDocs = documents.length
  const awaitingSig = documents.filter(d => d.status === 'sent' || d.status === 'viewed').length
  const completed = documents.filter(d => d.status === 'completed').length
  const completionRate = totalDocs > 0
    ? Math.round((documents.filter(d => d.status === 'completed' || d.status === 'signed').length / totalDocs) * 100)
    : 0

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = user.name.split(' ')[0]

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Dashboard"
        actions={
          <Link href="/editor/new">
            <Button size="sm">
              <FileText className="w-3.5 h-3.5" />
              New Document
            </Button>
          </Link>
        }
      />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">{greeting}, {firstName} 👋</h2>
          <p className="text-slate-500 mt-1">
            You have{' '}
            <span className="font-semibold text-slate-700">{awaitingSig} document{awaitingSig !== 1 ? 's' : ''}</span>{' '}
            awaiting action today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Documents"
            value={String(totalDocs)}
            change={12}
            changeLabel="vs last month"
            icon={<FileText className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            label="Awaiting Signature"
            value={String(awaitingSig)}
            change={-8}
            changeLabel="vs last month"
            icon={<Clock className="w-5 h-5" />}
            color="amber"
          />
          <StatCard
            label="Completed This Month"
            value={String(completed)}
            change={21}
            changeLabel="vs last month"
            icon={<CheckCircle className="w-5 h-5" />}
            color="emerald"
          />
          <StatCard
            label="Completion Rate"
            value={`${completionRate}%`}
            change={5}
            changeLabel="vs last month"
            icon={<TrendingUp className="w-5 h-5" />}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Activity Chart */}
          <Card className="xl:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-slate-900">Document Activity</h3>
                <p className="text-sm text-slate-400 mt-0.5">Sent, signed & completed</p>
              </div>
              <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 6 months</option>
                <option>Last 3 months</option>
                <option>Last year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                <defs>
                  <linearGradient id="sent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="signed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="completed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ color: '#0f172a', fontWeight: 600 }}
                  itemStyle={{ color: '#475569', fontSize: 12 }}
                />
                <Area type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={2} fill="url(#sent)" name="Sent" />
                <Area type="monotone" dataKey="signed" stroke="#10b981" strokeWidth={2} fill="url(#signed)" name="Signed" />
                <Area type="monotone" dataKey="completed" stroke="#6366f1" strokeWidth={2} fill="url(#completed)" name="Completed" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-5 mt-2">
              {[
                { color: '#3b82f6', label: 'Sent' },
                { color: '#10b981', label: 'Signed' },
                { color: '#6366f1', label: 'Completed' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-slate-500">{item.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Pipeline */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-1">Pipeline Status</h3>
            <p className="text-sm text-slate-400 mb-5">Current document stages</p>
            <div className="flex justify-center mb-4">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={pipelineData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5">
              {pipelineData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Documents */}
          <Card className="xl:col-span-2">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Recent Documents</h3>
              <Link href="/documents" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {recentDocs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
                  <FileText className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-600">No documents yet</p>
                <p className="text-xs text-slate-400 mt-1 mb-4">Create your first document to get started</p>
                <Link href="/editor/new">
                  <Button size="sm" variant="outline">Create Document</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentDocs.map((doc) => (
                  <Link key={doc.id} href={`/documents/${doc.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <StatusBadge status={doc.status} />
                        <span className="text-xs text-slate-400">{formatRelative(doc.updatedAt)}</span>
                        {doc.recipients.length > 0 && (
                          <span className="text-xs text-slate-400">{doc.recipients.length} recipient{doc.recipients.length > 1 ? 's' : ''}</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            )}
          </Card>

          {/* Activity Feed */}
          <Card>
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Activity</h3>
            </div>
            <div className="p-4 space-y-3">
              {mockActivity.slice(0, 6).map((activity) => {
                const config = activityIcons[activity.type] ?? activityIcons.created
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${config.color}`}>
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <span className="font-medium text-slate-800">{activity.actorName}</span>{' '}
                        <span className="text-slate-500">{activity.type}</span>{' '}
                        <span className="font-medium text-slate-800 truncate">{activity.documentTitle}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{formatRelative(activity.timestamp)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Needs Attention Banner */}
        {needsAttention.length > 0 && (
          <Card className="mt-6 border-amber-200 bg-amber-50/30">
            <div className="px-6 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-amber-600" />
                <h3 className="font-semibold text-amber-900 text-sm">Needs Your Attention</h3>
              </div>
              <div className="space-y-2">
                {needsAttention.map((doc) => (
                  <Link key={doc.id} href={`/documents/${doc.id}`} className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-100 hover:border-amber-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-amber-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{doc.title}</p>
                        <p className="text-xs text-slate-400">Sent {formatRelative(doc.sentAt ?? doc.updatedAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={doc.status} />
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
