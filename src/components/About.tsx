"use client";

import { MapPin, Calendar, Code2, Users } from "lucide-react";

const stats = [
  { icon: Code2, label: "Projects Shipped", value: "8+" },
  { icon: Calendar, label: "Years Experience", value: "6+" },
  { icon: Users, label: "Happy Clients", value: "10+" },
  { icon: MapPin, label: "Location", value: "Patna, IN" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0d0d16]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left — text */}
          <div className="flex-1">
            <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
              About Me
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Turning ideas into{" "}
              <span className="gradient-text">real products</span>
            </h2>

            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I&apos;m <strong className="text-slate-200">Rishabh Ranjan</strong>, a
                full-stack web developer based in Patna, India. Since 2019 I&apos;ve
                been crafting web applications that are fast, accessible, and a
                pleasure to use.
              </p>
              <p>
                My stack of choice is{" "}
                <span className="text-indigo-400 font-medium">
                  Next.js + TypeScript + Tailwind CSS
                </span>{" "}
                on the front end, with Node/Express or serverless functions on
                the back end. I&apos;ve shipped everything from SaaS billing dashboards
                and travel booking platforms to mobile apps built in React Native.
              </p>
              <p>
                As a freelancer I love working directly with founders and small
                teams to take a product from concept to launch — fast.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors duration-200"
            >
              Let&apos;s Work Together
            </a>
          </div>

          {/* Right — stats grid */}
          <div className="flex-1 grid grid-cols-2 gap-5">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="card-hover bg-white/3 border border-white/8 rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                  <Icon size={20} className="text-indigo-400" />
                </div>
                <p className="text-3xl font-extrabold text-white">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
