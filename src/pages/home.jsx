import React from "react";
import Hero from "@/components/Hero/Hero";
import VideoHoverPreview from "@/components/VideoLoop/VideoLoop";
import ContactUs from "@/components/ContactUs/ContactUs";
import projects from "@/data/projects";
import ScrollingText from '@/components/ScrollingText/ScrollingText';

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

export default function Home() {
  const featuredProjects = [...projects].sort((a, b) => a.order - b.order).slice(0, 3); 

  return (
    <main className="p-8">
      <Hero title="" width="32%" videoSrc="/videos/videoplayback.mp4" />
      <ScrollingText />

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
      <div className="container">
  <button
    className="primary-btn"
    onClick={() => window.location.href = "/portfolio"}
  >
    Ver <span>Todos</span>
  </button>
</div>
    </main>
  );
}
