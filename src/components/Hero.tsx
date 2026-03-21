"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, ArrowDown, Download } from "lucide-react";
import TypewriterText from "./TypewriterText";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const, delay },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-base">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-400/10 dark:bg-purple-600/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* Text block */}
          <div className="flex-1 text-center lg:text-left w-full">
            <motion.div {...fadeUp(0.1)}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-600/15 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for freelance work
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.2)} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-4">
              Hi, I&apos;m{" "}
              <span className="gradient-text">Rishabh Ranjan</span>
            </motion.h1>

            <motion.p {...fadeUp(0.3)} className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-light mb-4 min-h-[2rem]">
              <TypewriterText />
            </motion.p>

            <motion.p {...fadeUp(0.4)} className="text-slate-500 dark:text-slate-400 text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              I build fast, scalable web applications using{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">React</span>,{" "}
              <span className="text-purple-600 dark:text-purple-400 font-medium">Next.js</span> &amp;{" "}
              <span className="text-cyan-600 dark:text-cyan-400 font-medium">TypeScript</span>.
              Based in Patna, India — working with clients worldwide.
            </motion.p>

            <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10">
              <Link
                href="/projects"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 glow-indigo flex items-center justify-center gap-2"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-300 dark:border-white/15 hover:border-indigo-500 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Mail size={15} />
                Get In Touch
              </Link>
              <a
                href="/Rishabh_Ranjan_CV.pdf"
                download
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-300 dark:border-white/15 hover:border-indigo-500 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Download size={15} />
                Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.6)} className="flex items-center gap-3 justify-center lg:justify-start">
              {[
                { href: "https://github.com/Var6", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/rishabhranjan6626/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://www.instagram.com/Rishabh_stark", icon: Instagram, label: "Instagram" },
                { href: "mailto:rishabhranjan6626@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500/50 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all duration-200"
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Avatar + 3D scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative flex-shrink-0 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
          >
            {/* 3D canvas fills this container */}
            <HeroScene />

            {/* Avatar on top of canvas */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-2 border-indigo-300 dark:border-indigo-500/40 shadow-2xl">
                <Image
                  src="https://avatars.githubusercontent.com/u/51540591?v=4"
                  alt="Rishabh Ranjan"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-8 right-4 bg-white dark:bg-[#13131f] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 shadow-xl text-xs font-semibold text-slate-700 dark:text-slate-300">
                6+ Years Exp.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-center mt-14"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-slate-300 transition-colors"
          >
            <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
            <ArrowDown size={15} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
