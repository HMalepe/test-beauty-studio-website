const TOOLS = [
  {
    name: 'GSAP',
    desc: 'Timeline choreography for scroll-linked motion.',
    accent: 'bg-lime',
  },
  {
    name: 'ScrollTrigger',
    desc: 'Pin, scrub, and snap sections to the viewport.',
    accent: 'bg-coral',
  },
  {
    name: 'Lenis',
    desc: 'Buttery smooth scrolling synced with GSAP.',
    accent: 'bg-ink',
  },
] as const

export function ToolsGrid() {
  return (
    <section id="tools" className="mx-auto max-w-6xl px-6 py-28">
      <p className="section-eyebrow mb-4">Stack</p>
      <h2 className="text-display">Tools</h2>
      <p className="section-copy mt-5">
        The motion layer is wired — each card is a slot for deeper demos.
      </p>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <article
            key={tool.name}
            className="group rounded-3xl border border-offwhite bg-paper p-8 transition hover:-translate-y-1 hover:border-ink/10 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)]"
          >
            <span
              className={`mb-6 inline-block size-3 rounded-full ${tool.accent}`}
              aria-hidden
            />
            <h3 className="text-xl font-bold tracking-tight">{tool.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">{tool.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
