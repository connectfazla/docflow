import crypto from 'crypto'

/**
 * Symmetric encryption for secrets stored in the DB (SMTP passwords,
 * API keys, payment provider credentials, etc.).
 *
 * Uses AES-256-GCM. Keys are derived from APP_ENCRYPTION_KEY.
 */

const ALGO = 'aes-256-gcm'
const IV_LEN = 12
const KEY = (() => {
  const raw = process.env.APP_ENCRYPTION_KEY ?? 'docflow-prod-32-byte-aes-key!!!x'
  // Derive a deterministic 32-byte key from whatever the user provides
  return crypto.createHash('sha256').update(raw).digest()
})()

export function encrypt(plain: string): string {
  const iv = crypto.randomBytes(IV_LEN)
  const cipher = crypto.createCipheriv(ALGO, KEY, iv)
  const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, tag, enc]).toString('base64')
}

export function decrypt(payload: string): string {
  try {
    const buf = Buffer.from(payload, 'base64')
    const iv = buf.subarray(0, IV_LEN)
    const tag = buf.subarray(IV_LEN, IV_LEN + 16)
    const enc = buf.subarray(IV_LEN + 16)
    const decipher = crypto.createDecipheriv(ALGO, KEY, iv)
    decipher.setAuthTag(tag)
    return Buffer.concat([decipher.update(enc), decipher.final()]).toString('utf8')
  } catch {
    return ''
  }
}

/** Mask a secret for safe display — keeps first 4 + last 4 chars. */
export function maskSecret(value: string): string {
  if (!value) return ''
  if (value.length <= 8) return '••••••••'
  return `${value.slice(0, 4)}••••${value.slice(-4)}`
}
