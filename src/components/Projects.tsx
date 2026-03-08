"use client";

import { ExternalLink, Github, Star } from "lucide-react";

type Project = {
  name: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
  stars: number;
  featured?: boolean;
  badge?: string;
};

const projects: Project[] = [
  {
    name: "CSC Travels",
    description:
      "A full-featured travel booking platform with real-time availability, booking management, and payment flow. Built with Next.js and TypeScript.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://csctravels.vercel.app",
    githubUrl: "https://github.com/Var6/CSCTravels",
    stars: 0,
    featured: true,
    badge: "Live",
  },
  {
    name: "Citizen IMF",
    description:
      "IMF Citizen — a government-grade citizen management portal with authentication, dashboards, and data management features.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://citizen-imf.vercel.app",
    githubUrl: "https://github.com/Var6/CitizenIMF",
    stars: 1,
    featured: true,
    badge: "Live",
  },
  {
    name: "CSC Billing",
    description:
      "A billing and invoicing SaaS dashboard for small businesses. Features real-time billing, PDF exports, and client management.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://csc-billing.vercel.app",
    githubUrl: "https://github.com/Var6/CSCBilling",
    stars: 0,
    badge: "Live",
  },
  {
    name: "Shemford Web",
    description:
      "A professional school/institution website with modern UI, event listings, admissions flow, and content management.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://shemford-web.vercel.app",
    githubUrl: "https://github.com/Var6/ShemfordWeb",
    stars: 1,
    badge: "Live",
  },
  {
    name: "HRM System",
    description:
      "A Human Resource Management system featuring employee records, attendance tracking, leave management, and role-based access control.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    githubUrl: "https://github.com/Var6/HRM",
    stars: 0,
  },
  {
    name: "Citizen Jaivik Mobile App",
    description:
      "A React Native mobile app for citizens to access organic produce marketplace, farmer connections, and government scheme information.",
    tech: ["React Native", "TypeScript", "Expo"],
    githubUrl: "https://github.com/Var6/CitizenJaivikMobileApp",
    stars: 1,
    badge: "Mobile",
  },
  {
    name: "AI Camera System",
    description:
      "An AI-powered camera system for real-time object detection, face recognition, and intelligent video analytics using computer vision.",
    tech: ["Python", "Computer Vision", "AI/ML"],
    githubUrl: "https://github.com/Var6/Ai_Camera",
    stars: 0,
    badge: "AI",
  },
  {
    name: "Lan Convo",
    description:
      "A local network messaging and conversation app enabling real-time communication between devices on the same LAN.",
    tech: ["TypeScript", "WebSockets", "Next.js"],
    githubUrl: "https://github.com/Var6/Lan-Convo",
    stars: 0,
  },
];

const badgeColor: Record<string, string> = {
  Live: "bg-green-500/15 text-green-400 border-green-500/30",
  Mobile: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  AI: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#0d0d16]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Projects
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white">
            Things I&apos;ve <span className="gradient-text">built</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            From SaaS platforms to mobile apps — here&apos;s a selection of real
            projects I&apos;ve shipped.
          </p>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {projects
            .filter((p) => p.featured)
            .map((project) => (
              <ProjectCard key={project.name} project={project} large />
            ))}
        </div>

        {/* Rest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects
            .filter((p) => !p.featured)
            .map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/Var6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:border-indigo-500/50 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200"
          >
            <Github size={16} />
            See all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div
      className={`card-hover bg-white/3 border border-white/8 rounded-2xl p-6 flex flex-col gap-4 ${
        large ? "" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-white font-bold text-lg">{project.name}</h3>
            {project.badge && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                  badgeColor[project.badge] ??
                  "bg-slate-500/15 text-slate-400 border-slate-500/30"
                }`}
              >
                {project.badge}
              </span>
            )}
          </div>
        </div>
        {project.stars > 0 && (
          <div className="flex items-center gap-1 text-yellow-400 text-xs">
            <Star size={12} fill="currentColor" />
            {project.stars}
          </div>
        )}
      </div>

      <p className="text-slate-400 text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-slate-400 text-xs"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-1">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-medium transition-colors"
        >
          <Github size={14} />
          Code
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-xs font-medium transition-colors"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
