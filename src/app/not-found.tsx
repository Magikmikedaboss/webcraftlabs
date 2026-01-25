import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-[var(--primary)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-[var(--muted)] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          Back to {SITE.name}
        </Link>
      </div>
    </div>
  );
}
