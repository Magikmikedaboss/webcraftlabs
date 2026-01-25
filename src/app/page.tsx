
import SiteShell from "@/components/SiteShell";
import { Suspense } from "react";
import HomeMagazineFeedServer from "@/components/home/HomeMagazineFeedServer";

export default function HomePage() {
  return (
    <SiteShell>
      <Suspense fallback={<div className="min-h-[400px]" />}> 
        <HomeMagazineFeedServer />
      </Suspense>
    </SiteShell>
  );
}
