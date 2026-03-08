export type TechItem = {
  name: string;
  purpose: string;
};

export type FeaturedProject = {
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  tech: string[];
  techStack: TechItem[];
  liveUrl?: string;
  githubUrl: string;
  badge?: string;
  color: string;
  features: string[];
  architecture: string;
  challenges: string[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "CSC Travels",
    slug: "csc-travels",
    description:
      "A full-featured travel booking platform with real-time availability, booking management, and complete payment flow.",
    fullDescription:
      "CSC Travels is a production-grade travel booking platform built for a real client. It allows users to search and book travel packages, manage their bookings, and complete payments. The platform features an admin dashboard for managing packages, customers, and revenue analytics. Built with a focus on performance and mobile-first responsiveness.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    techStack: [
      { name: "Next.js 14", purpose: "App Router for server-side rendering and page routing, API routes for backend logic" },
      { name: "TypeScript", purpose: "End-to-end type safety across components, API calls, and data models" },
      { name: "Tailwind CSS", purpose: "Utility-first styling with responsive breakpoints and custom design tokens" },
      { name: "Framer Motion", purpose: "Page transitions and micro-interactions for a polished UX" },
      { name: "Vercel", purpose: "Deployment with edge functions and automatic CI/CD from GitHub" },
    ],
    liveUrl: "https://csctravels.vercel.app",
    githubUrl: "https://github.com/Var6/CSCTravels",
    badge: "Live",
    color: "indigo",
    features: [
      "Real-time package availability with dynamic pricing",
      "Multi-step booking flow with validation at each step",
      "Complete payment integration with order confirmation",
      "Admin dashboard with booking management and analytics",
      "Mobile-first responsive design with seamless UX",
      "SEO-optimised pages with Next.js metadata API",
    ],
    architecture:
      "The app uses Next.js App Router with a clear separation between server and client components. Pages that need data fetching (package listings, booking details) are server components that fetch directly from the backend. Interactive UI (booking form, date picker, payment flow) are client components. API routes handle form submissions and payment webhooks. Tailwind CSS handles styling with a custom design system.",
    challenges: [
      "Designing a multi-step booking form that maintains state across navigation without losing user data",
      "Optimising images and package listings for fast initial load while keeping content fresh",
      "Implementing a responsive layout that works equally well on mobile and desktop for a complex booking flow",
    ],
  },
  {
    name: "Citizen IMF",
    slug: "citizen-imf",
    description:
      "Government-grade citizen management portal with authentication, dashboards, and comprehensive data management.",
    fullDescription:
      "Citizen IMF is a government-grade citizen management portal built for administrative use. It provides secure authentication, role-based access control, and comprehensive dashboards for managing citizen records. Officials can perform CRUD operations on citizen data, generate reports, and track application statuses. The system was designed to handle large datasets reliably.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    techStack: [
      { name: "Next.js 14", purpose: "Full-stack framework with App Router, server actions, and API routes" },
      { name: "TypeScript", purpose: "Strict typing for all data models, API responses, and form schemas" },
      { name: "Tailwind CSS", purpose: "Consistent UI components and responsive grid layouts" },
      { name: "NextAuth.js", purpose: "Authentication with session management and role-based guards" },
      { name: "Prisma + PostgreSQL", purpose: "Type-safe ORM for citizen data storage and complex queries" },
    ],
    liveUrl: "https://citizen-imf.vercel.app",
    githubUrl: "https://github.com/Var6/CitizenIMF",
    badge: "Live",
    color: "purple",
    features: [
      "Secure authentication with role-based access control (Admin, Officer, Viewer)",
      "Citizen record management — create, read, update, and soft-delete",
      "Advanced search and filtering across large datasets",
      "Dashboard with real-time stats: total citizens, pending applications, recent activity",
      "Exportable reports in CSV/PDF for government compliance",
      "Audit logs tracking every data modification with timestamps",
    ],
    architecture:
      "Built on Next.js App Router with a layered architecture: presentation (React components), business logic (server actions and API routes), and data (Prisma ORM + PostgreSQL). Authentication is handled by NextAuth.js with custom credential providers. Middleware enforces role-based route protection. Server components handle all data fetching; client components handle interactive forms and real-time updates.",
    challenges: [
      "Implementing fine-grained RBAC where different roles see and can edit different fields",
      "Building performant search and pagination for potentially thousands of citizen records",
      "Ensuring data integrity with soft-deletes and an audit trail for government compliance requirements",
    ],
  },
  {
    name: "CSC Billing",
    slug: "csc-billing",
    description:
      "SaaS billing & invoicing dashboard for small businesses with real-time billing, PDF exports, and client management.",
    fullDescription:
      "CSC Billing is a SaaS product built for small business owners to manage their billing, invoices, and clients from a single dashboard. Users can create professional invoices, track payment status, manage client profiles, and export PDF invoices. The real-time dashboard gives an at-a-glance view of revenue, outstanding payments, and recent transactions.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    techStack: [
      { name: "Next.js 14", purpose: "Full-stack framework with React Server Components and API routes" },
      { name: "TypeScript", purpose: "Type-safe invoice schemas, client models, and API contracts" },
      { name: "Tailwind CSS", purpose: "Professional dashboard UI with data tables and card layouts" },
      { name: "react-pdf", purpose: "Generating professional invoice PDFs entirely in the browser" },
      { name: "Recharts", purpose: "Revenue charts and payment trend visualisations on the dashboard" },
    ],
    liveUrl: "https://csc-billing.vercel.app",
    githubUrl: "https://github.com/Var6/CSCBilling",
    badge: "Live",
    color: "cyan",
    features: [
      "Invoice builder with line items, taxes, discounts, and custom notes",
      "One-click PDF generation and download for any invoice",
      "Client management with contact details and payment history",
      "Real-time dashboard with revenue trends and outstanding balance",
      "Payment status tracking — Draft, Sent, Paid, Overdue",
      "Recurring invoice templates for regular clients",
    ],
    architecture:
      "CSC Billing follows a SaaS architecture with multi-tenant data isolation. Next.js App Router powers both the marketing pages and the authenticated dashboard. The dashboard is split into server components (data tables, stats) and client components (invoice builder, chart interactions). PDF generation happens client-side using react-pdf to avoid server load. The data layer uses server actions for mutations and React Query for client-side cache management.",
    challenges: [
      "Building a flexible invoice line-item editor that calculates totals, taxes, and discounts in real time",
      "Generating pixel-perfect PDFs that match the on-screen invoice preview exactly",
      "Designing a multi-tenant data model that keeps clients and invoices isolated per user",
    ],
  },
];

export const extraProjects: FeaturedProject[] = [
  {
    name: "Shemford Web",
    slug: "shemford-web",
    description:
      "Professional school/institution website with modern UI, event listings, admissions flow, and content management.",
    fullDescription:
      "A professional website for Shemford Group of Schools featuring a modern design with animated sections, event and news listings, an online admissions enquiry flow, and a content management integration. Built to represent the institution's brand with a focus on parents and prospective students.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    techStack: [
      { name: "Next.js 14", purpose: "Static generation for fast page loads and SEO" },
      { name: "TypeScript", purpose: "Type safety across all components and data structures" },
      { name: "Tailwind CSS", purpose: "Institution branding with custom colour palette and typography" },
      { name: "Framer Motion", purpose: "Scroll-reveal animations and hero transitions" },
    ],
    liveUrl: "https://shemford-web.vercel.app",
    githubUrl: "https://github.com/Var6/ShemfordWeb",
    badge: "Live",
    color: "purple",
    features: [
      "Institution homepage with animated hero and school highlights",
      "Academics, facilities, and about pages with rich content",
      "Events and news section with dynamic listings",
      "Online admissions enquiry form with email notification",
      "Mobile-first design optimised for parent audiences",
      "SEO metadata and Open Graph for social sharing",
    ],
    architecture:
      "Statically generated Next.js site with ISR (Incremental Static Regeneration) for event and news pages. Content is managed through a headless CMS integration (or flat file data). Framer Motion handles all scroll animations. The admissions form uses a Next.js API route to send email notifications.",
    challenges: [
      "Balancing a rich, animated design with fast load times for users on mobile connections",
      "Building an admissions form with validation that sends notifications reliably without a backend server",
    ],
  },
  {
    name: "HRM System",
    slug: "hrm-system",
    description:
      "Human Resource Management system with employee records, attendance tracking, leave management, and RBAC.",
    fullDescription:
      "A comprehensive Human Resource Management system built for organisations to manage their entire HR workflow. Features include employee onboarding, attendance tracking with monthly summaries, leave request and approval flows, payroll records, and department management. Role-based access control ensures HR managers, department heads, and employees see different views.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    techStack: [
      { name: "Next.js 14", purpose: "Full-stack framework with App Router and server actions for mutations" },
      { name: "TypeScript", purpose: "Strict typing for HR data models and API contracts" },
      { name: "PostgreSQL", purpose: "Relational database for complex HR data relationships" },
      { name: "Prisma", purpose: "Type-safe ORM with migrations for schema management" },
      { name: "NextAuth.js", purpose: "Authentication with role-based access (HR Admin, Manager, Employee)" },
    ],
    githubUrl: "https://github.com/Var6/HRM",
    color: "cyan",
    features: [
      "Employee directory with profiles, documents, and org chart",
      "Attendance tracking with daily check-in/out and monthly summaries",
      "Leave management — request, approve/reject, and balance tracking",
      "Payroll records with salary history and deduction management",
      "Department and team management with hierarchy view",
      "Role-based access: HR Admin, Department Manager, Employee",
    ],
    architecture:
      "Three-tier architecture: Next.js frontend with server components, server actions for all mutations, and PostgreSQL via Prisma for data. Auth is handled by NextAuth.js with custom RBAC middleware that protects routes and API endpoints based on role. The attendance and leave modules use cron-based scheduled functions for daily/monthly summaries.",
    challenges: [
      "Designing a RBAC system where HR admins see all employees but managers only see their team",
      "Building attendance and leave logic that handles edge cases like half-days, holidays, and carryover balances",
    ],
  },
  {
    name: "Citizen Jaivik",
    slug: "citizen-jaivik",
    description:
      "React Native mobile app for organic produce marketplace, farmer connections, and government schemes.",
    fullDescription:
      "Citizen Jaivik is a React Native mobile app that bridges organic farmers and consumers. Farmers can list their produce, set prices, and manage orders. Consumers can browse certified organic produce, connect directly with farmers, and discover applicable government agricultural schemes. The app focuses on digital inclusion for rural farming communities.",
    tech: ["React Native", "TypeScript", "Expo"],
    techStack: [
      { name: "React Native", purpose: "Cross-platform mobile app running natively on iOS and Android" },
      { name: "Expo", purpose: "Build tooling, OTA updates, and native API access without Xcode/Android Studio" },
      { name: "TypeScript", purpose: "Type-safe components, navigation types, and API models" },
      { name: "React Navigation", purpose: "Stack and tab navigation with deep linking support" },
      { name: "Expo Router", purpose: "File-based routing for consistent navigation patterns" },
    ],
    githubUrl: "https://github.com/Var6/CitizenJaivikMobileApp",
    badge: "Mobile",
    color: "indigo",
    features: [
      "Farmer marketplace — list produce, manage stock, and process orders",
      "Consumer browse — search organic produce by category, location, and certification",
      "Government schemes discovery — relevant agricultural subsidies and programmes",
      "In-app chat between farmers and consumers",
      "Push notifications for order updates and scheme announcements",
      "Offline-first design for users with intermittent connectivity",
    ],
    architecture:
      "Built with Expo Router for file-based navigation. The app follows a feature-based folder structure. API calls are centralised in a services layer with React Query for caching and optimistic updates. Expo SecureStore handles authentication tokens. The offline-first approach uses a local SQLite database synced with the backend when connectivity is available.",
    challenges: [
      "Building an offline-first experience that syncs reliably when connectivity is restored",
      "Designing UI that is usable by farmers with limited smartphone experience, requiring clear iconography and minimal text",
    ],
  },
  {
    name: "AI Camera System",
    slug: "ai-camera-system",
    description:
      "AI-powered camera for real-time object detection, face recognition, and intelligent video analytics.",
    fullDescription:
      "An AI-powered camera system that performs real-time computer vision tasks including object detection, face recognition, and video analytics. Built in Python using OpenCV and deep learning models, the system can process live camera feeds to detect and classify objects, recognise registered faces, and generate analytics about detected events over time.",
    tech: ["Python", "Computer Vision", "AI/ML"],
    techStack: [
      { name: "Python", purpose: "Core language for CV pipeline, model inference, and system orchestration" },
      { name: "OpenCV", purpose: "Video capture, frame processing, drawing bounding boxes and overlays" },
      { name: "YOLOv8", purpose: "Real-time object detection with high accuracy at low latency" },
      { name: "face_recognition", purpose: "Face encoding, comparison, and recognition pipeline" },
      { name: "NumPy", purpose: "Array operations for image manipulation and feature vectors" },
    ],
    githubUrl: "https://github.com/Var6/Ai_Camera",
    badge: "AI",
    color: "purple",
    features: [
      "Real-time object detection with bounding boxes and confidence scores",
      "Face recognition with registration and identification of known faces",
      "Event logging — records detection events with timestamps",
      "Configurable detection zones within the camera frame",
      "Live feed overlay with detected labels and metadata",
      "Analytics dashboard showing detection frequency over time",
    ],
    architecture:
      "The pipeline runs in a loop: capture frame → preprocess → run YOLO inference for objects → run face recognition pipeline → draw overlays → display/log. YOLOv8 is loaded once at startup for efficiency. Face encodings for known individuals are pre-computed and stored. A lightweight SQLite database logs detection events for analytics. The system is designed to run on a Raspberry Pi or laptop.",
    challenges: [
      "Achieving real-time performance (>15fps) on modest hardware by optimising inference batch sizes and skipping frames",
      "Reducing false positives in face recognition by tuning the distance threshold based on lighting conditions",
    ],
  },
  {
    name: "Lan Convo",
    slug: "lan-convo",
    description:
      "Local network messaging app enabling real-time communication between devices on the same LAN.",
    fullDescription:
      "Lan Convo is a zero-configuration messaging app that lets devices on the same local area network discover each other and exchange messages in real time, with no internet connection required. It uses WebSockets for instant delivery and broadcasts peer discovery messages so users can see who is online on the network automatically.",
    tech: ["TypeScript", "WebSockets", "Next.js"],
    techStack: [
      { name: "Next.js", purpose: "Web frontend and API routes; custom server for WebSocket integration" },
      { name: "TypeScript", purpose: "Typed message payloads, peer models, and WebSocket event schemas" },
      { name: "WebSockets (ws)", purpose: "Real-time bidirectional messaging between all connected peers" },
      { name: "UDP Broadcasting", purpose: "Peer discovery — devices announce presence on the LAN automatically" },
    ],
    githubUrl: "https://github.com/Var6/Lan-Convo",
    color: "cyan",
    features: [
      "Automatic peer discovery — no IP addresses or setup required",
      "Real-time messaging with instant delivery via WebSockets",
      "Online/offline status for all peers on the network",
      "Chat rooms visible to all LAN participants",
      "File transfer support for sharing files locally",
      "Works entirely offline — no internet connection needed",
    ],
    architecture:
      "A Next.js app with a custom Node.js server that mounts a WebSocket server alongside the HTTP server. On startup, each instance sends a UDP broadcast to announce itself on the LAN. Other instances receive this and add the peer to their UI. All messages are relayed through the WebSocket server acting as a local hub. No database — all state lives in memory for the session.",
    challenges: [
      "Integrating a WebSocket server with Next.js which normally expects a standard HTTP server",
      "Implementing UDP-based peer discovery that works across different OS network configurations",
    ],
  },
];

export const allProjects: FeaturedProject[] = [...featuredProjects, ...extraProjects];
