import { useParams } from "react-router-dom";
import Hero from "../components/Hero";
import VideoHoverPreview from "../components/VideoLoop/VideoLoop";
import projects from "../data/projects";
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) return <div className="project-detail">Project not found.</div>;

  return (
    <main className="project-detail">
      <Hero
        title={project.title}
        width="180"
        logoSrc="/logo-horizontal.svg"
        videoSrc={project.videoSrc}
      />

      <section className="description">
        <h2>{project.title}</h2>
        <p>{project.description}</p>

        <div className="preview">
          <VideoHoverPreview
            videoSrc={project.videoSrc}
            fullProjectLink={`/projects/${project.id}`}
            thumbnailAlt={project.thumbnailAlt}
            headline={project.title}
            customWidth={project.customWidth}
            aspectRatio={project.aspectRatio}
          />
        </div>

        {project.credits && project.credits.length > 0 && (
          <section className="credits">
            <h3>Credits</h3>
            <ul>
              {project.credits.map((credit, index) => (
                <li key={index}>
                  <span className="role">{credit.role}:</span> {credit.name}
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}
