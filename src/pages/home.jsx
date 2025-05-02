import React from "react";
import Hero from '../components/Hero';
import VideoHoverPreview from '../components/VideoLoop/VideoLoop';
import ContactUs from '../components/ContactUs/ContactUs';
import projects from '../data/projects';

const layoutVariants = [
  { width: '40%', marginLeft: '0%' },
  { width: '60%', marginLeft: 'auto' },
  { width: '50%', marginLeft: '10%' },
  { width: '70%', marginLeft: '5%' },
];

export default function Home() {
  const featuredProjects = [...projects].sort((a, b) => a.order - b.order).slice(0, 6); 

  return (
    <main className="p-8">
      <Hero title="" width="32%" videoSrc="/videos/videoplayback.mp4" />

      <div 
      className="video-grid">
  {featuredProjects.map((project, index) => {
    const { width, marginLeft } = layoutVariants[index % layoutVariants.length]; // 🔁 rotate through
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
        />
      </div>
    );
  })}
</div>


      <section id="contact">
        <ContactUs />
      </section>
    </main>
  );
}
