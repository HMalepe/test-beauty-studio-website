import { Header } from "@/components/Header";
import { HeroRazor3D } from "@/components/hero/HeroRazor3D";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroRazor3D />
      {/* Scroll target below pin — enables 150vh choreography */}
      <section
        id="services"
        className="flex min-h-screen items-center justify-center bg-base-muted px-6"
      >
        <p className="font-grotesk text-cream/40">Next section — coming soon</p>
      </section>
    </main>
  );
}
