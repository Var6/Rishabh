"use client";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const skillGroups = [
  {
    category: "Frontend",
    color: "indigo",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "React Native", level: 75 },
    ],
  },
  {
    category: "Backend & Tools",
    color: "purple",
    skills: [
      { name: "Node.js / Express", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "PostgreSQL / Prisma", level: 75 },
      { name: "Git / GitHub", level: 90 },
      { name: "Vercel / CI-CD", level: 82 },
    ],
  },
  {
    category: "Other",
    color: "cyan",
    skills: [
      { name: "AI / Computer Vision", level: 65 },
      { name: "UI/UX Design", level: 70 },
      { name: "Agile / Scrum", level: 78 },
      { name: "SEO & Performance", level: 72 },
      { name: "Testing (Jest/RTL)", level: 68 },
    ],
  },
];

const colorMap: Record<string, { bar: string; badge: string }> = {
  indigo: {
    bar: "bg-indigo-500",
    badge: "bg-indigo-100 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30",
  },
  purple: {
    bar: "bg-purple-500",
    badge: "bg-purple-100 dark:bg-purple-600/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/30",
  },
  cyan: {
    bar: "bg-cyan-500",
    badge: "bg-cyan-100 dark:bg-cyan-600/20 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30",
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24 section-base">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-14">
          <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
            Skills
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            What I <span className="gradient-text">bring to the table</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {skillGroups.map((group, gi) => {
            const colors = colorMap[group.color];
            return (
              <AnimatedSection key={group.category} delay={gi * 0.1}>
                <div className="card-bg rounded-2xl p-6 sm:p-7 h-full hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${colors.badge} mb-6`}>
                    {group.category}
                  </span>
                  <div className="space-y-5">
                    {group.skills.map((skill, si) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{skill.name}</span>
                          <span className="text-slate-400 dark:text-slate-500 text-xs">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 dark:bg-white/8 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${colors.bar}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: gi * 0.1 + si * 0.06, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Tech pills */}
        <AnimatedSection className="mt-14 flex flex-wrap justify-center gap-2.5" delay={0.3}>
          {["React","Next.js","TypeScript","Tailwind","Node.js","Prisma","PostgreSQL","React Native","Vercel","Git","Python","AI/ML"].map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-white transition-all duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
