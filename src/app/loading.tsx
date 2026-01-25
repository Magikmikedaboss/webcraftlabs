export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]" role="status" aria-live="polite" aria-label="Loading">
      <div className="text-center">
        <div className="inline-block w-10 h-10 sm:w-12 sm:h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[var(--muted)] font-medium">Loading...</p>
      </div>
    </div>
  );
}
