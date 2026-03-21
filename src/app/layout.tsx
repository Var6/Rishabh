import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Rishabh Ranjan — Full-Stack Developer & Freelancer",
  description:
    "Rishabh Ranjan is a full-stack web developer from Patna, India, specialising in React, Next.js and TypeScript. Available for freelance projects.",
  openGraph: {
    title: "Rishabh Ranjan — Full-Stack Developer & Freelancer",
    description: "React & Next.js developer from Patna, India. Building fast, modern web apps.",
    url: "https://var6.github.io",
    siteName: "Rishabh Ranjan Portfolio",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/51540591?v=4",
        width: 400,
        height: 400,
        alt: "Rishabh Ranjan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Ranjan — Full-Stack Developer & Freelancer",
    description: "React & Next.js developer from Patna, India.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f8fafc" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0f" />
      </head>
      <body className="antialiased bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <ClientProviders />
        {children}
      </body>
    </html>
  );
}
