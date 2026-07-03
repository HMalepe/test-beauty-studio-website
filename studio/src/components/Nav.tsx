function LogoMark() {
  return (
    <svg
      width="88"
      height="24"
      viewBox="0 0 88 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="h-6 w-auto"
    >
      <circle cx="10" cy="12" r="6" fill="#CCE600" />
      <text
        x="22"
        y="17"
        fill="#000000"
        fontFamily="Inter, Helvetica, Arial, sans-serif"
        fontSize="15"
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        Tinker
      </text>
    </svg>
  )
}

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex h-16 w-full max-w-[480px] items-center justify-between rounded-full bg-paper px-2 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.12)] backdrop-blur-md"
      >
        <a
          href="#"
          className="flex items-center rounded-full px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          aria-label="Tinker home"
        >
          <LogoMark />
        </a>

        <a href="#learn" className="btn-lime shrink-0 px-5 py-2.5">
          Get the app
        </a>
      </nav>
    </header>
  )
}
