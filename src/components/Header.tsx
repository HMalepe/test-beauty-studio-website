const navLinks = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Markets", href: "#markets" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-cream/5 bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-8">
        <a href="#" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted ring-1 ring-accent/30 transition group-hover:ring-accent/50">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-accent"
              aria-hidden="true"
            >
              <path
                d="M3 15c2.5-1 5-1.5 9-1.5s6.5.5 9 1.5M3 12c2.5-1 5-1.5 9-1.5s6.5.5 9 1.5M3 9c2.5-1 5-1.5 9-1.5s6.5.5 9 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-cream">
            Marine<span className="text-accent">Flow</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-grotesk text-sm font-medium text-cream/70 transition hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-accent px-5 py-2 font-grotesk text-sm font-semibold text-cream transition hover:bg-accent-hover sm:inline-flex"
          >
            Get in Touch
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-cream/70 transition hover:bg-cream/5 md:hidden"
            aria-label="Open menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
