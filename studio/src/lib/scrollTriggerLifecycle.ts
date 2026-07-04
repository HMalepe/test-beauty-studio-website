import { ScrollTrigger } from './gsap'

function debounce<T extends (...args: never[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

let teardown: (() => void) | undefined

export function bindScrollTriggerLifecycle() {
  if (typeof window === 'undefined' || teardown) return teardown ?? (() => {})

  const refresh = debounce(() => ScrollTrigger.refresh(), 300)

  window.addEventListener('resize', refresh)
  window.addEventListener('orientationchange', refresh)

  document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {})

  teardown = () => {
    window.removeEventListener('resize', refresh)
    window.removeEventListener('orientationchange', refresh)
    teardown = undefined
  }

  return teardown
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}
