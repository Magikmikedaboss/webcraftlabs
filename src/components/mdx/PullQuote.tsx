import type { ReactNode } from "react";

export default function PullQuote({ children }: { children: ReactNode }) {
  return <div className="pullquote">{children}</div>;
}
