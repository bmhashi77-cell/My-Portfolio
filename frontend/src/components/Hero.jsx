import { motion } from 'framer-motion'
import { ArrowDownToLine, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-primary/5 via-background to-background py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
            <Sparkles className="h-4 w-4" /> Available for freelance / remote
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Hi, I'm <span className="text-primary">Shirwac</span> � Full-Stack Developer
          </h1>
          <p className="text-lg text-muted-foreground">
           I am an developer 
           who is passionate about technology and innovation. 
           I enjoy programming, web development, and creating 
           digital solutions that solve real-life problems. 
           My goal is to use my skills to support digital growth 
           in my community and contribute to the development of my country.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30"
            >
              Hire Me
            </Link>
            <a
              href="/cv.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold"
            >
              <ArrowDownToLine className="h-4 w-4" /> Download CV
            </a>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1">React</span>
            <span className="rounded-full bg-muted px-3 py-1">Node.js</span>
            <span className="rounded-full bg-muted px-3 py-1">MongoDB</span>
            <span className="rounded-full bg-muted px-3 py-1">Tailwind</span>
            <span className="rounded-full bg-muted px-3 py-1">DevOps</span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-card shadow-2xl">
            <img src="/assets/b.png" alt="Profile" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
