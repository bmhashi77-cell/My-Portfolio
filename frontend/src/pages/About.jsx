const skills = ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS', 'React Query', 'Jest', 'Docker']
const experiences = [
  { role: 'Full-Stack Developer', company: 'Freelance', period: '2022 - Present', summary: 'Delivered SaaS dashboards and content platforms end-to-end.' },
  { role: 'Frontend Engineer', company: 'Agency', period: '2020 - 2022', summary: 'Built responsive marketing sites and design systems.' },
]

const About = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase text-primary">About</p>
        <h1 className="text-3xl font-bold">Building products that feel fast and polished</h1>
        <p className="text-muted-foreground">
          I focus on clear architecture, predictable deployment pipelines, and a UX that feels intentional. I love
          pairing with teams, writing docs, and shipping small, frequent releases.
        </p>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full bg-muted px-3 py-1">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Experience highlights</h2>
          <div className="mt-4 space-y-4">
            {experiences.map((exp) => (
              <div key={exp.role} className="rounded-xl border border-border/60 bg-muted/40 p-4">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="text-muted-foreground">{exp.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{exp.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
