
// In-memory rate limiter (per IP)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per window
const ipMap = new Map<string, { count: number; resetAt: number }>();

// Cleanup expired entries periodically to prevent memory leaks
const CLEANUP_INTERVAL = RATE_LIMIT_WINDOW; // Clean up every minute
let cleanupTimer: NodeJS.Timeout | null = null;

function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [ip, entry] of ipMap.entries()) {
    if (entry.resetAt <= now) {
      ipMap.delete(ip);
    }
  }
}

// Start cleanup on module initialization
if (typeof setInterval !== 'undefined' && !cleanupTimer) {
  cleanupTimer = setInterval(cleanupExpiredEntries, CLEANUP_INTERVAL);
  // Allow cleanup timer to not block process exit
  if (cleanupTimer.unref) {
    cleanupTimer.unref();
  }
}

// Export cleanup stopper for graceful shutdown if needed
export function stopCleanup() {
  if (cleanupTimer) {
    clearInterval(cleanupTimer);
    cleanupTimer = null;
  }
}

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; retryAfter?: number }> {
  const now = Date.now();
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
