
"use client";
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `Build Calculator | ${SITE.name}`,
  description: 'Get an instant estimate for your custom website project. Configure features, pages, and integrations.',
  openGraph: {
    title: `Build Calculator | ${SITE.name}`,
    description: 'Get an instant estimate for your custom website project.',
  },
};

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
  const [copyError, setCopyError] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);
  
  // Helper function for currency formatting
  const formatPrice = (amount: number) => 
    amount.toLocaleString(undefined, {
      style: "currency"
    });
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
                        className="w-6 h-6 rounded-md border-2 border-gray-300 text-blue-500 focus:ring-4 focus:ring-blue-100 focus:ring-offset-0 transition-all duration-200 cursor-pointer checked:bg-blue-500 checked:border-blue-500 hover:border-blue-400"
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
                  </Field>
                  {/* Additional fields or elements can be added here if needed */}
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
                    setCopyError(false);
                    if (copyTimeoutRef.current !== null) {
                      clearTimeout(copyTimeoutRef.current);
                    }
                    try {
                      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                        await navigator.clipboard.writeText(est.buildSheetText);
                        // Success - clear copying state after brief delay
                        copyTimeoutRef.current = window.setTimeout(() => {
                          setCopying(false);
                        }, 800);
                      } else {
                        throw new Error("Clipboard API not available");
                      }
                    } catch (err) {
                      console.error("Copy failed:", err);
                      setCopying(false);
                      setCopyError(true);
                      // Clear error state after 3 seconds
                      copyTimeoutRef.current = window.setTimeout(() => {
                        setCopyError(false);
                      }, 3000);
                    }
                  }}
                  className="min-h-[48px] mt-3 w-full sm:w-auto rounded-2xl border-2 border-yellow-300 bg-gradient-to-r from-yellow-100 to-yellow-200 px-5 py-3 font-semibold text-yellow-900 hover:from-yellow-200 hover:to-yellow-100 hover:shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center"
                >
                  {copyError ? "Copy failed - try again" : "Copy build sheet"}
                  {copying && (
                    <span className="inline-block w-4 h-4 border-2 border-yellow-700 border-t-transparent rounded-full animate-spin ml-2" />
                  )}
                </button>
              </div>
            </section>
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




