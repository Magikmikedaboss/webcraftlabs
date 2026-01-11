
// In-memory rate limiter (per IP)
// NOTE: For production serverless environments, consider using Vercel KV or Upstash Redis
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per window
const ipMap = new Map<string, { count: number; resetAt: number }>();

// Lazy cleanup configuration
const CLEANUP_THRESHOLD = 100; // Trigger cleanup when map exceeds this size
const CLEANUP_BATCH_SIZE = 10; // Max entries to clean per invocation

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
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
