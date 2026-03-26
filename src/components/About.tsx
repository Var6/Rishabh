"use client";
import { MapPin, Calendar, Code2, Star } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

type GitHubStats = {
  repos: number;
  followers: number;
  stars: number;
};

export default function About({ githubStats }: { githubStats?: GitHubStats }) {
  const stats = [
    { icon: Code2, label: "Public Repos", value: githubStats ? `${githubStats.repos}` : "8+" },
    { icon: Calendar, label: "Years Experience", value: "6+" },
    { icon: Star, label: "GitHub Stars", value: githubStats ? `${githubStats.stars}` : "—" },
    { icon: MapPin, label: "Location", value: "Patna, IN" },
  ];
  return (
    <section id="about" className="py-16 sm:py-24 section-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <AnimatedSection className="flex-1 w-full" direction="left">
            <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
              About Me
            </p>
            <h2 className="text-2xl leading-tight sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 sm:mb-6">
              Turning ideas into{" "}
              <span className="gradient-text">real products</span>
            </h2>

            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-[0.95rem] sm:text-base">
              <p>
                I&apos;m <strong className="text-slate-800 dark:text-slate-200">Rishabh Ranjan</strong>, a
                full-stack web developer based in Patna, India. Since 2019 I&apos;ve been crafting
                web applications that are fast, accessible, and a pleasure to use.
              </p>
              <p>
                My stack of choice is{" "}
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">Next.js + TypeScript + Tailwind CSS</span>{" "}
                on the front end, with Node/Express or serverless functions on the back end. I&apos;ve
                shipped SaaS billing dashboards, travel booking platforms, government portals, and
                mobile apps in React Native.
              </p>
              <p>
                As a freelancer I love working directly with founders and small teams to take a
                product from concept to launch — fast and beautifully.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 mt-7 sm:mt-8 w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors duration-200"
            >
              Let&apos;s Work Together
            </a>
          </AnimatedSection>

          {/* Right — stats grid */}
          <div className="flex-1 w-full grid grid-cols-1 min-[420px]:grid-cols-2 gap-4 sm:gap-5">
            {stats.map(({ icon: Icon, label, value }, i) => (
              <AnimatedSection key={label} delay={0.1 * i} direction="up">
                <div className="card-bg rounded-2xl p-5 sm:p-6 flex flex-col gap-3 h-full hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-600/20 flex items-center justify-center">
                    <Icon size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{value}</p>
                  <p className="text-xs sm:text-sm text-slate-500">{label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
