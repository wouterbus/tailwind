import Hero from '../components/Hero';
import VideoHoverPreview from '../components/VideoLoop/VideoLoop';

export default function Home() {
  const projects = [
    {
      id: 'project-one',
      videoSrc: '/videos/quemsomos.mp4',
      fullProjectLink: '/projects/0001-ProjectOne',
      thumbnailAlt: 'Project 1',
      headline: 'Project One',
      customWidth: "60%",
    },
    {
      id: 'project-two',
      videoSrc: '/videos/videoplayback.mp4',
      fullProjectLink: '/portfolio/projecttwo',
      thumbnailAlt: 'Project 2',
      headline: 'Project Two',
      aspectRatio: "16/9",
      customWidth: "40%",
    },
  ];

  return (
    <main className="p-8">
      <Hero title="" width="32%" videoSrc="/videos/videoplayback.mp4" />

      <div className="">
        {projects.map((p) => (
          <VideoHoverPreview 
            key={p.id}
            videoSrc={p.videoSrc}
            fullProjectLink={p.fullProjectLink}
            thumbnailAlt={p.thumbnailAlt}
            headline={p.headline}
            aspectRatio={p.aspectRatio}
            customWidth={p.customWidth}
          />
        ))}
      </div>
    </main>
  );
}
