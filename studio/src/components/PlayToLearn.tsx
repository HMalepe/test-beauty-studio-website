import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { usePrefersReducedMotion } from '../providers/SmoothScroll'

const PHONE_VIDEO =
  'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-social-media-icons-32808-large.mp4'

export function PlayToLearn() {
  const sectionRef = useRef<HTMLElement>(null)
  const ringRef = useRef<HTMLImageElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [videoReady, setVideoReady] = useState(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const ring = ringRef.current
    const phone = phoneRef.current
    if (!section || !ring || !phone) return

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(ring, { xPercent: 18, yPercent: 8, rotation: 10, autoAlpha: 1 })
        gsap.set(phone, { y: 0, autoAlpha: 1 })
        return
      }

      gsap.set(ring, { xPercent: -10, yPercent: -35, rotation: -14, autoAlpha: 1 })
      gsap.set(phone, { y: 120, autoAlpha: 0.75 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(
          ring,
          {
            xPercent: 18,
            yPercent: 8,
            rotation: 10,
            ease: 'none',
          },
          0,
        )
        .to(
          phone,
          {
            y: 0,
            autoAlpha: 1,
            ease: 'none',
          },
          0,
        )
    }, section)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [reducedMotion])

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="learn"
      ref={sectionRef}
      className="relative -mt-24 min-h-screen overflow-hidden bg-coral"
    >
      <img
        ref={ringRef}
        src="/play/gold-ring.svg"
        alt=""
        className="play-ring pointer-events-none absolute left-[58%] top-0 z-30 w-[min(52vw,360px)] max-w-none -translate-x-1/2 will-change-transform"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-8 pt-28 sm:px-10 sm:pt-32">
        <div className="flex-1">
          <h2 className="text-play w-[110vw] max-w-none -translate-x-[4vw] text-ink">
            Play to learn
          </h2>

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
          className="play-phone relative mx-auto mt-8 w-full max-w-[min(92vw,420px)] will-change-transform sm:mt-0"
        >
          <div className="relative overflow-hidden rounded-[2.25rem] border-[9px] border-ink bg-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,0.45)]">
            <div className="absolute left-1/2 top-2.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
            <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink">
              <video
                ref={videoRef}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                poster="/play/phone-poster.svg"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                onLoadedData={() => setVideoReady(true)}
              >
                <source src={PHONE_VIDEO} type="video/mp4" />
              </video>
              <img
                src="/play/phone-poster.svg"
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
                aria-hidden
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
