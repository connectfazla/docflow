'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { CheckCircle2, Loader2, PenTool, Shield } from 'lucide-react'

type Doc = {
  id: string
  title: string
  content: string
  status: string
  owner: { name: string; email: string }
  recipients: { id: string; name: string; email: string; status: string; role: string }[]
}

export default function SignPage() {
  const { token } = useParams<{ token: string }>()
  const [doc, setDoc] = useState<Doc | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [signing, setSigning] = useState(false)
  const [signed, setSigned] = useState(false)
  const [error, setError] = useState('')

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)

  useEffect(() => {
    let cancel = false
    fetch(`/api/share/${token}`)
      .then((r) => r.json())
      .then((d) => { if (!cancel && d.document) setDoc(d.document); else if (!cancel) setError(d.error ?? 'Not found') })
      .finally(() => { if (!cancel) setLoading(false) })
    return () => { cancel = true }
  }, [token])

  const draw = (x: number, y: number, start = false) => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')!
    ctx.strokeStyle = '#0f172a'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    if (start) { ctx.beginPath(); ctx.moveTo(x, y) }
    else { ctx.lineTo(x, y); ctx.stroke() }
  }
  const pointerStart = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true
    const r = e.currentTarget.getBoundingClientRect()
    draw(e.clientX - r.left, e.clientY - r.top, true)
  }
  const pointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const r = e.currentTarget.getBoundingClientRect()
    draw(e.clientX - r.left, e.clientY - r.top)
  }
  const pointerEnd = () => { drawing.current = false }

  const clearSig = () => {
    const c = canvasRef.current!
    const ctx = c.getContext('2d')!
    ctx.clearRect(0, 0, c.width, c.height)
  }

  const submit = async () => {
    if (!email.trim()) { setError('Please enter the email that received this link.'); return }
    const c = canvasRef.current!
    const dataUrl = c.toDataURL('image/png')
    setSigning(true); setError('')
    try {
      const r = await fetch(`/api/share/${token}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ recipientEmail: email, signatureDataUrl: dataUrl }),
      })
      const d = await r.json()
      if (!r.ok) { setError(d.error ?? 'Signing failed'); return }
      setSigned(true)
    } finally { setSigning(false) }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]"><Loader2 className="w-5 h-5 text-slate-400 animate-spin" /></div>

  if (!doc) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-slate-900">Document not found</h1>
        <p className="text-sm text-slate-500 mt-1">{error || 'This signing link is invalid or has expired.'}</p>
      </div>
    </div>
  )

  if (signed) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
      <div className="bg-white rounded-3xl shadow-sm p-10 max-w-md text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Thank you!</h1>
        <p className="text-sm text-slate-500 mt-2">Your signature has been recorded.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="bg-white/80 backdrop-blur-xl border-b border-black/[0.08]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-[13px] text-slate-500">Sent by <strong className="text-slate-800">{doc.owner.name}</strong></span>
          <span className="flex items-center gap-1.5 text-[11px] text-emerald-600"><Shield className="w-3.5 h-3.5" /> Secure signing</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">{doc.title}</h1>
        <p className="text-sm text-slate-500 mb-6">Please review the document and sign at the bottom.</p>

        <div className="bg-white rounded-2xl p-10 shadow-sm tiptap-editor prose prose-slate max-w-none"
             dangerouslySetInnerHTML={{ __html: doc.content }} />

        <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Sign to accept</h2>
          <p className="text-sm text-slate-500 mb-5">Draw your signature below.</p>

          <label className="block text-[12px] font-medium text-slate-600 mb-1.5">Your email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="The email that received this link"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <div className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <canvas ref={canvasRef} width={720} height={180}
              onPointerDown={pointerStart} onPointerMove={pointerMove}
              onPointerUp={pointerEnd} onPointerLeave={pointerEnd}
              className="w-full h-44 touch-none cursor-crosshair" />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <button onClick={clearSig} className="text-slate-500 hover:text-slate-700">Clear signature</button>
            <span className="text-slate-400 flex items-center gap-1"><PenTool className="w-3 h-3" /> Draw with mouse or finger</span>
          </div>

          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

          <button onClick={submit} disabled={signing}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-60">
            {signing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Sign &amp; finish
          </button>
        </div>
      </main>
    </div>
  )
}
