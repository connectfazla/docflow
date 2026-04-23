/**
 * Tiny in-memory token-bucket / fixed-window rate limiter.
 * Good enough for a single-node deployment. Swap for Upstash Redis in
 * production if running multi-instance.
 */
type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

export interface RateLimitOptions {
  /** Max requests per window. */
  limit: number
  /** Window length in ms. */
  windowMs: number
}

export interface RateLimitResult {
  ok: boolean
  remaining: number
  resetAt: number
}

export function rateLimit(key: string, opts: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const b = buckets.get(key)

  if (!b || b.resetAt <= now) {
    const fresh = { count: 1, resetAt: now + opts.windowMs }
    buckets.set(key, fresh)
    return { ok: true, remaining: opts.limit - 1, resetAt: fresh.resetAt }
  }

  b.count += 1
  const ok = b.count <= opts.limit
  return { ok, remaining: Math.max(0, opts.limit - b.count), resetAt: b.resetAt }
}

/** Occasionally sweep expired buckets so the map doesn't grow unbounded. */
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k)
  }, 60_000).unref?.()
}
