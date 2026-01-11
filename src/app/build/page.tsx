"use client";

import { useMemo, useState } from "react";
import { ADDONS, MAINTENANCE_PLANS } from "@/lib/estimator/config";
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

export default function BuildPage() {
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

  const spec: BuildSpec = { projectType, goal, pages, design, timeline, content, features };

  const est = useMemo(() => estimate(spec, q), [spec, q]);
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
      <main className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] text-[var(--text)]">
        <div className="mx-auto max-w-5xl px-2 py-8 md:py-14">
          <div className="space-y-3 mb-8">
            <div className="text-2xl font-extrabold text-blue-900 tracking-tight flex items-center gap-2">
              <span className="inline-block w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mr-2"></span>
              Website Build Estimator
            </div>
            <div className="text-base text-gray-700 max-w-2xl">
              Welcome to the WebCraft Labs estimator! Instantly price your next website with our transparent, step-by-step tool. Just answer a few quick questions about your project, and see your options and pricing update live.
            </div>
            <ul className="list-disc pl-6 text-sm text-gray-600">
              <li>Start by choosing your business type and goals.</li>
              <li>Adjust pages, design, and features to match your needs.</li>
              <li>See your estimate update in real time on the right.</li>
              <li>Fill in your details for a personalized build sheet you can copy or share.</li>
            </ul>
          </div>
          <div className="mt-8 flex flex-col lg:flex-row gap-8">
            {/* Left: Wizard */}
            <section className="flex-1 rounded-2xl shadow-xl border border-[var(--border)] bg-white/90 p-6 md:p-10 backdrop-blur-md">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Business type">
                  <Select
                    value={projectType}
                    onChange={(v) => setProjectType(v as ProjectType)}
                    options={[
                      ["service", "Service business"],
                      ["agency", "Agency / studio"],
                      ["ecommerce", "E-commerce / online store"],
                      ["content", "Content / blog brand"],
                      ["other", "Other"],
                    ]}
                  />
                </Field>

                <Field label="Primary goal">
                  <Select
                    value={goal}
                    onChange={(v) => setGoal(v as Goal)}
                    options={[
                      ["leads", "Get leads / bookings"],
                      ["sales", "Sell a product"],
                      ["brand", "Build credibility / brand presence"],
                      ["seo", "Grow traffic (SEO/content)"],
                    ]}
                  />
                </Field>

                <Field label={`Pages (estimate): ${pages}`}>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={pages}
                    onChange={(e) => setPages(parseInt(e.target.value, 10))}
                    className="w-full"
                  />
                  <div className="mt-2 text-xs text-[var(--muted)]">
                    We may recommend more pages depending on features selected.
                  </div>
                </Field>

                <Field label="Design level">
                  <Select
                    value={design}
                    onChange={(v) => setDesign(v as DesignLevel)}
                    options={[
                      ["template", "Template-based (fast, proven layouts)"],
                      ["custom", "Custom design (brand system + unique layouts)"],
                    ]}
                  />
                </Field>

                <Field label="Content readiness">
                  <Select
                    value={content}
                    onChange={(v) => setContent(v as ContentReadiness)}
                    options={[
                      ["ready", "Content is ready"],
                      ["assist", "Need light copy assistance"],
                      ["full", "Need full copywriting"],
                    ]}
                  />
                </Field>

                <Field label="Timeline">
                  <Select
                    value={timeline}
                    onChange={(v) => setTimeline(v as Timeline)}
                    options={[
                      ["standard", "Standard"],
                      ["rush", "Rush (priority scheduling)"],
                    ]}
                  />
                </Field>
              </div>

              {/* Maintenance Plan */}
              <div className="mt-8">
                <Field label="Maintenance plan">
                  <select
                    value={q.maintenancePlan}
                    onChange={e => setQField("maintenancePlan", e.target.value as MaintenancePlanId)}
                    className="w-full rounded-lg border border-[var(--border)] bg-white p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-200"
                  >
                    {MAINTENANCE_PLANS.map(plan => (
                      <option key={plan.id} value={plan.id}>
                        {plan.label} {plan.monthly ? `($${plan.monthly}/mo)` : ""}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 text-xs text-[var(--muted)] italic">
                    {MAINTENANCE_PLANS.find(p => p.id === q.maintenancePlan)?.includes.join(", ")}
                  </div>
                </Field>
              </div>

              {/* Features */}
              <div className="mt-8">
                <div className="text-base font-semibold mb-2 text-gray-700">Features</div>
                <div className="grid gap-3 md:grid-cols-2">
                  {ADDONS.map((a) => (
                    <label
                      key={a.id}
                      className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-white p-3 cursor-pointer shadow-sm hover:border-blue-300 transition"
                    >
                      <input
                        type="checkbox"
                        checked={features.includes(a.id)}
                        onChange={() => toggleFeature(a.id)}
                        className="mt-1 accent-blue-500"
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

              {/* Project Details (Final Step) */}
              <div className="mt-10 border-t border-[var(--border)] pt-8">
                <div className="text-lg font-bold text-gray-800 mb-1">Project Details <span className="font-normal text-gray-500">(optional)</span></div>
                <p className="mt-1 text-sm text-gray-500">
                  Add context for your quote. This info is included in the build sheet.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
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
                    <select
                      value={q.frameworkPref}
                      onChange={(e) =>
                        setQField("frameworkPref", e.target.value as QuoteDetails["frameworkPref"])
                      }
                      className="w-full rounded-lg border border-[var(--border)] bg-white p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="none">No preference (recommended)</option>
                      <option value="nextjs">Next.js</option>
                      <option value="wordpress">WordPress</option>
                      <option value="shopify">Shopify</option>
                      <option value="webflow">Webflow</option>
                      <option value="squarespace">Squarespace</option>
                      <option value="other">Other</option>
                    </select>

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
                    <select
                      value={q.maintenancePlan}
                      onChange={(e) =>
                        setQField("maintenancePlan", e.target.value as MaintenancePlanId)
                      }
                      className="w-full rounded-lg border border-[var(--border)] bg-white p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-200"
                    >
                      {MAINTENANCE_PLANS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                          {p.monthly ? ` — $${p.monthly}/mo` : ""}
                        </option>
                      ))}
                    </select>

                    <div className="mt-2 text-xs text-gray-500 italic">
                      Optional. You can decide after launch too.
                    </div>
                  </Field>

                  <Field label="Notes / requirements">
                    <textarea
                      value={q.notes}
                      onChange={(e) => setQField("notes", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border)] bg-white p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-200"
                      placeholder="Integrations, examples, style notes, deadlines..."
                      rows={5}
                    />
                  </Field>
                </div>
              </div>
            </section>

            {/* Right: Output */}
            <aside className="w-full lg:w-[370px] rounded-2xl shadow-2xl border border-[var(--border)] bg-gradient-to-br from-white/95 to-blue-50/80 p-6 md:p-8 flex flex-col gap-6">
              <div className="text-base font-bold text-gray-800 tracking-tight mb-2">Estimate</div>

              <div className="rounded-xl border border-[var(--border)] bg-white/80 p-5 flex flex-col gap-2">
                <Row k="Tier" v={est.tier.label} />
                <Row k="Pages (normalized)" v={`${est.normalizedPages}`} />
                <Row k="Timeline" v={`${est.weeksLow}–${est.weeksHigh} weeks`} />
                <Row
                  k="Price range"
                  v={`${est.priceLow.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })} – ${est.priceHigh.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}`}
                />
                <Row
                  k="Maintenance"
                  v={maintenance.monthly ? `$${maintenance.monthly}/mo` : "Optional (none selected)"}
                />
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
                  className="mt-2 h-64 w-full rounded-lg border border-[var(--border)] bg-white p-3 text-xs text-gray-800 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(est.buildSheetText)}
                  className="mt-3 w-full rounded-lg border border-blue-200 bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 font-semibold text-blue-900 hover:from-blue-200 hover:to-blue-100 transition"
                >
                  Copy build sheet
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

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-[var(--border)] bg-[var(--bg)] p-2 text-sm"
    >
      {options.map(([v, label]: [string, string]) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <div className="text-[var(--muted)]">{k}</div>
      <div className="font-semibold">{v}</div>
    </div>
  );
}

