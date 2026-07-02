"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Group } from "three";
import { HeroCanvasFallback } from "./HeroCanvasFallback";

const RazorCanvas = dynamic(
  () => import("./RazorCanvas").then((mod) => mod.RazorCanvas),
  {
    ssr: false,
    loading: () => <HeroCanvasFallback />,
  },
);

const DEG = Math.PI / 180;

export function HeroRazor3D() {
  const pinRef = useRef<HTMLElement>(null);
  const scrollGroupRef = useRef<Group>(null);
  const scrollProgressRef = useRef(0);
  const [meshReady, setMeshReady] = useState(false);

  useEffect(() => {
    const pinEl = pinRef.current;
    const mesh = scrollGroupRef.current;
    if (!pinEl || !mesh || !meshReady) return;

    mesh.rotation.set(0, -25 * DEG, 0);
    mesh.scale.set(0.8, 0.8, 0.8);
    mesh.position.set(0.8, 0, 0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      tl.to(
        mesh.rotation,
        { y: 15 * DEG, ease: "none", duration: 0.5 },
        0,
      )
        .to(mesh.rotation, { y: 95 * DEG, ease: "none", duration: 0.5 }, 0.5)
        .fromTo(
          mesh.scale,
          { x: 0.8, y: 0.8, z: 0.8 },
          { x: 1.1, y: 1.1, z: 1.1, ease: "none", duration: 0.5 },
          0,
        )
        .to(mesh.scale, { x: 1, y: 1, z: 1, ease: "none", duration: 0.5 }, 0.5)
        .fromTo(
          mesh.position,
          { x: 0.8, y: 0, z: 0 },
          { x: 1.5, y: 0, z: 0, ease: "none", duration: 0.5 },
          0,
        )
        .to(
          mesh.position,
          { x: 0, y: 0, z: 0, ease: "none", duration: 0.5 },
          0.5,
        );
    }, pinRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [meshReady]);

  return (
    <section
      id="hero"
      ref={pinRef}
      className="relative bg-base"
      aria-label="Hero"
    >
      <div className="relative h-screen w-full overflow-hidden">
        {/* 3D canvas layer */}
        <div className="absolute inset-0 z-0">
          <RazorCanvas
            scrollGroupRef={scrollGroupRef}
            scrollProgressRef={scrollProgressRef}
            onMeshReady={() => setMeshReady(true)}
          />
        </div>

        {/* Vignette + readability gradient over canvas */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-base via-base/70 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-base/80 via-transparent to-base/40"
          aria-hidden="true"
        />

        {/* DOM headline — real HTML for SEO / a11y */}
        <div className="relative z-10 flex h-full items-center pt-16 lg:pt-20">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="max-w-xl lg:max-w-2xl">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-grotesk text-sm font-medium text-cream/80">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Master craftsmanship · Cape Town
              </p>

              <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl xl:text-7xl">
                The perfect
                <br />
                <span className="text-accent">edge</span>
              </h1>

              <p className="mt-6 max-w-md font-grotesk text-lg leading-relaxed text-cream/70 sm:text-xl">
                Traditional straight-razor grooming, refined for the modern
                gentleman. Precision steel. Unhurried ritual.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-grotesk text-base font-semibold text-cream transition hover:bg-accent-hover"
                >
                  Book Appointment
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-cream/20 bg-cream/5 px-8 py-3.5 font-grotesk text-base font-semibold text-cream backdrop-blur-sm transition hover:border-cream/30 hover:bg-cream/10"
                >
                  View Services
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2 font-grotesk text-cream/40">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 animate-bounce"
            >
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
