"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // default to true to avoid flash

  // Dot follows instantly
  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28 });
  // Ring lags behind
  const ringX = useSpring(mouseX, { stiffness: 100, damping: 18 });
  const ringY = useSpring(mouseY, { stiffness: 100, damping: 18 });

  useEffect(() => {
    // Only show custom cursor on fine-pointer (non-touch) devices
    const fine = window.matchMedia("(pointer: fine)").matches;
    setIsTouch(!fine);
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]")) {
        setHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]")) {
        setHovering(false);
      }
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-indigo-500"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: clicking ? 6 : hovering ? 10 : 8,
          height: clicking ? 6 : hovering ? 10 : 8,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "#a855f7" : "#6366f1",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border-2 border-indigo-400"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: clicking ? 28 : hovering ? 44 : 36,
          height: clicking ? 28 : hovering ? 44 : 36,
          opacity: visible ? (hovering ? 0.6 : 0.3) : 0,
          borderColor: hovering ? "#a855f7" : "#818cf8",
          scale: clicking ? 0.85 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
