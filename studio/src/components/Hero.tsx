export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6 py-28">
      <div
        className="pointer-events-none absolute -right-16 top-24 size-64 rounded-full bg-lime/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-16 size-48 rounded-full bg-coral/15 blur-3xl"
        aria-hidden
      />

      <p className="section-eyebrow mb-5">Design in motion</p>
      <h1 className="text-display relative max-w-4xl text-balance">
        Scroll-driven experiences that feel{' '}
        <span className="text-coral">effortless</span>.
      </h1>
      <p className="section-copy mt-6 max-w-xl text-lg">
        GSAP, ScrollTrigger, and Lenis — synced, tokenized, and ready for
        pinned scenes, grids, and interactive sections.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a href="#tools" className="btn-primary">
          Explore tools
        </a>
        <a href="#wild" className="btn-ghost">
          See it in the wild
        </a>
      </div>
    </section>
  )
}
