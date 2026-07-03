const LINKS = [
  { href: '#tools', label: 'Tools' },
  { href: '#wild', label: 'In the Wild' },
  { href: '#learn', label: 'Learn' },
  { href: '#faq', label: 'FAQ' },
] as const

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-offwhite/80 bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href="#" className="group flex items-center gap-2 text-sm font-bold tracking-tight">
          <span
            className="inline-block size-2 rounded-full bg-lime transition group-hover:scale-125"
            aria-hidden
          />
          Studio
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-ink/70 hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#learn" className="btn-primary shrink-0 px-5 py-2.5 text-xs">
          Get started
        </a>
      </nav>
    </header>
  )
}
