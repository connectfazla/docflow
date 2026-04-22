'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  FileText, Search, Plus, MoreHorizontal, Eye,
  Send, Download, Trash2, Copy, SlidersHorizontal,
  CheckCircle, Grid3X3, List, ArrowUpDown, X
} from 'lucide-react'
import { TopBar } from '@/components/layout/sidebar'
import { Card } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Modal, ModalBody, ModalFooter } from '@/components/ui/modal'
import { SendDialog } from '@/components/dialogs/send-dialog'
import { useAppStore } from '@/store'
import { formatRelative, cn } from '@/lib/utils'
import type { DocumentStatus, Document } from '@/types'

const statusFilters: { label: string; value: DocumentStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Sent', value: 'sent' },
  { label: 'Viewed', value: 'viewed' },
  { label: 'Signed', value: 'signed' },
  { label: 'Completed', value: 'completed' },
  { label: 'Declined', value: 'declined' },
]

export default function DocumentsPage() {
  const router = useRouter()
  const { documents, deleteDocument, duplicateDocument, showToast } = useAppStore()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | 'all'>('all')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Document | null>(null)
  const [sendTarget, setSendTarget] = useState<Document | null>(null)

  const filtered = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleSelect = (id: string) => {
    setSelectedDocs(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id])
  }

  const handleDuplicate = (doc: Document) => {
    const copy = duplicateDocument(doc.id)
    setMenuOpen(null)
    showToast({ type: 'success', title: 'Document duplicated', message: `"${copy.title}" created.` })
    router.push(`/editor/${copy.id}`)
  }

  const handleDelete = (doc: Document) => {
    deleteDocument(doc.id)
    setDeleteTarget(null)
    setMenuOpen(null)
    showToast({ type: 'info', title: 'Document deleted', message: `"${doc.title}" has been removed.` })
  }

  const handleBulkDelete = () => {
    selectedDocs.forEach(id => deleteDocument(id))
    showToast({ type: 'info', title: `${selectedDocs.length} documents deleted` })
    setSelectedDocs([])
  }

  return (
    <div className="animate-fade-in" onClick={() => setMenuOpen(null)}>
      <TopBar
        title="Documents"
        actions={
          <Link href="/editor/new">
            <Button size="sm">
              <Plus className="w-3.5 h-3.5" />
              New Document
            </Button>
          </Link>
        }
      />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
            <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={cn('p-2 transition-colors', viewMode === 'list' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600')}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={cn('p-2 transition-colors', viewMode === 'grid' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600')}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
          {statusFilters.map((f) => {
            const count = f.value === 'all' ? documents.length : documents.filter(d => d.status === f.value).length
            return (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                  statusFilter === f.value
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                {f.label}
                {count > 0 && (
                  <span className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full font-medium',
                    statusFilter === f.value ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'
                  )}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Bulk Actions */}
        {selectedDocs.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-blue-50 border border-blue-200 rounded-xl">
            <span className="text-sm font-medium text-blue-800">{selectedDocs.length} selected</span>
            <div className="flex items-center gap-2 ml-2">
              <Button variant="outline" size="sm"><Download className="w-3 h-3" /> Export</Button>
              <Button variant="danger" size="sm" onClick={handleBulkDelete}><Trash2 className="w-3 h-3" /> Delete</Button>
            </div>
            <button onClick={() => setSelectedDocs([])} className="ml-auto text-xs text-blue-600 hover:text-blue-800">Clear</button>
          </div>
        )}

        {/* Document List */}
        {viewMode === 'list' ? (
          <Card>
            <div className="divide-y divide-slate-100">
              {/* Header */}
              <div className="flex items-center gap-4 px-4 py-3 bg-slate-50 rounded-t-xl">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300"
                  checked={selectedDocs.length === filtered.length && filtered.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) setSelectedDocs(filtered.map(d => d.id))
                    else setSelectedDocs([])
                  }}
                />
                <span className="flex-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Document</span>
                <span className="w-28 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:block">Status</span>
                <span className="w-28 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:block">Recipients</span>
                <span className="w-24 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:block">Last Updated</span>
                <span className="w-8" />
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="font-semibold text-slate-700">No documents found</h3>
                  <p className="text-sm text-slate-400 mt-1 mb-4">
                    {search ? 'Try adjusting your search or filters' : 'Create your first document to get started'}
                  </p>
                  {!search && (
                    <Link href="/editor/new">
                      <Button size="sm"><Plus className="w-3.5 h-3.5" /> New Document</Button>
                    </Link>
                  )}
                </div>
              ) : (
                filtered.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors group">
                    <input
                      type="checkbox"
                      checked={selectedDocs.includes(doc.id)}
                      onChange={() => toggleSelect(doc.id)}
                      className="w-4 h-4 rounded border-slate-300"
                      onClick={(e) => e.stopPropagation()}
                    />

                    <Link href={`/documents/${doc.id}`} className="flex-1 flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-100">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                          {doc.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          {doc.tags.map(tag => (
                            <span key={tag} className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{tag}</span>
                          ))}
                          {doc.viewCount > 0 && (
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Eye className="w-3 h-3" /> {doc.viewCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    <div className="w-28 hidden sm:block">
                      <StatusBadge status={doc.status} />
                    </div>

                    <div className="w-28 hidden md:flex items-center">
                      {doc.recipients.length > 0 ? (
                        <div className="flex items-center gap-1">
                          <div className="flex -space-x-1.5">
                            {doc.recipients.slice(0, 3).map((r) => (
                              <div
                                key={r.id}
                                title={r.name}
                                className="w-6 h-6 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full border-2 border-white flex items-center justify-center"
                              >
                                <span className="text-white text-[9px] font-bold">{r.name[0]}</span>
                              </div>
                            ))}
                          </div>
                          {doc.recipients.length > 3 && (
                            <span className="text-xs text-slate-400">+{doc.recipients.length - 3}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">No recipients</span>
                      )}
                    </div>

                    <div className="w-24 hidden lg:block">
                      <p className="text-xs text-slate-500">{formatRelative(doc.updatedAt)}</p>
                    </div>

                    {/* Action menu */}
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
                        onClick={() => setMenuOpen(menuOpen === doc.id ? null : doc.id)}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {menuOpen === doc.id && (
                        <div className="absolute right-0 top-9 z-20 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 text-sm">
                          <Link href={`/documents/${doc.id}`} className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50">
                            <Eye className="w-3.5 h-3.5" /> View
                          </Link>
                          <Link href={`/editor/${doc.id}`} className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50">
                            <FileText className="w-3.5 h-3.5" /> Edit
                          </Link>
                          <button
                            onClick={() => { setSendTarget(doc); setMenuOpen(null) }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50"
                          >
                            <Send className="w-3.5 h-3.5" /> Send
                          </button>
                          <button
                            onClick={() => handleDuplicate(doc)}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50"
                          >
                            <Copy className="w-3.5 h-3.5" /> Duplicate
                          </button>
                          <button
                            onClick={() => showToast({ type: 'info', title: 'Downloading...', message: doc.title })}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50"
                          >
                            <Download className="w-3.5 h-3.5" /> Download PDF
                          </button>
                          <div className="h-px bg-slate-100 my-1" />
                          <button
                            onClick={() => { setDeleteTarget(doc); setMenuOpen(null) }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((doc) => (
              <div key={doc.id} className="relative group">
                <Link href={`/documents/${doc.id}`}>
                  <Card hover className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <StatusBadge status={doc.status} />
                    </div>
                    <h3 className="font-medium text-slate-900 text-sm leading-snug mb-2 line-clamp-2">{doc.title}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        {doc.recipients.length > 0 && (
                          <div className="flex -space-x-1">
                            {doc.recipients.slice(0, 3).map((r) => (
                              <div key={r.id} className="w-5 h-5 bg-slate-400 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-white text-[8px] font-bold">{r.name[0]}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{formatRelative(doc.updatedAt)}</span>
                    </div>
                  </Card>
                </Link>
                {/* Grid action buttons */}
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.preventDefault()}>
                  <button
                    onClick={() => { setSendTarget(doc) }}
                    className="w-7 h-7 bg-white rounded-lg shadow border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    title="Send"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDuplicate(doc)}
                    className="w-7 h-7 bg-white rounded-lg shadow border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(doc)}
                    className="w-7 h-7 bg-white rounded-lg shadow border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-600 hover:border-red-300 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {/* New doc card */}
            <Link href="/editor/new">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 h-full min-h-[140px] flex flex-col items-center justify-center text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-all cursor-pointer">
                <Plus className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">New Document</span>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Document"
        size="sm"
      >
        <ModalBody>
          <p className="text-sm text-slate-600">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-slate-900">&quot;{deleteTarget?.title}&quot;</span>?
            This action cannot be undone.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => deleteTarget && handleDelete(deleteTarget)}>
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </ModalFooter>
      </Modal>

      {/* Send Dialog */}
      {sendTarget && (
        <SendDialog
          documentId={sendTarget.id}
          documentTitle={sendTarget.title}
          open={!!sendTarget}
          onClose={() => setSendTarget(null)}
        />
      )}
    </div>
  )
}
