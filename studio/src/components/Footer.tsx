export function Footer() {
  return (
    <footer className="border-t border-offwhite py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold">
            <span className="inline-block size-2 rounded-full bg-lime" aria-hidden />
            Studio
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/50">
            Motion-first landing scaffold. Built with Vite, React, and Tailwind.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-ink/60">
          <a href="#tools" className="hover:text-ink">
            Tools
          </a>
          <a href="#wild" className="hover:text-ink">
            Showcase
          </a>
          <a href="#faq" className="hover:text-ink">
            FAQ
          </a>
        </div>

        <p className="text-sm text-ink/40">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
