'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { useEffect } from 'react'
import { useAppStore } from '@/store'

function HydrationBridge({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const hydrate = useAppStore((s) => s.hydrate)

  useEffect(() => {
    if (status === 'authenticated') hydrate()
  }, [status, hydrate])

  return <>{children}</>
}

export function Providers({ children, session }: { children: React.ReactNode; session?: Session | null }) {
  return (
    <SessionProvider session={session}>
      <HydrationBridge>{children}</HydrationBridge>
    </SessionProvider>
  )
}
