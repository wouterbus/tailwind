import React from "react";
import Hero from "@/components/Hero/HeroClean";
import VideoHoverPreview from "@/components/VideoLoop/VideoLoop";
import projects from "@/data/projects";

const layoutVariants = [
  { width: '70%', marginLeft: '0%' },
  { width: '78%', marginLeft: 'auto' },
  { width: '66%', marginLeft: '10%' },
  { width: '92%', marginLeft: '5%' },
  { width: '74%', marginLeft: '2%' },
  { width: '82%', marginLeft: 'auto' },
  { width: '78%', marginLeft: '3%' },
  { width: '90%', marginLeft: '8%' },
];

export default function Portfolio() {
  const featuredProjects = [...projects].sort((a, b) => a.order - b.order).slice(0, Infinity); 

  return (
    <main className="p-8">
      <Hero title="Portfolio" logoSrc="/logo-horizontal.svg" videoSrc="/videos/quemsomos.mp4" />
      <div 
      className="video-grid">
  {featuredProjects.map((project, index) => {
    const { width, marginLeft } = layoutVariants[index % layoutVariants.length];
    return (
      <div
        key={project.id}
        className="video-container"
        style={{ width, marginLeft }}
      >
        <VideoHoverPreview
          videoSrc={project.videoSrc}
          fullProjectLink={`/projects/${project.id}`}
          title={project.title}
          description={project.description}
          highlightWord={project.highlightWord}
        />
      </div>
    );
  })}
      </div>
    </main>
  );
}
