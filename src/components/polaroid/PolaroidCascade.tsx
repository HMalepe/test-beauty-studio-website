"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useScrollTriggerRefresh } from "@/lib/useScrollTriggerRefresh";
import { ScrambleReveal } from "@/components/ScrambleReveal";
import { PolaroidCard } from "./PolaroidCard";
import {
  FAN_OUT_VH,
  PARALLAX_VH,
  POLAROID_CARDS,
  SECTION_SCROLL_VH,
  ZONE_HEIGHT,
  ZONE_WIDTH,
} from "./polaroidData";

export function PolaroidCascade() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useScrollTriggerRefresh([POLAROID_CARDS.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const fanOutEnd = FAN_OUT_VH / SECTION_SCROLL_VH;

  const fanOutRaw = useTransform(scrollYProgress, [0, fanOutEnd], [0, 1], {
    clamp: true,
  });

  const parallaxRaw = useTransform(scrollYProgress, [fanOutEnd, 1], [0, 1], {
    clamp: true,
  });

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-labelledby="polaroid-heading"
      className="relative bg-base"
      style={{
        height: reducedMotion ? "auto" : `${SECTION_SCROLL_VH}vh`,
        minHeight: reducedMotion ? "100vh" : undefined,
      }}
    >
      <div
        className={
          reducedMotion
            ? "flex min-h-screen items-center justify-center py-24"
            : "sticky top-0 flex h-screen items-center justify-center overflow-hidden"
        }
      >
        <div className="relative mx-auto w-full max-w-[960px] px-6">
          <div
            className="relative mx-auto origin-center scale-[0.42] sm:scale-[0.62] md:scale-[0.82] lg:scale-100"
            style={{ width: ZONE_WIDTH, height: ZONE_HEIGHT, maxWidth: "100%" }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center"
              style={{ width: 480, maxWidth: "90%" }}
            >
              <p className="mb-3 font-grotesk text-xs uppercase tracking-[0.2em] text-cream/50">
                Client stories
              </p>
              <h2
                id="polaroid-heading"
                aria-label="Moments from the chair"
                className="font-serif text-3xl font-semibold leading-tight text-cream sm:text-4xl lg:text-5xl"
              >
                <ScrambleReveal as="span" nested text="Moments from" />
                <br />
                <ScrambleReveal
                  as="span"
                  nested
                  text="the chair"
                  className="text-accent"
                />
              </h2>
              {!reducedMotion && (
                <p className="mt-4 max-w-xs font-grotesk text-sm text-cream/55">
                  Real clients. Real cuts. Scroll to spread the stack.
                </p>
              )}
            </div>

            {POLAROID_CARDS.map((card, index) => (
              <PolaroidCard
                key={card.id}
                card={card}
                index={index}
                fanOutRaw={fanOutRaw}
                parallaxRaw={parallaxRaw}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
