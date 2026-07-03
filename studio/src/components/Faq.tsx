const FAQ_ITEMS = [
  {
    q: 'What stack powers this project?',
    a: 'Vite, React, TypeScript, Tailwind CSS, GSAP with ScrollTrigger, and Lenis for smooth scrolling.',
  },
  {
    q: 'How does reduced motion work?',
    a: 'When prefers-reduced-motion is enabled, Lenis is disabled and GSAP scroll animations jump to their final states immediately.',
  },
  {
    q: 'Where do design tokens live?',
    a: 'Colors, typography, and the text-display utility are defined in tailwind.config.js and applied across every section.',
  },
] as const

export function Faq() {
  return (
    <section id="faq" className="border-t border-offwhite bg-offwhite/30 py-28">
      <div className="mx-auto max-w-3xl px-6">
        <p className="section-eyebrow mb-4">Support</p>
        <h2 className="text-display">FAQ</h2>

        <dl className="mt-12 divide-y divide-ink/10">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="py-8 first:pt-0 last:pb-0">
              <dt className="text-lg font-bold tracking-tight">{item.q}</dt>
              <dd className="mt-3 leading-relaxed text-ink/65">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
