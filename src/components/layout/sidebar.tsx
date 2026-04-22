'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileText, FileStack, BarChart2, Settings,
  PenTool, Users, Zap, ChevronDown, Plus, Search, X, LogOut
} from 'lucide-react'
import { cn, getInitials } from '@/lib/utils'
import { useAppStore } from '@/store'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Documents', href: '/documents', icon: FileText, countKey: 'documents' as const },
  { name: 'Templates', href: '/templates', icon: FileStack },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
]

const secondaryNav = [
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Integrations', href: '/integrations', icon: Zap },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { documents } = useAppStore()
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')

  const userName = session?.user?.name ?? 'Admin'
  const userEmail = session?.user?.email ?? ''
  const userInitials = getInitials(userName)

  const searchResults = searchQuery.length > 1
    ? documents.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : []

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col z-30">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
            <PenTool className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-lg leading-none">DocFlow</span>
            <span className="text-xs text-slate-400 block leading-none mt-0.5">Pro</span>
          </div>
        </Link>
      </div>

      {/* Workspace */}
      <div className="px-4 py-3 border-b border-slate-100">
        <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left">
          <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-violet-700 rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">DF</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">DocFlow Workspace</p>
            <p className="text-xs text-slate-400">Business Plan</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        </button>
      </div>

      {/* New Document CTA */}
      <div className="px-4 py-3">
        <Link
          href="/editor/new"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-200"
        >
          <Plus className="w-4 h-4" />
          New Document
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 pb-2 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder:text-slate-400 transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        {searchResults.length > 0 && (
          <div className="absolute left-4 right-4 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
            {searchResults.map((doc) => (
              <Link
                key={doc.id}
                href={`/documents/${doc.id}`}
                onClick={() => setSearchQuery('')}
                className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-700 truncate">{doc.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-1 overflow-y-auto">
        <div className="space-y-0.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const count = item.countKey === 'documents' ? documents.length : 0
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <item.icon className={cn('flex-shrink-0', isActive ? 'text-blue-600' : 'text-slate-400')} style={{ width: 18, height: 18 }} />
                {item.name}
                {count > 0 && (
                  <span className={cn('ml-auto text-xs px-2 py-0.5 rounded-full font-medium', isActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600')}>
                    {count}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Workspace</p>
          <div className="space-y-0.5">
            {secondaryNav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <item.icon style={{ width: 18, height: 18 }} className={cn('flex-shrink-0', isActive ? 'text-blue-600' : 'text-slate-400')} />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* User + Sign out */}
      <div className="px-4 py-4 border-t border-slate-100 space-y-1">
        <Link href="/settings" className="flex items-center gap-3 rounded-lg hover:bg-slate-50 px-2 py-2 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">{userInitials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{userName}</p>
            <p className="text-xs text-slate-400 truncate">{userEmail}</p>
          </div>
          <Settings style={{ width: 15, height: 15 }} className="text-slate-400" />
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}

// ── TopBar ────────────────────────────────────────────────────

interface TopBarProps {
  title: string
  actions?: React.ReactNode
}

export function TopBar({ title, actions }: TopBarProps) {
  return (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-100 px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

// ── AppLayout ─────────────────────────────────────────────────

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="pl-64 min-h-screen">{children}</main>
    </div>
  )
}
