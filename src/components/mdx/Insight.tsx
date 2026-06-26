import type { ReactNode } from "react";

export default function Insight({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="my-6 rounded-2xl border-l-4 p-5"
      style={{ borderColor: "var(--accent)", background: "var(--surface)" }}
    >
      <div
        className="text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: "var(--accent)" }}
      >
        ✦ {title}
      </div>
      <div
        className="leading-relaxed text-sm"
        style={{ color: "var(--text)" }}
      >
        {children}
      </div>
    </div>
  );
}
