/**
 * Beauty Studio full landing — wire from app/(sites)/beauty-studio/page.tsx when ready.
 * Kept isolated here; not imported by other clients.
 */
import { Header } from "@/clients/beauty-studio/components/Header";
import { BookingParallaxCTA } from "@/clients/beauty-studio/components/booking/BookingParallaxCTA";
import { HeroBarberPole3D } from "@/clients/beauty-studio/components/hero/HeroBarberPole3D";
import { PolaroidCascade } from "@/clients/beauty-studio/components/polaroid/PolaroidCascade";
import { MagneticServicesGrid } from "@/clients/beauty-studio/components/services/MagneticServicesGrid";

export function BeautyStudioHomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroBarberPole3D />
      <PolaroidCascade />
      <MagneticServicesGrid />
      <BookingParallaxCTA />
    </main>
  );
}
