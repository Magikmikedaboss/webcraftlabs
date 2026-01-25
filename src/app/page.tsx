
import SiteShell from "@/components/SiteShell";
import { Suspense } from "react";
import HomeMagazineFeedServer from "@/components/home/HomeMagazineFeedServer";

export default function HomePage() {
  return (
    <SiteShell>
      <Suspense
        fallback={
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-300 border-t-transparent rounded-full animate-spin motion-reduce:animate-none" role="status" aria-live="polite">
              <span className="sr-only">Loading…</span>
            </div>
          </div>
        }
      >
        <HomeMagazineFeedServer />
      </Suspense>
    </SiteShell>
  );
}
