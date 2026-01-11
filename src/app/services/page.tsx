
import SiteShell from "@/components/SiteShell";
import Card from "@/components/Card";

export default function ServicesPage() {
  return (
    <SiteShell
      title="Services"
      intro="Web development + marketing systems designed to convert. Choose a build, then scale what works."
    >
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Marketing Websites" text="Fast, clean sites built for conversion and SEO." />
          <Card title="Landing Pages + Funnels" text="Focused flows for ads, offers, and lead capture." />
          <Card title="SEO Setup + Local" text="Technical foundation plus Google Business Profile help." />
          <Card title="Analytics + Tracking" text="GA4 events, conversions, UTM structure, reporting hooks." />
          <Card title="Content System" text="Blog + news architecture ready to publish without chaos." />
          <Card title="Maintenance + Growth" text="Iterate with measured updates, not random redesigns." />
        </div>
      </section>
    </SiteShell>
  );
}
