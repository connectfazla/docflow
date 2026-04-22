'use client'

import { useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import {
  PenTool, Check, X, ChevronDown, ChevronUp, Shield, Clock,
  Download, Info, AlertTriangle, CheckCircle, Fingerprint
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SignMode = 'draw' | 'type' | 'upload'

const SAMPLE_DOC_CONTENT = `
<h1>Software Development Agreement</h1>
<p>This Software Development Agreement ("Agreement") is entered into as of <strong>April 22, 2026</strong>, between <strong>Acme Corp</strong> ("Client") and <strong>Dev Studio LLC</strong> ("Developer").</p>
<h2>1. Scope of Work</h2>
<p>Developer agrees to provide software development services including design, development, and documentation of a web application as specified by Client requirements.</p>
<h2>2. Payment Terms</h2>
<p>Client agrees to pay Developer the total sum of <strong>$24,000 USD</strong> according to the milestone schedule: 25% upon signing, 25% at midpoint, 50% upon delivery.</p>
<h2>3. Intellectual Property</h2>
<p>Upon receipt of full payment, all work product shall become the exclusive property of Client, including all copyrights and intellectual property rights.</p>
<h2>4. Confidentiality</h2>
<p>Both parties agree to maintain confidentiality of each other's proprietary information during and for two years after the term of this Agreement.</p>
<h2>5. Term and Termination</h2>
<p>This Agreement commences April 22, 2026 and continues until project completion. Either party may terminate with 30 days written notice.</p>
`

export default function SignPage() {
  const { token } = useParams<{ token: string }>()
  const [step, setStep] = useState<'review' | 'sign' | 'complete' | 'declined'>('review')
  const [signMode, setSignMode] = useState<SignMode>('type')
  const [typedSignature, setTypedSignature] = useState('Sarah Chen')
  const [fontStyle, setFontStyle] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [declining, setDeclining] = useState(false)
  const [declineReason, setDeclineReason] = useState('')
  const [signing, setSigning] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const fonts = [
    'Georgia, serif',
    'cursive',
    '"Palatino Linotype", serif',
    'fantasy',
  ]

  const fontNames = ['Classic', 'Script', 'Elegant', 'Artistic']

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    setHasDrawn(true)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    const rect = canvas.getBoundingClientRect()
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDraw = () => setIsDrawing(false)

  const clearCanvas = () => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  const handleSign = async () => {
    if (!agreed) return
    setSigning(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSigning(false)
    setStep('complete')
  }

  const handleDecline = async () => {
    if (!declineReason) return
    await new Promise((r) => setTimeout(r, 500))
    setStep('declined')
  }

  const hasSignature =
    signMode === 'type' ? typedSignature.length > 1
    : signMode === 'draw' ? hasDrawn
    : true

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Document Signed!</h1>
          <p className="text-slate-500 mb-6">
            You've successfully signed <strong>Software Development Agreement</strong>. A copy has been emailed to you.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 text-left mb-6 space-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>Legally binding under ESIGN Act</span>
            </div>
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-violet-500" />
              <span>Audit trail ID: DFP-{token?.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Signed {new Date().toLocaleString()}</span>
            </div>
          </div>
          <Button className="w-full justify-center" onClick={() => window.print()}>
            <Download className="w-4 h-4" /> Download Signed Copy
          </Button>
        </div>
      </div>
    )
  }

  if (step === 'declined') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Signing Declined</h1>
          <p className="text-slate-500">
            You've declined to sign this document. The sender has been notified and will follow up with you.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <PenTool className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Software Development Agreement</p>
              <p className="text-xs text-slate-400">Sent by Acme Corp · Expires May 22, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              SSL Secured
            </div>
            {step === 'review' && (
              <Button variant="outline" size="sm" onClick={() => setDeclining(true)} className="text-red-600 border-red-200 hover:bg-red-50">
                <X className="w-3.5 h-3.5" /> Decline
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-6">
          {[
            { id: 'review', label: 'Review Document', num: 1 },
            { id: 'sign', label: 'Add Signature', num: 2 },
            { id: 'complete', label: 'Complete', num: 3 },
          ].map((s, i, arr) => {
            const stepStr = step as string
            const isActive = stepStr === s.id
            const isDone = (stepStr === 'sign' && s.id === 'review') ||
              ((stepStr === 'complete' || stepStr === 'declined') && s.id !== 'complete')
            return (
              <div key={s.id} className="flex items-center gap-2">
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                  isActive ? 'bg-blue-600 text-white'
                  : isDone ? 'bg-emerald-500 text-white'
                  : 'bg-slate-200 text-slate-500'
                )}>
                  {isDone ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className={cn('text-sm', isActive ? 'font-semibold text-slate-900' : 'text-slate-500')}>{s.label}</span>
                {i < arr.length - 1 && <div className="w-8 h-px bg-slate-200 ml-2" />}
              </div>
            )
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6 flex gap-6">
        {/* Document */}
        <div className="flex-1">
          <div
            className="bg-white shadow-sm rounded-xl overflow-auto max-h-[70vh]"
            onScroll={(e) => {
              const el = e.currentTarget
              if (el.scrollHeight - el.scrollTop <= el.clientHeight + 100) setScrolled(true)
            }}
          >
            <div className="h-1 bg-gradient-to-r from-blue-500 to-violet-500" />
            <div className="p-10 max-w-[600px] mx-auto" dangerouslySetInnerHTML={{ __html: SAMPLE_DOC_CONTENT }} />
          </div>
          {!scrolled && (
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400 animate-bounce">
              <ChevronDown className="w-3.5 h-3.5" />
              Scroll to read full document
            </div>
          )}
        </div>

        {/* Sign Panel */}
        <div className="w-80 flex-shrink-0">
          <div className="sticky top-32 space-y-4">
            {/* Signer info */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">SC</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Sarah Chen</p>
                  <p className="text-xs text-slate-400">sarah@client.com · Signer #1</p>
                </div>
              </div>
            </Card>

            {step === 'review' && (
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">Please read the full document before signing. Scroll down to review all pages.</p>
                  </div>
                </div>
                <Button className="w-full justify-center" onClick={() => setStep('sign')}>
                  <PenTool className="w-4 h-4" /> Proceed to Sign
                </Button>
                <Button variant="outline" className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50" onClick={() => setDeclining(true)}>
                  <X className="w-4 h-4" /> Decline to Sign
                </Button>
              </div>
            )}

            {step === 'sign' && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-slate-100">
                  {([['draw', 'Draw'], ['type', 'Type'], ['upload', 'Upload']] as [SignMode, string][]).map(([mode, label]) => (
                    <button
                      key={mode}
                      onClick={() => setSignMode(mode)}
                      className={cn(
                        'flex-1 py-2.5 text-xs font-medium transition-colors',
                        signMode === mode ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="p-4">
                  {signMode === 'draw' && (
                    <div>
                      <canvas
                        ref={canvasRef}
                        width={280}
                        height={120}
                        className="border border-dashed border-slate-300 rounded-lg w-full cursor-crosshair bg-slate-50"
                        onMouseDown={startDraw}
                        onMouseMove={draw}
                        onMouseUp={stopDraw}
                        onMouseLeave={stopDraw}
                      />
                      <div className="flex justify-between mt-2">
                        <p className="text-xs text-slate-400">Draw your signature above</p>
                        <button onClick={clearCanvas} className="text-xs text-blue-600 hover:text-blue-700">Clear</button>
                      </div>
                    </div>
                  )}

                  {signMode === 'type' && (
                    <div>
                      <input
                        value={typedSignature}
                        onChange={(e) => setTypedSignature(e.target.value)}
                        placeholder="Type your full name"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {fonts.map((font, i) => (
                          <button
                            key={i}
                            onClick={() => setFontStyle(i)}
                            className={cn(
                              'py-3 px-2 border rounded-lg text-sm transition-all',
                              fontStyle === i ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                            )}
                            style={{ fontFamily: font }}
                          >
                            {typedSignature || 'Your Name'}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 text-center">{fontNames[fontStyle]} style</p>
                    </div>
                  )}

                  {signMode === 'upload' && (
                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-blue-300 transition-colors">
                      <p className="text-sm text-slate-500">Drop your signature image here</p>
                      <p className="text-xs text-slate-400 mt-1">PNG or JPG, transparent background preferred</p>
                      <Button variant="outline" size="sm" className="mt-3">Browse Files</Button>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <label className="flex items-start gap-2 cursor-pointer mb-4">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        I agree that this electronic signature is legally binding under the E-SIGN Act and eIDAS regulation.
                      </span>
                    </label>

                    <Button
                      className="w-full justify-center"
                      disabled={!hasSignature || !agreed}
                      loading={signing}
                      onClick={handleSign}
                    >
                      <Check className="w-4 h-4" />
                      {signing ? 'Signing…' : 'Sign Document'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Legal note */}
            <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl">
              <Shield className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500">
                Secured by DocFlow Pro. Your signature is ESIGN/eIDAS compliant with full audit trail.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decline Modal */}
      {declining && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 text-center mb-1">Decline to Sign?</h2>
            <p className="text-sm text-slate-500 text-center mb-4">Please tell the sender why you are declining to sign.</p>
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Reason for declining (required)"
              rows={3}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 justify-center" onClick={() => setDeclining(false)}>Cancel</Button>
              <Button
                variant="danger"
                className="flex-1 justify-center"
                disabled={!declineReason}
                onClick={handleDecline}
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('bg-white rounded-xl border border-slate-200', className)}>{children}</div>
}
