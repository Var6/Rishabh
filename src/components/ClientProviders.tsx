"use client";
import dynamic from "next/dynamic";

const CustomCursor      = dynamic(() => import("./CustomCursor"),      { ssr: false });
const ScrollProgress    = dynamic(() => import("./ScrollProgress"),    { ssr: false });
const BackgroundScene3D = dynamic(() => import("./BackgroundScene3D"), { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <BackgroundScene3D />
    </>
  );
}
