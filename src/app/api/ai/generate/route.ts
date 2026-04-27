import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSettings } from '@/lib/settings'

/**
 * POST /api/ai/generate
 * Body: { prompt: string, context?: string }
 * Uses the API key + provider configured by the super admin.
 */

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { prompt, context } = await req.json()
  if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 })

  const s = await getSettings(['ai.provider', 'ai.apiKey', 'ai.model'])
  const provider = s['ai.provider'] || 'openai'
  const apiKey = s['ai.apiKey']
  const defaultModel =
    provider === 'anthropic' ? 'claude-3-5-sonnet-latest' :
    provider === 'kimi'      ? 'moonshot-v1-8k' :
    'gpt-4o-mini'
  const model = s['ai.model'] || defaultModel

  if (!apiKey) {
    return NextResponse.json({
      error: 'AI is not configured. The super admin must set an API key in Admin → Settings → AI.',
    }, { status: 503 })
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
          max_tokens: 2048,
          messages: [
            {
              role: 'user',
              content: `${context ? `Context:\n${context}\n\n` : ''}Request: ${prompt}\n\nRespond with clean, professional HTML suitable for pasting into a document editor. No <html>/<body> wrappers.`,
            },
          ],
        }),
      })
      const data = await res.json()
      if (!res.ok) return NextResponse.json({ error: data.error?.message ?? 'AI error' }, { status: 502 })
      const text = data.content?.[0]?.text ?? ''
      return NextResponse.json({ html: text })
    }

    // Kimi (Moonshot) — OpenAI-compatible
    if (provider === 'kimi') {
      const res = await fetch('https://api.moonshot.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: 'You are a professional document-drafting assistant. Always respond with clean, semantic HTML suitable for a rich-text editor. Never wrap in <html>/<body>.' },
            { role: 'user', content: `${context ? `Context:\n${context}\n\n` : ''}${prompt}` },
          ],
          temperature: 0.5,
        }),
      })
      const data = await res.json()
      if (!res.ok) return NextResponse.json({ error: data.error?.message ?? 'Kimi AI error' }, { status: 502 })
      const text = data.choices?.[0]?.message?.content ?? ''
      return NextResponse.json({ html: text })
    }

    // default: OpenAI
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are a professional document-drafting assistant. Always respond with clean, semantic HTML suitable for a rich-text editor. Never wrap in <html>/<body>.' },
          { role: 'user', content: `${context ? `Context:\n${context}\n\n` : ''}${prompt}` },
        ],
        temperature: 0.5,
      }),
    })
    const data = await res.json()
    if (!res.ok) return NextResponse.json({ error: data.error?.message ?? 'AI error' }, { status: 502 })
    const text = data.choices?.[0]?.message?.content ?? ''
    return NextResponse.json({ html: text })
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'AI request failed' }, { status: 500 })
  }
}
