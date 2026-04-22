export type DocumentStatus = 'draft' | 'sent' | 'viewed' | 'signed' | 'completed' | 'declined' | 'expired'

export interface Recipient {
  id: string
  name: string
  email: string
  role: 'signer' | 'viewer' | 'approver'
  status: 'pending' | 'viewed' | 'signed' | 'declined'
  signedAt?: string
}

export interface Document {
  id: string
  title: string
  status: DocumentStatus
  createdAt: string
  updatedAt: string
  sentAt?: string
  completedAt?: string
  recipients: Recipient[]
  templateId?: string
  tags: string[]
  isTemplate?: boolean
  expiresAt?: string
  viewCount: number
  completionRate?: number
}

export interface Template {
  id: string
  title: string
  description: string
  category: string
  createdAt: string
  updatedAt: string
  usageCount: number
  thumbnail?: string
  tags: string[]
  isLocked?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'owner' | 'admin' | 'manager' | 'member' | 'viewer'
  workspace: string
}

export interface ActivityItem {
  id: string
  type: 'sent' | 'viewed' | 'signed' | 'commented' | 'declined' | 'created'
  documentId: string
  documentTitle: string
  actorName: string
  actorEmail?: string
  timestamp: string
  metadata?: Record<string, string>
}

export interface AnalyticsStat {
  label: string
  value: number | string
  change: number
  changeLabel: string
}
