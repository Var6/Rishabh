import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-alt border-t border-slate-200 dark:border-white/5 py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-1 group">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-300 dark:border-indigo-500/50">
                <Image
                  src="https://avatars.githubusercontent.com/u/51540591?v=4"
                  alt="Rishabh Ranjan"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <span className="text-sm font-bold gradient-text tracking-tight">Rishabh Ranjan</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-500 text-xs">
              © {year} Rishabh Ranjan · Built with Next.js & Tailwind CSS
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-3">
            <div className="flex items-center gap-3">
              {[
                { href: "https://github.com/Var6", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/rishabhranjan6626/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://www.instagram.com/Rishabh_stark", icon: Instagram, label: "Instagram" },
                { href: "mailto:rishabhranjan6626@gmail.com", icon: Mail, label: "Email" },
                { href: "tel:+917352569099", icon: Phone, label: "Phone" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2 text-xs text-slate-400">
              <Link href="/about" className="hover:text-indigo-600 dark:hover:text-white transition-colors">About</Link>
              <Link href="/projects" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Projects</Link>
              <Link href="/experience" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Experience</Link>
              <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
