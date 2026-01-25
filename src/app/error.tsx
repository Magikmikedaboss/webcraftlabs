'use client';

import { useEffect } from 'react';

/**
 * Sanitizes error messages to prevent leaking sensitive information
 * Removes stack traces, file paths, database details, and maps known errors to friendly messages
 */
function sanitizeErrorMessage(error: Error): string {
  const message = error.message || '';
  
  // Map known error types to user-friendly messages
  const knownErrors: Record<string, string> = {
    'Failed to fetch': 'Unable to connect to the server. Please check your internet connection.',
    'NetworkError': 'Network connection error. Please try again.',
    'TimeoutError': 'The request took too long. Please try again.',
    'AbortError': 'The request was cancelled. Please try again.',
  };
  
  // Check for known error patterns
  for (const [pattern, friendlyMessage] of Object.entries(knownErrors)) {
    if (message.includes(pattern)) {
      return friendlyMessage;
    }
  }
  
  // Remove potentially sensitive information
  const sanitized = message
    .replace(/at\s+.*?\(.*?\)/g, '') // Remove stack trace lines
    .replace(/\/[\w\/\-_.]+\.(ts|tsx|js|jsx|mjs):\d+:\d+/g, '') // Remove file paths with line numbers
    .replace(/file:\/\/.*?\s/g, '') // Remove file:// URLs
    .replace(/\b\w+:\/\/[^\s]+/g, '') // Remove URLs
    .replace(/\b(NEXT_PUBLIC_[A-Z_]+|API_KEY(?:_[A-Z_]+)?|DATABASE_URL(?:_[A-Z_]+)?|REDIS_URL(?:_[A-Z_]+)?)\b/g, '[REDACTED]') // Remove env var patterns
    .replace(/\b(password|token|secret|key)\b/gi, '[REDACTED]') // Redact sensitive keywords with word boundaries
    .trim();
  
  // If sanitization removed everything or message is too technical, use generic message
  if (!sanitized || sanitized.length < 10 || /^(Error|TypeError|ReferenceError|SyntaxError):?\s*$/i.test(sanitized)) {
    return 'An unexpected error occurred. Please try again.';
  }
  
  // Limit message length
  return sanitized.length > 200 ? sanitized.substring(0, 200) + '...' : sanitized;
}

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log full error details to the browser console for client-side debugging
  // (Note: server-side logging must be done server-side or via an API)
  useEffect(() => {
    console.error('[ErrorBoundary] Caught error:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-[var(--muted)] mb-8">
          {sanitizeErrorMessage(error)}
        </p>
        <button
          onClick={() => reset()}
          className="rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
