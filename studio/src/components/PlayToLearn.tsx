import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { getScrollProfile } from '../lib/scrollConfig'
import { refreshScrollTriggers } from '../lib/scrollTriggerLifecycle'
import {
  usePrefersReducedMotion,
  useScrollReady,
} from '../providers/SmoothScroll'
import { PLAY } from '../lib/assets'
import { LazyVideo } from './LazyVideo'

const PHONE_VIDEO =
  'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-social-media-icons-32808-large.mp4'

export function PlayToLearn() {
  const sectionRef = useRef<HTMLElement>(null)
  const ringRef = useRef<HTMLImageElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const scrollReady = useScrollReady()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const ring = ringRef.current
    const phone = phoneRef.current
    if (!section || !ring || !phone || !scrollReady) return

    const profile = getScrollProfile()

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(ring, { xPercent: 12, yPercent: 6, rotation: 6, autoAlpha: 1 })
        gsap.set(phone, { y: 0, autoAlpha: 1 })
        refreshScrollTriggers()
        return
      }

      if (profile.mobile) {
        gsap.set(ring, {
          xPercent: 8,
          yPercent: 2,
          rotation: 4,
          autoAlpha: 1,
          force3D: true,
        })
        gsap.set(phone, { y: 48, autoAlpha: 0.88, force3D: true })

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            end: 'center 55%',
            scrub: profile.scrub,
            invalidateOnRefresh: true,
          },
        }).to(phone, { y: 0, autoAlpha: 1, ease: 'none' }, 0)

        return
      }

      gsap.set(ring, {
        xPercent: -10,
        yPercent: -35,
        rotation: -14,
        autoAlpha: 1,
        force3D: true,
      })
      gsap.set(phone, { y: 120, autoAlpha: 0.75, force3D: true })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: profile.scrub,
            invalidateOnRefresh: true,
          },
        })
        .to(
          ring,
          { xPercent: 18, yPercent: 8, rotation: 10, ease: 'none' },
          0,
        )
        .to(phone, { y: 0, autoAlpha: 1, ease: 'none' }, 0)
    }, section)

    requestAnimationFrame(() => refreshScrollTriggers())

    return () => ctx.revert()
  }, [reducedMotion, scrollReady])

  return (
    <section
      id="learn"
      ref={sectionRef}
      className="relative z-10 -mt-12 min-h-screen overflow-x-clip bg-coral sm:-mt-20 md:-mt-24"
    >
      <img
        ref={ringRef}
        src="/play/gold-ring.svg"
        alt=""
        className="play-ring pointer-events-none absolute left-1/2 top-0 z-30 w-[min(70vw,280px)] max-w-full -translate-x-1/2 will-change-transform sm:left-[58%] sm:w-[min(52vw,360px)] motion-reduce:will-change-auto"
        loading="lazy"
        decoding="async"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen flex-col overflow-x-clip px-6 pb-8 pt-24 sm:px-10 sm:pt-32">
        <div className="flex-1">
          <h2 className="text-play text-on-coral w-full text-ink">Play to learn</h2>

          <div className="mt-10 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xs text-lg text-ink">
              <p>Make, remix, repeat.</p>
              <p>Tinkering builds new skills.</p>
            </div>
            <a href="#learn" className="btn-lime self-start sm:self-auto">
              Get the app
            </a>
          </div>
        </div>

        <div
          ref={phoneRef}
          className="play-phone relative mx-auto mt-8 w-full max-w-[min(88vw,380px)] will-change-transform sm:mt-0 sm:max-w-[min(92vw,420px)] motion-reduce:will-change-auto"
        >
          <div className="relative overflow-hidden rounded-[2.25rem] border-[9px] border-ink bg-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,0.45)]">
            <div className="absolute left-1/2 top-2.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
            <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink">
              <LazyVideo
                src={PHONE_VIDEO}
                poster={PLAY.phonePoster}
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-full bg-black/20 blur-xl"
            aria-hidden
          />
        </div>
      </div>
    </section>
  )
}
