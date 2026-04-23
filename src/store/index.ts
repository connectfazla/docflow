import { create } from 'zustand'
import type { Document, Template, User } from '@/types'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
}

interface AppState {
  documents: Document[]
  templates: Template[]
  user: User | null
  toasts: Toast[]
  hydrated: boolean

  // Data
  hydrate: () => Promise<void>
  refreshDocuments: () => Promise<void>
  refreshTemplates: () => Promise<void>

  // Document actions (write-through)
  addDocument: (doc: Document) => void
  updateDocument: (id: string, updates: Partial<Document>) => void
  deleteDocument: (id: string) => Promise<void>
  sendDocument: (id: string) => void
  duplicateDocument: (id: string) => Document

  // User
  setUser: (user: User) => void

  // Toasts
  showToast: (toast: Omit<Toast, 'id'>) => void
  dismissToast: (id: string) => void
}

function normalizeDoc(d: any): Document {
  return {
    id: d.id,
    title: d.title,
    status: (d.status ?? 'DRAFT').toLowerCase() as any,
    createdAt: typeof d.createdAt === 'string' ? d.createdAt : new Date(d.createdAt).toISOString(),
    updatedAt: typeof d.updatedAt === 'string' ? d.updatedAt : new Date(d.updatedAt).toISOString(),
    sentAt: d.sentAt ? new Date(d.sentAt).toISOString() : undefined,
    completedAt: d.completedAt ? new Date(d.completedAt).toISOString() : undefined,
    recipients: (d.recipients ?? []).map((r: any) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      role: (r.role ?? 'signer').toLowerCase(),
      status: (r.status ?? 'pending').toLowerCase(),
      signedAt: r.signedAt ? new Date(r.signedAt).toISOString() : undefined,
    })),
    tags: d.tags ?? [],
    viewCount: d.viewCount ?? 0,
    templateId: d.templateId ?? undefined,
    expiresAt: d.expiresAt ? new Date(d.expiresAt).toISOString() : undefined,
  }
}

function normalizeTemplate(t: any): Template {
  return {
    id: t.id,
    title: t.title,
    description: t.description,
    category: t.category,
    createdAt: typeof t.createdAt === 'string' ? t.createdAt : new Date(t.createdAt).toISOString(),
    updatedAt: typeof t.updatedAt === 'string' ? t.updatedAt : new Date(t.updatedAt).toISOString(),
    usageCount: t.usageCount ?? 0,
    tags: t.tags ?? [],
  }
}

export const useAppStore = create<AppState>()((set, get) => ({
  documents: [],
  templates: [],
  user: null,
  toasts: [],
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) return
    try {
      const [docs, tpls] = await Promise.all([
        fetch('/api/documents').then((r) => r.ok ? r.json() : { documents: [] }),
        fetch('/api/templates').then((r) => r.ok ? r.json() : { templates: [] }),
      ])
      set({
        documents: (docs.documents ?? []).map(normalizeDoc),
        templates: (tpls.templates ?? []).map(normalizeTemplate),
        hydrated: true,
      })
    } catch (e) {
      console.error('hydrate failed', e)
      set({ hydrated: true })
    }
  },

  refreshDocuments: async () => {
    const r = await fetch('/api/documents')
    if (r.ok) {
      const { documents } = await r.json()
      set({ documents: documents.map(normalizeDoc) })
    }
  },

  refreshTemplates: async () => {
    const r = await fetch('/api/templates')
    if (r.ok) {
      const { templates } = await r.json()
      set({ templates: templates.map(normalizeTemplate) })
    }
  },

  addDocument: (doc) => set((s) => ({ documents: [doc, ...s.documents] })),

  updateDocument: (id, updates) =>
    set((s) => ({
      documents: s.documents.map((d) =>
        d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d
      ),
    })),

  deleteDocument: async (id) => {
    try {
      await fetch(`/api/documents/${id}`, { method: 'DELETE' })
    } catch {}
    set((s) => ({ documents: s.documents.filter((d) => d.id !== id) }))
  },

  sendDocument: (id) =>
    set((s) => ({
      documents: s.documents.map((d) =>
        d.id === id
          ? { ...d, status: 'sent' as const, sentAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
          : d
      ),
    })),

  duplicateDocument: (id) => {
    const original = get().documents.find((d) => d.id === id)
    if (!original) throw new Error('Document not found')
    const copy: Document = {
      ...original,
      id: `d${Date.now()}`,
      title: `${original.title} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sentAt: undefined,
      completedAt: undefined,
      recipients: [],
      viewCount: 0,
    }
    set((s) => ({ documents: [copy, ...s.documents] }))
    return copy
  },

  setUser: (user) => set({ user }),

  showToast: (toast) => {
    const id = `toast-${Date.now()}`
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }))
    setTimeout(() => get().dismissToast(id), 4000)
  },

  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
