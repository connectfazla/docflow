import { db } from './db'
import { encrypt, decrypt } from './crypto'

/**
 * Settings key-value store. Secrets are transparently encrypted.
 */

export type SettingKey =
  | 'smtp.host'
  | 'smtp.port'
  | 'smtp.secure'
  | 'smtp.user'
  | 'smtp.password'
  | 'smtp.from'
  | 'ai.provider'          // 'openai' | 'anthropic' | 'none'
  | 'ai.apiKey'
  | 'ai.model'
  | 'payments.provider'    // 'free' | 'stripe' | 'ziina'
  | 'payments.stripe.secretKey'
  | 'payments.stripe.publishableKey'
  | 'payments.stripe.webhookSecret'
  | 'payments.ziina.apiKey'
  | 'payments.ziina.webhookSecret'
  | 'branding.companyName'
  | 'branding.supportEmail'

const SECRET_KEYS: SettingKey[] = [
  'smtp.password',
  'ai.apiKey',
  'payments.stripe.secretKey',
  'payments.stripe.webhookSecret',
  'payments.ziina.apiKey',
  'payments.ziina.webhookSecret',
]

export async function getSetting(key: SettingKey): Promise<string> {
  const row = await db.appSetting.findUnique({ where: { key } })
  if (!row) return ''
  if (row.isSecret) return decrypt(row.value)
  return row.value
}

export async function getSettings(keys: SettingKey[]): Promise<Record<string, string>> {
  const rows = await db.appSetting.findMany({ where: { key: { in: keys } } })
  return Object.fromEntries(
    rows.map((r) => [r.key, r.isSecret ? decrypt(r.value) : r.value])
  )
}

export async function setSetting(key: SettingKey, value: string, updatedBy?: string) {
  const isSecret = SECRET_KEYS.includes(key)
  const storedValue = isSecret ? encrypt(value) : value
  await db.appSetting.upsert({
    where: { key },
    create: { key, value: storedValue, isSecret, updatedBy },
    update: { value: storedValue, isSecret, updatedBy },
  })
}

export async function setSettings(
  values: Partial<Record<SettingKey, string>>,
  updatedBy?: string
) {
  await Promise.all(
    Object.entries(values).map(([k, v]) =>
      setSetting(k as SettingKey, v ?? '', updatedBy)
    )
  )
}

export function isSecretKey(key: string): boolean {
  return SECRET_KEYS.includes(key as SettingKey)
}
