import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isSuperAdmin } from '@/lib/auth'
import { getSettings } from '@/lib/settings'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!isSuperAdmin((session?.user as any)?.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Allow testing with values from the form (not yet saved) or fall back to saved settings
  const body = await req.json().catch(() => ({}))
  const saved = await getSettings(['ai.provider', 'ai.apiKey', 'ai.model'])

  const provider = body['ai.provider'] || saved['ai.provider'] || 'openai'
  // If the form value looks like a masked secret (contains ••••), use the saved value
  const rawKey = body['ai.apiKey'] ?? ''
  const apiKey = rawKey.includes('••••') ? saved['ai.apiKey'] : (rawKey || saved['ai.apiKey'])
  const defaultModel =
    provider === 'anthropic' ? 'claude-3-5-sonnet-latest' :
    provider === 'kimi'      ? 'moonshot-v1-8k' :
    'gpt-4o-mini'
  const model = body['ai.model'] || saved['ai.model'] || defaultModel

  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'No API key configured. Save your key first, then test.' })
  }

  try {
    if (provider === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Say OK' }],
        }),
      })
      const data = await res.json()
      if (!res.ok) return NextResponse.json({ ok: false, error: data.error?.message ?? `Anthropic error ${res.status}` })
      return NextResponse.json({ ok: true })
    }

    if (provider === 'kimi') {
      const res = await fetch('https://api.moonshot.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Say OK' }],
        }),
      })
      const data = await res.json()
      if (!res.ok) return NextResponse.json({ ok: false, error: data.error?.message ?? `Kimi error ${res.status}` })
      return NextResponse.json({ ok: true })
    }

    // OpenAI
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Say OK' }],
      }),
    })
    const data = await res.json()
    if (!res.ok) return NextResponse.json({ ok: false, error: data.error?.message ?? `OpenAI error ${res.status}` })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message ?? 'Connection failed' })
  }
}
