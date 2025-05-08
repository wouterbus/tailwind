import { useParams } from "react-router-dom";
import Hero from "@/components/Hero/Hero";
import projects from "@/data/projects";
import "@/pages/ProjectDetail.css";
import HighlightedText from "@/components/HighlightedText/HighlightedText";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) return <div className="project-detail">Project not found.</div>;

  return (
    <main className="project-detail">
      <Hero
        logoSrc="/logo-horizontal.svg"
        imageSrc={project.thumbnail}
        highlightWord={project.highlightWord}
        title={
          <div className="video-info">  
          <h1 className="video-title">
            <HighlightedText title={project.title} highlight={project.highlightWord} />
          </h1>
          </div>
        }
      />

      <section className="description">
        <h1>{project.title}</h1>
        <p>{project.description}</p>

        {project.credits && project.credits.length > 0 && (
          <section className="credits">
            <h1>As pessoas<br></br><span>Involvidas</span></h1>
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
