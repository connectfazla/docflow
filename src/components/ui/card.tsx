import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl border border-slate-200 shadow-sm',
        hover && 'hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-4 border-b border-slate-100', className)}>{children}</div>
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-4 border-t border-slate-100', className)}>{children}</div>
}

export function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon,
  color = 'blue',
}: {
  label: string
  value: string | number
  change: number
  changeLabel: string
  icon: React.ReactNode
  color?: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose'
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
    rose: 'bg-rose-50 text-rose-600',
  }

  const isPositive = change >= 0

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
          <div className="flex items-center gap-1 mt-2">
            <span className={cn('text-xs font-medium', isPositive ? 'text-emerald-600' : 'text-red-500')}>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}%
            </span>
            <span className="text-xs text-slate-400">{changeLabel}</span>
          </div>
        </div>
        <div className={cn('p-3 rounded-xl', colors[color])}>
          {icon}
        </div>
      </div>
    </Card>
  )
}
