"use client";

import { useEffect, useState } from "react";

type SceneConfig = {
  mounted: boolean;
  isMobile: boolean;
  scroll: number;
};

export default function useMobileSceneConfig(): SceneConfig {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px), (pointer: coarse)");

    const updateDeviceState = () => {
      setIsMobile(mediaQuery.matches);
      setMounted(true);
    };

    const onScroll = () => {
      setScroll(window.scrollY);
    };

    updateDeviceState();
    onScroll();

    mediaQuery.addEventListener("change", updateDeviceState);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", updateDeviceState);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { mounted, isMobile, scroll };
}