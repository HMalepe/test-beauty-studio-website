/**
 * Platform fallback for unregistered subdomains — not client-specific.
 */
export function UnknownTenantPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base px-6 text-center">
      <p className="font-grotesk text-xs uppercase tracking-[0.2em] text-cream/50">
        MarineFlow
      </p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-cream sm:text-4xl">
        Site not found
      </h1>
      <p className="mt-4 max-w-md font-grotesk text-cream/55">
        This subdomain is not registered. Visit{" "}
        <a href="https://marineflow.co.za" className="text-accent underline">
          marineflow.co.za
        </a>{" "}
        for our portfolio.
      </p>
    </main>
  );
}
