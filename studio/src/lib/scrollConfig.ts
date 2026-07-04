export function prefersNativeScroll(): boolean {
  if (typeof window === 'undefined') return true
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 767px)').matches
  )
}

export type ScrollProfile = {
  mobile: boolean
  scrub: number | boolean
  anticipatePin: number
}

export function getScrollProfile(): ScrollProfile {
  const mobile = prefersNativeScroll()
  return {
    mobile,
    scrub: mobile ? true : 1,
    anticipatePin: mobile ? 0 : 1,
  }
}
