export function HeroCanvasFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-base">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 65% 50%, rgba(193, 59, 47, 0.15) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-48 w-48 animate-pulse">
          <div className="absolute inset-0 rotate-45 rounded-sm border border-cream/10 bg-gradient-to-br from-cream/10 to-transparent blur-sm" />
          <div className="absolute left-1/2 top-1/2 h-1 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/20" />
          <div className="absolute left-1/2 top-1/2 h-8 w-8 translate-x-6 -translate-y-1/2 rounded-full bg-cream/10" />
        </div>
      </div>
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-grotesk text-xs uppercase tracking-widest text-cream/30">
        Loading scene…
      </p>
    </div>
  );
}
