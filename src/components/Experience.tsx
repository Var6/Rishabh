"use client";

import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";

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

function ExperienceCard({ exp }: { exp: ExperienceItem }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-white/3 p-5 sm:p-7 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border
            ${exp.type === "work"
              ? "bg-indigo-100 dark:bg-indigo-600/20 border-indigo-200 dark:border-indigo-500/30"
              : "bg-purple-100 dark:bg-purple-600/20 border-purple-200 dark:border-purple-500/30"
            }`}>
            {exp.type === "work"
              ? <Briefcase size={15} className="text-indigo-600 dark:text-indigo-400" />
              : <GraduationCap size={15} className="text-purple-600 dark:text-purple-400" />
            }
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-snug">{exp.role}</h3>
            <p className={`font-semibold text-sm mt-0.5 ${exp.type === "work" ? "text-indigo-600 dark:text-indigo-400" : "text-purple-600 dark:text-purple-400"}`}>
              {exp.company}
            </p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1 ml-12 sm:ml-0 shrink-0">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
            <Calendar size={11} />
            {exp.period}
          </div>
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs">
            <MapPin size={10} />
            {exp.location}
          </div>
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 ml-12">{exp.description}</p>

      {/* Highlights */}
      <ul className="space-y-2 mb-5 ml-12">
        {exp.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${exp.type === "work" ? "bg-indigo-500" : "bg-purple-500"}`} />
            {h}
          </li>
        ))}
      </ul>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5 ml-12">
        {exp.tech.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/8 text-slate-600 dark:text-slate-400 text-xs">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const timelineData = experiences.map((exp) => ({
    title: exp.period.split("–")[0].trim(),
    content: <ExperienceCard exp={exp} />,
  }));

  return (
    <section id="experience" className="section-base overflow-hidden">
      <Timeline data={timelineData} />
    </section>
  );
}
