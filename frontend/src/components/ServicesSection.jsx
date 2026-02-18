// ServicesSection.jsx
import React from "react";
import {
  Code2,
  Camera,
  Palette,
  Smartphone,
  Video,
  Search,
} from "lucide-react";

const services = [
  {
    title: "WEB DEVELOPMENT",
    icon: Code2,
    desc: "Modern, fast, and responsive websites built for performance and scalability.",
  },
 
  {
    title: "WEB DESIGN",
    icon: Palette,
    desc: "Minimal, modern UI/UX designs that look premium and convert better.",
  },
 
  
  {
    title: "SEO EXPART",
    icon: Search,
    desc: "On-page SEO and performance improvements to help you rank and grow.",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#f5f7fa] py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-wide text-slate-900">
            MY <span className="text-emerald-500 ">SERVICES</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#0A1F44]" />
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group rounded-none border border-slate-300 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-md border border-emerald-500  bg-[#f5f7fa]">
                  <Icon className="h-5 w-5 text-emerald-500 " />
                </div>

                <h3 className="mt-5 text-center text-sm font-extrabold tracking-widest text-slate-900">
                  {s.title}
                </h3>

                <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-6 text-slate-600">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
