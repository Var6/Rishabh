"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";
import { featuredProjects } from "@/lib/projects-data";
import type { FeaturedProject } from "@/lib/projects-data";

export type { FeaturedProject };

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
};

const badgeColor: Record<string, string> = {
  Live: "bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500/30",
  Mobile: "bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30",
  AI: "bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-500/30",
};

const cardGradient: Record<string, string> = {
  indigo: "from-indigo-500/10 to-transparent dark:from-indigo-600/10",
  purple: "from-purple-500/10 to-transparent dark:from-purple-600/10",
  cyan: "from-cyan-500/10 to-transparent dark:from-cyan-600/10",
};

export function FeaturedProjectCard({
  project,
  index,
  stars,
  forks,
}: {
  project: FeaturedProject;
  index: number;
  stars?: number;
  forks?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
    >
    <TiltCard className="flex flex-col h-full">
    <div
      className="card-bg rounded-2xl overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-300 group flex flex-col h-full"
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${
        project.color === "indigo" ? "from-indigo-500 to-purple-500" :
        project.color === "purple" ? "from-purple-500 to-pink-500" :
        "from-cyan-500 to-blue-500"
      }`} />
      <div className={`p-5 sm:p-6 flex flex-col gap-4 flex-1 bg-gradient-to-br ${cardGradient[project.color] ?? ""}`}>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-slate-900 dark:text-white font-bold text-base sm:text-lg">{project.name}</h3>
          {project.badge && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${badgeColor[project.badge] ?? ""}`}>
              {project.badge}
            </span>
          )}
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-400 text-xs">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-1 flex-wrap">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors">
            <Github size={14} /> Code
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-xs font-medium transition-colors">
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {(stars !== undefined && stars > 0) && (
            <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-xs">
              <Star size={12} fill="currentColor" /> {stars}
            </span>
          )}
          {(forks !== undefined && forks > 0) && (
            <span className="flex items-center gap-1 text-slate-400 text-xs">
              <GitFork size={12} /> {forks}
            </span>
          )}
          <Link href={`/projects/${project.slug}`}
            className="ml-auto flex items-center gap-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-medium transition-colors">
            Details →
          </Link>
        </div>
      </div>
    </div>
    </TiltCard>
    </motion.div>
  );
}

export function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const langColor: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    Python: "bg-green-500",
    CSS: "bg-pink-500",
    HTML: "bg-orange-500",
  };

  return (
    <motion.a
      href={repo.html_url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className="card-bg rounded-2xl p-5 flex flex-col gap-3 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-slate-900 dark:text-white font-semibold text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
          {repo.name}
        </h3>
        <Github size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
      </div>

      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 flex-1">
        {repo.description ?? "No description provided."}
      </p>

      <div className="flex items-center gap-3 mt-auto">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className={`w-2 h-2 rounded-full ${langColor[repo.language] ?? "bg-slate-400"}`} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
            <Star size={11} fill="currentColor" /> {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <GitFork size={11} /> {repo.forks_count}
          </span>
        )}
      </div>
    </motion.a>
  );
}

export default function Projects({
  repos = [],
  statsMap = {},
}: {
  repos?: Repo[];
  statsMap?: Record<string, { stars: number; forks: number }>;
}) {
  return (
    <section id="projects" className="py-20 sm:py-24 section-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-14">
          <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">Projects</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            Things I&apos;ve <span className="gradient-text">built</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            From SaaS platforms to mobile apps — real projects shipped for real clients.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {featuredProjects.map((p, i) => {
            const key = p.githubUrl.split("/").pop()?.toLowerCase() ?? "";
            const s = statsMap[key];
            return (
              <FeaturedProjectCard key={p.name} project={p} index={i} stars={s?.stars} forks={s?.forks} />
            );
          })}
        </div>

        {repos.length > 0 && (
          <>
            <AnimatedSection className="mb-6">
              <h3 className="text-slate-700 dark:text-slate-300 font-semibold text-sm">More from GitHub</h3>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((r, i) => <RepoCard key={r.id} repo={r} index={i} />)}
            </div>
          </>
        )}

        <AnimatedSection className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-white/15 hover:border-indigo-400 dark:hover:border-indigo-500/50 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white text-sm font-medium transition-all duration-200"
          >
            <Github size={16} /> View All Projects
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
