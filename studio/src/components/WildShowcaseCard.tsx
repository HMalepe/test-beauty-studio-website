import type { BeforeAfterShowcaseCard, VideoShowcaseCard } from '../data/wildShowcase'
import { LazyVideo } from './LazyVideo'

export function VideoCreatorCard({ card }: { card: VideoShowcaseCard }) {
  return (
    <article
      className={`wild-card group relative overflow-hidden rounded-2xl bg-ink transition duration-300 motion-reduce:transition-none md:hover:-translate-y-1 md:hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.35)] ${card.minHeight}`}
    >
      <LazyVideo src={card.video} poster={card.poster} />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
        aria-hidden
      />

      <div className="absolute bottom-0 left-0 p-5 text-paper sm:p-6">
        <p className="text-xl font-bold leading-tight sm:text-2xl">{card.name}</p>
        <p className="text-xl font-bold leading-tight text-paper/95 sm:text-2xl">
          {card.subtitle}
        </p>
      </div>
    </article>
  )
}

export function BeforeAfterCard({ card }: { card: BeforeAfterShowcaseCard }) {
  return (
    <article
      className={`wild-card group overflow-hidden rounded-2xl bg-offwhite transition duration-300 motion-reduce:transition-none md:hover:-translate-y-1 md:hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.25)] ${card.minHeight}`}
    >
      <div className="grid h-full min-h-[inherit] grid-cols-2">
        <div className="relative min-h-[inherit]">
          <img
            src={card.before}
            alt={`${card.alt} — before`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute bottom-3 left-3 z-10 rounded-full bg-black/60 px-3 py-1 text-sm text-paper backdrop-blur-sm">
            Before
          </span>
        </div>
        <div className="relative min-h-[inherit]">
          <img
            src={card.after}
            alt={`${card.alt} — after`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-3 py-1 text-sm text-paper backdrop-blur-sm">
            After
          </span>
        </div>
      </div>
    </article>
  )
}
