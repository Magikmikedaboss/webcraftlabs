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

export default function BuildCalculatorClient() {
  const [copying, setCopying] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);
  // Helper function for currency formatting
  const formatPrice = (amount: number) => 
    amount.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
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
          {/* ...rest of BuildPage logic and JSX... */}
          <div>Placeholder for BuildPage content</div>
        </div>
      </main>
    </SiteShell>
  );
}