import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Repo } from "@/components/Projects";

async function getRepos(): Promise<Repo[]> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github.v3+json", "User-Agent": "rishabh-portfolio" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    const res = await fetch("https://api.github.com/users/Var6/repos?sort=updated&per_page=6&type=public", {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(0, 6);
  } catch {
    return [];
  }
}

export default async function Home() {
  const repos = await getRepos();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects repos={repos} />
      <Contact />
      <Footer />
    </main>
  );
}
