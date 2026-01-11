"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { ADDONS, MAINTENANCE_PLANS } from "@/lib/estimator/config";
import styles from "./build.module.css";
import {
  BuildSpec,
  ContentReadiness,
  DesignLevel,
  FeatureId,
  Goal,
  ProjectType,
  QuoteDetails,
  Timeline,
  MaintenancePlanId,
} from "@/lib/estimator/types";
import { estimate } from "@/lib/estimator/engine";
import SiteShell from "@/components/SiteShell";
import { RadixSelect } from "@/components/RadixSelect";

export default function BuildPage() {
  const [copying, setCopying] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);
  // Wizard core
  const [projectType, setProjectType] = useState<ProjectType>("service");
  const [goal, setGoal] = useState<Goal>("leads");
  const [pages, setPages] = useState<number>(5);
  const [design, setDesign] = useState<DesignLevel>("template");
  const [timeline, setTimeline] = useState<Timeline>("standard");
  const [content, setContent] = useState<ContentReadiness>("ready");
  const [features, setFeatures] = useState<FeatureId[]>(["seo"]);

  // End form (details)
  const [q, setQ] = useState<QuoteDetails>({
    name: "",
    email: "",
    business: "",
    website: "",
    notes: "",
    frameworkPref: "none",
    frameworkOther: "",
    maintenancePlan: "none",
  });

  const est = useMemo(() => {
    const spec: BuildSpec = { projectType, goal, pages, design, timeline, content, features };
    return estimate(spec, q);
  }, [projectType, goal, pages, design, timeline, content, features, q]);
  const maintenance = useMemo(() => {
    return (
      MAINTENANCE_PLANS.find((p) => p.id === q.maintenancePlan) ??
      MAINTENANCE_PLANS[0]
    );
  }, [q.maintenancePlan]);

  function toggleFeature(id: FeatureId) {
    setFeatures((prev: FeatureId[]) =>
      prev.includes(id) ? prev.filter((x: FeatureId) => x !== id) : [...prev, id]
    );
  }

  function setQField<K extends keyof QuoteDetails>(key: K, value: QuoteDetails[K]) {
    setQ((prev: QuoteDetails) => ({ ...prev, [key]: value }));
  }

  return (
      <SiteShell
        title="WebCraft Labs – Website Build Estimator"
      >
      <main className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] text-[var(--text)] overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:py-14">
          <div className="space-y-3 mb-8">
            <div className="text-base sm:text-xl md:text-2xl font-extrabold text-blue-900 tracking-tight flex items-center gap-2">
              <span className="inline-block w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mr-2"></span>
              Website Build Estimator
            </div>
            <div className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl">
              Welcome to the WebCraft Labs estimator! Instantly price your next website with our transparent, step-by-step tool. Just answer a few quick questions about your project, and see your options and pricing update live.
            </div>
            <ul className="list-disc pl-6 text-sm text-gray-600">
              <li>Start by choosing your business type and goals.</li>
              <li>Adjust pages, design, and features to match your needs.</li>
              <li>See your estimate update in real time on the right.</li>
              <li>Fill in your details for a personalized build sheet you can copy or share.</li>
            </ul>
          </div>
          <div className="mt-8 flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 min-w-0">
            {/* Left: Wizard */}
            <section className="flex-1 min-w-0">
              {/* Project Info Group */}
              <div className="rounded-2xl shadow-xl border border-[var(--border)] bg-white/90 p-4 sm:p-6 md:p-8 lg:p-10 backdrop-blur-md min-w-0 mb-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-blue-900 mb-2">Project Info</h2>
                  <p className="text-sm text-[var(--muted)]">Tell us about your project goals and needs.</p>
                </div>
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 min-w-0">
                  <Field label="Business type">
                    <RadixSelect
                      value={projectType}
                      onValueChange={(v) => setProjectType(v as ProjectType)}
                      options={[
                        { value: "service", label: "Service business" },
                        { value: "agency", label: "Agency / studio" },
                        { value: "ecommerce", label: "E-commerce / online store" },
                        { value: "content", label: "Content / blog brand" },
                        { value: "other", label: "Other" },
                      ]}
                    />
                  </Field>
                  <Field label="Primary goal">
                    <RadixSelect
                      value={goal}
                      onValueChange={(v) => setGoal(v as Goal)}
                      options={[
                        { value: "leads", label: "Get leads / bookings" },
                        { value: "sales", label: "Sell a product" },
                        { value: "brand", label: "Build credibility / brand presence" },
                        { value: "seo", label: "Grow traffic (SEO/content)" },
                      ]}
                    />
                  </Field>
                  <Field label={`Pages (estimate): ${pages}`}>
                    {(() => {
                      const min = 1;
                      const max = 10;
                      const percent = ((pages - min) / (max - min)) * 100;
                      return (
                        <input
                          type="range"
                          min={min}
                          max={max}
                          value={pages}
                          onChange={(e) => setPages(parseInt(e.target.value, 10))}
                          className={`${styles.rangeSlider} w-full appearance-none cursor-pointer rounded-full`}
                          style={{
                            height: '12px',
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`
                          }}
                        />
                      );
                    })()}
                    <div className="mt-2 text-xs text-[var(--muted)]">
                      We may recommend more pages depending on features selected.
                    </div>
                  </Field>
                  <Field label="Design level">
                    <RadixSelect
                      value={design}
                      onValueChange={(v) => setDesign(v as DesignLevel)}
                      options={[
                        { value: "template", label: "Template-based (fast, proven layouts)" },
                        { value: "custom", label: "Custom design (brand system + unique layouts)" },
                      ]}
                    />
                  </Field>
                  <Field label="Content readiness">
                    <RadixSelect
                      value={content}
                      onValueChange={(v) => setContent(v as ContentReadiness)}
                      options={[
                        { value: "ready", label: "Content is ready" },
                        { value: "assist", label: "Need light copy assistance" },
                        { value: "full", label: "Need full copywriting" },
                      ]}
                    />
                  </Field>
                  <Field label="Timeline">
                    <RadixSelect
                      value={timeline}
                      onValueChange={(v) => setTimeline(v as Timeline)}
                      options={[
                        { value: "standard", label: "Standard" },
                        { value: "rush", label: "Rush (priority scheduling)" },
                      ]}
                    />
                  </Field>
                </div>
              </div>

              {/* Features Group */}
              <div className="rounded-2xl shadow-xl border border-[var(--border)] bg-white/90 p-4 sm:p-6 md:p-8 lg:p-10 backdrop-blur-md min-w-0 mb-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-blue-900 mb-2">Features</h2>
                  <p className="text-sm text-[var(--muted)]">Select add-ons and integrations for your build.</p>
                </div>
                <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
                  {ADDONS.map((a) => (
                    <label
                      key={a.id}
                      className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-white p-3 cursor-pointer shadow-sm hover:border-blue-300 transition"
                    >
                      <input
                        type="checkbox"
                        checked={features.includes(a.id)}
                        onChange={() => toggleFeature(a.id)}
                        className="min-w-[24px] min-h-[24px] w-6 h-6 rounded-md border-2 border-gray-300 text-blue-500 focus:ring-4 focus:ring-blue-100 focus:ring-offset-0 transition-all duration-200 cursor-pointer checked:bg-blue-500 checked:border-blue-500 hover:border-blue-400"
                      />
                      <span>
                        <span className="block font-medium text-gray-900">{a.label}</span>
                        <span className="block text-xs text-gray-500">
                          +${a.price} · +{a.hours} hrs
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Details Group */}
              <div className="rounded-2xl shadow-xl border border-[var(--border)] bg-white/90 p-4 sm:p-6 md:p-8 lg:p-10 backdrop-blur-md min-w-0">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-blue-900 mb-2">Contact Details <span className="font-normal text-gray-500 text-base">(optional)</span></h2>
                  <p className="text-sm text-[var(--muted)]">Add context for your quote. This info is included in the build sheet.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name">
                    <input
                      value={q.name}
                      onChange={(e) => setQField("name", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border)] bg-white p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-200"
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      value={q.email}
                      onChange={(e) => setQField("email", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border)] bg-white p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-200"
                      placeholder="you@company.com"
                    />
                  </Field>
                  <Field label="Business name">
                    <input
                      value={q.business}
                      onChange={(e) => setQField("business", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border)] bg-white p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-200"
                      placeholder="Business / brand"
                    />
                  </Field>
                  <Field label="Existing website (optional)">
                    <input
                      value={q.website}
                      onChange={(e) => setQField("website", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border)] bg-white p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-200"
                      placeholder="https://"
                    />
                  </Field>
                  <Field label="Preferred platform/framework">
                    <RadixSelect
                      value={q.frameworkPref}
                      onValueChange={(v) => setQField("frameworkPref", v as QuoteDetails["frameworkPref"])}
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
                      <input
                        value={q.frameworkOther}
                        onChange={(e) => setQField("frameworkOther", e.target.value)}
                        className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-200"
                        placeholder="Tell us what platform/framework"
                      />
                    )}
                  </Field>
                  <Field label="Monthly maintenance (optional)">
                    <RadixSelect
                      value={q.maintenancePlan}
                      onValueChange={(v) => setQField("maintenancePlan", v as MaintenancePlanId)}
                      options={MAINTENANCE_PLANS.map((p) => ({
                        value: p.id,
                        label: p.monthly ? `${p.label} — $${p.monthly}/mo` : p.label,
                      }))}
                    />

                    <div className="mt-2 text-xs text-gray-500 italic">
                      Optional. You can decide after launch too.
                    </div>
                  </Field>

                  <Field label="Notes / requirements">
                    <textarea
                      value={q.notes}
                      onChange={(e) => setQField("notes", e.target.value)}
                      className="min-h-[120px] w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-4 text-base font-medium shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none hover:border-gray-400 hover:shadow-md resize-none"
                      placeholder="Integrations, examples, style notes, deadlines..."
                      rows={6}
                    />
                  </Field>
                </div>
              </div>
            </section>

            {/* Right: Output */}

            <aside className="w-full lg:w-[370px] rounded-2xl shadow-2xl border border-[var(--border)] bg-gradient-to-br from-white/95 to-blue-50/80 p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
              <div className="text-base font-bold text-gray-800 tracking-tight mb-2">Estimate</div>

              {/* Premium Estimate Card */}
              <div className="rounded-3xl border-2 border-yellow-400 bg-gradient-to-br from-white/90 to-yellow-50/60 shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 md:gap-6">
                {/* Price Range Main Focus */}
                <div className="flex flex-col items-center justify-center mb-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-yellow-600 tracking-tight drop-shadow-lg">
                    {`${est.priceLow.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })} – ${est.priceHigh.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}`}
                  </span>
                  <span className="mt-2 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full px-3 py-1">Estimated range</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-gray-700">Tier</span>
                    <span className="text-gray-900">{est.tier.label}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-gray-700">Pages</span>
                    <span className="text-gray-900">{est.normalizedPages}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-gray-700">Timeline</span>
                    <span className="text-gray-900">{est.weeksLow}–{est.weeksHigh} weeks</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-gray-700">Maintenance</span>
                    <span className="text-gray-900">{maintenance.monthly ? `$${maintenance.monthly}/mo` : "Optional (none selected)"}</span>
                  </div>
                </div>
              </div>

              {est.reasons.length > 0 && (
                <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-4 text-xs text-blue-900">
                  <div className="font-semibold text-blue-800 mb-1">Why pages increased</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {est.reasons.map((r: string) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <div className="text-sm font-semibold text-gray-700 mb-1">Build sheet</div>
                <textarea
                  readOnly
                  value={est.buildSheetText}
                  className="mt-2 h-64 w-full rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-white/90 to-yellow-50/40 p-4 text-xs text-gray-800 shadow-inner"
                />
                <button
                  type="button"
                  onClick={async () => {
                    setCopying(true);
                    if (copyTimeoutRef.current !== null) {
                      clearTimeout(copyTimeoutRef.current);
                    }
                    try {
                      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                        await navigator.clipboard.writeText(est.buildSheetText);
                      } else {
                        throw new Error("Clipboard API not available");
                      }
                    } catch (err) {
                      // Optionally, show a toast or fallback UI here
                      console.error("Copy failed:", err);
                    } finally {
                      copyTimeoutRef.current = window.setTimeout(() => setCopying(false), 800);
                    }
                  }}
                  className="min-h-[48px] mt-3 w-full sm:w-auto rounded-2xl border-2 border-yellow-300 bg-gradient-to-r from-yellow-100 to-yellow-200 px-5 py-3 font-semibold text-yellow-900 hover:from-yellow-200 hover:to-yellow-100 hover:shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center"
                >
                  Copy build sheet
                  {copying && (
                    <span className="inline-block w-4 h-4 border-2 border-yellow-700 border-t-transparent rounded-full animate-spin ml-2" />
                  )}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-gray-600 tracking-wide uppercase">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}




