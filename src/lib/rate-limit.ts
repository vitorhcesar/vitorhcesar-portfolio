interface RateLimitEntry {
  count: number
  resetAt: number
}

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

const hits = new Map<string, RateLimitEntry>()

/** Simple in-memory rate limit (per process). Enough for a personal portfolio. */
export function checkRateLimit(key: string): {
  allowed: boolean
  retryAfterSec: number
} {
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || now >= entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, retryAfterSec: 0 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((entry.resetAt - now) / 1000),
    }
  }

  entry.count += 1
  return { allowed: true, retryAfterSec: 0 }
}
