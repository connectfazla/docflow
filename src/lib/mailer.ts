import nodemailer from 'nodemailer'
import { getSettings } from './settings'

/**
 * Sends email via the SMTP settings configured in the admin panel.
 * Falls back to a stream-transport (logs to console) when unconfigured.
 */

export async function getTransport() {
  const s = await getSettings([
    'smtp.host',
    'smtp.port',
    'smtp.secure',
    'smtp.user',
    'smtp.password',
    'smtp.from',
  ])

  if (!s['smtp.host']) {
    // Dev fallback — no-op mailer that logs to the console
    return {
      sendMail: async (opts: any) => {
        console.log('📧 [dev-mailer] (SMTP not configured, skipping send)')
        console.log('   To:', opts.to)
        console.log('   Subject:', opts.subject)
        return { messageId: 'dev-mailer' }
      },
      from: s['smtp.from'] || 'DocFlow Pro <no-reply@docflow.pro>',
    }
  }

  const t = nodemailer.createTransport({
    host: s['smtp.host'],
    port: Number(s['smtp.port'] ?? '587'),
    secure: s['smtp.secure'] === 'true',
    auth: s['smtp.user']
      ? { user: s['smtp.user'], pass: s['smtp.password'] }
      : undefined,
  })

  return {
    sendMail: (opts: any) => t.sendMail(opts),
    from: s['smtp.from'] || s['smtp.user'] || 'no-reply@docflow.pro',
  }
}

export async function sendMail(opts: {
  to: string
  subject: string
  html: string
  text?: string
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const t = await getTransport()
    await t.sendMail({ from: t.from, ...opts })
    return { ok: true }
  } catch (e: any) {
    console.error('[mailer] send failed:', e.message)
    return { ok: false, error: e.message }
  }
}

/** Test the active SMTP config by sending to a single recipient. */
export async function testSmtp(to: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const t = await getTransport()
    await t.sendMail({
      from: t.from,
      to,
      subject: 'DocFlow Pro — SMTP test',
      html: '<p>Your SMTP settings are working. 🎉</p>',
    })
    return { ok: true }
  } catch (e: any) {
    return { ok: false, error: e.message }
  }
}
