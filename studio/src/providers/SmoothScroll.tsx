import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { ScrollTrigger } from '../lib/gsap'
import { bindScrollTriggerLifecycle } from '../lib/scrollTriggerLifecycle'

const ReducedMotionContext = createContext(false)
const ScrollReadyContext = createContext(false)

export function usePrefersReducedMotion() {
  return useContext(ReducedMotionContext)
}

export function useScrollReady() {
  return useContext(ScrollReadyContext)
}

type Props = { children: ReactNode }

export function SmoothScroll({ children }: Props) {
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const unbind = bindScrollTriggerLifecycle()
    return unbind
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true })
    ScrollTrigger.defaults({ toggleActions: 'play none none none' })

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      setReady(true)
    })

    return () => setReady(false)
  }, [])

  return (
    <ReducedMotionContext.Provider value={reducedMotion}>
      <ScrollReadyContext.Provider value={ready}>
        {children}
      </ScrollReadyContext.Provider>
    </ReducedMotionContext.Provider>
  )
}
