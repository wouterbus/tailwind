import React from "react";
import Hero from '../components/Hero';
import VideoHoverPreview from '../components/VideoLoop/VideoLoop';
import projects from '../data/projects';

export default function Home() {
  const featuredProjects = [...projects].sort((a, b) => a.order - b.order).slice(0, 2);

  return (
    <main className="p-8">
      <Hero title="" width="32%" videoSrc="/videos/videoplayback.mp4" />
      <div>
        {featuredProjects.map((p) => (
          <VideoHoverPreview
            key={p.id}
            videoSrc={p.videoSrc}
            fullProjectLink={`/projects/${p.id}`} // 👈 dynamic route
            thumbnailAlt={p.thumbnailAlt}
            headline={p.title}
            aspectRatio={p.aspectRatio}
            customWidth={p.customWidth}
          />
        ))}
      </div>
    </main>
  );
}
