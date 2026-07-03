import Image from "next/image";

const stats = [
  { value: "25,000+", label: "Marine applications worldwide" },
  { value: "600–2,000", label: "L/min flow capacity" },
  { value: "20,000+", label: "Hours rated component life" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-16 lg:pt-20"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          className="object-cover object-center grayscale-[30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/95 via-base/80 to-base" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(193, 59, 47, 0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="opacity-0-start animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-grotesk text-sm font-medium text-cream/80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Engineered for demanding marine environments
          </p>

          <h1 className="opacity-0-start animate-fade-up animation-delay-100 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="text-gradient">The future of</span>
            <br />
            <span className="text-cream">water pumping</span>
          </h1>

          <p className="opacity-0-start animate-fade-up animation-delay-200 mt-6 max-w-2xl font-grotesk text-lg leading-relaxed text-cream/75 sm:text-xl">
            MarineFlow designs and delivers high-performance marine pumps built
            to outperform, outlast, and simplify maintenance — from engine
            cooling and bilge systems to ballast and circulation.
          </p>

          <div className="opacity-0-start animate-fade-up animation-delay-300 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-grotesk text-base font-semibold text-cream transition hover:bg-accent-hover"
            >
              Explore Products
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-cream/20 bg-cream/5 px-8 py-3.5 font-grotesk text-base font-semibold text-cream backdrop-blur-sm transition hover:border-cream/30 hover:bg-cream/10"
            >
              Request a Quote
            </a>
          </div>
        </div>

        <div className="opacity-0-start animate-fade-up animation-delay-500 mt-16 grid gap-6 border-t border-cream/10 pt-10 sm:grid-cols-3 lg:mt-24">
          {stats.map((stat) => (
            <div key={stat.label} className="group">
              <p className="font-serif text-2xl font-semibold text-cream transition group-hover:text-accent sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-grotesk text-sm text-cream/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="opacity-0-start animate-fade-in animation-delay-500 absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2 font-grotesk text-cream/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 animate-bounce"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
