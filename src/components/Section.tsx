import type { ReactNode } from 'react';

export default function Section({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-3xl font-semibold">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl text-[var(--muted)]">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}
