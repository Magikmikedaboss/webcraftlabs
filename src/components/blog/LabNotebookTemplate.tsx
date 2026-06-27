import Link from "next/link";
import ShareBarClient from "../ShareBarClient";

interface PostProps {
  title: string;
  description?: string;
  summary?: string;
  date?: string;
  published?: string;
  author?: string;
  badge?: string;
}

export default function LabNotebookTemplate({
  post,
  readMins,
  pageUrl,
  children,
}: {
  post: PostProps;
  readMins?: number;
  pageUrl?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black px-3 py-4 text-slate-950 sm:px-6 lg:px-10 xl:px-16">
      <article className="mx-auto w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl overflow-hidden rounded-[1.75rem] lg:rounded-[2.5rem] border border-white/10 bg-[#f8f3e8] shadow-2xl">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black px-4 sm:px-6 lg:px-10 py-3 lg:py-4 text-white">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="grid size-7 place-items-center rounded bg-white text-sm font-black text-black">
              W
            </span>
            WebCraft Labs
          </Link>
          <Link href="/blog" className="text-lg" aria-label="Blog">
            <span aria-hidden="true">☰</span>
          </Link>
        </header>
        <div className="bg-[linear-gradient(#00000008_1px,transparent_1px),linear-gradient(90deg,#00000008_1px,transparent_1px)] bg-[size:24px_24px]">
          {pageUrl && (
            <div className="px-5 sm:px-8 lg:px-16 xl:px-20 pt-5 lg:pt-8">
              <ShareBarClient title={post.title} url={pageUrl} />
            </div>
          )}
          {children}
          <footer className="border-t border-black/10 px-5 sm:px-8 lg:px-16 xl:px-20 py-10 lg:py-16 font-mono text-xs text-slate-500">
            <p>Filed by {post.author || "WebCraft Labs"}</p>
            {readMins && <p className="mt-2">{readMins} minute read</p>}
          </footer>
        </div>
      </article>
    </main>
  );
}
