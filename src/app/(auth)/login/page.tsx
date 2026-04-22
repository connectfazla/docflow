'use client'

import Link from 'next/link'
import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { PenTool, Eye, EyeOff, ArrowRight, Mail, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    } else {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <PenTool className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-slate-900">DocFlow Pro</span>
      </Link>

      <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
      <p className="text-slate-500 text-sm mb-8">Sign in to your admin account</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
          <span className="mt-0.5">⚠</span>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@docflow.pro"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full justify-center" loading={loading}>
          Sign in
          {!loading && <ArrowRight className="w-4 h-4" />}
        </Button>
      </form>

      <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-100">
        <p className="text-xs text-slate-500 text-center">
          🔐 Credentials are set via environment variables.<br />
          Contact your system administrator for access.
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-1/2 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-400 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <Link href="/" className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center border border-white/20">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">DocFlow Pro</span>
          </Link>

          <div className="max-w-sm">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Close deals faster with e-signatures
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed">
              Create, send, and sign documents in minutes. No printing, no scanning — just seamless document workflows.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {[
              { stat: '2.4M+', label: 'Documents signed' },
              { stat: '83%', label: 'Faster than paper' },
              { stat: '99.9%', label: 'Uptime guarantee' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="text-2xl font-bold text-white">{item.stat}</span>
                <span className="text-blue-300">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">Secure Admin Access</span>
            </div>
            <p className="text-xs text-blue-300">
              This portal is for authorized administrators only. All login attempts are logged.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Suspense fallback={
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center h-64">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <LoginForm />
          </Suspense>

          <p className="text-center text-xs text-slate-500 mt-4">
            <Link href="/" className="text-slate-400 hover:text-slate-200 transition-colors">← Back to homepage</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
