import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import InstagramGallery from "@/components/InstagramGallery";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Rishabh Ranjan",
  description: "Learn about Rishabh Ranjan — full-stack developer from Patna, India. Skills, background and more.",
};

async function getInstagramMedia() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/instagram`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.media ?? [];
  } catch {
    return [];
  }
}

export default async function AboutPage() {
  const media = await getInstagramMedia();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Page header */}
        <div className="section-alt py-14 sm:py-20 border-b border-slate-200 dark:border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">About Me</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4">
              The <span className="gradient-text">developer</span> behind the code
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              6+ years of turning ideas into real products. Full-stack engineer, freelancer, and lifelong learner.
            </p>
          </div>
        </div>

        <About />
        <Skills />
        <InstagramGallery media={media} />
      </div>
      <Footer />
    </main>
  );
}
