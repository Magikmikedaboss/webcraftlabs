export default function Takeaways({
  title = "Key takeaways",
  items = [],
}: {
  title?: string;
  items?: unknown;
}) {
  const safeItems = Array.isArray(items) ? items : [];
  const validItems = safeItems.filter(
    (item): item is { id: string; text: string } =>
      item !== null &&
      typeof item === "object" &&
      typeof (item as { id?: unknown }).id === "string" &&
      typeof (item as { text?: unknown }).text === "string",
  );
  if (validItems.length === 0) {
    return null;
  }
  return (
    <div className="takeaways">
      <h3>{title}</h3>
      <ul>
        {validItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
