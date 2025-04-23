import React from 'react'
import Hero from '../components/Hero'
import VideoHoverPreview from '../components/VideoLoop/VideoLoop'

export default function Portfolio() {
    const projects = [
        {
          id: 'project-one',
          videoSrc: '/videos/quemsomos.mp4',
          fullProjectLink: '/projects/0001-ProjectOne',
          thumbnailAlt: 'Project 1',
          headline: 'Project One',
          customWidth: "80%"
        },
        {
          id: 'project-two',
          videoSrc: '/videos/videoplayback.mp4',
          fullProjectLink: '/portfolio/projecttwo',
          thumbnailAlt: 'Project 2',
          headline: 'Project Two',
          aspectRatio: "16/9", // Square layout
          customWidth: "60%"
        },
      ]

  return (
    <main className="p-8">
              <Hero title="Portfolio" width="180" logoSrc="/logo-horizontal.svg" videoSrc="/videos/quemsomos.mp4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <VideoHoverPreview
            headline={p.headline}
            key={p.id}
            videoSrc={p.videoSrc}
            fullProjectLink={p.fullProjectLink}
            thumbnailAlt={p.thumbnailAlt}
          />
        ))}
      </div>
    </main>
  )
}
