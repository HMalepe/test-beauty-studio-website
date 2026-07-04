import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { DESK_BG } from '../lib/assets'
import { gsap } from '../lib/gsap'
import { prefersNativeScroll } from '../lib/scrollConfig'
import { usePrefersReducedMotion } from '../providers/SmoothScroll'

function AppleIcon() {
  return (
    <svg
      width="22"
      height="26"
      viewBox="0 0 22 26"
      fill="currentColor"
      aria-hidden
      className="shrink-0"
    >
      <path d="M18.54 13.77c-.03-2.87 2.34-4.25 2.45-4.32-1.33-1.95-3.41-2.21-4.15-2.24-1.77-.18-3.45 1.04-4.35 1.04-.9 0-2.29-1.02-3.77-.99-1.94.03-3.72 1.13-4.72 2.87-2.01 3.49-.51 8.66 1.45 11.5.96 1.39 2.1 2.95 3.6 2.89 1.45-.06 2-.94 3.75-.94 1.75 0 2.24.94 3.77.91 1.56-.03 2.54-1.41 3.49-2.81 1.1-1.6 1.55-3.15 1.58-3.23-.04-.02-3.03-1.16-3.06-4.62zM15.28 4.2c.8-.97 1.34-2.32 1.19-3.67-1.15.05-2.54.77-3.37 1.74-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.61-.66 3.4-1.62z" />
    </svg>
  )
}

function GooglePlayIcon() {
  return (
    <svg
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M1.1 1.3c-.4.4-.6 1-.6 1.7v17.9c0 .7.2 1.3.6 1.7l.1.1 10-10v-.3L1.2 1.2l-.1.1z"
        fill="#00C3FF"
      />
      <path
        d="M14.5 14.8 11.2 17.6l-10 5.8c.8.8 1.9 1.2 3 1.1l10.3-6-0.1-.1z"
        fill="#FFBA00"
      />
      <path
        d="M14.5 9.2 11.2 6.4 1.2.6C2 .4 3.1.8 3.9 1.6l10.6 7.6z"
        fill="#FF3A44"
      />
      <path
        d="M14.5 12 21.3 8.1c.7-.4 1.1-1 1.1-1.7s-.4-1.3-1.1-1.7l-6.8-3.9-3.3 2.8 3.3 2.8z"
        fill="#00F076"
      />
    </svg>
  )
}

type StoreButtonProps = {
  href: string
  icon: ReactNode
  lineOne: string
  lineTwo: string
}

function StoreButton({ href, icon, lineOne, lineTwo }: StoreButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 rounded-full bg-[#111111] px-5 py-3 text-paper transition-colors hover:bg-[#1a1a1a]"
    >
      {icon}
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">
          {lineOne}
        </span>
        <span className="text-sm font-semibold">{lineTwo}</span>
      </span>
    </a>
  )
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[min(92vw,520px)]">
      <div className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-ink bg-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,0.45)]">
        <div className="absolute left-1/2 top-3 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-ink" />
        <div className="aspect-[9/19.5] w-full overflow-hidden bg-offwhite">
          <div className="flex h-full flex-col bg-gradient-to-br from-lime via-paper to-coral p-6 pt-12">
            <div className="mb-6 h-3 w-16 rounded-full bg-ink/15" />
            <div className="space-y-3">
              <div className="h-24 rounded-2xl bg-paper/80 shadow-sm" />
              <div className="h-16 rounded-2xl bg-paper/60" />
              <div className="h-16 rounded-2xl bg-paper/60" />
            </div>
            <div className="mt-auto grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-xl bg-lime/80" />
              <div className="aspect-square rounded-xl bg-coral/50" />
              <div className="aspect-square rounded-xl bg-ink/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HEADLINE = 'Follow your spark'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordRefs = useRef<HTMLSpanElement[]>([])
  const subheadingRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const words = wordRefs.current.filter(Boolean)
    const subheading = subheadingRef.current
    const buttons = buttonsRef.current
    const phone = phoneRef.current

    if (!section || !words.length || !subheading || !buttons || !phone) return

    if (reducedMotion) {
      gsap.set([words, subheading, buttons, phone], { opacity: 1, y: 0 })
      return
    }

    const mobile = prefersNativeScroll()
    const yOffset = mobile ? 20 : 36

    gsap.set([words, subheading, buttons, phone], {
      opacity: 0,
      y: yOffset,
      force3D: true,
    })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', force3D: true },
        delay: 0.15,
      })

      tl.to(words, {
        opacity: 1,
        y: 0,
        duration: mobile ? 0.5 : 0.65,
        stagger: mobile ? 0.06 : 0.08,
      })
        .to(
          subheading,
          { opacity: 1, y: 0, duration: mobile ? 0.4 : 0.5 },
          '-=0.3',
        )
        .to(
          buttons,
          { opacity: 1, y: 0, duration: mobile ? 0.45 : 0.55 },
          '-=0.2',
        )
        .to(
          phone,
          { opacity: 1, y: 0, duration: mobile ? 0.55 : 0.65 },
          '-=0.15',
        )
    }, section)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-paper pt-[140px]">
      <div className="mx-auto flex max-w-[min(96vw,1400px)] flex-col items-center px-6 text-center">
        <h1 className="sr-only">{HEADLINE}</h1>

        <p
          aria-hidden
          className="text-hero mx-auto max-w-[min(96vw,1200px)] text-balance text-ink"
        >
          {HEADLINE.split(' ').map((word, index) => (
            <span
              key={`${word}-${index}`}
              ref={(el) => {
                if (el) wordRefs.current[index] = el
              }}
              className="mr-[0.2em] inline-block last:mr-0"
            >
              {word}
            </span>
          ))}
        </p>

        <div
          ref={subheadingRef}
          className="mt-8 max-w-xl text-lg font-normal text-neutral-800 sm:text-xl"
        >
          <p>Everyone can play with AI on Tinker.</p>
          <p>All the tools to get creative. Yours for free.</p>
        </div>

        <div
          ref={buttonsRef}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <StoreButton
            href="#"
            icon={<AppleIcon />}
            lineOne="Download on the"
            lineTwo="App Store"
          />
          <StoreButton
            href="#"
            icon={<GooglePlayIcon />}
            lineOne="Get it on"
            lineTwo="Google Play"
          />
        </div>
      </div>

      <div ref={phoneRef} className="relative mt-16 w-full sm:mt-20">
        <div className="relative min-h-[420px] w-full overflow-hidden sm:min-h-[520px]">
          <img
            src={DESK_BG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-ink/10" aria-hidden />

          <div className="relative px-6 pb-0 pt-10 sm:px-10 sm:pt-14 sm:pb-4">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
