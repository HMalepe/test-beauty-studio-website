export function LogoMark() {
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
        fill="currentColor"
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

type PillNavProps = {
  variant?: 'fixed' | 'inline'
  ariaLabel?: string
}

export function PillNav({
  variant = 'fixed',
  ariaLabel = 'Primary',
}: PillNavProps) {
  const wrapperClass =
    variant === 'fixed'
      ? 'pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4'
      : 'flex justify-center px-4 pt-2'

  const navClass =
    variant === 'fixed'
      ? 'pointer-events-auto flex h-14 w-full max-w-[440px] items-center justify-between rounded-full bg-paper/90 px-2 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.04] backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-300 sm:h-16 sm:max-w-[480px]'
      : 'flex h-16 w-full max-w-[480px] items-center justify-between rounded-full bg-paper px-2 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.12)]'

  return (
    <div className={wrapperClass}>
      <nav aria-label={ariaLabel} className={navClass}>
        <a
          href="#"
          className="flex items-center rounded-full px-3 py-2 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          aria-label="Tinker home"
        >
          <LogoMark />
        </a>

        <a href="#learn" className="btn-lime shrink-0 px-5 py-2.5 text-sm">
          Get the app
        </a>
      </nav>
    </div>
  )
}
