import Link from 'next/link'
import {
  PenTool, FileText, Send, CheckCircle, Shield, Zap, Users, BarChart3,
  ArrowRight, Check, Star, Globe, Lock, Clock, ChevronRight, Play,
  FileSignature, Sparkles, Building2, Award
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Smart Document Editor',
    desc: 'Rich-text editor with tables, images, e-signature fields, and AI-powered content suggestions.',
    color: 'bg-blue-500',
  },
  {
    icon: Send,
    title: 'Send in One Click',
    desc: 'Email or shareable link with role-based access — signer, viewer, or approver.',
    color: 'bg-violet-500',
  },
  {
    icon: FileSignature,
    title: 'E-Sign Anywhere',
    desc: 'Draw, type, or upload signatures from any device. ESIGN & eIDAS compliant.',
    color: 'bg-emerald-500',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    desc: 'Track open rates, signing velocity, and team performance with live dashboards.',
    color: 'bg-amber-500',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    desc: 'Roles and permissions for every team member — owner, admin, manager, and more.',
    color: 'bg-pink-500',
  },
  {
    icon: Zap,
    title: '9+ Integrations',
    desc: 'Connect HubSpot, Stripe, Zapier, Slack, Salesforce and more in one click.',
    color: 'bg-orange-500',
  },
]

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    sub: 'forever',
    desc: 'Perfect for freelancers and individuals.',
    features: ['5 documents / month', '3 templates', 'Basic e-signatures', 'Email support'],
    cta: 'Get started free',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$29',
    sub: '/ month',
    desc: 'Everything you need to grow your business.',
    features: ['Unlimited documents', 'Unlimited templates', 'Advanced analytics', 'Team collaboration', 'All integrations', 'Priority support'],
    cta: 'Start free trial',
    href: '/register',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: '$79',
    sub: '/ month',
    desc: 'For larger teams with advanced needs.',
    features: ['Everything in Pro', 'White-label branding', 'Custom domain', 'SSO / SAML', 'Dedicated CSM', 'SLA guarantee'],
    cta: 'Contact sales',
    href: '/register',
    highlight: false,
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Head of Sales, TechCorp',
    avatar: 'SC',
    color: 'from-blue-400 to-blue-600',
    text: 'We went from 3 days to 3 hours per contract cycle. DocFlow Pro is the best investment we made this year.',
  },
  {
    name: 'Marcus Williams',
    role: 'Founder, Apex Legal',
    avatar: 'MW',
    color: 'from-emerald-400 to-teal-600',
    text: 'The ESIGN compliance and audit trail give our clients confidence. We\'ve signed over 500 contracts without a single dispute.',
  },
  {
    name: 'Priya Nair',
    role: 'Operations Lead, Growthly',
    avatar: 'PN',
    color: 'from-violet-400 to-purple-600',
    text: 'The HubSpot integration alone saves our team 4 hours a week. Auto-filled contact data is a game changer.',
  },
]

const stats = [
  { value: '50,000+', label: 'Businesses trust DocFlow' },
  { value: '2.4M+', label: 'Documents signed' },
  { value: '83%', label: 'Faster than paper' },
  { value: '99.9%', label: 'Uptime SLA' },
]

const logos = ['Acme Corp', 'TechVentures', 'Apex Legal', 'Growthly', 'NovaCo', 'BuildFast']

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ───────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
              <PenTool className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">DocFlow Pro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors">Testimonials</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
            >
              Get started free
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute top-40 right-0 w-72 h-72 bg-violet-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute top-60 left-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Now with AI-powered document generation
            <ChevronRight className="w-3.5 h-3.5" />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
            Documents that{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
                close deals
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 9C50 3 100 1 150 4C200 7 250 9 298 6" stroke="url(#u)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="u" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="#2563eb"/>
                    <stop offset="0.5" stopColor="#7c3aed"/>
                    <stop offset="1" stopColor="#2563eb"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Create, send, track, and e-sign documents in minutes — not days.
            The all-in-one platform that replaces PandaDoc, DocuSign, and your email inbox.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/register"
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-lg"
            >
              Start for free <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center gap-2.5 px-6 py-4 text-slate-700 font-medium hover:text-slate-900 transition-colors">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-slate-600 ml-0.5" />
              </div>
              Watch 2-min demo
            </button>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            {[
              { icon: Shield, text: 'ESIGN & eIDAS compliant' },
              { icon: Lock, text: 'SOC 2 Type II' },
              { icon: Globe, text: 'GDPR ready' },
              { icon: Clock, text: 'No credit card required' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-emerald-500" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Hero screenshot mockup */}
        <div className="relative max-w-6xl mx-auto px-6 mt-16">
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-400 max-w-xs mx-auto text-center">
                  app.docflow.pro/dashboard
                </div>
              </div>
            </div>
            {/* Dashboard preview */}
            <div className="flex h-64 sm:h-80 lg:h-96 bg-slate-50">
              {/* Sidebar preview */}
              <div className="w-48 border-r border-slate-200 bg-white p-4 hidden sm:block">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-blue-600 rounded-md" />
                  <div className="h-3 bg-slate-800 rounded w-20" />
                </div>
                {[80, 60, 70, 55].map((w, i) => (
                  <div key={i} className={`flex items-center gap-2 px-2 py-1.5 mb-1 rounded-lg ${i === 0 ? 'bg-blue-50' : ''}`}>
                    <div className={`w-4 h-4 rounded ${i === 0 ? 'bg-blue-500' : 'bg-slate-200'}`} />
                    <div className={`h-2.5 rounded ${i === 0 ? 'bg-blue-300' : 'bg-slate-200'}`} style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
              {/* Main content preview */}
              <div className="flex-1 p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {['blue', 'amber', 'emerald', 'violet'].map((color, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-3">
                      <div className={`w-6 h-6 rounded-lg bg-${color}-100 mb-2`} />
                      <div className="h-5 bg-slate-800 rounded w-10 mb-1" />
                      <div className="h-2 bg-slate-200 rounded w-16" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-4 h-32">
                    <div className="h-2.5 bg-slate-200 rounded w-24 mb-3" />
                    <div className="flex items-end gap-1 h-16">
                      {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-100 rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-4 h-32">
                    <div className="h-2.5 bg-slate-200 rounded w-16 mb-3" />
                    {[60, 40, 30, 20].map((w, i) => (
                      <div key={i} className="flex items-center gap-2 mb-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <div className="h-2 bg-slate-100 rounded flex-1" style={{ width: `${w}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow under */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-blue-400/20 blur-2xl rounded-full" />
        </div>
      </section>

      {/* ── Social proof logos ───────────────────── */}
      <section className="py-16 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-wider mb-10">
            Trusted by forward-thinking teams worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {logos.map((logo) => (
              <div key={logo} className="flex items-center gap-2 text-slate-400 font-bold text-lg">
                <Building2 className="w-5 h-5" />
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-violet-700">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-extrabold mb-1">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────── */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-slate-600 text-sm font-medium mb-4">
              <Award className="w-3.5 h-3.5" />
              Everything you need
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
              Replace five tools with one
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              DocFlow Pro handles the entire document lifecycle — from creation to legally-binding signature.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className={`w-11 h-11 ${f.color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow steps ────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">From draft to signed in minutes</h2>
            <p className="text-lg text-slate-500">The fastest document workflow on the planet.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', icon: FileText, title: 'Create', desc: 'Start from a template or blank page in the rich-text editor.' },
              { num: '02', icon: Send, title: 'Send', desc: 'Email recipients or share a link with custom roles and expiry.' },
              { num: '03', icon: FileSignature, title: 'Sign', desc: 'Recipients sign on any device — no account required.' },
              { num: '04', icon: CheckCircle, title: 'Done', desc: 'Get notified instantly. Download PDF with audit trail.' },
            ].map((step, i) => (
              <div key={step.num} className="relative text-center">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] right-0 h-px bg-gradient-to-r from-blue-300 to-transparent" />
                )}
                <div className="w-16 h-16 bg-white rounded-2xl border-2 border-blue-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <step.icon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-xs font-bold text-blue-500 mb-1">{step.num}</div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────── */}
      <section id="testimonials" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Loved by teams everywhere</h2>
            <p className="text-slate-500">Rated 4.9/5 across 2,000+ reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${t.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────── */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-500 text-lg">Start free. Scale as you grow. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.highlight
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200 scale-105'
                    : 'bg-white border border-slate-200'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                    {plan.badge}
                  </span>
                )}
                <div className="mb-6">
                  <p className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-blue-200' : 'text-slate-500'}`}>{plan.name}</p>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className={`text-sm mb-1 ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>{plan.sub}</span>
                  </div>
                  <p className={`text-sm ${plan.highlight ? 'text-blue-200' : 'text-slate-500'}`}>{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-blue-500' : 'bg-emerald-100'}`}>
                        <Check className={`w-3 h-3 ${plan.highlight ? 'text-white' : 'text-emerald-600'}`} />
                      </div>
                      <span className={plan.highlight ? 'text-blue-100' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl px-8 py-16 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-4xl font-extrabold text-white mb-4">
                Ready to close more deals?
              </h2>
              <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
                Join 50,000+ businesses that use DocFlow Pro to send and sign documents faster.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-colors text-lg shadow-xl"
              >
                Get started — it&apos;s free <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-blue-300 text-sm mt-4">No credit card required · Setup in 5 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="border-t border-slate-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <PenTool className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-slate-900">DocFlow Pro</span>
            </Link>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#testimonials" className="hover:text-slate-900 transition-colors">Testimonials</a>
              <Link href="/login" className="hover:text-slate-900 transition-colors">Sign in</Link>
            </div>

            <p className="text-sm text-slate-400">
              Built by{' '}
              <a
                href="https://github.com/connectfazla"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Fazla Rabbi
              </a>
              {' '}· © {new Date().getFullYear()} DocFlow Pro
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
