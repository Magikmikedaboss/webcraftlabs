export type ProjectStatus = "live" | "in-development";

export type Project = {
  id: string;
  year: string;
  phase: string;
  title: string;
  tagline: string;
  role: string;
  /** "Live" or "In development" — never implies a finished, paid client engagement. */
  status: ProjectStatus;
  /** Short, honest type label, e.g. "Website", "Sports management application". */
  projectType: string;
  problem: string;
  build: string[];
  stack: string[];
  wins: string[];
  next?: string[];
  /** Optional real screenshot. Requires imageAlt when set. */
  image?: string;
  imageAlt?: string;
  /**
   * Verified public URL. Only ever rendered as "Visit website" when status
   * is "live" — never set to a placeholder like "#". Absent/undefined means
   * no public link exists yet, not a broken link.
   */
  publicUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "fundlinkz",
    year: "2024",
    phase: "Monetization & Content",
    title: "FundLinkZ Donation Templates",
    tagline: "Reusable donation pages with QR flows and Stripe integration.",
    role: "Template system + payment architecture",
    status: "in-development",
    projectType: "Product/platform",
    problem:
      "Organizations needed quick, professional donation pages without building from scratch every time.",
    build: [
      "Reusable donation page templates",
      "QR code generation for easy mobile giving",
      "Stripe-ready payment architecture",
      "Customizable branding and messaging",
    ],
    stack: ["HTML/CSS", "JavaScript", "Stripe API", "QR Codes"],
    wins: ["Faster deployment for new instances", "Reusable template system", "Mobile-friendly giving"],
    next: [
      "Add recurring donation options",
      "Build donor management dashboard",
      "Add analytics tracking",
    ],
  },
  {
    id: "nelfuoco",
    year: "2025",
    phase: "Core Business Sites",
    title: "Nel Fuoco",
    tagline: "Artist website with music, tour dates, and media integration.",
    role: "Design + Development",
    status: "live",
    projectType: "Website",
    publicUrl: "https://nelfuoco.com",
    problem:
      "Artist needed a professional online presence to showcase work, promote tours, and direct fans to merch.",
    build: [
      "Multi-page site with media embeds (music, video)",
      "Tour dates and contact forms",
      "Merch direction and e-commerce integration",
      "Mobile-responsive gallery and media players",
    ],
    stack: ["React", "CSS", "Media Embeds", "E-commerce"],
    wins: ["Professional artist presence", "Integrated media showcase", "Clear fan engagement paths"],
    next: ["Add ticket sales integration", "Build email list capture", "Add exclusive content section"],
  },
  {
    id: "webcraft",
    year: "2025",
    phase: "Core Business Sites",
    title: "WebCraft Labz",
    tagline: "Agency website and internal studio platform.",
    role: "Brand direction + system design",
    status: "live",
    projectType: "Website / internal studio platform",
    publicUrl: "/",
    problem:
      "WebCraft Labz needed a productized studio website that positions services as systems rather than one-off deliverables, with a scalable publishing pipeline (blog/news) that won't collapse every few months.",
    build: [
      "Modular services layout framed as 'builds'",
      "Blog and news system designed for long-term publishing",
      "Conversion-focused homepage and service sections",
      "Reusable UI components for rapid iteration",
    ],
    stack: ["Next.js", "Tailwind CSS", "MDX", "Analytics"],
    wins: ["More credible positioning", "Content pipeline ready", "Reusable components"],
    next: ["Add lead magnet + email capture", "Add audit request flow"],
  },
  {
    id: "biotech",
    year: "2025",
    phase: "Core Business Sites",
    title: "Biohacking Research Platform",
    tagline: "Educational and compliance-aware content architecture.",
    role: "Content architecture + compliance",
    status: "in-development",
    projectType: "Research/content platform",
    problem:
      "Build a research-first platform that explains complex topics clearly without hype, misinformation, or regulatory risk.",
    build: [
      "Clear content taxonomy and page hierarchy",
      "Tone and structure guidelines for research-only content",
      "Single-focus educational sections (no product selling)",
      "Scalable layout for future articles and references",
    ],
    stack: ["Information Architecture", "SEO", "Content Design", "Compliance"],
    wins: ["Credible scientific positioning", "Compliant content structure", "Clear research communication"],
    next: ["Add research paper repository", "Build newsletter system", "Add researcher profiles"],
  },
  {
    id: "ravehouse",
    year: "2026",
    phase: "Apps & Platforms",
    title: "Ravehouse Entertainment",
    tagline: "Events platform and brand experience.",
    role: "Full-stack build + UI system",
    status: "in-development",
    projectType: "Entertainment website/platform",
    problem:
      "Create a digital home that feels immersive and brand-native, while supporting real operations (events, galleries, admin workflows).",
    build: [
      "Next.js app structure with brand-driven UI system",
      "Events and gallery pages using reusable components",
      "Theme mode system (Rave / Chill)",
      "Admin dashboard direction for managing content",
      "Interactive roadmap concepts (graffiti wall, VIP)",
    ],
    stack: ["Next.js", "Tailwind CSS", "Component UI System", "Content Modeling"],
    wins: ["Platform direction unlocked", "Reusable admin template", "Consistent brand experience"],
    next: ["Finish event CMS workflow", "Add email capture + drop alerts", "Add membership/VIP gating"],
  },
  {
    id: "leagueos",
    year: "2026",
    phase: "Apps & Platforms",
    title: "LeagueOS",
    tagline: "Mobile-first admin dashboard for sports league operations.",
    role: "Data model + admin UX",
    status: "in-development",
    projectType: "Sports management application",
    problem:
      "Replace manual league management workflows with a safe, role-based admin system that doesn't rely on spreadsheets.",
    build: [
      "Divisions management page with role-based access",
      "Server actions for safe data mutations",
      "Season picker and responsive admin views",
      "Reusable dashboard layout for future modules",
    ],
    stack: ["Next.js", "Tailwind CSS", "Prisma ORM", "Supabase Auth"],
    wins: ["Cleaner ops workflow", "Scalable schema approach", "Reusable admin building blocks"],
    next: ["Add schedules + roster tooling", "Add exports + audit logs", "Add volunteer/role assignments UI"],
  },
];
