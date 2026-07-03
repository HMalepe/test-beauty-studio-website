export function PlayToLearn() {
  return (
    <section id="learn" className="mx-auto max-w-6xl px-6 py-28">
      <div className="rounded-[2rem] border border-offwhite bg-offwhite/40 p-8 sm:p-12 lg:p-16">
        <p className="section-eyebrow mb-4">Interactive</p>
        <h2 className="text-display">Play to learn</h2>
        <p className="section-copy mt-5">
          Sandbox controls and live previews — drop interactive demos in this
          panel when the curriculum is defined.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {['Scrub', 'Pin', 'Snap'].map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-2xl border border-ink/10 bg-paper px-5 py-8 text-left text-sm font-bold transition hover:border-lime hover:bg-lime/10"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-ink/40">
                Demo
              </span>
              <span className="mt-2 block text-lg">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
