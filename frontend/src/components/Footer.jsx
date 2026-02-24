import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/40 text-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">[Your Name] — Full-Stack Developer</p>
          <p className="text-muted-foreground">Building fast, secure, delightful web apps.</p>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Link to="https://github.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-primary">
            <Github className="h-5 w-5" />
          </Link>
          <Link to="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="hover:text-primary">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link to="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-primary">
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer