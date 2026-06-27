import type { ReactNode } from "react";

export default function BigQuote({ children }: { children: ReactNode }) {
  return (
    <div className="my-10 mx-auto max-w-2xl text-center px-4">
      <div
        className="text-6xl font-black leading-none mb-3 select-none"
        style={{ color: "var(--primary)", opacity: 0.25 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <div
        className="text-xl sm:text-2xl font-semibold leading-relaxed italic"
        style={{ color: "var(--text)" }}
      >
        {children}
      </div>
      <div
        className="text-6xl font-black leading-none mt-3 select-none"
        style={{ color: "var(--primary)", opacity: 0.25 }}
        aria-hidden="true"
      >
        &rdquo;
      </div>
    </div>
  );
}
