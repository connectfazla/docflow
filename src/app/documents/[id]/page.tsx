'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Send, Edit, Download, Trash2, Copy, MoreHorizontal,
  Eye, CheckCircle, Clock, Users, MessageSquare, Activity,
  FileText, Link2, Shield, AlertTriangle, RefreshCw
} from 'lucide-react'
import { AppLayout, TopBar } from '@/components/layout/sidebar'
import { Card } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SendDialog } from '@/components/dialogs/send-dialog'
import { useAppStore } from '@/store'
import { formatDate, formatRelative, cn } from '@/lib/utils'

export default function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { documents, deleteDocument, duplicateDocument, showToast } = useAppStore()
  const doc = documents.find((d) => d.id === id)

  const [sendOpen, setSendOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'recipients'>('overview')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (!doc) {
    return (
      <AppLayout>
        <TopBar title="Document Not Found" />
        <div className="flex flex-col items-center justify-center h-96 text-center px-6">
          <FileText className="w-16 h-16 text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold text-slate-700">Document not found</h2>
          <p className="text-slate-400 mt-2 mb-6">This document may have been deleted or doesn't exist.</p>
          <Link href="/documents"><Button variant="outline">Back to Documents</Button></Link>
        </div>
      </AppLayout>
    )
  }

  const handleDelete = () => {
    deleteDocument(doc.id)
    showToast({ type: 'success', title: 'Document deleted', message: `"${doc.title}" has been removed.` })
    router.push('/documents')
  }

  const handleDuplicate = () => {
    const copy = duplicateDocument(doc.id)
    showToast({ type: 'success', title: 'Document duplicated', message: `"${copy.title}" created as a draft.` })
    router.push(`/documents/${copy.id}`)
  }

  const handleDownload = () => {
    showToast({ type: 'info', title: 'Preparing download…', message: 'Your PDF will be ready shortly.' })
  }

  const signedCount = doc.recipients.filter((r) => r.status === 'signed').length
  const completionPct = doc.recipients.length > 0
    ? Math.round((signedCount / doc.recipients.length) * 100)
    : 0

  return (
    <AppLayout>
      <TopBar
        title=""
        actions={
          <div className="flex items-center gap-2">
            <Link href={`/editor/${doc.id}`}>
              <Button variant="outline" size="sm"><Edit className="w-3.5 h-3.5" /> Edit</Button>
            </Link>
            {doc.status === 'draft' && (
              <Button size="sm" onClick={() => setSendOpen(true)}>
                <Send className="w-3.5 h-3.5" /> Send
              </Button>
            )}
            {doc.status === 'sent' || doc.status === 'viewed' ? (
              <Button size="sm" onClick={() => setSendOpen(true)}>
                <RefreshCw className="w-3.5 h-3.5" /> Resend
              </Button>
            ) : null}
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-3.5 h-3.5" />
            </Button>
            <div className="relative group">
              <Button variant="outline" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden hidden group-hover:block">
                <button onClick={handleDuplicate} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                  <Copy className="w-4 h-4" /> Duplicate
                </button>
                <button onClick={() => setSendOpen(true)} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                  <Link2 className="w-4 h-4" /> Copy Link
                </button>
                <div className="border-t border-slate-100" />
                <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        }
      />

      <div className="p-6 max-w-5xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <Link href="/documents" className="mt-1 text-slate-400 hover:text-slate-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900">{doc.title}</h1>
              <StatusBadge status={doc.status} />
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
              <span>Created {formatDate(doc.createdAt)}</span>
              <span>·</span>
              <span>Updated {formatRelative(doc.updatedAt)}</span>
              {doc.sentAt && <><span>·</span><span>Sent {formatDate(doc.sentAt)}</span></>}
              {doc.expiresAt && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-amber-600">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Expires {formatDate(doc.expiresAt)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'recipients', label: `Recipients (${doc.recipients.length})`, icon: Users },
            { id: 'activity', label: 'Activity', icon: Activity },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Document Preview */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-violet-500" />
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-100">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="font-semibold text-slate-900 text-lg">{doc.title}</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {doc.recipients.length > 0
                        ? `Requires ${doc.recipients.filter(r => r.role === 'signer').length} signature${doc.recipients.filter(r => r.role === 'signer').length !== 1 ? 's' : ''}`
                        : 'No recipients added'}
                    </p>
                  </div>

                  {doc.recipients.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Signing progress</span>
                        <span className="text-sm font-bold text-slate-900">{signedCount}/{doc.recipients.length} signed</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all"
                          style={{ width: `${completionPct}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {doc.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-slate-100 px-8 py-4 bg-slate-50 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{doc.viewCount} view{doc.viewCount !== 1 ? 's' : ''}</span>
                  <Link href={`/editor/${doc.id}`}>
                    <Button variant="outline" size="sm"><Edit className="w-3.5 h-3.5" /> Open Editor</Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-4">
              {/* Stats */}
              <Card className="p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900">Document Stats</h3>
                {[
                  { icon: Eye, label: 'Times viewed', value: doc.viewCount },
                  { icon: Users, label: 'Recipients', value: doc.recipients.length },
                  { icon: CheckCircle, label: 'Signed', value: signedCount },
                  { icon: Clock, label: 'Days open', value: doc.sentAt ? Math.floor((Date.now() - new Date(doc.sentAt).getTime()) / 86400000) : '—' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <stat.icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">{stat.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </Card>

              {/* Audit Trail */}
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-semibold text-slate-900">Legal & Security</h3>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                    </div>
                    E-SIGN Act compliant
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                    </div>
                    Audit trail enabled
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                    </div>
                    End-to-end encrypted
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-2.5 h-2.5 text-blue-600" />
                    </div>
                    256-bit SSL secured
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                {doc.status === 'draft' && (
                  <Button className="w-full justify-center" onClick={() => setSendOpen(true)}>
                    <Send className="w-4 h-4" /> Send for Signature
                  </Button>
                )}
                <Button variant="outline" className="w-full justify-center" onClick={handleDownload}>
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
                <Button variant="outline" className="w-full justify-center" onClick={() => setSendOpen(true)}>
                  <Link2 className="w-4 h-4" /> Copy Share Link
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recipients' && (
          <div className="space-y-3">
            {doc.recipients.length === 0 ? (
              <Card className="p-12 text-center">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-700">No recipients yet</h3>
                <p className="text-sm text-slate-400 mt-1 mb-4">Add recipients to send this document for signing.</p>
                <Button onClick={() => setSendOpen(true)}>
                  <Send className="w-4 h-4" /> Send Document
                </Button>
              </Card>
            ) : (
              doc.recipients.map((r, i) => (
                <Card key={r.id} className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{r.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">{r.name}</p>
                        <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium',
                          r.role === 'signer' ? 'bg-blue-100 text-blue-700'
                          : r.role === 'approver' ? 'bg-purple-100 text-purple-700'
                          : 'bg-slate-100 text-slate-600'
                        )}>
                          {r.role}
                        </span>
                        <span className="text-xs text-slate-400">#{i + 1}</span>
                      </div>
                      <p className="text-sm text-slate-500">{r.email}</p>
                    </div>
                    <div className="text-right">
                      <div className={cn('inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full',
                        r.status === 'signed' ? 'bg-emerald-100 text-emerald-700'
                        : r.status === 'viewed' ? 'bg-amber-100 text-amber-700'
                        : r.status === 'declined' ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600'
                      )}>
                        {r.status === 'signed' && <CheckCircle className="w-3 h-3" />}
                        {r.status === 'viewed' && <Eye className="w-3 h-3" />}
                        {r.status === 'pending' && <Clock className="w-3 h-3" />}
                        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </div>
                      {r.signedAt && <p className="text-xs text-slate-400 mt-0.5">{formatDate(r.signedAt)}</p>}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <Card>
            <div className="divide-y divide-slate-100">
              {[
                { icon: FileText, color: 'bg-slate-100 text-slate-600', text: 'Document created', time: doc.createdAt, actor: 'You' },
                ...(doc.sentAt ? [{ icon: Send, color: 'bg-blue-100 text-blue-600', text: 'Document sent to recipients', time: doc.sentAt, actor: 'You' }] : []),
                ...(doc.recipients.filter(r => r.status === 'viewed').map(r => ({
                  icon: Eye, color: 'bg-amber-100 text-amber-600', text: `Viewed by ${r.name}`, time: doc.updatedAt, actor: r.name
                }))),
                ...(doc.recipients.filter(r => r.status === 'signed').map(r => ({
                  icon: CheckCircle, color: 'bg-emerald-100 text-emerald-600', text: `Signed by ${r.name}`, time: r.signedAt || doc.updatedAt, actor: r.name
                }))),
                ...(doc.completedAt ? [{ icon: CheckCircle, color: 'bg-green-100 text-green-600', text: 'Document completed', time: doc.completedAt, actor: 'System' }] : []),
              ].map((event, i) => (
                <div key={i} className="flex items-start gap-4 px-6 py-4">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5', event.color)}>
                    <event.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800">{event.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{formatRelative(event.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <SendDialog open={sendOpen} onClose={() => setSendOpen(false)} documentId={doc.id} documentTitle={doc.title} />

      {/* Delete Confirm */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 text-center mb-1">Delete Document?</h2>
            <p className="text-sm text-slate-500 text-center mb-6">
              This will permanently delete &ldquo;{doc.title}&rdquo;. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 justify-center" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
              <Button variant="danger" className="flex-1 justify-center" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
