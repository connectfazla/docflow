import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSettings } from '@/lib/settings'

/**
 * POST /api/ai/generate
 * Body: { prompt: string, context?: string }
 * Uses the API key + provider configured by the super admin.
 */

const SYSTEM_PROMPT = `You are an expert legal document drafter with 20 years of experience. Your job is to generate complete, professional, legally binding documents.

CRITICAL RULES:
1. Output ONLY clean semantic HTML — no markdown, no code fences, no explanations, no \`\`\`html blocks.
2. Do NOT wrap in <html>, <head>, or <body> tags.
3. Use ONLY these tags: <h1> <h2> <h3> <p> <ol> <ul> <li> <strong> <em> <table> <thead> <tbody> <tr> <th> <td> <br> <hr>
4. Do NOT add extra blank <p></p> tags between sections — one <p> per paragraph only.
5. Do NOT add inline styles unless strictly necessary for a table.
6. Every document MUST be comprehensive and legally substantial — minimum 800 words.
7. Include: parties section, definitions, all major legal clauses, obligations, warranties, liability limitations, termination, dispute resolution, governing law, and a signature block.
8. Use {{placeholder}} syntax for fields that need to be filled in (e.g. {{party_name}}, {{date}}, {{address}}).
9. Structure: h1 for document title, h2 for numbered sections, p for body text, ol/ul for lists.`

function cleanHtml(raw: string): string {
  return raw
    // strip markdown code fences
    .replace(/```html?\n?/gi, '').replace(/```\n?/g, '')
    // collapse 3+ consecutive newlines to 2
    .replace(/\n{3,}/g, '\n\n')
    // remove empty paragraph tags with only whitespace/nbsp
    .replace(/<p[^>]*>(\s|&nbsp;)*<\/p>/gi, '')
    // collapse multiple <br> in a row
    .replace(/(<br\s*\/?>\s*){3,}/gi, '<br>')
    .trim()
}

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

  const userContent = `${context ? `Existing document context:\n${context}\n\n` : ''}Generate the following document: ${prompt}`

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
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userContent }],
        }),
      })
      const data = await res.json()
      if (!res.ok) return NextResponse.json({ error: data.error?.message ?? 'AI error' }, { status: 502 })
      const text = cleanHtml(data.content?.[0]?.text ?? '')
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
          max_tokens: 4096,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userContent },
          ],
          temperature: 0.3,
        }),
      })
      const data = await res.json()
      if (!res.ok) return NextResponse.json({ error: data.error?.message ?? 'Kimi AI error' }, { status: 502 })
      const text = cleanHtml(data.choices?.[0]?.message?.content ?? '')
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
        max_tokens: 4096,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
        temperature: 0.3,
      }),
    })
    const data = await res.json()
    if (!res.ok) return NextResponse.json({ error: data.error?.message ?? 'AI error' }, { status: 502 })
    const text = cleanHtml(data.choices?.[0]?.message?.content ?? '')
    return NextResponse.json({ html: text })
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'AI request failed' }, { status: 500 })
  }
}
