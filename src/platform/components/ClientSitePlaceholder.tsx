/**
 * Platform scaffold only — used while a client site is not yet built.
 * Not a substitute for client-specific layouts or content.
 */
type ClientSitePlaceholderProps = {
  slug: string;
  title: string;
};

export function ClientSitePlaceholder({
  slug,
  title,
}: ClientSitePlaceholderProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-base px-6 text-center">
      <p className="font-grotesk text-xs uppercase tracking-[0.2em] text-cream/50">
        {slug}.marineflow.co.za
      </p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-cream sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 font-grotesk text-sm text-cream/50">
        Client placeholder — content coming soon.
      </p>
    </main>
  );
}
