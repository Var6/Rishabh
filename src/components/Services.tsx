"use client";

import {
  Globe,
  Smartphone,
  Zap,
  Database,
  LayoutDashboard,
  Bot,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web App Development",
    description:
      "Full-stack web applications built with Next.js, React, and TypeScript. From landing pages to complex SaaS platforms.",
    color: "indigo",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps using React Native. Ship to iOS and Android from a single codebase.",
    color: "purple",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard & Admin Panels",
    description:
      "Data-rich dashboards with real-time charts, tables, filters, and role-based access control.",
    color: "cyan",
  },
  {
    icon: Zap,
    title: "Performance Optimisation",
    description:
      "Audit and optimise existing apps for Core Web Vitals, SEO, bundle size, and server response times.",
    color: "yellow",
  },
  {
    icon: Database,
    title: "Backend & API",
    description:
      "REST and tRPC APIs, database design with PostgreSQL/Prisma, and serverless deployments on Vercel or AWS.",
    color: "green",
  },
  {
    icon: Bot,
    title: "AI Integration",
    description:
      "Integrate LLMs, computer vision, and AI pipelines into your product to unlock intelligent features.",
    color: "pink",
  },
];

const iconColors: Record<string, { bg: string; text: string }> = {
  indigo: { bg: "bg-indigo-600/20", text: "text-indigo-400" },
  purple: { bg: "bg-purple-600/20", text: "text-purple-400" },
  cyan: { bg: "bg-cyan-600/20", text: "text-cyan-400" },
  yellow: { bg: "bg-yellow-600/20", text: "text-yellow-400" },
  green: { bg: "bg-green-600/20", text: "text-green-400" },
  pink: { bg: "bg-pink-600/20", text: "text-pink-400" },
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Services
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white">
            How I can <span className="gradient-text">help you</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            I take on freelance projects of all sizes. Here&apos;s what I specialise
            in.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const colors = iconColors[svc.color];
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="card-hover bg-white/3 border border-white/8 rounded-2xl p-7 flex flex-col gap-4"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center`}
                >
                  <Icon size={22} className={colors.text} />
                </div>
                <h3 className="text-white font-bold text-lg">{svc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {svc.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-cyan-600/10 border border-indigo-500/20 p-10 text-center">
          <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3">
            Got a project in mind?
          </h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            I&apos;m currently available for new freelance opportunities. Let&apos;s
            talk about how I can help.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 glow-indigo"
          >
            Start a Project
          </a>
        </div>
      </div>
    </section>
  );
}
