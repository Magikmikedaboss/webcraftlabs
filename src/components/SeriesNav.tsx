import Link from "next/link";

export default function SeriesNav() {
  return (
    <div className="mb-10 flex items-center justify-between text-sm text-white/60">
      <Link href="/blog/synthetic-minds" className="hover:text-white">
        🧠 Synthetic Minds
      </Link>
      <span className="text-white/40">Episode</span>
    </div>
  );
}
