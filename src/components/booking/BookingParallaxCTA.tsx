"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ScrambleReveal } from "@/components/ScrambleReveal";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useScrollTriggerRefresh } from "@/lib/useScrollTriggerRefresh";

const LAYER_SPEEDS = [0.2, 0.5, 0.8] as const;
const SECTION_MIN_VH = 160;

function useLayerY(
  scrollYProgress: MotionValue<number>,
  speedFactor: number,
  sectionHeight: number,
  disabled: boolean,
) {
  return useTransform(scrollYProgress, (progress) => {
    if (disabled || sectionHeight === 0) return 0;
    const clamped = Math.min(1, Math.max(0, progress));
    return -clamped * (1 - speedFactor) * sectionHeight;
  });
}

export function BookingParallaxCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useScrollTriggerRefresh([sectionHeight]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const update = () => setSectionHeight(node.offsetHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const y0 = useLayerY(scrollYProgress, LAYER_SPEEDS[0], sectionHeight, reducedMotion);
  const y1 = useLayerY(scrollYProgress, LAYER_SPEEDS[1], sectionHeight, reducedMotion);
  const y2 = useLayerY(scrollYProgress, LAYER_SPEEDS[2], sectionHeight, reducedMotion);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="booking-heading"
      className="relative bg-base"
      style={{ minHeight: `${SECTION_MIN_VH}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 0 — deepest bg (0.2x) */}
        <motion.div
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{ y: y0 }}
          aria-hidden="true"
        >
          <div
            className="absolute -left-1/4 top-1/4 h-[70vh] w-[70vh] rounded-full opacity-40 blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(193, 59, 47, 0.45) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-base via-base-muted/80 to-base" />
        </motion.div>

        {/* Layer 1 — mid depth (0.5x) */}
        <motion.div
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{ y: y1 }}
          aria-hidden="true"
        >
          <div
            className="absolute right-[-10%] top-[15%] h-[45vh] w-[45vh] rounded-full opacity-30 blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(201, 168, 118, 0.35) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Layer 2 — near fg (0.8x) */}
        <motion.div
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{ y: y2 }}
          aria-hidden="true"
        >
          <div className="absolute bottom-[20%] left-[8%] h-32 w-32 rotate-12 rounded-2xl border border-cream/5 bg-cream/5 backdrop-blur-sm" />
          <div className="absolute right-[12%] top-[35%] h-20 w-20 -rotate-6 rounded-full border border-accent/20 bg-accent/10" />
        </motion.div>

        {/* Layer 3 — reference / CTA (1.0x, no scroll transform) */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <p className="mb-4 font-grotesk text-xs uppercase tracking-[0.2em] text-cream/50">
              TEST BEAUTY STUDIO WEBSITE
            </p>

            <ScrambleReveal
              as="h2"
              id="booking-heading"
              text="Book Your Chair"
              className="font-serif text-4xl font-semibold text-cream sm:text-5xl lg:text-6xl"
            />

            <p className="mx-auto mt-5 max-w-md font-grotesk text-base text-cream/60 sm:text-lg">
              Reserve your cut, shave, or styling session. Walk-ins welcome
              when chairs are open.
            </p>

            {/* Inner wrapper — hover independent of scroll layer */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <motion.a
                href="mailto:hello@marineflow.co.za?subject=Booking%20Request"
                className="inline-flex rounded-full bg-accent px-10 py-4 font-grotesk text-base font-semibold text-cream"
                style={{ boxShadow: "0 4px 20px rgba(193, 59, 47, 0.35)" }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(193, 59, 47, 0.5)",
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                Request Appointment
              </motion.a>
              <a
                href="#services"
                className="font-grotesk text-sm text-cream/50 transition hover:text-cream/80"
              >
                View services first
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
