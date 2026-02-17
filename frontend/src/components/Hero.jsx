import React from "react";

export default function Hero() {
  return (
    <section className="w-full bg-white text-[#0c1630] dark:bg-[#1A1D1E] dark:text-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[36px] border border-[#e7eef6] bg-white dark:border-[#2f3538] dark:bg-[#222628] p-8 md:p-12 lg:p-16 shadow-[0_24px_80px_rgba(12,22,48,0.08)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left content */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e7eef6] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0c1630] dark:bg-[#2f3538] dark:text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Available for consultations
              </span>

              <h1 className="text-2xl font-extrabold leading-tight md:text-3xl lg:text-5xl text-[#0c1630] dark:text-white">
                Bashir &apos; ICT <br />  Building smart,  <span className="text-[#2946b8] dark:text-emerald-400">modern digital solutions.</span>
              </h1>

              <p className="max-w-xl text-lg text-[#3c4a63] dark:text-[#c9d0da]">
                Visionary IT Professional and Technology Leader with expertise in modern web development, system architecture, and digital innovation.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  className="rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/60 hover:bg-emerald-600 transition"
                  type="button"
                >
                  Download CV
                </button>

                <button
                  className="rounded-full border border-[#d2d9e6] px-7 py-3 text-sm font-semibold text-[#0c1630] hover:bg-[#f4f7fb] transition dark:border-[#2f3538] dark:text-white dark:hover:bg-[#2f3538]/60"
                  type="button"
                >
                  +252 61 5835675
                </button>
              </div>
            </div>

            {/* Right image */}
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-[42px] bg-white dark:bg-[#1A1D1E] p-3 shadow-[0_18px_50px_rgba(12,22,48,0.12)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.4)]">
                <img
                src="./assets/b.png"                 
                 alt="Doctor"
                  className="h-[420px] w-[340px] rounded-[32px] object-cover sm:h-[520px] sm:w-[420px]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* subtle overlay border */}
          <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-[#e7eef6] dark:ring-[#2f3538]" />
        </div>
      </div>
    </section>
  );
}
