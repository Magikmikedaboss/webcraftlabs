import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import SiteShell from '@/components/SiteShell';
import Section from '@/components/Section';
import { ExternalLink, Code, Palette, Zap, TrendingUp, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: `Portfolio | ${SITE.name}`,
  description: 'Explore our portfolio of marketing websites, web applications, and digital experiences that drive real results.',
  openGraph: {
    title: `Portfolio | ${SITE.name}`,
    description: 'Explore our portfolio of marketing websites, web applications, and digital experiences that drive real results.',
    url: `${SITE.url}/portfolio`,
    type: 'website',
  },
};

// Portfolio project data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform Redesign',
    category: 'E-Commerce',
    description: 'Complete redesign of a multi-vendor marketplace with 300% increase in conversion rates.',
    image: '/images/beautiful-landscape-with-trees-and-mountains-marketing-agency-hero.jpg',
    tags: ['Next.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
    metrics: {
      conversion: '+300%',
      speed: '95/100',
      revenue: '+$2.4M'
    },
    link: '',
    featured: true,
  },
  {
    id: 2,
    title: 'SaaS Marketing Website',
    category: 'SaaS',
    description: 'Modern marketing site with interactive demos and lead generation that converted 12% of visitors.',
    image: '/images/web-developer-cross-platform-solutions-design-and-development-of-website.jpg',
    tags: ['React', 'TypeScript', 'Framer Motion', 'MDX'],
    metrics: {
      conversion: '+12%',
      leads: '2,400/mo',
      bounce: '-45%'
    },
    link: '',
    featured: true,
  },
  {
    id: 3,
    title: 'Real Estate Portal',
    category: 'Real Estate',
    description: 'Property listing platform with advanced search, virtual tours, and CRM integration.',
    image: '/images/tranquil-scene-grass-meadow-sky-sunset-mountain-water-webcraft-labs-hero-image.jpg',
    tags: ['Next.js', 'Mapbox', 'Prisma', 'AWS S3'],
    metrics: {
      listings: '10,000+',
      users: '50K+',
      speed: '98/100'
    },
    link: '',
    featured: false,
  },
  {
    id: 4,
    title: 'Healthcare Appointment System',
    category: 'Healthcare',
    description: 'HIPAA-compliant booking system with telemedicine integration and patient portal.',
    image: '/images/bright-sky-reflects-on-tranquil-water-webcraft-website-design-image.jpg',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Twilio'],
    metrics: {
      appointments: '15K/mo',
      satisfaction: '4.8/5',
      uptime: '99.9%'
    },
    link: '',
    featured: false,
  },
  {
    id: 5,
    title: 'Restaurant Chain Website',
    category: 'Food & Beverage',
    description: 'Multi-location restaurant site with online ordering, reservations, and loyalty program.',
    image: '/images/breathtaking-sunrise-over-mountain-landscape-showcasing-marketing-advertising.jpg',
    tags: ['Next.js', 'Sanity CMS', 'Square API', 'Google Maps'],
    metrics: {
      orders: '$500K/mo',
      locations: '25',
      rating: '4.9/5'
    },
    link: '',
    featured: false,
  },
  {
    id: 6,
    title: 'Fitness Studio Platform',
    category: 'Fitness',
    description: 'Class booking and membership management system with mobile app integration.',
    image: '/images/business-marketing-solutions-concept-art.jpg',
    tags: ['React Native', 'Next.js', 'Stripe', 'Firebase'],
    metrics: {
      members: '3,500+',
      bookings: '8K/mo',
      retention: '85%'
    },
    link: '',
    featured: false,
  },
];

const categories = ['All', 'E-Commerce', 'SaaS', 'Real Estate', 'Healthcare', 'Food & Beverage', 'Fitness'];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className={`group relative h-full ${project.featured ? 'md:col-span-2' : ''}`}>
      {/* Glow effect */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-cyan-400/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Category badge */}
          <div className="absolute left-2 top-2 sm:left-4 sm:top-4">
            <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-lg backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs">
              {project.category}
            </span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute right-2 top-2 sm:right-4 sm:top-4">
              <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg sm:gap-1 sm:px-3 sm:py-1 sm:text-xs">
                <Award className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                Featured
              </span>
            </div>
          )}

          {/* View project button (appears on hover) */}
          {project.link && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Link
                href={project.link}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 shadow-xl transition-transform hover:scale-105"
              >
                View Project
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[var(--primary)]">
            {project.title}
          </h3>
          
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-2 text-center sm:p-3">
                <div className="text-sm font-bold text-[var(--primary)] sm:text-base md:text-lg">{value}</div>
                <div className="text-[10px] font-medium capitalize text-gray-600 sm:text-xs">{key}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link */}
          {project.link && (
            <div className="mt-auto pt-4">
              <Link
                href={project.link}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-blue-700"
              >
                View case study
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="group relative">
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-cyan-400/10 opacity-60 blur-sm transition-opacity group-hover:opacity-100" />
      <div className="relative flex flex-col items-center rounded-2xl border border-[var(--border)] bg-white p-6 text-center shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg">
        <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-3">
          {icon}
        </div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="mt-1 text-sm font-medium text-gray-600">{label}</div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-6 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/images/advertising-beautiful-landscape-with-trees-and-mountains-small.jpg')] bg-cover bg-center opacity-5" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md">
              <Award className="h-4 w-4 text-yellow-500" />
              Our Work
            </div>
            
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Portfolio of{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Results-Driven
              </span>
              <br />
              Digital Experiences
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              From marketing websites to complex web applications, we build digital products that drive real business results. 
              Every project is crafted with attention to detail, performance, and user experience.
            </p>

            {/* Stats */}
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 md:grid-cols-4">
              <StatCard
                icon={<Code className="h-6 w-6 text-blue-600" />}
                value="50+"
                label="Projects Delivered"
              />
              <StatCard
                icon={<TrendingUp className="h-6 w-6 text-green-600" />}
                value="$10M+"
                label="Revenue Generated"
              />
              <StatCard
                icon={<Zap className="h-6 w-6 text-yellow-600" />}
                value="95+"
                label="Avg. Performance Score"
              />
              <StatCard
                icon={<Palette className="h-6 w-6 text-purple-600" />}
                value="100%"
                label="Client Satisfaction"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <Section
        title="Featured Projects"
        intro="Explore our portfolio of successful projects across various industries. Each project showcases our commitment to quality, performance, and results."
      >
        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all cursor-not-allowed ${
                category === 'All'
                  ? 'bg-[var(--primary)] text-white shadow-md opacity-60'
                  : 'border border-[var(--border)] bg-white text-gray-700 opacity-60'
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              A proven methodology that delivers exceptional results, every time.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'We dive deep into your business goals, target audience, and competitive landscape.',
              },
              {
                step: '02',
                title: 'Design',
                description: 'Create stunning, user-centric designs that align with your brand and convert visitors.',
              },
              {
                step: '03',
                title: 'Development',
                description: 'Build fast, scalable, and secure solutions using modern technologies and best practices.',
              },
              {
                step: '04',
                title: 'Launch & Grow',
                description: 'Deploy with confidence and continue optimizing based on real user data and feedback.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-2xl font-bold text-white shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 shadow-2xl md:p-12">
            <div className="absolute inset-0 bg-[url('/images/advertising-beautiful-landscape-with-trees-and-mountains-small.jpg')] bg-cover bg-center opacity-10" />
            
            <div className="relative text-center text-white">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                Let's build something amazing together. Get a free consultation and project estimate.
              </p>
              
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-xl transition-transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  href="/build"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-blue-600"
                >
                  Use Build Configurator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
