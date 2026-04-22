'use client'

import { TopBar } from '@/components/layout/sidebar'
import { Card, StatCard } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/badge'
import { mockDocuments, chartData, pipelineData } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend,
  LineChart, Line
} from 'recharts'
import { TrendingUp, Users, Clock, CheckCircle, FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

const timeToSignData = [
  { template: 'NDA', hours: 18 },
  { template: 'Service Contract', hours: 32 },
  { template: 'Offer Letter', hours: 8 },
  { template: 'Sales Proposal', hours: 48 },
  { template: 'Invoice', hours: 12 },
]

const teamData = [
  { name: 'Alex M.', sent: 14, signed: 11, completion: 79 },
  { name: 'Sarah K.', sent: 9, signed: 8, completion: 89 },
  { name: 'James L.', sent: 12, signed: 9, completion: 75 },
  { name: 'Priya N.', sent: 6, signed: 6, completion: 100 },
]

export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Analytics"
        actions={
          <Button variant="outline" size="sm">
            <Download className="w-3.5 h-3.5" />
            Export Report
          </Button>
        }
      />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Period Selector */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Performance Overview</h2>
            <p className="text-sm text-slate-400 mt-0.5">April 2026 · Compared to March 2026</p>
          </div>
          <div className="flex items-center gap-2">
            {['7d', '30d', '90d', '12m'].map((period) => (
              <button
                key={period}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  period === '30d'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <StatCard label="Documents Sent" value="41" change={18} changeLabel="vs last month" icon={<FileText className="w-5 h-5" />} color="blue" />
          <StatCard label="Completion Rate" value="83%" change={5} changeLabel="vs last month" icon={<CheckCircle className="w-5 h-5" />} color="emerald" />
          <StatCard label="Avg. Time to Sign" value="22h" change={-12} changeLabel="vs last month" icon={<Clock className="w-5 h-5" />} color="amber" />
          <StatCard label="Active Recipients" value="38" change={9} changeLabel="vs last month" icon={<Users className="w-5 h-5" />} color="purple" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Volume Chart */}
          <Card className="xl:col-span-2 p-6">
            <h3 className="font-semibold text-slate-900 mb-1">Document Volume</h3>
            <p className="text-sm text-slate-400 mb-5">Monthly sent vs completed</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="sent" name="Sent" fill="#dbeafe" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Pipeline Breakdown */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-1">Pipeline</h3>
            <p className="text-sm text-slate-400 mb-5">Current status breakdown</p>
            <div className="space-y-3">
              {pipelineData.map((item) => {
                const total = pipelineData.reduce((a, b) => a + b.value, 0)
                const pct = Math.round((item.value / total) * 100)
                return (
                  <div key={item.name}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                        <span className="text-sm text-slate-700">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                        <span className="text-xs text-slate-400">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: item.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Time to Sign */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-1">Avg. Time to Sign by Template</h3>
            <p className="text-sm text-slate-400 mb-5">Hours from sent to signed</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={timeToSignData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="h" />
                <YAxis dataKey="template" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={90} />
                <Tooltip
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8 }}
                  formatter={(v) => [`${v}h`, 'Avg. time']}
                />
                <Bar dataKey="hours" radius={[0, 4, 4, 0]}>
                  {timeToSignData.map((_, i) => (
                    <Cell key={i} fill={i === 3 ? '#f59e0b' : '#3b82f6'} fillOpacity={0.8 - i * 0.05} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Team Performance */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-1">Team Performance</h3>
            <p className="text-sm text-slate-400 mb-5">This month's activity by team member</p>
            <div className="space-y-4">
              {teamData.map((member) => (
                <div key={member.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{member.name[0]}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-800">{member.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span><span className="font-semibold text-slate-800">{member.sent}</span> sent</span>
                      <span><span className="font-semibold text-slate-800">{member.signed}</span> signed</span>
                      <span className={`font-semibold ${member.completion >= 90 ? 'text-emerald-600' : member.completion >= 75 ? 'text-blue-600' : 'text-amber-600'}`}>
                        {member.completion}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${member.completion >= 90 ? 'bg-emerald-500' : member.completion >= 75 ? 'bg-blue-500' : 'bg-amber-500'}`}
                      style={{ width: `${member.completion}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
