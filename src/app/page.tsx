import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { fetchGitHubProfile, fetchAllRepos, totalStars, repoStatsMap } from "@/lib/github";
import { featuredProjects, extraProjects } from "@/lib/projects-data";
import type { GitHubRepo } from "@/lib/github";

function repoName(githubUrl: string) {
  return githubUrl.split("/").pop()?.toLowerCase() ?? "";
}

export default async function Home() {
  const [profile, allRepos] = await Promise.all([
    fetchGitHubProfile(),
    fetchAllRepos(),
  ]);

  const statsMap = repoStatsMap(allRepos);

  const githubStats = profile
    ? { repos: profile.public_repos, followers: profile.followers, stars: totalStars(allRepos) }
    : undefined;

  // Recent repos for the Projects section (exclude portfolio + curated)
  const knownNames = [...featuredProjects, ...extraProjects].map((p) =>
    p.name.toLowerCase().replace(/\s/g, "")
  );
  const dynamicRepos: GitHubRepo[] = allRepos
    .filter((r) => !knownNames.includes(r.name.toLowerCase().replace(/\s/g, "")) && r.name !== "portfolio")
    .slice(0, 6);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About githubStats={githubStats} />
      <Services />
      <Projects
        repos={dynamicRepos}
        statsMap={statsMap}
      />
      <Contact />
      <Footer />
    </main>
  );
}
