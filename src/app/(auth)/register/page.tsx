'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import {
  PenTool, Eye, EyeOff, ArrowRight, Mail, User, Building2, Check, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    docs: '5 docs / month',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29 / mo',
    docs: 'Unlimited docs',
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: '$79 / mo',
    docs: 'Unlimited + team',
    popular: false,
  },
]

function PasswordStrength({ password }: { password: string }) {
  const strength = Math.min(4, Math.floor(password.length / 2))
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-emerald-500']
  const labels = ['Weak', 'Fair', 'Good', 'Strong']

  if (!password) return null

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? colors[strength - 1] : 'bg-slate-200'}`}
          />
        ))}
      </div>
      <p className={`text-xs ${strength >= 3 ? 'text-emerald-600' : 'text-slate-400'}`}>
        {labels[strength - 1] ?? 'Too short'} — {8 - password.length > 0 ? `${8 - password.length} more chars needed` : 'password meets minimum length'}
      </p>
    </div>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('starter')

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
  })

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setStep(2)
  }

  const handleRegister = async () => {
    setLoading(true)
    setError('')

    try {
      // 1. Create account via API
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          plan: selectedPlan,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Registration failed. Please try again.')
        setLoading(false)
        return
      }

      // 2. Sign in automatically
      const signInResult = await signIn('credentials', {
        email: form.email.trim(),
        password: form.password,
        redirect: false,
      })

      if (signInResult?.error) {
        setError('Account created but sign-in failed. Please log in manually.')
        router.push('/login')
        return
      }

      // 3. Redirect to dashboard
      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex">
      {/* Left panel */}
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
              Start closing deals in minutes
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed">
              Join 50,000+ businesses that use DocFlow Pro to send, sign, and manage documents at scale.
            </p>
          </div>

          <div className="mt-12 space-y-5">
            {[
              { title: 'No credit card required', sub: 'Start free, upgrade when ready' },
              { title: 'Set up in under 5 minutes', sub: 'Templates, branding, done' },
              { title: 'ESIGN & eIDAS compliant', sub: 'Legally binding in 150+ countries' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{item.title}</p>
                  <p className="text-sm text-blue-300">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">

            {/* Mobile logo */}
            <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <PenTool className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900">DocFlow Pro</span>
            </Link>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step > s ? 'bg-emerald-500 text-white' : step === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  {s < 2 && <div className={`h-px w-10 transition-all ${step > s ? 'bg-emerald-400' : 'bg-slate-200'}`} />}
                </div>
              ))}
              <span className="ml-2 text-xs text-slate-400 font-medium">
                {step === 1 ? 'Your details' : 'Choose a plan'}
              </span>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            {/* ── Step 1: Account details ── */}
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h2>
                <p className="text-slate-500 text-sm mb-6">Get started free — no credit card needed</p>

                <form onSubmit={handleStep1} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={update('name')}
                        placeholder="Jane Smith"
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Work email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={update('email')}
                        placeholder="jane@company.com"
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Company <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={form.company}
                        onChange={update('company')}
                        placeholder="Acme Corp"
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={form.password}
                        onChange={update('password')}
                        placeholder="Min. 8 characters"
                        className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <PasswordStrength password={form.password} />
                  </div>

                  <Button type="submit" className="w-full justify-center mt-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </>
            )}

            {/* ── Step 2: Plan selection ── */}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Choose your plan</h2>
                <p className="text-slate-500 text-sm mb-6">Start free, upgrade anytime. Cancel whenever.</p>

                <div className="space-y-3 mb-6">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selectedPlan === plan.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            selectedPlan === plan.id ? 'border-blue-500' : 'border-slate-300'
                          }`}>
                            {selectedPlan === plan.id && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900 text-sm">{plan.name}</span>
                              {plan.popular && (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                  Popular
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-500">{plan.docs}</span>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900 text-sm">{plan.price}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full justify-center"
                    loading={loading}
                    onClick={handleRegister}
                  >
                    {!loading && <>Create account <ArrowRight className="w-4 h-4" /></>}
                  </Button>
                  <button
                    type="button"
                    onClick={() => { setStep(1); setError('') }}
                    className="w-full text-center text-sm text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    ← Back
                  </button>
                </div>
              </>
            )}

            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-slate-500 mt-4">
            By creating an account, you agree to our{' '}
            <Link href="#" className="text-slate-400 hover:text-slate-200">Terms</Link>
            {' '}and{' '}
            <Link href="#" className="text-slate-400 hover:text-slate-200">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
