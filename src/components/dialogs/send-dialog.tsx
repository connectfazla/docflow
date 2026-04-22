'use client'

import { useState } from 'react'
import { Send, UserPlus, X, Copy, CheckCircle, Mail, Link2, ChevronDown } from 'lucide-react'
import { Modal, ModalBody, ModalFooter } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'

interface Recipient {
  name: string
  email: string
  role: 'signer' | 'viewer' | 'approver'
}

interface SendDialogProps {
  open: boolean
  onClose: () => void
  documentId: string
  documentTitle: string
}

export function SendDialog({ open, onClose, documentId, documentTitle }: SendDialogProps) {
  const { sendDocument, updateDocument, showToast } = useAppStore()
  const [recipients, setRecipients] = useState<Recipient[]>([
    { name: '', email: '', role: 'signer' },
  ])
  const [subject, setSubject] = useState(`Please sign: ${documentTitle}`)
  const [message, setMessage] = useState(`Hi,\n\nI'd like you to review and sign this document at your earliest convenience.\n\nThank you!`)
  const [linkCopied, setLinkCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const [tab, setTab] = useState<'email' | 'link'>('email')

  const shareLink = `https://docflow.pro/sign/${documentId}-${Math.random().toString(36).slice(2, 8)}`

  const addRecipient = () => {
    setRecipients((r) => [...r, { name: '', email: '', role: 'signer' }])
  }

  const removeRecipient = (i: number) => {
    setRecipients((r) => r.filter((_, idx) => idx !== i))
  }

  const updateRecipient = (i: number, field: keyof Recipient, value: string) => {
    setRecipients((r) => r.map((rec, idx) => idx === i ? { ...rec, [field]: value } : rec))
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink).catch(() => {})
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
    showToast({ type: 'success', title: 'Link copied!', message: 'Share this link with your recipients.' })
  }

  const handleSend = async () => {
    const valid = recipients.every((r) => r.email.includes('@'))
    if (!valid) {
      showToast({ type: 'error', title: 'Invalid email', message: 'Please enter valid email addresses for all recipients.' })
      return
    }
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))

    const newRecipients = recipients.map((r, i) => ({
      id: `r-${Date.now()}-${i}`,
      name: r.name || r.email.split('@')[0],
      email: r.email,
      role: r.role,
      status: 'pending' as const,
    }))

    updateDocument(documentId, { recipients: newRecipients })
    sendDocument(documentId)
    showToast({
      type: 'success',
      title: 'Document sent!',
      message: `Sent to ${recipients.length} recipient${recipients.length > 1 ? 's' : ''}.`,
    })
    setSending(false)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Send Document" description={`Sending: ${documentTitle}`} size="lg">
      {/* Tabs */}
      <div className="flex border-b border-slate-100 px-6">
        {[
          { id: 'email', label: 'Send via Email', icon: Mail },
          { id: 'link', label: 'Copy Link', icon: Link2 },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'email' | 'link')}
            className={cn(
              'flex items-center gap-2 py-3.5 px-4 text-sm font-medium border-b-2 -mb-px transition-colors',
              tab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            )}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      <ModalBody className="space-y-5">
        {tab === 'email' ? (
          <>
            {/* Recipients */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Recipients</label>
                <button
                  onClick={addRecipient}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Add recipient
                </button>
              </div>
              <div className="space-y-2.5">
                {recipients.map((r, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex-1 grid grid-cols-5 gap-2">
                      <input
                        placeholder="Name"
                        value={r.name}
                        onChange={(e) => updateRecipient(i, 'name', e.target.value)}
                        className="col-span-2 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                      />
                      <input
                        placeholder="Email address *"
                        type="email"
                        value={r.email}
                        onChange={(e) => updateRecipient(i, 'email', e.target.value)}
                        className="col-span-2 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                      />
                      <select
                        value={r.role}
                        onChange={(e) => updateRecipient(i, 'role', e.target.value)}
                        className="col-span-1 px-2 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="signer">Signer</option>
                        <option value="viewer">Viewer</option>
                        <option value="approver">Approver</option>
                      </select>
                    </div>
                    {recipients.length > 1 && (
                      <button onClick={() => removeRecipient(i)} className="mt-2 text-slate-400 hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Subject */}
            <Input
              label="Email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Personal message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
              />
            </div>

            {/* Options */}
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                <span className="text-slate-700">Remind if not signed in 3 days</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                <span className="text-slate-700">Require identity verification</span>
              </label>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Share this link with anyone who needs to sign or view the document. Anyone with this link can access it.</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 font-mono truncate">
                {shareLink}
              </div>
              <Button variant="outline" onClick={handleCopyLink} className="flex-shrink-0">
                {linkCopied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {linkCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm font-medium text-amber-800 mb-1">Link access settings</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="access" defaultChecked className="text-blue-600" />
                  <span className="text-sm text-amber-700">Anyone with the link can sign</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="access" className="text-blue-600" />
                  <span className="text-sm text-amber-700">Require email verification</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Link expires</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Never</option>
                  <option>7 days</option>
                  <option>30 days</option>
                  <option>90 days</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Password protect</label>
                <input placeholder="Optional password" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400" />
              </div>
            </div>
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        {tab === 'email' ? (
          <Button onClick={handleSend} loading={sending}>
            <Send className="w-4 h-4" />
            Send Document
          </Button>
        ) : (
          <Button onClick={handleCopyLink}>
            {linkCopied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {linkCopied ? 'Copied!' : 'Copy Link'}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  )
}
