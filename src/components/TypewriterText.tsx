"use client";
import { useState, useEffect } from "react";

const phrases = [
  "Full-Stack Developer",
  "Next.js & React Expert",
  "Freelance Engineer",
  "UI/UX Enthusiast",
  "AI Integrations Builder",
];

export default function TypewriterText() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((i) => i + 1);
      }, 60);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((i) => i - 1);
      }, 32);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }
  }, [charIdx, deleting, phraseIdx]);

  return (
    <span className="gradient-text inline-block min-h-[1.2em]">
      {displayed}
      <span className="animate-pulse text-indigo-500 dark:text-indigo-400">|</span>
    </span>
  );
}
