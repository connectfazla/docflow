import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions, isSuperAdmin } from '@/lib/auth'
import Link from 'next/link'
import { Settings, Mail, CreditCard, Sparkles, Users, Shield, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!isSuperAdmin((session?.user as any)?.role)) redirect('/dashboard')

  const nav = [
    { href: '/admin',            label: 'Overview',   icon: Shield },
    { href: '/admin/smtp',       label: 'Email / SMTP', icon: Mail },
    { href: '/admin/ai',         label: 'AI Settings', icon: Sparkles },
    { href: '/admin/payments',   label: 'Payments',   icon: CreditCard },
    { href: '/admin/plans',      label: 'Plans',      icon: CreditCard },
    { href: '/admin/users',      label: 'Users',      icon: Users },
    { href: '/admin/branding',   label: 'Branding',   icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4" /> Back to app
          </Link>
          <span className="text-[13px] font-semibold text-slate-900 tracking-tight">Admin Console</span>
          <span className="text-xs text-slate-500">{session?.user?.email}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-[220px_1fr] gap-10">
        <aside className="space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-black/5 transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
