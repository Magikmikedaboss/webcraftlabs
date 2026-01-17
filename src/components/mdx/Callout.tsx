export default function Callout({
  title = "Note",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
      <div className="text-sm font-bold text-blue-900">{title}</div>
      <div className="mt-2 text-sm text-blue-900/90 leading-relaxed">{children}</div>
    </div>
  );
}
