import Lenis from '@studio-freight/lenis'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ScrollTrigger, finalizeScrollTriggers } from '../lib/gsap'

const ReducedMotionContext = createContext(false)
const LenisContext = createContext<Lenis | null>(null)

export function usePrefersReducedMotion() {
  return useContext(ReducedMotionContext)
}

export function useLenis() {
  return useContext(LenisContext)
}

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateMotion = () => {
      const prefersReduced = mq.matches
      setReducedMotion(prefersReduced)
      document.documentElement.toggleAttribute(
        'data-reduced-motion',
        prefersReduced,
      )

      if (prefersReduced) {
        finalizeScrollTriggers()
        ScrollTrigger.refresh()
      }
    }

    updateMotion()
    mq.addEventListener('change', updateMotion)
    return () => mq.removeEventListener('change', updateMotion)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    })

    const onRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onRefresh)

    const raf = (time: number) => {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)
    ScrollTrigger.refresh()

    return () => {
      cancelAnimationFrame(rafIdRef.current)
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      ScrollTrigger.scrollerProxy(document.documentElement, {})
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
    }
  }, [reducedMotion])

  return (
    <ReducedMotionContext.Provider value={reducedMotion}>
      <LenisContext.Provider value={lenisInstance}>
        {children}
      </LenisContext.Provider>
    </ReducedMotionContext.Provider>
  )
}
