import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sanitizeHtml } from '@/lib/sanitize'
import { rateLimit } from '@/lib/rate-limit'

/** Public — fetch a shared document by token (no auth). */
export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const doc = await db.document.findUnique({
    where: { shareToken: params.token },
    include: { recipients: true, owner: { select: { name: true, email: true } } },
  })
  if (!doc || !doc.sharePublic) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // bump view count (non-blocking)
  db.document.update({ where: { id: doc.id }, data: { viewCount: { increment: 1 } } }).catch(() => {})
  db.activityItem.create({ data: { documentId: doc.id, type: 'VIEWED', actorName: 'Recipient' } }).catch(() => {})

  return NextResponse.json({
    document: {
      id: doc.id,
      title: doc.title,
      content: sanitizeHtml(doc.content ?? ''),
      status: doc.status,
      sentAt: doc.sentAt,
      owner: doc.owner,
      recipients: doc.recipients.map((r) => ({
        id: r.id, name: r.name, email: r.email, status: r.status, role: r.role,
      })),
    },
  })
}

/** Public — sign by token. Body: { recipientEmail, signatureDataUrl } */
export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const rl = rateLimit(`share-sign:${ip}:${params.token}`, { limit: 10, windowMs: 60_000 })
  if (!rl.ok) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })

  const { recipientEmail, signatureDataUrl } = await req.json()
  if (typeof recipientEmail !== 'string' || typeof signatureDataUrl !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
  // Guard: signature must be a reasonable data URL (cap ~2 MB base64)
  if (!signatureDataUrl.startsWith('data:image/') || signatureDataUrl.length > 2_800_000) {
    return NextResponse.json({ error: 'Invalid signature data' }, { status: 400 })
  }

  const doc = await db.document.findUnique({ where: { shareToken: params.token } })
  if (!doc || !doc.sharePublic) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const r = await db.recipient.findFirst({
    where: { documentId: doc.id, email: (recipientEmail ?? '').toLowerCase() },
  })
  if (!r) return NextResponse.json({ error: 'Recipient not found on this document.' }, { status: 403 })

  await db.recipient.update({
    where: { id: r.id },
    data: {
      status: 'SIGNED',
      signedAt: new Date(),
      signature: signatureDataUrl ?? null,
      ipAddress: req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? undefined,
    },
  })

  // If all recipients signed, mark completed
  const remaining = await db.recipient.count({
    where: { documentId: doc.id, status: { in: ['PENDING', 'VIEWED'] } },
  })
  if (remaining === 0) {
    await db.document.update({
      where: { id: doc.id },
      data: { status: 'COMPLETED', completedAt: new Date() },
    })
  } else {
    await db.document.update({ where: { id: doc.id }, data: { status: 'SIGNED' } })
  }

  await db.activityItem.create({
    data: { documentId: doc.id, type: 'SIGNED', actorName: r.name, actorEmail: r.email },
  })

  return NextResponse.json({ success: true })
}
