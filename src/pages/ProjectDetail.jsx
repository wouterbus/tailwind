import { useParams } from "react-router-dom";
import Hero from "@/components/Hero/Hero";
import projects from "@/data/projects";
import "@/pages/ProjectDetail.css";
import HighlightedText from "@/components/HighlightedText/HighlightedText";
import Video from "@/components/Video/Video";
import HorizontalGallery from "@/components/HorizontalGallery/HorizontalGallery";


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
          <div className="video-info title-container">  
            <h1 className="video-title">
              <HighlightedText title={project.title} highlight={project.highlightWord} />
            </h1>
            <div
              className="arrow-down z-60 absolute bottom-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
              onClick={() => {
                document.getElementById("arrow-target")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <img src="/arrow-down.svg" width={60} alt="Scroll down" />
            </div>
          </div>
        }
      />
      
      <div className="text-center p-18 mt-[60px] mb-[60px]">
        <h1>Veja<br /> <span>o Reel do Projeto</span></h1>
      </div>

      <Video videoSrc={project.videoSrc} />

      <section className="description">
        <p>{project.description}</p>


        {project.gallery && project.gallery.length > 0 && (
  <HorizontalGallery images={project.gallery} />
)}

        {project.credits && project.credits.length > 0 && (
          <section className="credits">
            <h1>As pessoas<br /><span>Involvidas</span></h1>
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
