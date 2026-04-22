import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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

  // Document actions
  addDocument: (doc: Document) => void
  updateDocument: (id: string, updates: Partial<Document>) => void
  deleteDocument: (id: string) => void
  sendDocument: (id: string) => void
  duplicateDocument: (id: string) => Document

  // User actions
  setUser: (user: User) => void

  // Toast actions
  showToast: (toast: Omit<Toast, 'id'>) => void
  dismissToast: (id: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      documents: [],
      templates: [],
      user: null,
      toasts: [],

      addDocument: (doc) =>
        set((s) => ({ documents: [doc, ...s.documents] })),

      updateDocument: (id, updates) =>
        set((s) => ({
          documents: s.documents.map((d) =>
            d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d
          ),
        })),

      deleteDocument: (id) =>
        set((s) => ({ documents: s.documents.filter((d) => d.id !== id) })),

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

      dismissToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: 'docflow-pro-store',
      partialize: (state) => ({
        documents: state.documents,
        templates: state.templates,
        user: state.user,
      }),
    }
  )
)
