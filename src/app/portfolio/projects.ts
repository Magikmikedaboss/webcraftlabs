export type ProjectStatus = "live" | "business-demo" | "in-development";

export type Project = {
  id: string;
  year: string;
  title: string;
  tagline: string;
  /** Shown in the drawer as "Design/development focus". */
  role: string;
  status: ProjectStatus;
  /** Short, honest type label, e.g. "Local-service website", "Sports management application". */
  projectType: string;
  /** Shown in the drawer as "Overview" — a short positioning summary. */
  overview: string;
  /** Shown in the drawer as "Purpose" — why the project exists. */
  problem: string;
  /** Shown in the drawer as "Built now". Only genuinely implemented work belongs here. */
  build: string[];
  stack: string[];
  /** Shown in the drawer as "Next or planned work". */
  next?: string[];
  /** Optional real screenshot. Requires imageAlt when set. */
  image?: string;
  imageAlt?: string;
  /**
   * Verified public URL. Rendered as "Visit live website" for status "live"
   * or "View business demo" for status "business-demo" — never for
   * "in-development", and never set to a placeholder like "#". Absent
   * means no public link exists yet, not a broken link.
   */
  publicUrl?: string;
};

/**
 * Explicit editorial ordering per category, independent of PROJECTS' array
 * order or any incidental sort — mirrors the Resource Center's
 * sortByExplicitOrder pattern (see src/lib/resourcePathMeta.ts). Adding or
 * reordering entries in PROJECTS never silently changes on-page order.
 */
export const CATEGORY_ORDER: Record<ProjectStatus, readonly string[]> = {
  live: ["mikes-pro-handyman", "nelfuoco", "webcraft"],
  "business-demo": ["black-hat-welders", "hailey-jade", "glamping-retreat"],
  "in-development": ["leagueos", "axon", "fundlinkz", "ravehouse"],
};

export const CATEGORY_LABEL: Record<ProjectStatus, string> = {
  live: "Live website",
  "business-demo": "Business demo",
  "in-development": "In development",
};

/**
 * Sorts a list of projects already narrowed to one status by that status's
 * CATEGORY_ORDER. Falls back to each project's existing relative position
 * for anything not named in the order (stable sort) so an unrecognized id
 * never disappears, it just lands after every explicitly-ordered one.
 */
export function sortByCategoryOrder(projects: readonly Project[], status: ProjectStatus): Project[] {
  const order = CATEGORY_ORDER[status];
  const rank = new Map(order.map((id, i) => [id, i]));
  return [...projects].sort((a, b) => {
    const ai = rank.get(a.id);
    const bi = rank.get(b.id);
    if (ai === undefined && bi === undefined) return 0;
    if (ai === undefined) return 1;
    if (bi === undefined) return -1;
    return ai - bi;
  });
}

export const PROJECTS: Project[] = [
  // ---- Live websites ----
  {
    id: "mikes-pro-handyman",
    year: "2026",
    title: "Mike's Pro Handyman",
    tagline: "Local Las Vegas handyman site built for fast online booking and real service-area content.",
    role: "Design + development",
    status: "live",
    projectType: "Local-service website",
    publicUrl: "https://www.mikesprohandyman.com/",
    overview:
      "A live Las Vegas handyman website designed around local discovery, service presentation, useful content, trust, and fast online booking.",
    problem:
      "A local handyman business needed a site that turns local searches into booked jobs, not just a brochure page.",
    build: [
      "Service pages covering general repairs, electrical & plumbing, kitchen & bath, assembly & install, painting & drywall, and doors & locks",
      "Online booking calls-to-action throughout, including a dedicated booking path and free-estimate requests",
      "Las Vegas-area service coverage messaging across Henderson, Summerlin, Spring Valley, Paradise, and Enterprise",
      "An active blog with dated local guides, cost breakdowns, and trade-comparison articles",
    ],
    stack: ["Next.js", "Tailwind CSS", "MDX"],
  },
  {
    id: "nelfuoco",
    year: "2025",
    title: "Nel Fuoco",
    tagline: "Artist website bringing music, tour dates, and fan content into one experience.",
    role: "Design + development",
    status: "live",
    projectType: "Music and artist website",
    publicUrl: "https://nelfuoco.com",
    image: "/images/portfolio/nelfuoco.webp",
    imageAlt: "Nel Fuoco artist website homepage, showing music, tour, and media content.",
    overview:
      "A live artist website bringing music, media, booking, releases, and fan-facing content into one responsive experience.",
    problem:
      "An artist needed a professional online presence to showcase music, promote tour dates, and direct fans to merch and updates.",
    build: [
      "Streaming and media integration (Apple Music, Spotify, YouTube) with an embedded video gallery",
      "Tour dates section with a booking contact path",
      "Merch shop accessible from the main navigation",
      "Fan-facing content: email newsletter signup, VIP access page, and blog",
    ],
    stack: ["Next.js", "Tailwind CSS", "Media Embeds", "E-commerce"],
    next: ["Add ticket sales integration", "Expand exclusive VIP content"],
  },
  {
    id: "webcraft",
    year: "2025",
    title: "WebCraft Labz",
    tagline: "Studio platform combining services, publishing, and interactive tools.",
    role: "Brand direction + system design",
    status: "live",
    projectType: "Studio and resource platform",
    publicUrl: "/",
    overview:
      "A live digital-studio platform combining commercial services, technical publishing, interactive resources, and creative experimentation.",
    problem:
      "WebCraft Labz needed a productized studio website that positions services as systems rather than one-off deliverables, with a publishing pipeline that scales.",
    build: [
      "Modular services section covering website, SaaS, AI/automation, and landing-page work",
      "MDX-powered Blog and News publishing pipeline with a shared Resource Center hub",
      "Interactive Build Calculator for project scoping",
      "This portfolio, organized by live websites, business demos, and products in development",
    ],
    stack: ["Next.js", "Tailwind CSS", "MDX", "Analytics"],
    next: ["Add lead magnet + email capture", "Add audit request flow"],
  },

  // ---- Business demos ----
  {
    id: "black-hat-welders",
    year: "2026",
    title: "Black Hat Welders",
    tagline: "Mobile welding demo built around fast quotes and local dispatch.",
    role: "Design + development",
    status: "business-demo",
    projectType: "Local-service website demo",
    publicUrl: "https://black-hat-welders.vercel.app/services",
    image: "/images/portfolio/black-hat-welders.webp",
    imageAlt: "Black Hat Welders mobile welding services page, showing service categories and dispatch coverage area.",
    overview:
      "A mobile-welding website demonstration created for a Las Vegas service company, combining conversion-focused service presentation with a content publishing system.",
    problem:
      "Mobile welding and fabrication companies need a site that turns a call into a dispatched job quickly, with content that builds trust in certified, safety-first work.",
    build: [
      "Service pages for mobile welding dispatch, structural steel, pipe welding, and custom fabrication, each with quote and call calls-to-action",
      "A four-step quote-to-dispatch flow: call dispatch, get a quote and schedule, rig arrival, execution with inspection",
      "Las Vegas-area coverage messaging (Las Vegas, Henderson, North Las Vegas, Summerlin, Enterprise)",
      "MDX-powered Blog and News sections with published articles and reusable publishing templates",
    ],
    stack: ["Next.js", "Tailwind CSS", "MDX"],
  },
  {
    id: "hailey-jade",
    year: "2026",
    title: "Hailey Jade",
    tagline: "Premium eyelash-artist demo with mobile-first booking.",
    role: "Design + development",
    status: "business-demo",
    projectType: "Beauty-service website demo",
    publicUrl: "https://haileyjade-website.vercel.app/",
    image: "/images/portfolio/hailey-jade.webp",
    imageAlt: "Hailey Jade eyelash artist website homepage, showing signature service tiers and booking calls-to-action.",
    overview:
      "A premium beauty-service website demonstration created for a custom eyelash artist, with a mobile-first service and booking journey.",
    problem:
      "Independent beauty artists need a site that presents services clearly, builds trust through real work, and makes booking effortless on mobile.",
    build: [
      "Four signature service tiers (Classic, Hybrid, Volume, Fill) presented with pricing, duration, and distinct positioning",
      "A recent-work gallery showcasing completed lash sets",
      "An artist bio section explaining a custom, eye-shape-based design philosophy",
      "Pre-appointment preparation guidance and multiple booking calls-to-action throughout",
    ],
    stack: ["Next.js", "Tailwind CSS"],
  },
  {
    id: "glamping-retreat",
    year: "2026",
    title: "Glamping Retreat Booking Website",
    tagline: "Hospitality demo built around discovery and an inquiry-based reservation flow.",
    role: "Design + development",
    status: "business-demo",
    projectType: "Hospitality and booking website demo",
    publicUrl: "https://glamping-retreat-website.vercel.app/",
    image: "/images/portfolio/glamping-retreat.webp",
    imageAlt: "Canyon & Coast Retreats homepage, showing glamping and RV accommodation options.",
    overview:
      "A glamping and retreat website demonstration designed around destination discovery, accommodation presentation, and a clear reservation journey.",
    problem:
      "Hospitality and retreat operators need a site that presents accommodations and experiences clearly and gives guests a straightforward way to start a reservation.",
    build: [
      "Property and package browsing across RV sites, glamping tents, and tent camping",
      "Accommodation and amenity details, including dog-friendly options and add-on experiences",
      "An inquiry-based reservation flow (dedicated booking and inquiry links) rather than a live checkout",
      "Responsive layout across the browsing and inquiry experience",
    ],
    stack: ["Next.js", "Tailwind CSS"],
  },

  // ---- Products in development ----
  {
    id: "leagueos",
    year: "2026",
    title: "LeagueOS",
    tagline: "Mobile-first admin dashboard for sports league operations.",
    role: "Data model + admin UX",
    status: "in-development",
    projectType: "Sports management application",
    overview:
      "A mobile-first sports management platform designed to make league administration easier for smaller organizations.",
    problem:
      "Replace manual league management workflows with a safe, role-based admin system that doesn't rely on spreadsheets.",
    build: [
      "Divisions management page with role-based access",
      "Server actions for safe data mutations",
      "Season picker and responsive admin views",
      "Reusable dashboard layout for future modules",
    ],
    stack: ["Next.js", "Tailwind CSS", "Prisma ORM", "Supabase Auth"],
    next: ["Add schedules + roster tooling", "Add exports + audit logs", "Add volunteer/role assignments UI"],
  },
  {
    id: "axon",
    year: "2026",
    title: "Axon Research Platform",
    tagline: "Early-stage concept for turning research material into organized insight.",
    role: "Concept + direction",
    status: "in-development",
    projectType: "AI-assisted research platform",
    overview:
      "An AI-assisted research platform designed to turn complex source material into organized insights and clearer research workflows.",
    problem:
      "Research and analysis work is scattered across documents and tools, making it hard to organize sources and see how ideas connect.",
    build: [
      "Public positioning and direction defined (an internal research and intelligence initiative)",
      "Editorial content explaining the initiative's goals and approach",
    ],
    stack: ["Next.js"],
    next: [
      "Research workspace interface",
      "Source organization and ingestion",
      "AI-assisted analysis and insight extraction",
      "Topic relationship mapping",
      "Citation tracking",
      "Collaboration features",
      "Export functionality",
    ],
  },
  {
    id: "fundlinkz",
    year: "2024",
    title: "FundLinkZ",
    tagline: "Donation-platform concept with reusable campaigns and QR-driven giving.",
    role: "Template system + payment architecture",
    status: "in-development",
    projectType: "Donation platform",
    overview:
      "A donation-platform concept exploring reusable campaign experiences, QR-driven access, and payment-ready contribution flows.",
    problem:
      "Organizations need quick, professional donation pages without building one from scratch every time.",
    build: [
      "Reusable donation page templates",
      "QR code generation for mobile giving",
      "Stripe-ready payment architecture",
      "Customizable branding and messaging",
    ],
    stack: ["HTML/CSS", "JavaScript", "Stripe API", "QR Codes"],
    next: ["Add recurring donation options", "Build donor management dashboard", "Add analytics tracking"],
  },
  {
    id: "ravehouse",
    year: "2026",
    title: "Ravehouse Entertainment",
    tagline: "Entertainment-platform concept for events, media, and audience engagement.",
    role: "Full-stack build + UI system",
    status: "in-development",
    projectType: "Entertainment platform",
    overview:
      "An entertainment-platform concept exploring events, media, membership experiences, and audience engagement.",
    problem:
      "Create a digital home that feels immersive and brand-native, while supporting real operations such as events, galleries, and admin workflows.",
    build: [
      "Next.js app structure with a brand-driven UI system",
      "Events and gallery pages using reusable components",
      "Theme mode system (Rave / Chill)",
      "Admin dashboard direction for managing content",
    ],
    stack: ["Next.js", "Tailwind CSS", "Component UI System", "Content Modeling"],
    next: [
      "Finish event CMS workflow",
      "Add email capture + drop alerts",
      "Add membership/VIP gating",
      "Add admin dashboard build-out",
    ],
  },
];
