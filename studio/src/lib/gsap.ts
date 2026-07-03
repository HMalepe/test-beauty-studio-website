import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/** Jump all ScrollTriggers to their end state (used when reduced motion is active). */
export function finalizeScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.endAnimation()
  })
}

/**
 * Wrap ScrollTrigger / GSAP scroll setup so animated components can respect reduced motion.
 * When reduced motion is on, runs `onFinalState` instead and skips animation setup.
 */
export function withScrollAnimation(
  reducedMotion: boolean,
  setup: () => void | (() => void),
  onFinalState?: () => void,
): () => void {
  if (reducedMotion) {
    onFinalState?.()
    finalizeScrollTriggers()
    return () => {}
  }

  const cleanup = setup()
  return typeof cleanup === 'function' ? cleanup : () => {}
}
