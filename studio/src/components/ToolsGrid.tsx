import { useLayoutEffect, useRef } from 'react'
import { TOOL_CARDS } from '../data/toolsCards'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { usePrefersReducedMotion } from '../providers/SmoothScroll'
import { ToolCard } from './ToolCard'

export function ToolsGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll<HTMLElement>('.tool-card')
    if (!cards.length) return

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(cards, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set(cards, { autoAlpha: 0, y: 24 })

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.08,
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
    <section
      id="tools"
      ref={sectionRef}
      className="bg-paper px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-display text-ink">Tools or toys? Both.</h2>
          <div className="mt-6 text-lg text-neutral-800">
            <p>Make videos, images, 3D models, comics,</p>
            <p>or anything else you dream up.</p>
          </div>
          <a href="#learn" className="btn-lime mt-8">
            Get the app
          </a>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(140px,1fr)]">
          {TOOL_CARDS.map((card) => (
            <ToolCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
