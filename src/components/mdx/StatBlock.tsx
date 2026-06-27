import type { ReactNode } from "react";

export default function StatBlock({
  value,
  label,
  children,
}: {
  value: string;
  label: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="my-8 rounded-2xl border p-6 text-center"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div
        className="text-4xl font-black mb-1"
        style={{ color: "var(--primary)" }}
      >
        {value}
      </div>
      <div
        className="text-xs font-bold uppercase tracking-widest mb-4"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </div>
      {children && (
        <div
          className="text-sm leading-relaxed text-left border-t pt-4"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
