export default function Takeaways({
  title = "Key takeaways",
  items,
}: {
  title?: string;
  items: { id: string; text: string }[];
}) {
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
