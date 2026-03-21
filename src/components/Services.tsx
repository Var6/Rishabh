"use client";
import { Globe, Smartphone, Zap, Database, LayoutDashboard, Bot } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Web App Development",
    description: "Full-stack web applications built with Next.js, React, and TypeScript. From landing pages to complex SaaS platforms.",
    color: "indigo",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform mobile apps using React Native. Ship to iOS and Android from a single codebase.",
    color: "purple",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard & Admin Panels",
    description: "Data-rich dashboards with real-time charts, tables, filters, and role-based access control.",
    color: "cyan",
  },
  {
    icon: Zap,
    title: "Performance Optimisation",
    description: "Audit and optimise existing apps for Core Web Vitals, SEO, bundle size, and server response times.",
    color: "yellow",
  },
  {
    icon: Database,
    title: "Backend & API",
    description: "REST APIs, database design with PostgreSQL/Prisma, and serverless deployments on Vercel or AWS.",
    color: "green",
  },
  {
    icon: Bot,
    title: "AI Integration",
    description: "Integrate LLMs, computer vision, and AI pipelines into your product to unlock intelligent features.",
    color: "pink",
  },
];

const iconColors: Record<string, { bg: string; text: string; border: string }> = {
  indigo: { bg: "bg-indigo-100 dark:bg-indigo-600/20", text: "text-indigo-600 dark:text-indigo-400", border: "hover:border-indigo-300 dark:hover:border-indigo-500/40" },
  purple: { bg: "bg-purple-100 dark:bg-purple-600/20", text: "text-purple-600 dark:text-purple-400", border: "hover:border-purple-300 dark:hover:border-purple-500/40" },
  cyan: { bg: "bg-cyan-100 dark:bg-cyan-600/20", text: "text-cyan-600 dark:text-cyan-400", border: "hover:border-cyan-300 dark:hover:border-cyan-500/40" },
  yellow: { bg: "bg-yellow-100 dark:bg-yellow-600/20", text: "text-yellow-600 dark:text-yellow-400", border: "hover:border-yellow-300 dark:hover:border-yellow-500/40" },
  green: { bg: "bg-green-100 dark:bg-green-600/20", text: "text-green-600 dark:text-green-400", border: "hover:border-green-300 dark:hover:border-green-500/40" },
  pink: { bg: "bg-pink-100 dark:bg-pink-600/20", text: "text-pink-600 dark:text-pink-400", border: "hover:border-pink-300 dark:hover:border-pink-500/40" },
};

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 section-base">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-14">
          <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            How I can <span className="gradient-text">help you</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            I take on freelance projects of all sizes. Here&apos;s what I specialise in.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((svc, i) => {
            const colors = iconColors[svc.color];
            const Icon = svc.icon;
            return (
              <AnimatedSection key={svc.title} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <div className={`card-bg rounded-2xl p-6 sm:p-7 flex flex-col gap-4 transition-all duration-300 h-full ${colors.border}`}>
                    <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center`}>
                      <Icon size={22} className={colors.text} />
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-base sm:text-lg">{svc.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{svc.description}</p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            );
          })}
        </div>

        {/* CTA banner */}
        <AnimatedSection className="mt-14" delay={0.2}>
          <div className="rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 dark:from-indigo-600/20 dark:via-purple-600/10 dark:to-cyan-600/10 border border-indigo-200 dark:border-indigo-500/20 p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              Got a project in mind?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto text-sm sm:text-base">
              I&apos;m currently available for new freelance opportunities. Let&apos;s talk about how I can help.
            </p>
            <Link
              href="/contact"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 glow-indigo"
            >
              Start a Project
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
