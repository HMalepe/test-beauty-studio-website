"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useState } from "react";
import type { PolaroidItem } from "./polaroidData";

const HOVER_EASE = [0.16, 1, 0.3, 1] as const;

type PolaroidCardProps = {
  card: PolaroidItem;
  index: number;
  fanOutRaw: MotionValue<number>;
  parallaxRaw: MotionValue<number>;
};

export function PolaroidCard({
  card,
  index,
  fanOutRaw,
  parallaxRaw,
}: PolaroidCardProps) {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const stackX = index * 1;
  const stackY = index * 1;

  const fanOutSource = useTransform(fanOutRaw, (v) => (reducedMotion ? 1 : v));
  const parallaxSource = useTransform(parallaxRaw, (v) =>
    reducedMotion ? 0 : v,
  );

  const fanOutSpring = useSpring(fanOutSource, {
    stiffness: card.spring.stiffness,
    damping: card.spring.damping,
    mass: 1,
  });

  const parallaxSpring = useSpring(parallaxSource, {
    stiffness: 120,
    damping: 28,
  });

  const fanOut = reducedMotion ? fanOutSource : fanOutSpring;
  const parallax = reducedMotion ? parallaxSource : parallaxSpring;

  const x = useTransform([fanOut, parallax], ([fan, para]) => {
    const f = fan as number;
    const p = para as number;
    const base = stackX + (card.target.x - stackX) * f;
    const drift = card.target.x * 0.35 * p * card.parallaxRate;
    return base + drift;
  });

  const y = useTransform([fanOut, parallax], ([fan, para]) => {
    const f = fan as number;
    const p = para as number;
    const base = stackY + (card.target.y - stackY) * f;
    const drift =
      card.target.y * 0.45 * p * card.parallaxRate +
      p * 180 * card.parallaxRate;
    return base + drift;
  });

  const rotate = useTransform(fanOut, (fan) => card.target.rotate * fan);
  const transform = useMotionTemplate`translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotate}deg)`;

  const zIndex = hovered ? 50 : 10 + index;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{ transform, zIndex }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.article
        animate={{
          y: reducedMotion ? 0 : hovered ? -8 : 0,
          rotate: reducedMotion ? 0 : hovered ? 2 : 0,
          boxShadow: hovered
            ? "0 8px 20px rgba(0,0,0,0.45)"
            : "0 4px 12px rgba(0,0,0,0.35)",
        }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 0.18, ease: HOVER_EASE }
        }
        className="box-border flex h-[260px] w-[220px] flex-col bg-white p-[10px]"
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.35)" }}
        aria-label={`${card.caption} — ${card.author}`}
      >
        <div className="relative h-[200px] w-[200px] shrink-0 overflow-hidden bg-base-muted">
          <Image
            src={`https://picsum.photos/seed/${card.imageSeed}/400/400`}
            alt={`Client photo for review by ${card.author}`}
            fill
            className="object-cover"
            sizes="200px"
            draggable={false}
          />
        </div>
        <div className="flex h-[40px] flex-col justify-center px-0.5 pt-1">
          <p className="line-clamp-1 font-grotesk text-[12px] leading-snug text-base">
            &ldquo;{card.caption}&rdquo;
          </p>
          <p className="font-grotesk text-[10px] text-base/60">— {card.author}</p>
        </div>
      </motion.article>
    </motion.div>
  );
}
