'use client'

import { cn } from '@/lib/utils'
import type { DocumentStatus } from '@/types'

const statusConfig: Record<DocumentStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-slate-100 text-slate-600 border-slate-200' },
  sent: { label: 'Sent', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  viewed: { label: 'Viewed', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  signed: { label: 'Signed', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  completed: { label: 'Completed', className: 'bg-green-50 text-green-700 border-green-200' },
  declined: { label: 'Declined', className: 'bg-red-50 text-red-700 border-red-200' },
  expired: { label: 'Expired', className: 'bg-gray-100 text-gray-500 border-gray-200' },
}

interface StatusBadgeProps {
  status: DocumentStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      config.className,
      className
    )}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {config.label}
    </span>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger'
  className?: string
}

const badgeVariants = {
  default: 'bg-blue-600 text-white',
  secondary: 'bg-slate-100 text-slate-700',
  outline: 'border border-slate-200 text-slate-600',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      badgeVariants[variant],
      className
    )}>
      {children}
    </span>
  )
}
