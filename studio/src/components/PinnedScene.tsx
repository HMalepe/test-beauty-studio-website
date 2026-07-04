import { useLayoutEffect, useRef } from 'react'
import { DESK_BG, PINNED, PROMPT_INSPIRATION } from '../lib/assets'
import { gsap } from '../lib/gsap'
import {
  getScrollProfile,
  pinTypeForScrollMode,
} from '../lib/scrollConfig'
import { refreshScrollTriggers } from '../lib/scrollTriggerLifecycle'
import {
  usePrefersReducedMotion,
  useScrollMode,
  useScrollReady,
} from '../providers/SmoothScroll'
import '../pinned-scene.css'

function FeedScreen() {
  return (
    <div className="flex h-full flex-col bg-paper pt-10">
      <div className="px-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-bold">For you</span>
          <span className="rounded-full bg-offwhite px-3 py-1 text-[10px] font-semibold">
            Feed
          </span>
        </div>
        <div className="space-y-3">
          {(
            [
              'linear-gradient(135deg,#CCE60055,#fff)',
              'linear-gradient(135deg,#FF5C5444,#fff)',
              '#E9E9E9',
            ] as const
          ).map((background, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-2xl border border-offwhite bg-paper shadow-sm"
            >
              <div className="h-24" style={{ background }} />
              <div className="space-y-2 p-3">
                <div className="h-2 w-2/3 rounded-full bg-offwhite" />
                <div className="h-2 w-1/2 rounded-full bg-offwhite" />
                {i === 0 && (
                  <p className="pt-1 text-[11px] font-medium text-ink/70">
                    Sneaker sketch → 3D render
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function PromptScreen() {
  return (
    <div className="flex h-full flex-col bg-paper pt-10 text-ink">
      <header className="border-b border-offwhite px-4 pb-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-ink/40">
          Tinker
        </p>
        <p className="text-lg font-bold">Product Generator</p>
      </header>

      <div className="flex-1 space-y-4 px-4 pt-4">
        <label className="block">
          <span className="mb-2 block text-xs font-medium text-ink/50">
            Prompt
          </span>
          <div className="rounded-2xl border border-offwhite bg-offwhite/50 px-4 py-3 text-sm leading-snug">
            Turn this sketch into a white leather sneaker with lime accents…
          </div>
        </label>

        <div>
          <p className="mb-2 text-xs font-medium text-ink/50">
            Inspiration Photos
          </p>
          <div className="flex gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-ink/15 text-xl font-light text-ink/30">
              +
            </div>
            <div className="h-16 w-16 overflow-hidden rounded-xl bg-offwhite">
              <img
                src={PROMPT_INSPIRATION}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-lime/50 to-coral/30" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideScreen() {
  return (
    <div className="relative h-full bg-ink text-paper">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-10 text-xs text-paper/50">
        <span>Preview</span>
        <span>4:3</span>
      </div>

      <div className="absolute inset-x-4 top-24 overflow-hidden rounded-2xl border border-paper/10 bg-paper/5">
        <img
          src={PINNED.result1}
          alt=""
          className="aspect-square w-full object-cover"
        />
      </div>

      <div className="absolute bottom-24 left-4 right-4">
        <div className="flex items-center rounded-full bg-neutral-800 p-1">
          <span className="slide-chip flex h-12 w-16 shrink-0 items-center justify-center rounded-full bg-lime text-lg font-bold text-ink">
            →
          </span>
          <span className="ml-3 text-sm font-medium">Slide to Generate</span>
        </div>
      </div>

      <p className="absolute bottom-10 left-0 right-0 text-center text-xs text-paper/45">
        Save to <span className="text-paper/70">My Projects</span>
      </p>
    </div>
  )
}

export function PinnedScene() {
  const root = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const scrollMode = useScrollMode()
  const scrollReady = useScrollReady()

  useLayoutEffect(() => {
    const el = root.current
    if (!el || !scrollReady) return

    const profile = getScrollProfile()
    const { phoneScale } = profile

    const ctx = gsap.context(() => {
      const phone = el.querySelector<HTMLElement>('.phone')
      const screens = el.querySelectorAll<HTMLElement>('.screen')
      const canvas = el.querySelector<HTMLElement>('.dark-canvas')
      const thumbs = el.querySelectorAll<HTMLElement>('.result-thumb')
      const sketch = el.querySelector<HTMLElement>('.sketch-card')
      const outlines = el.querySelectorAll<HTMLElement>('.outline')

      if (!phone || screens.length < 4 || !canvas || !sketch) return

      const [s1, s2, s3, s4] = screens

      gsap.set(phone, {
        scale: phoneScale.start,
        yPercent: profile.phoneYPercent,
        transformOrigin: '50% 50%',
        force3D: true,
      })
      gsap.set([s2, s3, s4], { autoAlpha: 0 })
      gsap.set(s1, { autoAlpha: 1 })
      gsap.set(canvas, { autoAlpha: 0, scale: 0.94 })
      gsap.set(sketch, { autoAlpha: 0, scale: 0.9 })
      gsap.set(thumbs, { autoAlpha: 0, scale: 0.6 })
      gsap.set(outlines, { '--draw': '0%' } as gsap.TweenVars)

      if (reducedMotion) {
        gsap.set(phone, { autoAlpha: 0 })
        gsap.set(canvas, { autoAlpha: 1, scale: 1 })
        gsap.set(sketch, { autoAlpha: 1, scale: 1 })
        gsap.set(thumbs, { autoAlpha: 1, scale: 1 })
        gsap.set(outlines, { '--draw': '100%' } as gsap.TweenVars)
        requestAnimationFrame(() => refreshScrollTriggers())
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: profile.scrub,
          pin: '.pin-target',
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: profile.anticipatePin,
          fastScrollEnd: profile.fastScrollEnd,
          pinType: pinTypeForScrollMode(scrollMode),
        },
      })

      // Phase 1: phone rises & scales, feed visible
      tl.to(
        phone,
        { scale: phoneScale.mid, yPercent: 0, duration: 1 },
        0,
      )

      // Phase 2: feed → Product Generator
      tl.to(s1, { autoAlpha: 0, duration: 0.45 }, 1)
        .to(s2, { autoAlpha: 1, duration: 0.45 }, 1.05)

      // Phase 3: prompt → Slide to Generate
      tl.to(s2, { autoAlpha: 0, duration: 0.45 }, 2)
        .to(s3, { autoAlpha: 1, duration: 0.45 }, 2.05)

      // Phase 4: expand into dark canvas
      tl.to(phone, { scale: phoneScale.end, duration: 1 }, 3)
        .to([s1, s2, s3], { autoAlpha: 0, duration: 0.3 }, 3)
        .to(s4, { autoAlpha: 1, duration: 0.2 }, 3)
        .to(phone, { autoAlpha: 0, duration: 0.4 }, 3.4)
        .to(canvas, { autoAlpha: 1, scale: 1, duration: 0.6 }, 3.2)
        .to(sketch, { autoAlpha: 1, scale: 1, duration: 0.5 }, 3.4)
        .to(
          thumbs,
          { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.15 },
          3.5,
        )
        .fromTo(
          outlines,
          { '--draw': '0%' } as gsap.TweenVars,
          {
            '--draw': '100%',
            duration: 0.5,
            stagger: 0.12,
            ease: 'power2.out',
          } as gsap.TweenVars,
          3.5,
        )

      // Phase 5: hold the final state so user can appreciate it before scrolling past
      tl.to({}, { duration: 1 }, 4.2)
    }, root)

    requestAnimationFrame(() => refreshScrollTriggers())

    return () => ctx.revert()
  }, [reducedMotion, scrollMode, scrollReady])

  const trackClass = reducedMotion
    ? 'relative min-h-screen w-full'
    : 'pinned-track relative h-[300vh] w-full md:h-[420vh] lg:h-[540vh]'

  return (
    <section
      ref={root}
      className={trackClass}
      aria-label="Phone morphs into AI generation canvas"
    >
      <div
        className="pin-target isolate flex h-[100dvh] min-h-[100svh] w-full items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('${DESK_BG}')` }}
      >
        <div className="phone relative z-10 aspect-[316/587] h-[58vh] max-h-[520px] w-auto rounded-[2.5rem] border-[10px] border-black bg-black shadow-2xl will-change-transform sm:h-[65vh] sm:max-h-[580px] md:h-[70vh] md:max-h-[640px]">
          <div className="absolute left-1/2 top-3 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

          <div className="absolute inset-0 overflow-hidden rounded-[1.9rem]">
            <div className="screen absolute inset-0">
              <FeedScreen />
            </div>
            <div className="screen absolute inset-0">
              <PromptScreen />
            </div>
            <div className="screen absolute inset-0">
              <SlideScreen />
            </div>
            <div className="screen absolute inset-0 bg-black" aria-hidden />
          </div>
        </div>

        <div
          className="dark-canvas absolute inset-0 z-0 bg-[#111111] will-change-transform"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        >
          <div className="sketch-card outline absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-3 shadow-2xl sm:p-4">
            <img
              src={PINNED.sketch}
              alt="Sketch of a sneaker"
              className="h-[min(38vh,280px)] w-auto max-w-full sm:h-[min(46vh,360px)]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="result-thumb outline thumb-a absolute overflow-hidden rounded-xl">
            <img
              src={PINNED.result1}
              alt="Generated sneaker result"
              className="w-24 sm:w-40"
            />
          </div>
          <div className="result-thumb outline thumb-b absolute overflow-hidden rounded-xl">
            <img
              src={PINNED.result2}
              alt="Generated sneaker result"
              className="w-28 sm:w-44"
            />
          </div>
          <div className="result-thumb outline thumb-c absolute overflow-hidden rounded-xl">
            <img
              src={PINNED.result3}
              alt="Generated sneaker result"
              className="w-24 sm:w-40"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
