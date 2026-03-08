"use client";

import { useState } from "react";
import { Mail, Github, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens default mail client with pre-filled body
    const subject = encodeURIComponent(`Freelance Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Rishabh,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`
    );
    window.open(`mailto:rishabhranjandev@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0d0d16]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white">
            Let&apos;s <span className="gradient-text">work together</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            Have a project idea or want to hire me? Drop me a message and I&apos;ll
            get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <InfoCard
              icon={<Mail size={20} className="text-indigo-400" />}
              label="Email"
              value="rishabhranjandev@gmail.com"
              href="mailto:rishabhranjandev@gmail.com"
            />
            <InfoCard
              icon={<Github size={20} className="text-purple-400" />}
              label="GitHub"
              value="github.com/Var6"
              href="https://github.com/Var6"
            />
            <InfoCard
              icon={<MapPin size={20} className="text-cyan-400" />}
              label="Location"
              value="Patna, Bihar, India"
            />

            <div className="bg-white/3 border border-white/8 rounded-2xl p-6 mt-2">
              <p className="text-sm font-semibold text-white mb-2">
                Availability
              </p>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to freelance projects
              </div>
              <p className="text-slate-500 text-xs mt-2">
                Typical response within 24 hours
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white/3 border border-white/8 rounded-2xl p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                <CheckCircle size={48} className="text-green-400" />
                <p className="text-white font-bold text-xl">
                  Your mail client should have opened!
                </p>
                <p className="text-slate-400 text-sm">
                  If not, email me directly at rishabhranjandev@gmail.com
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-4 px-5 py-2 rounded-lg border border-white/15 text-slate-300 hover:text-white text-sm transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200 glow-indigo"
                >
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-sm text-slate-200">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-5 hover:border-indigo-500/30 transition-colors">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
