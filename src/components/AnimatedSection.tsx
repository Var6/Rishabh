"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const initial =
    direction === "up"
      ? { opacity: 0, y: 40 }
      : direction === "left"
      ? { opacity: 0, x: -40 }
      : direction === "right"
      ? { opacity: 0, x: 40 }
      : { opacity: 0 };

  const mobileOffset = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [0, -18] : direction === "right" ? [0, 18] : [0, -22]
  );

  return (
    <motion.div
      className={className}
      style={shouldReduceMotion ? undefined : { y: mobileOffset }}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
