'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table'
import { useState, useEffect, useCallback, useRef } from 'react'
import {
  ChevronLeft, Send, Save, Sparkles, X, PenTool, Plus,
  FileText, CheckCircle, Loader2, Link as LinkIcon, Copy, Trash2,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { EditorToolbar } from '@/components/editor/toolbar'
import { Button } from '@/components/ui/button'

type Recipient = { id?: string; name: string; email: string; role: 'signer' | 'viewer' | 'approver'; status?: string }

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const rawId = params.id as string
  const isNew = rawId === 'new'

  const [docId, setDocId] = useState<string | null>(isNew ? null : rawId)
  const [title, setTitle] = useState('Untitled Document')
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [status, setStatus] = useState<string>('DRAFT')
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [shareOpen, setShareOpen] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const [sharing, setSharing] = useState(false)

  const [aiOpen, setAiOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const titleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const docIdRef = useRef<string | null>(docId)
  const titleRef = useRef(title)
  useEffect(() => { docIdRef.current = docId }, [docId])
  useEffect(() => { titleRef.current = title }, [title])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      Link.configure({ openOnClick: false }),
      Image,
      TextStyle,
      Color,
      Placeholder.configure({ placeholder: 'Start writing your document…' }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: '',
    editorProps: { attributes: { class: 'tiptap-editor focus:outline-none min-h-full' } },
    immediatelyRender: false,
  })

  // Load existing doc
  useEffect(() => {
    if (isNew || !editor) return
    let cancel = false
    ;(async () => {
      const r = await fetch(`/api/documents/${rawId}`)
      if (!r.ok) { router.push('/documents'); return }
      const { document: d } = await r.json()
      if (cancel) return
      setTitle(d.title)
      setStatus(d.status)
      setRecipients(d.recipients ?? [])
      if (d.shareToken) setShareUrl(`${window.location.origin}/sign/${d.shareToken}`)
      editor.commands.setContent(d.content || '')
      setLoading(false)
    })()
    return () => { cancel = true }
  }, [isNew, rawId, editor, router])

  // Save — uses refs so it doesn't need deps that would re-register listeners
  const save = useCallback(async () => {
    if (!editor) return
    setSaving(true)
    try {
      const content = editor.getHTML()
      const currentTitle = titleRef.current
      const currentDocId = docIdRef.current
      if (!currentDocId) {
        const r = await fetch('/api/documents', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ title: currentTitle, content }),
        })
        const { document: d } = await r.json()
        setDocId(d.id)
        docIdRef.current = d.id
        window.history.replaceState(null, '', `/editor/${d.id}`)
      } else {
        await fetch(`/api/documents/${currentDocId}`, {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ title: currentTitle, content }),
        })
      }
      setLastSaved(new Date())
    } finally {
      setSaving(false)
    }
  }, [editor])

  // Autosave on content edit — 800ms debounce
  useEffect(() => {
    if (!editor) return
    const handler = () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(save, 800)
    }
    editor.on('update', handler)
    return () => { editor.off('update', handler); if (saveTimer.current) clearTimeout(saveTimer.current) }
  }, [editor, save])

  // Title autosave — 1s debounce after typing
  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (titleTimer.current) clearTimeout(titleTimer.current)
    titleTimer.current = setTimeout(save, 1000)
  }

  // Insert a signature field block into the document
  const insertSignatureField = () => {
    if (!editor) return
    editor.chain().focus().insertContent(`
      <div data-type="signature-field" style="border:2px dashed #cbd5e1;border-radius:12px;padding:20px 24px;margin:16px 0;background:#f8fafc;">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">✍ Signature Field</p>
        <p style="margin:0 0 16px;font-size:12px;color:#94a3b8;">{{ recipient_name }} — {{ recipient_email }}</p>
        <div style="border-bottom:2px solid #334155;width:280px;height:60px;margin-bottom:8px;"></div>
        <p style="margin:0;font-size:11px;color:#94a3b8;">Signature &nbsp;&nbsp;&nbsp;&nbsp; Date: ___________</p>
      </div>
    `).run()
  }

  // AI generate
  const runAi = async () => {
    if (!aiPrompt.trim() || !editor) return
    setAiLoading(true); setAiError('')
    try {
      const r = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, context: editor.getText().slice(0, 2000) }),
      })
      const d = await r.json()
      if (!r.ok) { setAiError(d.error ?? 'AI failed'); return }
      editor.chain().focus().insertContent(d.html).run()
      setAiOpen(false); setAiPrompt('')
    } catch (e: any) {
      setAiError(e.message)
    } finally { setAiLoading(false) }
  }

  // Share — recipients are now optional (link-only sharing allowed)
  const share = async () => {
    if (!docIdRef.current) await save()
    if (!docIdRef.current) return
    setSharing(true)
    try {
      const clean = recipients.filter((r) => r.name.trim() && r.email.trim())
      const r = await fetch(`/api/documents/${docIdRef.current}/share`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ recipients: clean, message: shareMessage }),
      })
      const d = await r.json()
      if (!r.ok) { alert(d.error ?? 'Share failed'); return }
      setShareUrl(d.shareUrl)
      if (clean.length) setStatus('SENT')
    } finally { setSharing(false) }
  }

  const copyLink = () => {
    if (!shareUrl) return
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addRecipient = () =>
    setRecipients((rs) => [...rs, { name: '', email: '', role: 'signer' }])

  return (
    <div className="flex flex-col h-screen bg-[#f5f5f7]">
      {/* Header */}
      <header className="flex items-center gap-4 px-5 py-3 bg-white/80 backdrop-blur-xl border-b border-black/[0.08] z-20">
        <button onClick={() => router.push('/documents')} className="flex items-center gap-1.5 text-[13px] text-slate-600 hover:text-slate-900 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Documents
        </button>

        <div className="flex-1 flex items-center gap-3 min-w-0">
          <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="flex-1 font-semibold text-slate-900 bg-transparent border-none outline-none text-[15px] tracking-tight truncate min-w-0 placeholder:text-slate-400"
            placeholder="Untitled"
          />
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 flex-shrink-0">
            {saving ? (
              <><Loader2 className="w-3 h-3 animate-spin" /> Saving…</>
            ) : lastSaved ? (
              <><CheckCircle className="w-3 h-3 text-emerald-500" /> Saved</>
            ) : null}
          </div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">{status}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={insertSignatureField}
            title="Insert signature field"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] border border-slate-200 bg-white text-slate-700 rounded-full hover:border-slate-300 hover:bg-slate-50 font-medium transition-all"
          >
            <PenTool className="w-3.5 h-3.5" /> Signature
          </button>
          <button onClick={() => setAiOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-full hover:opacity-90 font-medium transition-opacity">
            <Sparkles className="w-3.5 h-3.5" /> AI
          </button>
          <Button variant="outline" size="sm" onClick={save} disabled={saving}>
            <Save className="w-3.5 h-3.5" />
            Save
          </Button>
          <Button size="sm" onClick={() => setShareOpen(true)}>
            <Send className="w-3.5 h-3.5" />
            Share
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <EditorToolbar editor={editor} />
          <div className="py-10 px-4 flex justify-center">
            <div className="w-full max-w-[816px]">
              <div className="bg-white shadow-sm rounded-2xl min-h-[1056px] relative" style={{ padding: '72px 80px' }}>
                <EditorContent editor={editor} className="min-h-full" />
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
                    <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                  </div>
                )}
              </div>
              <p className="text-center text-xs text-slate-400 mt-4">Auto-saves as you type</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share dialog */}
      {shareOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06]">
              <h2 className="font-semibold text-slate-900 tracking-tight">Share document</h2>
              <button onClick={() => setShareOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-6 space-y-4">
              {/* Share link section */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-[12px] font-medium text-slate-600 mb-3">Public sharing link</p>
                {shareUrl ? (
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <input readOnly value={shareUrl} className="flex-1 bg-transparent text-xs text-slate-600 outline-none min-w-0" />
                    <button onClick={copyLink} className={`text-xs font-medium flex items-center gap-1 flex-shrink-0 transition-colors ${copied ? 'text-emerald-600' : 'text-blue-600'}`}>
                      {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Click <strong>Generate link</strong> or add recipients and send below.</p>
                )}
              </div>

              {/* Recipients */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[12px] font-medium text-slate-600">Recipients <span className="text-slate-400 font-normal">(optional)</span></label>
                </div>
                <div className="space-y-2">
                  {recipients.map((r, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_110px_auto] gap-2">
                      <input value={r.name} onChange={(e) => setRecipients((rs) => rs.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                        placeholder="Full name" className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input value={r.email} onChange={(e) => setRecipients((rs) => rs.map((x, j) => j === i ? { ...x, email: e.target.value } : x))}
                        placeholder="email@company.com" className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <select value={r.role} onChange={(e) => setRecipients((rs) => rs.map((x, j) => j === i ? { ...x, role: e.target.value as any } : x))}
                        className="rounded-xl border border-slate-200 px-2 py-2 text-sm">
                        <option value="signer">Signer</option>
                        <option value="viewer">Viewer</option>
                        <option value="approver">Approver</option>
                      </select>
                      <button onClick={() => setRecipients((rs) => rs.filter((_, j) => j !== i))} className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
                <button onClick={addRecipient} className="mt-2 inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
                  <Plus className="w-3.5 h-3.5" /> Add recipient
                </button>
              </div>

              {recipients.length > 0 && (
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-1.5">Message <span className="text-slate-400 font-normal">(optional)</span></label>
                  <textarea value={shareMessage} onChange={(e) => setShareMessage(e.target.value)} rows={2}
                    placeholder="Hi — please review and sign by Friday…"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-black/[0.06] flex items-center justify-between gap-2">
              <Button variant="outline" size="sm" onClick={() => setShareOpen(false)}>Cancel</Button>
              <div className="flex items-center gap-2">
                {!shareUrl && (
                  <Button variant="outline" size="sm" onClick={share} disabled={sharing}>
                    {sharing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LinkIcon className="w-3.5 h-3.5" />}
                    Generate link
                  </Button>
                )}
                {recipients.filter(r => r.name.trim() && r.email.trim()).length > 0 && (
                  <Button size="sm" onClick={share} disabled={sharing}>
                    {sharing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    Send to recipients
                  </Button>
                )}
                {shareUrl && recipients.filter(r => r.name.trim() && r.email.trim()).length === 0 && (
                  <Button size="sm" onClick={copyLink}>
                    {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy link'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI dialog */}
      {aiOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900 text-[15px] tracking-tight">AI Document Assistant</h2>
                  <p className="text-[11px] text-slate-400">Uses the API key configured by your admin</p>
                </div>
              </div>
              <button onClick={() => setAiOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  'Write an NDA for a software partnership',
                  'Add a payment terms clause',
                  'Improve the IP ownership section',
                  'Generate a services scope section',
                ].map((suggestion) => (
                  <button key={suggestion} onClick={() => setAiPrompt(suggestion)}
                    className="text-left text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-slate-600 hover:text-blue-600">
                    {suggestion}
                  </button>
                ))}
              </div>
              <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe what to generate or modify…"
                className="w-full h-24 text-sm border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {aiError && <p className="text-sm text-red-600 mt-2">{aiError}</p>}
              <div className="flex items-center justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setAiOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={runAi} disabled={aiLoading}>
                  {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
