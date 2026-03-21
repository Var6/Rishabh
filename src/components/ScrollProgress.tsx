"use client";
import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9997] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%)",
      }}
    />
  );
}
