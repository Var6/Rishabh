import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allProjects } from "@/lib/projects-data";
import ProjectSlugClient from "./ProjectSlugClient";

type Params = { slug: string };

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} — Rishabh Ranjan`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: project.liveUrl
        ? [`https://image.thum.io/get/width/1200/crop/630/${project.liveUrl}`]
        : [],
    },
  };
}

export default async function ProjectSlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <ProjectSlugClient project={project} />
      </div>
      <Footer />
    </main>
  );
}
