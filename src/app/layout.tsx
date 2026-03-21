import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const BASE_URL = "https://var6.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Rishabh Ranjan — Full-Stack Developer & Freelancer",
    template: "%s | Rishabh Ranjan",
  },
  description:
    "Rishabh Ranjan is a full-stack web & mobile developer from Patna, India with 6+ years of experience. Specialising in React, Next.js, TypeScript, and React Native. Available for freelance projects worldwide.",
  keywords: [
    "Rishabh Ranjan",
    "full-stack developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "React Native developer",
    "mobile app developer",
    "freelance developer India",
    "freelance developer Patna",
    "hire developer",
    "SaaS developer",
    "AI integration developer",
  ],
  authors: [{ name: "Rishabh Ranjan", url: BASE_URL }],
  creator: "Rishabh Ranjan",
  publisher: "Rishabh Ranjan",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    firstName: "Rishabh",
    lastName: "Ranjan",
    username: "Var6",
    gender: "male",
    title: "Rishabh Ranjan — Full-Stack Developer & Freelancer",
    description:
      "Full-stack web & mobile developer from Patna, India. 6+ years building React, Next.js, and TypeScript products. Available for freelance work.",
    url: BASE_URL,
    siteName: "Rishabh Ranjan Portfolio",
    locale: "en_US",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/51540591?v=4",
        width: 400,
        height: 400,
        alt: "Rishabh Ranjan — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Ranjan — Full-Stack Developer & Freelancer",
    description:
      "Full-stack web & mobile developer from Patna, India. Building fast, modern web apps with React, Next.js & TypeScript.",
    images: ["https://avatars.githubusercontent.com/u/51540591?v=4"],
    creator: "@Rishabh_stark",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <head />
      <body className="antialiased bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rishabh Ranjan",
              url: BASE_URL,
              image: "https://avatars.githubusercontent.com/u/51540591?v=4",
              jobTitle: "Full-Stack Developer & Freelancer",
              description:
                "Full-stack web and mobile developer with 6+ years of experience building React, Next.js, TypeScript, and React Native applications. Based in Patna, India, working with clients worldwide.",
              email: "rishabhranjan6626@gmail.com",
              telephone: "+91-73525-69099",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Patna",
                addressRegion: "Bihar",
                addressCountry: "IN",
              },
              sameAs: [
                "https://github.com/Var6",
                "https://www.linkedin.com/in/rishabhranjan6626/",
                "https://www.instagram.com/Rishabh_stark",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "React Native",
                "Node.js",
                "PostgreSQL",
                "Tailwind CSS",
                "Full-Stack Development",
                "Mobile App Development",
                "SaaS Development",
                "AI Integration",
              ],
            }),
          }}
        />
        <ClientProviders />
        {children}
      </body>
    </html>
  );
}
