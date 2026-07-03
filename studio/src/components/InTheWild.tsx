const CASES = [
  { title: 'Product launch', tag: 'Pin + scrub' },
  { title: 'Agency reel', tag: 'Parallax' },
  { title: 'Editorial story', tag: 'Split text' },
] as const

export function InTheWild() {
  return (
    <section id="wild" className="bg-ink py-28 text-paper">
      <div className="mx-auto max-w-6xl px-6">
        <p className="section-eyebrow mb-4 text-coral">Showcase</p>
        <h2 className="text-display">In the wild</h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/60">
          Case studies and live references will populate this band.
        </p>

        <ul className="mt-14 grid gap-4 sm:grid-cols-3">
          {CASES.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-paper/10 bg-paper/5 p-6 backdrop-blur-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-lime">
                {item.tag}
              </span>
              <p className="mt-3 text-lg font-semibold">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
