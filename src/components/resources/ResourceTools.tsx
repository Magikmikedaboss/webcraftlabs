import Link from "next/link";
import { RESOURCE_TOOLS } from "@/lib/resourceTools";

/**
 * Interactive tools, rendered from RESOURCE_TOOLS rather than hardcoded
 * prose — a second tool joins by adding a config entry, with no layout
 * change. Replaces the previous single-purpose FeaturedTool component.
 */
export default function ResourceTools() {
  if (RESOURCE_TOOLS.length === 0) return null;

  return (
    <section id="tools" className="rc-canvas mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="rc-eyebrow">Tools</span>
        <h2 className="rc-h2 mt-4">
          {RESOURCE_TOOLS.length === 1 ? "An interactive tool you can use now" : "Interactive tools"}
        </h2>
      </div>

      <div className={RESOURCE_TOOLS.length > 1 ? "grid gap-5 md:grid-cols-2" : ""}>
        {RESOURCE_TOOLS.map((tool) => (
          <div key={tool.id} className="rc-panel flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex-1">
              <h3 className="rc-panel-title">{tool.label}</h3>
              <p className="rc-body mt-3">{tool.description}</p>
              {tool.note && <p className="rc-body mt-3">{tool.note}</p>}
            </div>
            <div className="flex-none">
              <Link href={tool.href} className="rc-pill-link-solid">
                {tool.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
