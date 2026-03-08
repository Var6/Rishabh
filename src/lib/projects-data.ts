export type FeaturedProject = {
  name: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl: string;
  badge?: string;
  color: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "CSC Travels",
    description: "A full-featured travel booking platform with real-time availability, booking management, and complete payment flow.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://csctravels.vercel.app",
    githubUrl: "https://github.com/Var6/CSCTravels",
    badge: "Live",
    color: "indigo",
  },
  {
    name: "Citizen IMF",
    description: "Government-grade citizen management portal with authentication, dashboards, and comprehensive data management.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://citizen-imf.vercel.app",
    githubUrl: "https://github.com/Var6/CitizenIMF",
    badge: "Live",
    color: "purple",
  },
  {
    name: "CSC Billing",
    description: "SaaS billing & invoicing dashboard for small businesses with real-time billing, PDF exports, and client management.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://csc-billing.vercel.app",
    githubUrl: "https://github.com/Var6/CSCBilling",
    badge: "Live",
    color: "cyan",
  },
];

export const extraProjects: FeaturedProject[] = [
  {
    name: "Shemford Web",
    description: "Professional school/institution website with modern UI, event listings, admissions flow, and content management.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://shemford-web.vercel.app",
    githubUrl: "https://github.com/Var6/ShemfordWeb",
    badge: "Live",
    color: "purple",
  },
  {
    name: "HRM System",
    description: "Human Resource Management system with employee records, attendance tracking, leave management, and RBAC.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    githubUrl: "https://github.com/Var6/HRM",
    color: "cyan",
  },
  {
    name: "Citizen Jaivik",
    description: "React Native mobile app for organic produce marketplace, farmer connections, and government schemes.",
    tech: ["React Native", "TypeScript", "Expo"],
    githubUrl: "https://github.com/Var6/CitizenJaivikMobileApp",
    badge: "Mobile",
    color: "indigo",
  },
  {
    name: "AI Camera System",
    description: "AI-powered camera for real-time object detection, face recognition, and intelligent video analytics.",
    tech: ["Python", "Computer Vision", "AI/ML"],
    githubUrl: "https://github.com/Var6/Ai_Camera",
    badge: "AI",
    color: "purple",
  },
  {
    name: "Lan Convo",
    description: "Local network messaging app enabling real-time communication between devices on the same LAN.",
    tech: ["TypeScript", "WebSockets", "Next.js"],
    githubUrl: "https://github.com/Var6/Lan-Convo",
    color: "cyan",
  },
];
