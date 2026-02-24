import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProjects } from '../api/projectsApi'
import { sampleProjects } from '../data/sample'

const Projects = () => {
  const [techFilter, setTechFilter] = useState('all')
  const { data, isLoading, isError } = useQuery({ queryKey: ['projects'], queryFn: () => fetchProjects() })
  const projects = data?.items || sampleProjects

  const filtered = useMemo(() => {
    if (techFilter === 'all') return projects
    return projects.filter((p) => (p.techStack || []).includes(techFilter))
  }, [projects, techFilter])

  const techs = Array.from(new Set(projects.flatMap((p) => p.techStack || [])))

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-primary">Projects</p>
          <h1 className="text-3xl font-bold">Portfolio & case studies</h1>
          <p className="text-muted-foreground">Filtering by tech and ready for detail modals.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <button
            onClick={() => setTechFilter('all')}
            className={`rounded-full border px-4 py-2 ${techFilter === 'all' ? 'bg-primary text-white border-primary' : 'border-border'}`}
          >
            All
          </button>
          {techs.map((tech) => (
            <button
              key={tech}
              onClick={() => setTechFilter(tech)}
              className={`rounded-full border px-4 py-2 ${techFilter === tech ? 'bg-primary text-white border-primary' : 'border-border'}`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <div className="text-muted-foreground">Loading projects...</div>}
      {isError && <div className="text-red-500">Could not load projects. Showing sample data.</div>}
      {filtered.length === 0 && <div className="text-muted-foreground">No projects match this filter yet.</div>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <article key={project._id || project.slug} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              {project.featured && <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">Featured</span>}
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              {(project.techStack || []).map((tech) => (
                <span key={tech} className="rounded-full bg-muted px-3 py-1">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-sm">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-primary">GitHub</a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-primary">Live</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Projects
