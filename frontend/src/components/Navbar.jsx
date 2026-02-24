import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../providers/ThemeProvider'
import { useAuth } from '../providers/AuthProvider'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-[#0f1113]/80 border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold tracking-tight">
          <span className="text-primary">
            {/* <img src="./assets/shirwac.png" alt="Logo" className=" w-40" /> */}
            <h1 className='text-3xl'>Shirwac <span className='text-[#0f1113]'>ICT</span></h1>
            </span> 
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition hover:text-primary ${isActive ? 'text-primary' : 'text-foreground'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {user && (
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'text-primary' : 'text-foreground')}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-muted"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {user ? (
            <button
              onClick={logout}
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow md:inline-flex"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow md:inline-flex"
            >
              Hire Me
            </Link>
          )}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4">
          <div className="flex flex-col gap-3 py-3">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-semibold hover:bg-muted ${isActive ? 'bg-muted text-primary' : ''}`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-semibold hover:bg-muted ${isActive ? 'bg-muted text-primary' : ''}`
                }
                onClick={() => setOpen(false)}
              >
                Admin
              </NavLink>
            )}
            <button
              onClick={() => {
                toggleTheme()
                setOpen(false)
              }}
              className="rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-muted"
            >
              Theme: {theme === 'dark' ? 'Dark' : 'Light'}
            </button>
            {user ? (
              <button onClick={logout} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white text-center"
                onClick={() => setOpen(false)}
              >
                Hire Me
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
