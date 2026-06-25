import { Project } from '@/lib/parseProjects'
import Link from 'next/link'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="border border-black/10 rounded-xl overflow-hidden hover:border-black transition-colors cursor-pointer group">
        <div className="aspect-video bg-gray-50 overflow-hidden">
          {project.mediaType === 'video' ? (
            <video
              src={project.media}
              muted
              loop
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <img
              src={project.media}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>
        <div className="p-5">
          <span className="text-xs text-gray-400 uppercase tracking-wide">{project.tag}</span>
          <h3 className="font-bold text-base mt-1">{project.title}</h3>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{project.description}</p>
        </div>
      </div>
    </Link>
  )
}