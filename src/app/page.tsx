import { Header } from "@/components/Header";
import { BookingParallaxCTA } from "@/components/booking/BookingParallaxCTA";
import { HeroBarberPole3D } from "@/components/hero/HeroBarberPole3D";
import { PolaroidCascade } from "@/components/polaroid/PolaroidCascade";
import { MagneticServicesGrid } from "@/components/services/MagneticServicesGrid";

export default function Home() {
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
