"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Play,
  CheckCircle2,
  Layers,
  Zap,
  AlertTriangle,
  Code2,
} from "lucide-react";
import type { FeaturedProject } from "@/lib/projects-data";

const badgeColor: Record<string, string> = {
  Live: "bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500/30",
  Mobile: "bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30",
  AI: "bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-500/30",
};

const accentColor: Record<string, string> = {
  indigo: "from-indigo-500 to-purple-500",
  purple: "from-purple-500 to-pink-500",
  cyan: "from-cyan-500 to-blue-500",
};

const glowColor: Record<string, string> = {
  indigo: "shadow-indigo-500/20",
  purple: "shadow-purple-500/20",
  cyan: "shadow-cyan-500/20",
};

const dotColor: Record<string, string> = {
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
};

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

function LivePreview({ liveUrl, name }: { liveUrl: string; name: string }) {
  const [loaded, setLoaded] = useState(false);
  const [activated, setActivated] = useState(false);
  const screenshotUrl = `https://image.thum.io/get/width/1200/crop/630/${liveUrl}`;

  if (!activated) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-white/8 bg-slate-100 dark:bg-white/3 group cursor-pointer"
        onClick={() => setActivated(true)}>
        <Image
          src={screenshotUrl}
          alt={`${name} screenshot`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 900px"
          unoptimized
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center gap-3 group-hover:bg-slate-900/40 transition-colors">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play size={20} className="text-white fill-white ml-1" />
          </div>
          <p className="text-white text-sm font-medium">Click to load live preview</p>
          <p className="text-white/60 text-xs">Opens an interactive iframe</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-white/8 bg-slate-100 dark:bg-white/3">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-[#0d0d16] z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-slate-500 text-xs">Loading {name}…</p>
          </div>
        </div>
      )}
      <iframe
        src={liveUrl}
        title={`${name} live preview`}
        className="w-full h-full"
        onLoad={() => setLoaded(true)}
        allow="fullscreen"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}

export default function ProjectSlugClient({ project }: { project: FeaturedProject }) {
  const [activeTab, setActiveTab] = useState<"preview" | "screenshot">("screenshot");
  const gradient = accentColor[project.color] ?? "from-indigo-500 to-purple-500";
  const glow = glowColor[project.color] ?? "shadow-indigo-500/20";
  const dot = dotColor[project.color] ?? "bg-indigo-500";
  const screenshotUrl = project.liveUrl
    ? `https://image.thum.io/get/width/1200/crop/630/${project.liveUrl}`
    : null;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="section-alt border-b border-slate-200 dark:border-white/5 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Projects
            </Link>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Left: meta */}
            <div className="flex-1 min-w-0">
              <motion.div {...fadeUp(0.05)} className="flex items-center gap-2.5 flex-wrap mb-5">
                <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-widest">
                  Project
                </span>
                {project.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${badgeColor[project.badge] ?? ""}`}>
                    {project.badge}
                  </span>
                )}
              </motion.div>

              <motion.h1 {...fadeUp(0.1)} className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                {project.name}
              </motion.h1>

              <motion.p {...fadeUp(0.15)} className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                {project.fullDescription}
              </motion.p>

              <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-400 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </motion.div>

              <motion.div {...fadeUp(0.25)} className="flex flex-wrap gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-all"
                >
                  <Github size={15} /> View Code
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${gradient} text-white text-sm font-semibold shadow-lg ${glow} hover:opacity-90 transition-opacity`}
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
              </motion.div>
            </div>

            {/* Right: screenshot / preview toggle */}
            <motion.div {...fadeUp(0.2)} className="w-full lg:w-[500px] shrink-0">
              {project.liveUrl ? (
                <>
                  <div className="flex gap-1 mb-3 p-1 bg-slate-100 dark:bg-white/5 rounded-lg w-fit border border-slate-200 dark:border-white/8">
                    {(["screenshot", "preview"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                          activeTab === tab
                            ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                        }`}
                      >
                        {tab === "preview" ? "Live Preview" : "Screenshot"}
                      </button>
                    ))}
                  </div>

                  {activeTab === "screenshot" && screenshotUrl ? (
                    <div className={`relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-white/8 shadow-2xl ${glow}`}>
                      <Image
                        src={screenshotUrl}
                        alt={`${project.name} screenshot`}
                        fill
                        className="object-cover object-top"
                        sizes="500px"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  ) : (
                    <LivePreview liveUrl={project.liveUrl} name={project.name} />
                  )}
                </>
              ) : screenshotUrl ? (
                <div className={`relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-white/8 shadow-2xl ${glow}`}>
                  <Image
                    src={screenshotUrl}
                    alt={`${project.name} screenshot`}
                    fill
                    className="object-cover object-top"
                    sizes="500px"
                    unoptimized
                  />
                </div>
              ) : (
                <div className={`w-full aspect-video rounded-xl border border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center bg-gradient-to-br ${gradient} opacity-10`} />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <section className="section-base py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left column: features + architecture + challenges */}
            <div className="lg:col-span-2 flex flex-col gap-14">

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10`}>
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Key Features</h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {project.features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
                      className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${dot} mt-1.5 shrink-0`} />
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Architecture */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10`}>
                    <Layers size={16} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Architecture & Code</h2>
                </div>
                <div className="card-bg rounded-xl p-5 sm:p-6 border-l-2 border-indigo-400 dark:border-indigo-500">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-loose">{project.architecture}</p>
                </div>
              </motion.div>

              {/* Challenges */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10`}>
                    <AlertTriangle size={16} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Challenges Solved</h2>
                </div>
                <div className="flex flex-col gap-4">
                  {project.challenges.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                      className="card-bg rounded-xl p-4 sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-slate-400 font-mono text-xs mt-0.5 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{c}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column: tech stack */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="sticky top-24"
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10`}>
                    <Code2 size={16} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tech Stack</h2>
                </div>
                <div className="flex flex-col gap-3">
                  {project.techStack.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                      className="card-bg rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Zap size={12} className="text-indigo-500 dark:text-indigo-400 shrink-0" />
                        <span className="text-slate-900 dark:text-white text-sm font-semibold">{item.name}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-500 text-xs leading-relaxed pl-5">{item.purpose}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-8 flex flex-col gap-2.5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 text-slate-700 dark:text-slate-300 text-sm font-medium transition-all"
                  >
                    <Github size={14} /> View Source Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r ${gradient} text-white text-sm font-semibold hover:opacity-90 transition-opacity`}
                    >
                      <ExternalLink size={14} /> Open Live Site
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── More projects ─────────────────────────────────────────────────── */}
      <section className="section-alt border-t border-slate-200 dark:border-white/5 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Explore more of my work</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-white/15 hover:border-indigo-400 dark:hover:border-indigo-500/50 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white text-sm font-medium transition-all"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
        </div>
      </section>
    </>
  );
}
