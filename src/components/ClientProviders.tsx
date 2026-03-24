"use client";
import dynamic from "next/dynamic";

const CustomCursor                  = dynamic(() => import("./CustomCursor"),                  { ssr: false });
const ScrollProgress                = dynamic(() => import("./ScrollProgress"),                { ssr: false });
const BackgroundScene3D             = dynamic(() => import("./BackgroundScene3D"),             { ssr: false });
const BackgroundScene3DRight        = dynamic(() => import("./BackgroundScene3DRight"),        { ssr: false });
const BackgroundScene3DTopLeft      = dynamic(() => import("./BackgroundScene3DTopLeft"),      { ssr: false });
const BackgroundScene3DBottomRight  = dynamic(() => import("./BackgroundScene3DBottomRight"),  { ssr: false });
const PageLoader                    = dynamic(() => import("./PageLoader"),                    { ssr: false });

export default function ClientProviders() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <BackgroundScene3D />
      <BackgroundScene3DRight />
      <BackgroundScene3DTopLeft />
      <BackgroundScene3DBottomRight />
    </>
  );
}
