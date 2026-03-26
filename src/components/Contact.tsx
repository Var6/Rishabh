"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Github, MapPin, Phone, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

    if (!serviceId || !templateId || !publicKey) {
      // Fallback: open mail client
      const subject = encodeURIComponent(form.subject || `Contact from ${form.name}`);
      const body = encodeURIComponent(`Hi Rishabh,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
      window.open(`mailto:rishabhranjan6626@gmail.com?subject=${subject}&body=${body}`);
      setStatus("success");
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const infoCards = [
    {
      icon: <Mail size={18} className="text-indigo-600 dark:text-indigo-400" />,
      label: "Email",
      value: "rishabhranjan6626@gmail.com",
      href: "mailto:rishabhranjan6626@gmail.com",
    },
    {
      icon: <Phone size={18} className="text-green-600 dark:text-green-400" />,
      label: "Phone / WhatsApp",
      value: "+91 73525 69099",
      href: "tel:+917352569099",
    },
    {
      icon: <Linkedin size={18} className="text-blue-600 dark:text-blue-400" />,
      label: "LinkedIn",
      value: "rishabhranjan6626",
      href: "https://www.linkedin.com/in/rishabhranjan6626/",
    },
    {
      icon: <Github size={18} className="text-slate-700 dark:text-slate-300" />,
      label: "GitHub",
      value: "github.com/Var6",
      href: "https://github.com/Var6",
    },
    {
      icon: <MapPin size={18} className="text-cyan-600 dark:text-cyan-400" />,
      label: "Location",
      value: "Patna, Bihar, India",
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 section-base">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-10 sm:mb-14">
          <p className="text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
            Let&apos;s <span className="gradient-text">work together</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Have a project idea or want to hire me? Drop me a message and I&apos;ll get back within 24 hours.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {/* Info sidebar */}
          <AnimatedSection className="lg:col-span-2 flex flex-col gap-3" direction="left">
            {infoCards.map((card) => (
              <div key={card.label} className="card-bg rounded-2xl p-4 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors">
                {card.href ? (
                  <a href={card.href} target={card.href.startsWith("mailto") || card.href.startsWith("tel") ? undefined : "_blank"} rel="noopener noreferrer" className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{card.label}</p>
                      <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">{card.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{card.label}</p>
                      <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">{card.value}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="card-bg rounded-2xl p-4 mt-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Availability</p>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Open to freelance projects
              </div>
              <p className="text-slate-400 text-xs mt-1.5">Response within 24 hours</p>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection className="lg:col-span-3" direction="right">
            <div className="card-bg rounded-2xl p-6 sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 text-center py-10">
                  <CheckCircle size={48} className="text-green-500" />
                  <p className="text-slate-900 dark:text-white font-bold text-xl">Message sent!</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 px-5 py-2 rounded-lg border border-slate-300 dark:border-white/15 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-slate-500 font-semibold mb-2 uppercase tracking-wide">Your Name</label>
                      <input
                        required
                        type="text"
                        name="from_name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 font-semibold mb-2 uppercase tracking-wide">Email Address</label>
                      <input
                        required
                        type="email"
                        name="reply_to"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 font-semibold mb-2 uppercase tracking-wide">Subject</label>
                    <input
                      required
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="Project Inquiry / Freelance Work..."
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-500 font-semibold mb-2 uppercase tracking-wide">Message</label>
                    <textarea
                      required
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about your project..."
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                      <AlertCircle size={15} />
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto sm:self-start inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 glow-indigo"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
