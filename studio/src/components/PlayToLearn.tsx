import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { prefersNativeScroll } from '../lib/scrollConfig'
import { PLAY } from '../lib/assets'
import { usePrefersReducedMotion, useScrollReady } from '../providers/SmoothScroll'
import { LazyVideo } from './LazyVideo'

const PHONE_VIDEO =
  'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-social-media-icons-32808-large.mp4'

export function PlayToLearn() {
  const sectionRef = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const scrollReady = useScrollReady()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const phone = phoneRef.current
    if (!section || !phone || !scrollReady) return

    if (reducedMotion) {
      gsap.set(phone, { y: 0, autoAlpha: 1 })
      return
    }

    const mobile = prefersNativeScroll()
    gsap.set(phone, { y: mobile ? 40 : 80, autoAlpha: 0.8 })

    const ctx = gsap.context(() => {
      gsap.to(phone, {
        y: 0,
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'center 60%',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reducedMotion, scrollReady])

  return (
    <section id="learn" ref={sectionRef} className="relative min-h-screen overflow-x-clip bg-coral">
      <img
        src="/play/gold-ring.svg"
        alt=""
        className="pointer-events-none absolute left-1/2 top-0 z-30 w-[min(60vw,260px)] -translate-x-1/2 sm:left-[58%] sm:w-[min(52vw,360px)]"
        loading="lazy"
        decoding="async"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-8 pt-24 sm:px-10 sm:pt-32">
        <div className="flex-1">
          <h2 className="text-play w-full text-ink">Play to learn</h2>
          <div className="mt-10 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xs text-lg text-ink">
              <p>Make, remix, repeat.</p>
              <p>Tinkering builds new skills.</p>
            </div>
            <a href="#learn" className="btn-lime self-start sm:self-auto">Get the app</a>
          </div>
        </div>

        <div ref={phoneRef} className="relative mx-auto mt-8 w-full max-w-[min(88vw,380px)] sm:mt-0 sm:max-w-[min(92vw,420px)]">
          <div className="relative overflow-hidden rounded-[2.25rem] border-[9px] border-ink bg-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,0.45)]">
            <div className="absolute left-1/2 top-2.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
            <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink">
              <LazyVideo src={PHONE_VIDEO} poster={PLAY.phonePoster} />
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-full bg-black/20 blur-xl" aria-hidden />
        </div>
      </div>
    </section>
  )
}
