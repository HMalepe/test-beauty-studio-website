"use client";

import { motion } from "framer-motion";
import { ServiceIcon } from "./ServiceIcon";
import type { ServiceItem } from "./servicesData";

type MagneticServiceCardProps = {
  service: ServiceItem;
  offsetX: number;
  offsetY: number;
  scale: number;
  isHovered: boolean;
  isPrimary: boolean;
  isNeighbor: boolean;
  hoverCapable: boolean;
  cardRef: (node: HTMLDivElement | null) => void;
  onTouchFocus?: () => void;
  onTouchBlur?: () => void;
};

export function MagneticServiceCard({
  service,
  offsetX,
  offsetY,
  scale,
  isHovered,
  isPrimary,
  isNeighbor,
  hoverCapable,
  cardRef,
  onTouchFocus,
  onTouchBlur,
}: MagneticServiceCardProps) {
  const springTransition = isPrimary
    ? { type: "spring" as const, stiffness: 300, damping: 20 }
    : isNeighbor
      ? { type: "spring" as const, stiffness: 220, damping: 24 }
      : { type: "spring" as const, stiffness: 300, damping: 20 };

  return (
    <div
      ref={cardRef}
      className="relative"
      style={{ width: 240, height: 240 }}
      onTouchStart={onTouchFocus}
      onTouchEnd={onTouchBlur}
      onTouchCancel={onTouchBlur}
    >
      <motion.div
        className="h-full w-full will-change-transform"
        animate={{ x: offsetX, y: offsetY, scale }}
        transition={hoverCapable ? springTransition : { duration: 0.12 }}
        whileTap={!hoverCapable ? { scale: 1.02 } : undefined}
      >
        <article
          className="flex h-full w-full flex-col overflow-hidden rounded-sm transition-[background-color] duration-200"
          style={{
            backgroundColor: isHovered ? service.hoverColor : service.baseColor,
          }}
        >
          <div className="flex h-[60%] items-center justify-center text-cream/90">
            <ServiceIcon type={service.icon} className="h-12 w-12" />
          </div>
          <div className="flex h-[40%] flex-col justify-center border-t border-cream/10 px-4">
            <h3 className="font-serif text-lg font-semibold text-cream">
              {service.title}
            </h3>
            <p className="mt-1 font-grotesk text-xs leading-snug text-cream/75">
              {service.description}
            </p>
          </div>
        </article>
      </motion.div>
    </div>
  );
}
