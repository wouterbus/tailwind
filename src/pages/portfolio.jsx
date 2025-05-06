import React from "react";
import Hero from "@/components/Hero/Hero";
import VideoHoverPreview from "@/components/VideoLoop/VideoLoop";
import projects from "@/data/projects";

export default function Portfolio() {
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <main className="p-8">
      <Hero title="Portfolio" logoSrc="/logo-horizontal.svg" videoSrc="videos/quemsomos.mp4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedProjects.map((p) => (
  <VideoHoverPreview
    key={p.id}
    videoSrc={p.videoSrc}
    fullProjectLink={`/projects/${p.id}`}
    thumbnailAlt={p.thumbnailAlt}
    headline={p.title}
    customWidth={p.customWidth}
    aspectRatio={p.aspectRatio}
  />
))}
      </div>
    </main>
  );
}
