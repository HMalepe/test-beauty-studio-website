import { Header } from "@/components/Header";
import { HeroBarberPole3D } from "@/components/hero/HeroBarberPole3D";
import { PolaroidCascade } from "@/components/polaroid/PolaroidCascade";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroBarberPole3D />
      <PolaroidCascade />
      <section
        id="services"
        className="flex min-h-[70vh] items-center justify-center bg-base-muted px-6 py-24"
      >
        <div className="max-w-lg text-center">
          <h2 className="font-serif text-3xl font-semibold text-cream sm:text-4xl">
            Services
          </h2>
          <p className="mt-4 font-grotesk text-cream/55">
            Fades, line-ups, hot towel shaves, and beard sculpting — coming
            soon in full detail.
          </p>
        </div>
      </section>
      <section
        id="contact"
        className="flex min-h-[50vh] items-center justify-center bg-base px-6 py-24"
      >
        <div className="max-w-lg text-center">
          <h2 className="font-serif text-3xl font-semibold text-cream sm:text-4xl">
            Book your chair
          </h2>
          <p className="mt-4 font-grotesk text-cream/55">
            Cape Town · marineflow.co.za
          </p>
          <a
            href="mailto:hello@marineflow.co.za"
            className="mt-8 inline-flex rounded-full bg-accent px-8 py-3.5 font-grotesk text-base font-semibold text-cream transition hover:bg-accent-hover"
          >
            hello@marineflow.co.za
          </a>
        </div>
      </section>
    </main>
  );
}
