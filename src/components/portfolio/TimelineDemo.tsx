"use client";

import { Calendar, Code, Zap, TrendingUp } from "lucide-react";

export default function TimelineDemo() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl">
        {/* 2024 */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-700 text-xl font-bold text-white shadow-lg">
              2024
            </div>
            <div className="text-sm text-gray-500">Growth &amp; SaaS Launches</div>
          </div>

          {/* Ravehouse Entertainment Platform */}
          <div className="ml-24 mb-8">
            <div className="group relative">
              <div className="absolute -left-[4.5rem] top-6 h-3 w-3 rounded-full bg-purple-600 ring-4 ring-purple-100" />
              <div className="rounded-xl border-2 border-purple-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      🎛️ Apps &amp; Platforms
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      Ravehouse Entertainment Platform
                    </h3>
                    <p className="text-sm text-gray-500">Q1 2024 • 3 months</p>
                  </div>
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>

                <p className="mt-3 text-gray-600">
                  Full-featured entertainment platform with Next.js, neon theming, events system,
                  gallery, admin dashboard, graffiti wall, party/chill modes, and monetization
                  features.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Next.js</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">React</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Tailwind</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    Admin Dashboard
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    Monetization
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-purple-50 p-2 text-center">
                    <div className="font-bold text-purple-600">Live</div>
                    <div className="text-xs text-gray-600">Status</div>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-2 text-center">
                    <div className="font-bold text-purple-600">5+</div>
                    <div className="text-xs text-gray-600">Features</div>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-2 text-center">
                    <div className="font-bold text-purple-600">Complex</div>
                    <div className="text-xs text-gray-600">Scope</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AYSO Soccer Admin App */}
          <div className="ml-24 mb-8">
            <div className="group relative">
              <div className="absolute -left-[4.5rem] top-6 h-3 w-3 rounded-full bg-purple-600 ring-4 ring-purple-100" />
              <div className="rounded-xl border-2 border-purple-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      🎛️ Apps &amp; Platforms
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">AYSO Soccer Admin App</h3>
                    <p className="text-sm text-gray-500">Q2 2024 • 2 months</p>
                  </div>
                  <Code className="h-6 w-6 text-purple-600" />
                </div>

                <p className="mt-3 text-gray-600">
                  Sports management platform with divisions, seasons, Prisma models, role-based
                  access guards, and mobile-first admin UX.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Next.js</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Prisma</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    PostgreSQL
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Auth</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    Mobile-First
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-purple-50 p-2 text-center">
                    <div className="font-bold text-purple-600">Active</div>
                    <div className="text-xs text-gray-600">Status</div>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-2 text-center">
                    <div className="font-bold text-purple-600">Database</div>
                    <div className="text-xs text-gray-600">Backend</div>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-2 text-center">
                    <div className="font-bold text-purple-600">Admin</div>
                    <div className="text-xs text-gray-600">Type</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Remodeling SaaS Concept */}
          <div className="ml-24">
            <div className="group relative">
              <div className="absolute -left-[4.5rem] top-6 h-3 w-3 rounded-full bg-purple-600 ring-4 ring-purple-100" />
              <div className="rounded-xl border-2 border-purple-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      🎛️ Apps &amp; Platforms
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      AI Remodeling SaaS Concept
                    </h3>
                    <p className="text-sm text-gray-500">Q3 2024 • In Development</p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>

                <p className="mt-3 text-gray-600">
                  AI-powered handyman/remodeling platform with photo analysis, before/after renders
                  and monetization planning.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">AI/ML</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    Image Processing
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">SaaS</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    Monetization
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2023 */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-xl font-bold text-white shadow-lg">
              2023
            </div>
            <div className="text-sm text-gray-500">Foundation Year • 5 Core Sites</div>
          </div>

          {/* Mike's PRO Handyman */}
          <div className="ml-24 mb-8">
            <div className="group relative">
              <div className="absolute -left-[4.5rem] top-6 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
              <div className="rounded-xl border-2 border-blue-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      🏢 Core Business Sites
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      Mike&apos;s PRO Handyman
                    </h3>
                    <p className="text-sm text-gray-500">Q2 2023 • 6 weeks</p>
                  </div>
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>

                <p className="mt-3 text-gray-600">
                  Full marketing site with booking system, local SEO optimization, schema markup,
                  and modern responsive layouts.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">HTML/CSS</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    JavaScript
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">SEO</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Schema</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Booking</span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-center">
                    <div className="font-bold text-blue-600">Live</div>
                    <div className="text-xs text-gray-600">Status</div>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-2 text-center">
                    <div className="font-bold text-blue-600">95+</div>
                    <div className="text-xs text-gray-600">SEO Score</div>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-2 text-center">
                    <div className="font-bold text-blue-600">Local</div>
                    <div className="text-xs text-gray-600">Focus</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nel Fuoco */}
          <div className="ml-24 mb-8">
            <div className="group relative">
              <div className="absolute -left-[4.5rem] top-6 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
              <div className="rounded-xl border-2 border-blue-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      🏢 Core Business Sites
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">Nel Fuoco (Artist Site)</h3>
                    <p className="text-sm text-gray-500">Q3 2023 • 4 weeks</p>
                  </div>
                </div>

                <p className="mt-3 text-gray-600">
                  Multi-page artist portfolio with media embeds, tour dates, contact forms, and
                  merch direction.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">React</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Media</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    Portfolio
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    E-commerce
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* WebCraft Labs */}
          <div className="ml-24 mb-8">
            <div className="group relative">
              <div className="absolute -left-[4.5rem] top-6 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
              <div className="rounded-xl border-2 border-blue-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      🏢 Core Business Sites
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      WebCraft Labs (This Site!)
                    </h3>
                    <p className="text-sm text-gray-500">Q4 2023 • 8 weeks</p>
                  </div>
                </div>

                <p className="mt-3 text-gray-600">
                  Agency website with services showcase, blog/news system, build configurator, and
                  professional positioning.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Next.js</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">MDX</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    TypeScript
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Tailwind</span>
                </div>
              </div>
            </div>
          </div>

          {/* Biotech Site */}
          <div className="ml-24">
            <div className="group relative">
              <div className="absolute -left-[4.5rem] top-6 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
              <div className="rounded-xl border-2 border-blue-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      🏢 Core Business Sites
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">Biotech Research Site</h3>
                    <p className="text-sm text-gray-500">Q4 2023 • 5 weeks</p>
                  </div>
                </div>

                <p className="mt-3 text-gray-600">
                  Scientific content site with compliance-aware copy, content architecture, and
                  science-first positioning.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Content</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    Compliance
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Research</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2022 */}
        <div>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-xl font-bold text-white shadow-lg">
              2022
            </div>
            <div className="text-sm text-gray-500">Early Days • Monetization Systems</div>
          </div>

          {/* Fix It With Mike Blog */}
          <div className="ml-24 mb-8">
            <div className="group relative">
              <div className="absolute -left-[4.5rem] top-6 h-3 w-3 rounded-full bg-green-600 ring-4 ring-green-100" />
              <div className="rounded-xl border-2 border-green-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      💸 Monetization &amp; Content
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">Fix It With Mike Blog</h3>
                    <p className="text-sm text-gray-500">Q3 2022 • Ongoing</p>
                  </div>
                </div>

                <p className="mt-3 text-gray-600">
                  Content blog with affiliate system, SEO strategy, and multiple monetization paths.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    WordPress
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    Affiliate
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">SEO</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Content</span>
                </div>
              </div>
            </div>
          </div>

          {/* FundLinkZ Templates */}
          <div className="ml-24">
            <div className="group relative">
              <div className="absolute -left-[4.5rem] top-6 h-3 w-3 rounded-full bg-green-600 ring-4 ring-green-100" />
              <div className="rounded-xl border-2 border-green-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      💸 Monetization &amp; Content
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      FundLinkZ Donation Templates
                    </h3>
                    <p className="text-sm text-gray-500">Q4 2022 • Template System</p>
                  </div>
                </div>

                <p className="mt-3 text-gray-600">
                  Reusable donation page templates with QR code flows and Stripe-ready architecture.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    Templates
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">Stripe</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">QR Codes</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                    Payments
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-16 rounded-xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-bold text-gray-900">Project Categories</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-blue-600" />
              <div>
                <div className="font-semibold text-gray-900">Core Business Sites</div>
                <div className="text-sm text-gray-600">Marketing, SEO, conversions</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-purple-600" />
              <div>
                <div className="font-semibold text-gray-900">Apps &amp; Platforms</div>
                <div className="text-sm text-gray-600">Complex systems, databases</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-green-600" />
              <div>
                <div className="font-semibold text-gray-900">Monetization &amp; Content</div>
                <div className="text-sm text-gray-600">Revenue systems, templates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
