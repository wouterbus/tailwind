// src/components/ProjectCard.jsx
import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold">{project.title}</h2>
      <p className="text-sm text-gray-600">{project.description}</p>
      <Link to={`/projects/${project.id}`} className="text-blue-500 underline mt-2 block">
        View Project
      </Link>
    </div>
  )
}
