export default function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border p-5 shadow-sm" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--muted)' }}>{label}</div>
      <div className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--text)' }}>{value}</div>
    </div>
  );
}
