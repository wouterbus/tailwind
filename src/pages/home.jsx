import Hero from '../components/Hero';
import GradientMap from '../components/GradientMap';
import VideoHoverPreview from '../components/VideoLoop/VideoLoop';

const customGradient = [
  { stop: 0, color: [255, 255, 180] },   // Yellow center
  { stop: 0.5, color: [255, 100, 100] }, // Peachy orange
  { stop: 1, color: [200, 0, 50] }       // Deep red edges
];

export default function Home() {
  const projects = [
    {
      id: 'project',
      videoSrc: '/videos/quemsomos.mp4',
      fullProjectLink: '/portfolio/projectone',
      thumbnailAlt: 'Project 1',
      headline: 'This is the Title of a Project'
    },
    {
        id: 'project',
        videoSrc: '/videos/videoplayback.mp4',
        fullProjectLink: '/portfolio/projecttwo',
        thumbnailAlt: 'Project 2',
        headline: 'This is the Title of a Project'
      },
  ]

  return (
    <main className="p-8">
      <Hero title="" width="32%" videoSrc="/videos/videoplayback.mp4" />
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
