export default function MarketingHomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base px-6 text-center">
      <p className="font-grotesk text-xs uppercase tracking-[0.2em] text-cream/50">
        MarineFlow
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-cream sm:text-5xl">
        Portfolio
      </h1>
      <p className="mt-4 max-w-md font-grotesk text-cream/60">
        Client sites are served on their own subdomains — e.g.{" "}
        <span className="text-cream/80">beauty-studio.marineflow.co.za</span>
        {" · "}
        <span className="text-cream/80">tinker.marineflow.co.za</span>
      </p>
    </main>
  );
}
