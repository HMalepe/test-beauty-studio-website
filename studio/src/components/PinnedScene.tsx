export function PinnedScene() {
  return (
    <section className="border-y border-offwhite bg-offwhite/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-28 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="section-eyebrow mb-4">Scroll pin</p>
          <h2 className="text-display">Pinned scene</h2>
          <p className="section-copy mt-5">
            A full-bleed pin target for timeline-driven storytelling. Wire
            ScrollTrigger here when the narrative is ready.
          </p>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-offwhite bg-paper shadow-[0_24px_80px_-32px_rgba(0,0,0,0.25)]">
          <div className="absolute inset-0 bg-gradient-to-br from-lime/30 via-paper to-coral/20" />
          <div className="absolute inset-8 rounded-2xl border border-ink/10 bg-paper/60 backdrop-blur-sm" />
          <p className="absolute bottom-6 left-6 text-xs font-semibold uppercase tracking-widest text-ink/40">
            Pin viewport
          </p>
        </div>
      </div>
    </section>
  )
}
