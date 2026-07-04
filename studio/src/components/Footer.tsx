import { PillNav } from './PillNav'

const UTILITY_LINKS = [
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Privacy Policy' },
] as const

export function Footer() {
  return (
    <footer>
      <section id="cta" className="bg-paper px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-display text-ink">Start tinkering</h2>
          <p className="mt-6 text-lg text-neutral-800">
            See where it takes you.
          </p>
          <div className="mt-8">
            <a href="#learn" className="btn-lime">
              Get the app
            </a>
          </div>
        </div>
      </section>

      <div className="overflow-x-clip bg-lime px-6 pb-8 pt-4">
        <PillNav variant="inline" ariaLabel="Footer" />

        <div className="mx-auto max-w-7xl">
          <p
            className="pointer-events-none mt-2 w-full select-none text-center text-[clamp(5rem,22vw,15rem)] font-extrabold leading-[0.8] tracking-[-0.04em] text-lime-dark"
            aria-hidden
          >
            tinker
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-ink">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <button
                type="button"
                aria-label="Select region and language"
                className="inline-flex items-center gap-1.5 rounded-full px-1 py-0.5 font-medium transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span aria-hidden>🌐</span>
                South Africa | English
                <span aria-hidden className="text-xs">
                  ▾
                </span>
              </button>
              <span className="hidden text-ink/30 sm:inline" aria-hidden>
                |
              </span>
              <span>© 2026 Tinker</span>
              {UTILITY_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="underline-offset-2 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p className="text-ink/70">by Shopify</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
