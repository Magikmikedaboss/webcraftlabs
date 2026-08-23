"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RadixSelect } from "../../components/RadixSelect";
import SiteShell from "../../components/SiteShell";
import styles from "./build.module.css";

import type {
  ContentReadiness,
  DesignLevel,
  QuoteDetails,
  Timeline,
} from "../../lib/estimator/types";

import { formatPrice } from "../../lib/formatPrice";
import { ADDONS, MAINTENANCE_PLANS } from "../../lib/estimator/config";
import { trackEvent } from "../../lib/analytics";

export default function BuildCalculatorClient() {
  const [q, setQ] = useState<QuoteDetails>({
    name: "",
    email: "",
    business: "",
    website: "",
    frameworkPref: "none",
    notes: "",
    frameworkOther: "",
    maintenancePlan: "none",
  });
  const router = useRouter();
  const [pages, setPages] = useState(5);
  const [design, setDesign] = useState<DesignLevel>("template");
  const [content, setContent] = useState<ContentReadiness>("ready");
  const [timeline, setTimeline] = useState<Timeline>("standard");
  const [features, setFeatures] = useState<string[]>([]);
  // Derive maintenance from plan, memoized to avoid unnecessary recalculation
  const maintenance = useMemo(() => {
    const plan = MAINTENANCE_PLANS.find(p => p.id === q.maintenancePlan);
    return plan ? { monthly: plan.monthly } : {};
  }, [q.maintenancePlan]);

  function toggleFeature(id: string) {
    setFeatures((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function setQField<K extends keyof QuoteDetails>(key: K, value: QuoteDetails[K]) {
    setQ((prev) => ({ ...prev, [key]: value }));
  }


  // --- Estimation (placeholder/dummy) ---
  // Swap this for your real estimator when ready.
  const est = useMemo(() => {
    const addons = ADDONS.filter((a) => features.includes(a.id));
    const addonPrice = addons.reduce((sum, a) => sum + (a.price || 0), 0);
    const addonHours = addons.reduce((sum, a) => sum + (a.hours || 0), 0);

    const baseLow = 1000;
    const baseHigh = 2000;

    const pageFactor = Math.max(1, pages / 5);
    const designFactor = design === "custom" ? 1.4 : 1.0;
    const contentFactor = content === "full" ? 1.35 : content === "assist" ? 1.15 : 1.0;
    const rushFactor = (timeline === "rush" ? 1.25 : 1.0);

    const mult = pageFactor * designFactor * contentFactor * rushFactor;

    const priceLow = Math.round((baseLow * mult + addonPrice) / 25) * 25;
    const priceHigh = Math.round((baseHigh * mult + addonPrice) / 25) * 25;

    const hours = Math.max(12, 40 * mult + addonHours);

    const weeksLow = (timeline === "rush" ? 2 : 4);
    const weeksHigh = 8;

    return {
      priceLow,
      priceHigh,
      hours,
      weeksLow,
      weeksHigh,
      tier: { label: design === "custom" ? "Custom" : "Standard" },
      normalizedPages: pages,
      reasons: [] as string[],
      buildSheetText: buildSheetText({
        pages,
        design,
        content,
        timeline,
        features,
        maintenance,
        q,
        priceLow,
        priceHigh,
        hours,
        weeksLow,
        weeksHigh,
      }),
    };
  }, [pages, design, content, timeline, features, maintenance, q]);

  const sliderPct = ((pages - 1) / 9) * 100;

  return (
    <SiteShell
      title="Website Cost Calculator"
      intro="Get an instant, accurate quote for your website project. Select your pages, design level, and features below. When ready, send your personalized quote request to start building."
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr,384px]">
          {/* Left: Inputs */}
          <section className="space-y-6 min-w-0">
            {/* Core Settings */}
            <div className="rounded-2xl shadow-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 md:p-8 lg:p-10 backdrop-blur-md">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[var(--text)] mb-2">Your Build</h2>
                <p className="text-sm text-[var(--muted)]">Dial in scope and style. The estimate updates live.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label={`Pages (${pages})`}>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={pages}
                    onChange={(e) => setPages(Number(e.target.value))}
                    className={`${styles.rangeSlider} w-full h-2 rounded-full appearance-none cursor-pointer`}
                    style={{
                      background: `linear-gradient(to right, var(--primary, #3b82f6) 0%, var(--primary, #3b82f6) ${sliderPct}%, var(--border, #e5e7eb) ${sliderPct}%, var(--border, #e5e7eb) 100%)`,
                    }}
                    aria-label="Pages"
                  />
                  <div className="mt-2 flex justify-between text-xs text-[var(--muted)]">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </Field>

                <Field label="Design level">
                  <RadixSelect
                    value={design}
                    onValueChange={(v: string) => setDesign(v as DesignLevel)}
                    options={[
                      { value: "template", label: "Template" },
                      { value: "custom", label: "Custom" },
                    ]}
                  />
                </Field>

                <Field label="Content readiness">
                  <RadixSelect
                    value={content}
                    onValueChange={(v: string) => setContent(v as ContentReadiness)}
                    options={[
                      { value: "ready", label: "Ready to go" },
                      { value: "assist", label: "Assist (help needed)" },
                      { value: "full", label: "Full (we create it)" },
                    ]}
                  />
                </Field>

                <Field label="Timeline">
                  <RadixSelect
                    value={timeline}
                    onValueChange={(v: string) => setTimeline(v as Timeline)}
                    options={[
                      { value: "rush", label: "ASAP (rush)" },
                      { value: "standard", label: "Standard (4-8 weeks)" },
                    ]}
                  />
                </Field>

                <Field label="Maintenance plan">
                  <RadixSelect
                    value={q.maintenancePlan}
                    onValueChange={(v: string) => setQ(prev => ({ ...prev, maintenancePlan: v as typeof prev.maintenancePlan }))}
                    options={MAINTENANCE_PLANS.map(plan => ({ value: plan.id, label: plan.label }))}
                  />
                </Field>
              </div>
            </div>

            {/* Features Group */}
            <div className="rounded-2xl shadow-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 md:p-8 lg:p-10 backdrop-blur-md">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[var(--text)] mb-2">
                  Features <span className="font-normal text-[var(--muted)] text-base">(optional)</span>
                </h2>
                <p className="text-sm text-[var(--muted)]">Add functionality to your estimate.</p>
              </div>

              <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
                {ADDONS.map((a) => (
                  <label
                    key={a.id}
                    className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 cursor-pointer shadow-sm hover:border-[var(--primary)]/40 transition"
                  >
                    <input
                      type="checkbox"
                      checked={features.includes(a.id)}
                      onChange={() => toggleFeature(a.id)}
                      className="min-w-[24px] min-h-[24px] w-6 h-6 rounded-md border-2 border-[var(--border)] text-[var(--primary)] focus:ring-4 focus:ring-[var(--focusSurface)] focus:ring-offset-0 transition-all duration-200 cursor-pointer checked:bg-[var(--primary)] checked:border-[var(--primary)] hover:border-[var(--primary)]"
                    />
                    <span>
                      <span className="block font-medium text-[var(--text)]">{a.label}</span>
                      <span className="block text-xs text-[var(--muted)]">
                        +${a.price} · +{a.hours} hrs
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>


          </section>

          {/* Right: Output */}
          <aside className="lg:w-96">
            <div className="sticky top-4 rounded-2xl shadow-2xl border-2 border-[var(--card-border)] bg-gradient-to-br from-[var(--card-bg-start)] to-[var(--card-bg-end)] p-4 sm:p-6 md:p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-[var(--card-foreground)]">Your Estimate</h2>
                  <span className="text-xs font-semibold text-[var(--card-foreground)] bg-[var(--surface)] rounded-full px-3 py-1">
                    Estimated range
                  </span>
                </div>

                <div className="text-4xl font-bold text-[var(--card-foreground)] mb-1">
                  {formatPrice(est.priceLow)}–{formatPrice(est.priceHigh)}
                </div>
                <div className="text-sm text-[var(--muted)]">
                  {est.hours.toFixed(1)} hours · {est.weeksLow}–{est.weeksHigh} weeks
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col items-start">
                  <span className="font-bold text-[var(--muted)]">Tier</span>
                  <span className="text-[var(--text)]">{est.tier.label}</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-[var(--muted)]">Pages</span>
                  <span className="text-[var(--text)]">{est.normalizedPages}</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-[var(--muted)]">Timeline</span>
                  <span className="text-[var(--text)]">
                    {est.weeksLow}–{est.weeksHigh} weeks
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-[var(--muted)]">Maintenance</span>
                  <span className="text-[var(--text)]">
                    {maintenance.monthly ? `$${maintenance.monthly}/mo` : "Optional (none selected)"}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="build-sheet-textarea" className="text-sm font-semibold text-[var(--text)] mb-1 block">Build sheet</label>
                <textarea
                  id="build-sheet-textarea"
                  readOnly
                  value={est.buildSheetText}
                  className="min-h-[120px] mt-2 h-64 w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-[var(--text)] shadow-inner transition-all duration-200"
                />

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    try {
                      localStorage.setItem('buildSheet', est.buildSheetText);
                      localStorage.setItem('quoteName', q.name);
                      localStorage.setItem('quoteEmail', q.email);
                    } catch (err) {
                      console.error('localStorage error:', err);
                    }
                    // GA4 completion event — the calculator's one unambiguous
                    // "done" state is the user sending their configured build
                    // sheet on to Contact. No PII (name/email) in params.
                    trackEvent('build_calculator_complete', {
                      pages,
                      design_level: design,
                      content_readiness: content,
                      timeline,
                      feature_count: features.length,
                    });
                    router.push('/contact');
                  }}
                  className="mt-6"
                >
                  <div className="text-sm font-semibold text-[var(--text)] mb-2">Your Details</div>
                  <div className="space-y-3">
                    <label htmlFor="quote-name" className="sr-only">Name</label>
                    <input
                      id="quote-name"
                      value={q.name}
                      onChange={(e) => setQField("name", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--focusSurface)]"
                      placeholder="Your name"
                      aria-label="Your name"
                    />
                    <label htmlFor="quote-email" className="sr-only">Email</label>
                    <input
                      id="quote-email"
                      type="email"
                      autoComplete="email"
                      value={q.email}
                      onChange={(e) => setQField("email", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--focusSurface)]"
                      placeholder="you@company.com"
                      aria-label="Your email address"
                    />
                    <label htmlFor="quote-business" className="sr-only">Business or Brand</label>
                    <input
                      id="quote-business"
                      value={q.business}
                      onChange={(e) => setQField("business", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--focusSurface)]"
                      placeholder="Business / brand"
                      aria-label="Business or brand"
                    />
                    <label htmlFor="quote-website" className="sr-only">Website</label>
                    <input
                      id="quote-website"
                      type="url"
                      autoComplete="url"
                      value={q.website}
                      onChange={(e) => setQField("website", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--focusSurface)]"
                      placeholder="https://"
                      aria-label="Website URL"
                    />
                    <label htmlFor="framework-pref-select" className="sr-only">Framework preference</label>
                    <RadixSelect
                      id="framework-pref-select"
                      aria-label="Framework preference"
                      value={q.frameworkPref}
                      onValueChange={(v: string) => setQField("frameworkPref", v as QuoteDetails["frameworkPref"])}
                      options={[
                        { value: "none", label: "No preference (recommended)" },
                        { value: "nextjs", label: "Next.js" },
                        { value: "wordpress", label: "WordPress" },
                        { value: "shopify", label: "Shopify" },
                        { value: "webflow", label: "Webflow" },
                        { value: "squarespace", label: "Squarespace" },
                        { value: "other", label: "Other" },
                      ]}
                    />
                    {q.frameworkPref === "other" && (
                      <>
                        <label htmlFor="quote-framework-other" className="sr-only">Other framework</label>
                        <input
                          id="quote-framework-other"
                          value={q.frameworkOther}
                          onChange={(e) => setQField("frameworkOther", e.target.value)}
                          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-sm shadow-sm focus:ring-2 focus:ring-[var(--focusSurface)]"
                          placeholder="Please specify framework"
                          aria-label="Other framework details"
                        />
                      </>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="min-h-[48px] mt-4 w-full sm:w-auto rounded-2xl border-2 border-[var(--primary)]/25 bg-gradient-to-r from-[var(--card-bg-start)] to-[var(--card-bg-end)] px-5 py-3 font-semibold text-[var(--card-foreground)] hover:from-[var(--card-bg-end)] hover:to-[var(--card-bg-start)] hover:shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center"
                  >
                    Send Quote Request
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-[var(--muted)] tracking-wide uppercase">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function buildSheetText(args: {
  pages: number;
  design: string;
  content: string;
  timeline: string;
  features: string[];
  maintenance: { monthly?: number };
  q: QuoteDetails;
  priceLow: number;
  priceHigh: number;
  hours: number;
  weeksLow: number;
  weeksHigh: number;
}) {
  const lines = [
    `WebCraft Labz - Build Sheet`,
    ``,
    `Estimate: ${formatPrice(args.priceLow)} - ${formatPrice(args.priceHigh)}`,
    `Timeline: ${args.weeksLow}-${args.weeksHigh} weeks`,
    `Effort: ${args.hours.toFixed(1)} hours`,
    ``,
    `Pages: ${args.pages}`,
    `Design: ${args.design}`,
    `Content: ${args.content}`,
    `Timeline preference: ${args.timeline}`,
    `Add-ons: ${args.features.length ? args.features.map(id => (ADDONS.find(a => a.id === id)?.label || id)).join(", ") : "None"}`,
    `Maintenance: ${args.maintenance.monthly ? `$${args.maintenance.monthly}/mo` : "None"}`,
    ``,
    `Contact`,
    `Name: ${args.q.name || "-"}`,
    `Email: ${args.q.email || "-"}`,
    `Business: ${args.q.business || "-"}`,
    `Website: ${args.q.website || "-"}`,
    `Framework: ${args.q.frameworkPref || "-"}`,
    ...(args.q.frameworkPref === "other" && args.q.frameworkOther ? [`Other framework: ${args.q.frameworkOther}`] : []),
  ];

  return lines.join("\n");
}
