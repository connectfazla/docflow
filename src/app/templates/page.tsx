'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Star, Lock, FileText, Clock, TrendingUp, Sparkles } from 'lucide-react'
import { TopBar } from '@/components/layout/sidebar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store'
import { formatDate, cn } from '@/lib/utils'

const categories = ['All', 'Legal', 'Contracts', 'Sales', 'HR', 'Finance']

const categoryColors: Record<string, string> = {
  Legal: 'bg-purple-50 text-purple-700',
  Contracts: 'bg-blue-50 text-blue-700',
  Sales: 'bg-emerald-50 text-emerald-700',
  HR: 'bg-amber-50 text-amber-700',
  Finance: 'bg-rose-50 text-rose-700',
}

export default function TemplatesPage() {
  const { templates } = useAppStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = templates.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || t.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Templates"
        actions={
          <Button size="sm">
            <Plus className="w-3.5 h-3.5" />
            Create Template
          </Button>
        }
      />

      <div className="p-6 max-w-7xl mx-auto">
        {/* AI Template Banner */}
        <div className="mb-6 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-6 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-10 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-5 right-40 w-24 h-24 bg-white rounded-full blur-2xl" />
          </div>
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium text-blue-200">AI-Powered</span>
              </div>
              <h2 className="text-xl font-bold mb-1">Generate a Template with AI</h2>
              <p className="text-blue-100 text-sm max-w-md">Describe your document and our AI will create a complete, clause-correct template in seconds.</p>
            </div>
            <Button variant="secondary" size="md" className="flex-shrink-0 bg-white text-blue-700 hover:bg-blue-50">
              <Sparkles className="w-4 h-4" />
              Try AI Generator
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                'px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                category === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((template) => (
            <Card key={template.id} hover className="overflow-hidden">
              {/* Thumbnail */}
              <div className="h-36 bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-100 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 200px)',
                  }} />
                </div>
                <div className="relative z-10 text-center">
                  <div className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-2', categoryColors[template.category] || 'bg-slate-100 text-slate-600')}>
                    {template.category}
                  </div>
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                {template.isLocked && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center">
                    <Lock className="w-3 h-3 text-slate-500" />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{template.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4">{template.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {template.usageCount} uses
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(template.updatedAt)}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    Use Template
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {/* Create blank template */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-all cursor-pointer min-h-[240px]">
            <Plus className="w-8 h-8 mb-2" />
            <p className="text-sm font-medium">Blank Template</p>
            <p className="text-xs mt-1">Start from scratch</p>
          </div>
        </div>
      </div>
    </div>
  )
}
