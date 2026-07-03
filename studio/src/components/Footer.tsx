const FOOTER_LINKS = [
  { href: '#tools', label: 'Tools' },
  { href: '#wild', label: 'In the wild' },
  { href: '#learn', label: 'Learn' },
  { href: '#faq', label: 'FAQ' },
] as const

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-paper py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-ink">
            <span className="inline-block size-2 rounded-full bg-lime" aria-hidden />
            Tinker
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-600">
            Everyone can play with AI. Make videos, images, 3D models, and more —
            free on your phone.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-6 text-sm text-neutral-600">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-neutral-400">
          &copy; {new Date().getFullYear()} Tinker
        </p>
      </div>
    </footer>
  )
}
