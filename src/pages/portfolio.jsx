import React from 'react'
import Hero from '../components/Hero'
import VideoHoverPreview from '../components/VideoLoop/VideoLoop'

export default function Portfolio() {
  const projects = [
    {
      id: 'hightlight',
      videoSrc: '/videos/quemsomos.mp4',
      fullProjectLink: '/portfolio/projectone',
      thumbnailAlt: 'Project 1',
      headline: 'This is the Title of a Project'
    },
    {
        id: 'hightlight',
        videoSrc: '/videos/videoplayback.mp4',
        fullProjectLink: '/portfolio/projecttwo',
        thumbnailAlt: 'Project 2',
        headline: 'This is the Title of a Project'
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
