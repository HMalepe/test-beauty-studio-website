import { useEffect, useRef, useState } from 'react'

type LazyVideoProps = {
  src: string
  poster: string
  className?: string
  posterClassName?: string
}

export function LazyVideo({
  src,
  poster,
  className = 'absolute inset-0 h-full w-full object-cover',
  posterClassName = className,
}: LazyVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.unobserve(root)
        }
      },
      { rootMargin: '200px', threshold: 0.01 },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video || !shouldLoad) return

    video.load()

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 },
    )

    playObserver.observe(root)
    return () => playObserver.disconnect()
  }, [shouldLoad])

  return (
    <div ref={rootRef} className="absolute inset-0">
      <video
        ref={videoRef}
        className={`transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={{ zIndex: 1 }}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        onLoadedData={() => setVideoReady(true)}
        onError={() => setVideoReady(false)}
      >
        {shouldLoad ? <source src={src} type="video/mp4" /> : null}
      </video>

      <img
        src={poster}
        alt=""
        className={`transition-opacity duration-500 ${videoReady ? 'opacity-0' : 'opacity-100'} ${posterClassName}`}
        style={{ zIndex: 0 }}
        loading="lazy"
        decoding="async"
        aria-hidden
      />
    </div>
  )
}
