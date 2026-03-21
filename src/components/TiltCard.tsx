"use client";
import { useRef, MouseEvent, ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true); // default true to avoid SSR mismatch

  useEffect(() => {
    setIsTouch(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={isTouch ? undefined : { transition: "transform 0.15s ease", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
