export default function Takeaways({
  title = "Key takeaways",
  items = [],
}: {
  title?: string;
  items?: { id: string; text: string }[];
}) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className="takeaways">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
