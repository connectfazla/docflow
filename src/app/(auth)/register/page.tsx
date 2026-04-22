'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PenTool, Eye, EyeOff, ArrowRight, GitBranch, Mail, User, Building2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  { id: 'starter', name: 'Starter', price: 'Free', docs: '5 docs/mo', color: 'slate' },
  { id: 'pro', name: 'Pro', price: '$29/mo', docs: 'Unlimited', color: 'blue', popular: true },
  { id: 'business', name: 'Business', price: '$79/mo', docs: 'Unlimited + team', color: 'violet' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('pro')

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
  })

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleRegister = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-1/2 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-400 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center border border-white/20">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">DocFlow Pro</span>
          </div>

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
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-blue-300">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <PenTool className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900">DocFlow Pro</span>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  {s < 2 && <div className={`h-px w-8 transition-all ${step > s ? 'bg-blue-600' : 'bg-slate-200'}`} />}
                </div>
              ))}
              <span className="ml-2 text-xs text-slate-400">{step === 1 ? 'Account info' : 'Choose plan'}</span>
            </div>

            {step === 1 ? (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h2>
                <p className="text-slate-500 text-sm mb-6">Get started for free — no credit card needed</p>

                {/* Social signup */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <GitBranch className="w-4 h-4" />
                    GitHub
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400 font-medium">or sign up with email</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

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
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
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
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Company name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={form.company}
                        onChange={update('company')}
                        placeholder="Acme Corp (optional)"
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
                        minLength={8}
                        value={form.password}
                        onChange={update('password')}
                        placeholder="Min. 8 characters"
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
                    {form.password.length > 0 && (
                      <div className="mt-2 flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              form.password.length >= i * 2
                                ? form.password.length >= 8 ? 'bg-emerald-500' : 'bg-amber-400'
                                : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full justify-center">
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </>
            ) : (
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
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            selectedPlan === plan.id ? 'border-blue-500' : 'border-slate-300'
                          }`}>
                            {selectedPlan === plan.id && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900 text-sm">{plan.name}</span>
                              {plan.popular && (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Popular</span>
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
                  <Button className="w-full justify-center" loading={loading} onClick={handleRegister}>
                    {!loading && <>Get started <ArrowRight className="w-4 h-4" /></>}
                  </Button>
                  <button
                    onClick={() => setStep(1)}
                    className="w-full text-center text-sm text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    ← Back
                  </button>
                </div>
              </>
            )}

            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in</Link>
            </p>
          </div>

          <p className="text-center text-xs text-slate-500 mt-4">
            By signing up, you agree to our{' '}
            <Link href="#" className="text-slate-600 hover:text-slate-800">Terms</Link>
            {' '}and{' '}
            <Link href="#" className="text-slate-600 hover:text-slate-800">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
