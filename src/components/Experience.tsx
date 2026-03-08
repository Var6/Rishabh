"use client";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

type ExperienceItem = {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  type: "work" | "education";
  description: string;
  highlights: string[];
  tech: string[];
};

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Full-Stack Developer & Freelancer",
    company: "Self-Employed",
    period: "2019 – Present",
    location: "Patna, Bihar, India",
    type: "work",
    description:
      "Building production-grade web and mobile applications for clients across India. Delivered 8+ projects including travel booking platforms, government portals, billing SaaS, school websites, and more.",
    highlights: [
      "Built CSC Travels — full-featured travel booking platform with real-time availability",
      "Developed Citizen IMF — government-grade citizen management portal",
      "Created CSC Billing — SaaS billing & invoicing dashboard for SMBs",
      "Delivered Shemford Web — professional institution website with admissions flow",
      "Built HRM System with PostgreSQL, Prisma, and role-based access control",
      "Developed Citizen Jaivik Mobile App using React Native + Expo",
    ],
    tech: ["Next.js", "TypeScript", "React Native", "PostgreSQL", "Node.js", "Tailwind CSS", "Prisma", "Vercel"],
  },
  {
    id: 2,
    role: "AI / Computer Vision Projects",
    company: "Personal Research",
    period: "2022 – Present",
    location: "Remote",
    type: "work",
    description:
      "Explored AI and computer vision technologies, building an AI-powered camera system for object detection, face recognition, and intelligent video analytics using Python and OpenCV.",
    highlights: [
      "Built AI Camera System — real-time object detection with OpenCV",
      "Implemented face recognition and video analytics pipeline",
      "Integrated computer vision with web dashboards via REST APIs",
    ],
    tech: ["Python", "OpenCV", "Computer Vision", "REST API", "AI/ML"],
  },
  {
    id: 3,
    role: "B.Tech — Computer Science Engineering",
    company: "Engineering College, Bihar",
    period: "2019 – 2023",
    location: "Bihar, India",
    type: "education",
    description:
      "Studied Computer Science with a focus on software engineering, algorithms, data structures, and web technologies. Started freelancing professionally during the second year.",
    highlights: [
      "Specialization in Web Technologies and Software Engineering",
      "Active participant in coding competitions and hackathons",
      "Started freelance career during sophomore year",
      "Graduated with Computer Science degree",
    ],
    tech: ["C++", "Python", "Java", "DSA", "DBMS", "OS", "Networking"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24 section-base">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-14">
          <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            My <span className="gradient-text">journey</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto text-sm sm:text-base">
            6+ years of building real products — from college projects to production SaaS.
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent opacity-30" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <AnimatedSection key={exp.id} delay={i * 0.12} direction="left">
                <div className="relative pl-14 sm:pl-20">
                  {/* Icon bubble */}
                  <div className={`absolute left-0 sm:left-3 top-1 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10
                    ${exp.type === "work"
                      ? "bg-indigo-100 dark:bg-indigo-600/20 border-indigo-300 dark:border-indigo-500"
                      : "bg-purple-100 dark:bg-purple-600/20 border-purple-300 dark:border-purple-500"
                    }`}>
                    {exp.type === "work"
                      ? <Briefcase size={16} className="text-indigo-600 dark:text-indigo-400" />
                      : <GraduationCap size={16} className="text-purple-600 dark:text-purple-400" />
                    }
                  </div>

                  <div className="card-bg rounded-2xl p-5 sm:p-7 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">{exp.role}</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
                          <Calendar size={12} />
                          {exp.period}
                        </div>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{exp.location}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{exp.description}</p>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-4">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 flex-shrink-0 mt-1.5" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-400 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
