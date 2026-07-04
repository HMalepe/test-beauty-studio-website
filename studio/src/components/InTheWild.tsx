import { useLayoutEffect, useRef } from 'react'
import { WILD_SHOWCASE_CARDS } from '../data/wildShowcase'
import { gsap, ScrollTrigger } from '../lib/gsap'
import {
  getScrollProfile,
  revealIfInView,
} from '../lib/scrollConfig'
import { refreshScrollTriggers } from '../lib/scrollTriggerLifecycle'
import {
  usePrefersReducedMotion,
  useScrollReady,
} from '../providers/SmoothScroll'
import { BeforeAfterCard, VideoCreatorCard } from './WildShowcaseCard'

export function InTheWild() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const scrollReady = useScrollReady()

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || !scrollReady) return

    const cards = section.querySelectorAll<HTMLElement>('.wild-card')
    if (!cards.length) return

    const profile = getScrollProfile()
    const enterStart = profile.mobile ? 'top 92%' : 'top 85%'

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(cards, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set(cards, { autoAlpha: 0, y: profile.mobile ? 20 : 28 })

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: profile.mobile ? 0.55 : 0.7,
            ease: 'power3.out',
            stagger: profile.mobile ? 0.07 : 0.1,
            overwrite: 'auto',
          })
        },
        start: enterStart,
        once: true,
      })

      revealIfInView(cards, profile.mobile ? 0.92 : 0.88)
    }, section)

    requestAnimationFrame(() => refreshScrollTriggers())

    return () => ctx.revert()
  }, [reducedMotion, scrollReady])

  return (
    <section id="wild" ref={sectionRef} className="bg-paper px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-display text-ink">Tinker in the wild</h2>
          <div className="mt-6 text-lg text-neutral-800">
            <p>See what people are making IRL.</p>
            <p>Ideas become projects right on your phone.</p>
          </div>
          <div className="mt-8">
            <a href="#learn" className="btn-lime">
              Get the app
            </a>
          </div>
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
