"use client";

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
    badge: "bg-indigo-600/20 text-indigo-400 border-indigo-500/30",
  },
  purple: {
    bar: "bg-purple-500",
    badge: "bg-purple-600/20 text-purple-400 border-purple-500/30",
  },
  cyan: {
    bar: "bg-cyan-500",
    badge: "bg-cyan-600/20 text-cyan-400 border-cyan-500/30",
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Skills
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white">
            What I <span className="gradient-text">bring to the table</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group) => {
            const colors = colorMap[group.color];
            return (
              <div
                key={group.category}
                className="card-hover bg-white/3 border border-white/8 rounded-2xl p-7"
              >
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${colors.badge} mb-6`}
                >
                  {group.category}
                </span>

                <div className="space-y-5">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${colors.bar}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech logos row */}
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind",
            "Node.js",
            "Prisma",
            "PostgreSQL",
            "React Native",
            "Vercel",
            "Git",
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm hover:border-indigo-500/50 hover:text-white transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
