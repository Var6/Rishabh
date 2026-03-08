import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience — Rishabh Ranjan",
  description: "Work history, education and technical experience of Rishabh Ranjan — full-stack developer from Patna, India.",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Header */}
        <div className="section-alt py-14 sm:py-20 border-b border-slate-200 dark:border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">Experience</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4">
              My <span className="gradient-text">journey</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              6+ years building web and mobile products — from college to professional freelancer.
            </p>
          </div>
        </div>

        <Experience />
        <Skills />
      </div>
      <Footer />
    </main>
  );
}
