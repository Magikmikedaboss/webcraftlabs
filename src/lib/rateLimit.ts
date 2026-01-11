/**
 * ⚠️ WARNING: IN-MEMORY RATE LIMITING - NOT SUITABLE FOR PRODUCTION
 * 
 * This implementation uses an in-memory Map that will NOT work correctly in:
 * - Vercel Edge Runtime (each invocation runs in a separate isolate)
 * - Serverless functions (no shared memory between invocations)
 * - Multi-instance deployments (each instance has its own memory)
 * 
 * This provides NO REAL PROTECTION in production deployments.
 * 
 * For production, replace with:
 * - Vercel KV: https://vercel.com/docs/storage/vercel-kv
 * - Upstash Redis: https://upstash.com/
 * - Other distributed rate limiting service
 * 
 * Current behavior: Useful for local development only.
 */

// Development-only rate limiter
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per window
const ipMap = new Map<string, { count: number; resetAt: number }>();

// Lazy cleanup configuration
const CLEANUP_THRESHOLD = 100; // Trigger cleanup when map exceeds this size
const CLEANUP_BATCH_SIZE = 10; // Max entries to clean per invocation

/**
 * Check rate limit for given IP address
 * ⚠️ Only effective in local development - see warning above
 */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  // In production serverless, log warning on first use
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
    console.warn('[RATE LIMIT] Using in-memory rate limiting in serverless environment - THIS WILL NOT WORK. Use Vercel KV or Upstash Redis instead.');
  }
  const now = Date.now();
  
  // Lazy cleanup: if map is large, remove a few expired entries
  if (ipMap.size > CLEANUP_THRESHOLD) {
    let cleaned = 0;
    for (const [key, entry] of ipMap.entries()) {
      if (entry.resetAt <= now) {
        ipMap.delete(key);
        cleaned++;
        if (cleaned >= CLEANUP_BATCH_SIZE) break;
      }
    }
  }
  
  let entry = ipMap.get(ip);
  if (!entry || now > entry.resetAt) {
    // New window
    entry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW };
    ipMap.set(ip, entry);
    return { allowed: true };
  }
  if (entry.count < RATE_LIMIT_MAX) {
    entry.count++;
    return { allowed: true };
  }
  // Rate limit exceeded
  const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
  return { allowed: false, retryAfter };
}
