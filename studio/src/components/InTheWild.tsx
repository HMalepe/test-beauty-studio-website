import { useLayoutEffect, useRef } from 'react'
import { WILD_SHOWCASE_CARDS } from '../data/wildShowcase'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { usePrefersReducedMotion } from '../providers/SmoothScroll'
import { BeforeAfterCard, VideoCreatorCard } from './WildShowcaseCard'

export function InTheWild() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll<HTMLElement>('.wild-card')
    if (!cards.length) return

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(cards, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set(cards, { autoAlpha: 0, y: 28 })

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            overwrite: true,
          })
        },
        start: 'top 85%',
        once: true,
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="wild" ref={sectionRef} className="bg-paper px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-display text-ink">Tinker in the wild</h2>
          <div className="mt-6 text-lg text-neutral-800">
            <p>See what people are making IRL.</p>
            <p>Ideas become projects right on your phone.</p>
          </div>
          <a href="#learn" className="btn-lime mt-8">
            Get the app
          </a>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {WILD_SHOWCASE_CARDS.map((card) =>
            card.type === 'video' ? (
              <VideoCreatorCard key={card.id} card={card} />
            ) : (
              <BeforeAfterCard key={card.id} card={card} />
            ),
          )}
        </div>
      </div>
    </section>
  )
}
