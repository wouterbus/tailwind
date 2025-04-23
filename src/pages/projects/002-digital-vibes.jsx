import React from "react";
import Hero from "../../components/Hero";
import VideoHoverPreview from "../../components/VideoLoop/VideoLoop";
import projects from "../../data/projects";

export default function ProjectPage2() {
  // Find the matching project (by its filename slug or ID)
  const project = projects.find(p => p.id === '001-reel-forasteira');

  if (!project) return <div className="text-white p-8">Project not found.</div>;

  return (
    <main className="p-8">
      <Hero
        title={project.title}
        width="180"
        logoSrc="/logo-horizontal.svg"
        videoSrc={project.videoSrc}
      />

      <section className="mt-12">
        <h2 className="text-2xl text-white mb-4">{project.title}</h2>
        <p className="text-white">{project.description}</p>

        <div className="mt-8">
          <VideoHoverPreview
            videoSrc={project.videoSrc}
            fullProjectLink={project.fullProjectLink}
            thumbnailAlt={project.thumbnailAlt}
            headline={project.title}
            customWidth={project.customWidth}
            aspectRatio={project.aspectRatio}
          />
        </div>
      </section>
    </main>
  );
}
