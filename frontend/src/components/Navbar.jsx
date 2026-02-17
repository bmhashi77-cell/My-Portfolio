import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  MapPinIcon,
  EnvelopeIcon,
  ChevronDownIcon,
  UserCircleIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true); // start in dark mode to showcase #1A1D1E

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <header className="w-full bg-white text-[#0c1630] dark:bg-[#1A1D1E] dark:text-white">
      {/* Top info bar */}
      <div className="bg-[#0A1F44] text-white text-sm dark:bg-[#1A1D1E] border-b border-[#0c1630]/10 dark:border-[#ffffff]/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              Hodan Mogadishu, Somalia
            </span>
            <span className="inline-flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5" />
              bmohamud77@gmail.com
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 text-xs font-semibold hover:bg-white/10 transition"
            >
              English
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 text-xs font-semibold hover:bg-white/10 transition"
            >
              <UserCircleIcon className="h-5 w-5" />
              Login
            </Link>
            <button
              type="button"
              onClick={() => setDark((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 hover:bg-white/10 transition"
            >
              <MoonIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 py-4 md:py-5">
          {/* Logo */}
          <div className="w-44 md:w-48">
            <img src="./assets/logo.png" alt="Logo" className="h-full w-full object-contain" />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-[#0c1630] dark:text-white">
            <Link to="/" className="hover:text-[#2946b8] dark:hover:text-emerald-400 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-[#2946b8] dark:hover:text-emerald-400 transition">
              About
            </Link>
            <Link to="/services" className="hover:text-[#2946b8] dark:hover:text-emerald-400 transition">
              Services
            </Link>
            <Link to="/blog" className="hover:text-[#2946b8] dark:hover:text-emerald-400 transition">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-[#2946b8] dark:hover:text-emerald-400 transition">
              Contact
            </Link>
          </nav>

          {/* CTA */}
          <Link
            to="/contact"
            className="hidden md:inline-flex rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 hover:bg-emerald-600 transition"
          >
             Download CV
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-[#0c1630] hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden px-4 pb-4 space-y-3">
            <Link
              to="/"
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#0c1630] hover:bg-gray-50 dark:text-white dark:hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#0c1630] hover:bg-gray-50 dark:text-white dark:hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#0c1630] hover:bg-gray-50 dark:text-white dark:hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/blog"
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#0c1630] hover:bg-gray-50 dark:text-white dark:hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#0c1630] hover:bg-gray-50 dark:text-white dark:hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => {
                setDark((v) => !v);
                setOpen(false);
              }}
              className="w-full rounded-lg px-3 py-2 text-sm font-semibold text-[#0c1630] hover:bg-gray-50 dark:text-white dark:hover:bg-white/10 text-left"
            >
              Dark mode {dark ? "(On)" : "(Off)"}
            </button>
            <button
              type="button"
              className="w-full rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition"
              onClick={() => setOpen(false)}
            >
               Download CV
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
