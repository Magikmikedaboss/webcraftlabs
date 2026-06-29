export default function Takeaways({
  title = "Key takeaways",
  items = [],
}: {
  title?: string;
  items?: { id: string; text: string }[];
}) {
  if (!Array.isArray(items)) {
    throw new Error(`Takeaways: expected items array, got ${typeof items}`);
  }
  if (items.length === 0) {
    return null;
  }
  for (const item of items) {
    if (item === null || typeof item !== "object") {
      throw new Error(`Takeaways: each item must be an object, got ${JSON.stringify(item)}`);
    }
    if (typeof (item as { id?: unknown }).id !== "string") {
      throw new Error(`Takeaways: item.id must be a string (got ${JSON.stringify((item as { id?: unknown }).id)})`);
    }
    if (typeof (item as { text?: unknown }).text !== "string") {
      throw new Error(`Takeaways: item.text must be a string (got ${JSON.stringify((item as { text?: unknown }).text)})`);
    }
  }
  return (
    <div className="takeaways">
      <h3>{title}</h3>
      <ul>
        {(items as { id: string; text: string }[]).map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
