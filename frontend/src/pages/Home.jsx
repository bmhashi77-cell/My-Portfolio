import { useQuery } from '@tanstack/react-query'
import Hero from '../components/Hero'
import ServicesSection from '../components/ServicesSection'
import { fetchProjects } from '../api/projectsApi'
import { sampleProjects } from '../data/sample'
import { Link } from 'react-router-dom'

const Home = () => {
  const { data, isLoading } = useQuery({ queryKey: ['projects', { limit: 3 }], queryFn: () => fetchProjects({ limit: 3 }) })
  const projects = data?.items || sampleProjects.slice(0, 3)

  return (
    <div className="space-y-16">
      <Hero />
      <section className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-primary">Featured work</p>
            <h2 className="text-2xl font-bold">Recent Projects</h2>
          </div>
          <Link to="/projects" className="text-sm font-semibold text-primary">
            View all ?
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {isLoading && <p className="text-muted-foreground">Loading projects...</p>}
          {!isLoading &&
            projects.map((project) => (
              <div key={project._id || project.slug} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {(project.techStack || []).map((tech) => (
                    <span key={tech} className="rounded-full bg-muted px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-3 text-sm">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-primary">
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-primary">
                      Live
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>
      <ServicesSection />
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl bg-primary text-white p-10 md:p-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide">Let’s build together</p>
            <h3 className="text-2xl font-bold">Have a project in mind?</h3>
            <p className="text-white/80">I respond in under 24 hours. Share a brief and let's start.</p>
          </div>
          <Link
            to="/contact"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg shadow-black/10"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
