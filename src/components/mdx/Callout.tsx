import { ReactNode } from 'react';

export default function Callout({
  title = "Note",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-6 rounded-2xl border p-5" style={{ borderColor: 'var(--primary)', background: 'var(--surface)' }}>
      <div className="text-sm font-bold" style={{ color: 'var(--primary)' }}>{title}</div>
      <div className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{children}</div>
    </div>
  );
}
