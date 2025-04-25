// src/hooks/useProjects.js
import { useEffect, useState } from "react";

export default function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/projects?populate=deep') // or your Strapi domain
      .then(res => res.json())
      .then(data => {
        const formatted = data.data.map(entry => ({
          id: entry.id,
          title: entry.attributes.title,
          videoSrc: entry.attributes.videoSrc,
          thumbnailAlt: entry.attributes.thumbnailAlt,
          fullProjectLink: entry.attributes.fullProjectLink,
          description: entry.attributes.description,
          credits: entry.attributes.credits, // optional, you can map it in the component
        }));
        setProjects(formatted);
      });
  }, []);

  return projects;
}
