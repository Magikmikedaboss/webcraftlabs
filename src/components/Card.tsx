import type { ReactNode } from 'react';

export default function Card({
  title,
  text,
  children,
}: {
  title: string;
  text?: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="text-base font-semibold">{title}</div>
      {text && <p className="mt-2 text-sm text-[var(--muted)]">{text}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
