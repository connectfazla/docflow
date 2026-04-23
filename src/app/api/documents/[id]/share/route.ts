import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { randomBytes } from 'crypto'
import { authOptions, isSuperAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { sendMail } from '@/lib/mailer'
import { logAudit } from '@/lib/audit'

/**
 * POST /api/documents/:id/share
 * Body: { recipients: [{ name, email, role? }], message? }
 * Creates a share token, saves recipients, emails them a signing link.
 */

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const doc = await db.document.findUnique({ where: { id: params.id } })
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const userId = session.user.id as string
  const role = session.user.role as string
  if (!isSuperAdmin(role) && doc.ownerId !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const recipients: Array<{ name: string; email: string; role?: 'signer' | 'viewer' | 'approver' }> =
    Array.isArray(body.recipients) ? body.recipients : []
  const message: string = body.message ?? ''

  if (!recipients.length) {
    return NextResponse.json({ error: 'At least one recipient is required.' }, { status: 400 })
  }

  // Create share token + save recipients
  const shareToken = doc.shareToken ?? randomBytes(24).toString('base64url')

  await db.document.update({
    where: { id: doc.id },
    data: {
      shareToken,
      status: 'SENT',
      sentAt: new Date(),
      sharePublic: true,
    },
  })

  // Replace existing pending recipients to avoid dupes
  await db.recipient.deleteMany({ where: { documentId: doc.id, status: 'PENDING' } })

  for (const [i, r] of recipients.entries()) {
    const roleEnum =
      r.role === 'viewer' ? 'VIEWER' : r.role === 'approver' ? 'APPROVER' : 'SIGNER'
    await db.recipient.create({
      data: {
        documentId: doc.id,
        name: r.name,
        email: r.email.toLowerCase(),
        role: roleEnum,
        order: i,
      },
    })
  }

  await db.activityItem.create({
    data: { documentId: doc.id, type: 'SENT', actorName: session.user.name ?? 'User' },
  })

  // Email recipients
  const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3219'
  const signUrl = `${baseUrl}/sign/${shareToken}`

  const results: Array<{ email: string; ok: boolean; error?: string }> = []
  for (const r of recipients) {
    const res = await sendMail({
      to: r.email,
      subject: `${session.user.name ?? 'DocFlow Pro'} sent you "${doc.title}"`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
          <h2 style="color:#0f172a;margin:0 0 16px">You have a document to review</h2>
          <p style="color:#334155;line-height:1.6">Hi ${r.name},</p>
          <p style="color:#334155;line-height:1.6">${session.user.name ?? 'A team member'} has sent you <strong>${doc.title}</strong> to review and sign.</p>
          ${message ? `<blockquote style="border-left:3px solid #2563eb;padding:8px 16px;color:#475569;background:#f8fafc;">${message}</blockquote>` : ''}
          <p style="margin:24px 0"><a href="${signUrl}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 24px;border-radius:12px;font-weight:600;">Review & Sign</a></p>
          <p style="color:#94a3b8;font-size:12px">This link is unique to this document. Do not share it.</p>
        </div>
      `,
    })
    results.push({ email: r.email, ok: res.ok, error: res.error })
  }

  await logAudit({
    userId,
    action: 'document.share',
    target: doc.id,
    metadata: { recipients: recipients.length },
    req,
  })

  return NextResponse.json({
    success: true,
    shareToken,
    shareUrl: signUrl,
    emailResults: results,
  })
}
