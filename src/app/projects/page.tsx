import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FeaturedProjectCard, RepoCard } from "@/components/Projects";
import type { Repo } from "@/components/Projects";
import { featuredProjects, extraProjects } from "@/lib/projects-data";
import AnimatedSection from "@/components/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Rishabh Ranjan",
  description: "All projects built by Rishabh Ranjan — web apps, mobile apps, SaaS platforms, and AI tools.",
};

async function getRepos(): Promise<Repo[]> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github.v3+json", "User-Agent": "rishabh-portfolio" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    const res = await fetch("https://api.github.com/users/Var6/repos?sort=updated&per_page=30&type=public", {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const allRepos = await getRepos();

  // Filter out repos already shown in curated lists
  const knownNames = [...featuredProjects, ...extraProjects].map((p) =>
    p.name.toLowerCase().replace(/\s/g, "")
  );
  const dynamicRepos = allRepos.filter(
    (r) => !knownNames.includes(r.name.toLowerCase().replace(/\s/g, "")) && r.name !== "portfolio"
  );

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Header */}
        <div className="section-alt py-14 sm:py-20 border-b border-slate-200 dark:border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">Projects</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4">
              Things I&apos;ve <span className="gradient-text">built</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              From SaaS platforms to AI tools — {allRepos.length > 0 ? allRepos.length : "8"}+ public repos on GitHub.
            </p>
          </div>
        </div>

        <section className="py-16 sm:py-20 section-base">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Featured */}
            <AnimatedSection className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-indigo-500 inline-block" />
                Featured Projects
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {featuredProjects.map((p, i) => <FeaturedProjectCard key={p.name} project={p} index={i} />)}
            </div>

            {/* More */}
            <AnimatedSection className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-purple-500 inline-block" />
                More Projects
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {extraProjects.map((p, i) => <FeaturedProjectCard key={p.name} project={p} index={i} />)}
            </div>

            {/* Dynamic GitHub repos */}
            {dynamicRepos.length > 0 && (
              <>
                <AnimatedSection className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-1 h-5 rounded-full bg-cyan-500 inline-block" />
                    Open Source on GitHub
                    <span className="text-sm font-normal text-slate-400 ml-2">Live from API</span>
                  </h2>
                </AnimatedSection>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dynamicRepos.map((r, i) => <RepoCard key={r.id} repo={r} index={i} />)}
                </div>
              </>
            )}

            <AnimatedSection className="text-center mt-14">
              <a
                href="https://github.com/Var6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white/5 hover:bg-slate-800 dark:hover:bg-white/10 text-white text-sm font-semibold border border-slate-700 dark:border-white/10 transition-all duration-200"
              >
                View All on GitHub ↗
              </a>
            </AnimatedSection>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
