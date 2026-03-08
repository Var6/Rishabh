import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Rishabh Ranjan",
  description: "Get in touch with Rishabh Ranjan for freelance work, project inquiries, or just to say hi.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        {/* Header */}
        <div className="section-alt py-14 sm:py-20 border-b border-slate-200 dark:border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">Contact</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4">
              Let&apos;s <span className="gradient-text">work together</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              Available for freelance projects. Drop me a message and I&apos;ll reply within 24 hours.
            </p>
          </div>
        </div>

        <Contact />
      </div>
      <Footer />
    </main>
  );
}
