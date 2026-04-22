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
import { useState, useEffect } from 'react'
import {
  ChevronLeft, Send, Download, Eye, Save, MoreHorizontal,
  UserPlus, Clock, CheckCircle, Sparkles, X, PenTool, Plus,
  FileText, Tag, Lock
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { EditorToolbar } from '@/components/editor/toolbar'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const INITIAL_CONTENT = `<h1>Software Development Agreement</h1>

<p>This Software Development Agreement ("Agreement") is entered into as of <strong>April 22, 2026</strong>, between <strong>Acme Corp</strong> ("Client") and <strong>Dev Studio LLC</strong> ("Developer").</p>

<h2>1. Scope of Work</h2>

<p>Developer agrees to provide the following software development services:</p>

<ul>
  <li>Design and develop a web application according to the specifications provided by Client</li>
  <li>Implement frontend and backend systems using modern, scalable technologies</li>
  <li>Provide documentation for all developed features and APIs</li>
  <li>Conduct code reviews and ensure code quality standards are met</li>
</ul>

<h2>2. Payment Terms</h2>

<p>Client agrees to pay Developer the total sum of <strong>$24,000 USD</strong> according to the following milestone schedule:</p>

<blockquote>
  25% upon signing · 25% at midpoint review · 50% upon final delivery
</blockquote>

<h2>3. Intellectual Property</h2>

<p>Upon receipt of full payment, all work product created by Developer under this Agreement shall become the exclusive property of Client, including all copyrights, patents, trade secrets, and other intellectual property rights.</p>

<h2>4. Confidentiality</h2>

<p>Both parties agree to maintain the confidentiality of each other's proprietary information and trade secrets during the term of this Agreement and for two (2) years thereafter.</p>

<h2>5. Term and Termination</h2>

<p>This Agreement commences on the date first written above and continues until project completion. Either party may terminate this Agreement with 30 days written notice.</p>

<hr>

<p><em>This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations, representations, or agreements.</em></p>`

const recipientSample = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@client.com', role: 'Signer', color: 'from-blue-400 to-blue-600' },
  { id: '2', name: 'David Park', email: 'david@client.com', role: 'Approver', color: 'from-violet-400 to-violet-600' },
]

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'new'

  const [title, setTitle] = useState(isNew ? 'Untitled Document' : 'Software Development Agreement')
  const [saved, setSaved] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [rightPanel, setRightPanel] = useState<'recipients' | 'fields' | null>('recipients')

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
      Placeholder.configure({ placeholder: 'Start writing your document...' }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: isNew ? '' : INITIAL_CONTENT,
    editorProps: {
      attributes: {
        class: 'tiptap-editor focus:outline-none min-h-full',
      },
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (editor && !isNew) setSaved(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [editor, isNew])

  useEffect(() => {
    if (!editor) return
    const handler = () => setSaved(false)
    editor.on('update', handler)
    const autoSave = setInterval(() => setSaved(true), 30000)
    return () => {
      editor.off('update', handler)
      clearInterval(autoSave)
    }
  }, [editor])

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* Editor Header */}
      <header className="flex items-center gap-4 px-4 py-3 bg-white border-b border-slate-200 z-20">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex-1 flex items-center gap-3 min-w-0">
          <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center border border-blue-100 flex-shrink-0">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 font-semibold text-slate-900 bg-transparent border-none outline-none text-base truncate min-w-0 placeholder:text-slate-400"
            placeholder="Document title..."
          />
          {saved && (
            <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              Saved
            </div>
          )}
          {!isNew && <StatusBadge status="draft" className="flex-shrink-0" />}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAiOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Assistant
          </button>
          <Button variant="outline" size="sm">
            <Eye className="w-3.5 h-3.5" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-3.5 h-3.5" />
            Save
          </Button>
          <Button size="sm">
            <Send className="w-3.5 h-3.5" />
            Send
          </Button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto">
          <EditorToolbar editor={editor} />

          {/* Document Canvas */}
          <div className="py-8 px-4 flex justify-center">
            <div className="w-full max-w-[816px]">
              {/* Page */}
              <div className="bg-white shadow-lg rounded-sm min-h-[1056px] relative" style={{ padding: '72px 80px' }}>
                {/* Header decoration */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-t-sm" />

                <EditorContent editor={editor} className="min-h-full" />

                {/* Signature fields (visual) */}
                {!isNew && (
                  <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-200">
                    <div className="grid grid-cols-2 gap-8">
                      {recipientSample.map((r) => (
                        <div key={r.id} className="space-y-2">
                          <div className="h-14 border-b-2 border-slate-300 relative flex items-end pb-2">
                            <div className="absolute top-1 left-1 flex items-center gap-1.5">
                              <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center`}>
                                <PenTool className="w-2.5 h-2.5 text-white" />
                              </div>
                              <span className="text-xs text-slate-400">{r.role}</span>
                            </div>
                            <div className="text-slate-300 text-xs font-medium">Click to sign</div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{r.name}</p>
                            <p className="text-xs text-slate-400">{r.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-center text-xs text-slate-400 mt-4">Page 1 of 1</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        {rightPanel && (
          <div className="w-72 bg-white border-l border-slate-200 flex flex-col">
            {/* Panel Tabs */}
            <div className="flex border-b border-slate-200">
              {[
                { id: 'recipients', label: 'Recipients', icon: UserPlus },
                { id: 'fields', label: 'Fields', icon: Tag },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setRightPanel(tab.id as 'recipients' | 'fields')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors border-b-2',
                    rightPanel === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  )}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => setRightPanel(null)}
                className="px-3 py-3 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {rightPanel === 'recipients' && (
              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-xs text-slate-500 mb-4">Add people who need to sign or review this document.</p>

                <div className="space-y-3 mb-4">
                  {recipientSample.map((r, i) => (
                    <div key={r.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className={`w-8 h-8 bg-gradient-to-br ${r.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{r.name[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{r.name}</p>
                        <p className="text-xs text-slate-400 truncate">{r.email}</p>
                      </div>
                      <span className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded-full',
                        r.role === 'Signer' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      )}>
                        {r.role}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-500 hover:border-blue-300 hover:text-blue-500 transition-all">
                  <Plus className="w-4 h-4" />
                  Add Recipient
                </button>

                <div className="mt-6 p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs font-semibold text-amber-800">Signing Order</span>
                  </div>
                  <p className="text-xs text-amber-700">Recipients will sign in the order listed above.</p>
                </div>
              </div>
            )}

            {rightPanel === 'fields' && (
              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-xs text-slate-500 mb-4">Drag fields onto the document to collect information.</p>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Signature', icon: PenTool, color: 'blue' },
                    { label: 'Initials', icon: Tag, color: 'violet' },
                    { label: 'Date', icon: Clock, color: 'emerald' },
                    { label: 'Text', icon: FileText, color: 'amber' },
                    { label: 'Checkbox', icon: CheckCircle, color: 'slate' },
                    { label: 'Dropdown', icon: ChevronLeft, color: 'rose' },
                  ].map((field) => (
                    <div
                      key={field.label}
                      draggable
                      className="flex flex-col items-center gap-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 cursor-grab hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all active:cursor-grabbing"
                    >
                      <field.icon className="w-4 h-4" />
                      {field.label}
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Smart Variables</p>
                  <div className="space-y-1.5">
                    {['{{client_name}}', '{{contract_date}}', '{{total_amount}}', '{{company_name}}'].map((v) => (
                      <div key={v} className="flex items-center justify-between px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors">
                        <code className="text-xs text-blue-600 font-mono">{v}</code>
                        <Plus className="w-3 h-3 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Right panel toggle (when closed) */}
        {!rightPanel && (
          <div className="flex flex-col gap-2 p-2 bg-white border-l border-slate-200">
            <button
              onClick={() => setRightPanel('recipients')}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Recipients"
            >
              <UserPlus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setRightPanel('fields')}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Fields"
            >
              <Tag className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* AI Assistant Modal */}
      {aiOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900 text-sm">AI Document Assistant</h2>
                  <p className="text-xs text-slate-400">Powered by Claude</p>
                </div>
              </div>
              <button onClick={() => setAiOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">Describe what you need and AI will generate or improve your document.</p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  'Write an NDA for a software partnership',
                  'Add a payment terms clause',
                  'Improve the IP ownership section',
                  'Generate a services scope section',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setAiPrompt(suggestion)}
                    className="text-left text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-slate-600 hover:text-blue-600"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe what you want to generate or change..."
                className="w-full h-24 text-sm border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
              />

              <div className="flex items-center justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setAiOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setAiOpen(false)}>
                  <Sparkles className="w-3.5 h-3.5" />
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
