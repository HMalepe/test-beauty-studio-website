"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { useReducedMotion } from "framer-motion";
import { ScrambleReveal } from "@/clients/beauty-studio/components/ScrambleReveal";
import { MagneticServiceCard } from "./MagneticServiceCard";
import {
  CARD_GAP,
  CARD_SIZE,
  computeDisplacement,
  getGridColumnCount,
  getNeighborIndices,
  NEIGHBOR_BLEED,
  SERVICES,
} from "./servicesData";
import { useHoverCapable } from "./useHoverCapable";

type MagneticState = {
  primaryIndex: number;
  x: number;
  y: number;
};

export function MagneticServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef(0);
  const pendingPointer = useRef<{ x: number; y: number } | null>(null);
  const [magnetic, setMagnetic] = useState<MagneticState | null>(null);
  const [columnCount, setColumnCount] = useState(5);
  const [touchHoverIndex, setTouchHoverIndex] = useState<number | null>(null);

  const hoverCapable = useHoverCapable();
  const reducedMotion = useReducedMotion();

  const updateColumnCount = useCallback(() => {
    if (!gridRef.current) return;
    setColumnCount(getGridColumnCount(gridRef.current.offsetWidth));
  }, []);

  useEffect(() => {
    updateColumnCount();
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new ResizeObserver(updateColumnCount);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [updateColumnCount]);

  const processPointer = useCallback(
    (x: number, y: number) => {
      if (!hoverCapable || reducedMotion) {
        setMagnetic(null);
        return;
      }

      let primaryIndex = -1;
      let bestX = 0;
      let bestY = 0;
      let bestMag = 0;

      for (let index = 0; index < cardRefs.current.length; index++) {
        const el = cardRefs.current[index];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const displacement = computeDisplacement(x, y, centerX, centerY);
        if (!displacement) continue;

        const mag = Math.hypot(displacement.x, displacement.y);
        if (mag > bestMag) {
          bestMag = mag;
          primaryIndex = index;
          bestX = displacement.x;
          bestY = displacement.y;
        }
      }

      if (primaryIndex === -1) {
        setMagnetic(null);
        return;
      }

      setMagnetic({
        primaryIndex,
        x: bestX,
        y: bestY,
      });
    },
    [hoverCapable, reducedMotion],
  );

  const schedulePointerUpdate = useCallback(
    (x: number, y: number) => {
      pendingPointer.current = { x, y };
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        rafId.current = 0;
        const point = pendingPointer.current;
        if (point) processPointer(point.x, point.y);
      });
    },
    [processPointer],
  );

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    schedulePointerUpdate(event.clientX, event.clientY);
  };

  const handleMouseLeave = () => {
    pendingPointer.current = null;
    setMagnetic(null);
  };

  const getCardMotion = (index: number) => {
    if (!hoverCapable || reducedMotion) {
      const touchActive = touchHoverIndex === index;
      return {
        offsetX: 0,
        offsetY: 0,
        scale: touchActive ? 1.02 : 1,
        isHovered: touchActive,
        isPrimary: false,
        isNeighbor: false,
      };
    }

    if (!magnetic) {
      return {
        offsetX: 0,
        offsetY: 0,
        scale: 1,
        isHovered: false,
        isPrimary: false,
        isNeighbor: false,
      };
    }

    const { primaryIndex, x, y } = magnetic;
    const neighbors = getNeighborIndices(
      primaryIndex,
      columnCount,
      SERVICES.length,
    );

    if (index === primaryIndex) {
      return {
        offsetX: x,
        offsetY: y,
        scale: 1.04,
        isHovered: true,
        isPrimary: true,
        isNeighbor: false,
      };
    }

    if (neighbors.includes(index)) {
      return {
        offsetX: x * NEIGHBOR_BLEED,
        offsetY: y * NEIGHBOR_BLEED,
        scale: 1,
        isHovered: true,
        isPrimary: false,
        isNeighbor: true,
      };
    }

    return {
      offsetX: 0,
      offsetY: 0,
      scale: 1,
      isHovered: false,
      isPrimary: false,
      isNeighbor: false,
    };
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-base-muted px-6 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 font-grotesk text-xs uppercase tracking-[0.2em] text-cream/50">
            What we offer
          </p>
          <ScrambleReveal
            as="h2"
            id="services-heading"
            text="Services"
            className="font-serif text-3xl font-semibold text-cream sm:text-4xl lg:text-5xl"
          />
          <p className="mx-auto mt-4 max-w-md font-grotesk text-cream/55">
            {hoverCapable
              ? "Move near a card — the grid responds."
              : "Tap a service to explore."}
          </p>
        </div>

        <div
          ref={gridRef}
          className="mx-auto grid justify-center"
          style={{
            gap: CARD_GAP,
            gridTemplateColumns: `repeat(auto-fit, ${CARD_SIZE}px)`,
          }}
          onMouseMove={hoverCapable ? handleMouseMove : undefined}
          onMouseLeave={hoverCapable ? handleMouseLeave : undefined}
        >
          {SERVICES.map((service, index) => {
            const motion = getCardMotion(index);
            return (
              <MagneticServiceCard
                key={service.id}
                service={service}
                {...motion}
                hoverCapable={hoverCapable}
                cardRef={(node) => {
                  cardRefs.current[index] = node;
                }}
                onTouchFocus={
                  !hoverCapable ? () => setTouchHoverIndex(index) : undefined
                }
                onTouchBlur={
                  !hoverCapable ? () => setTouchHoverIndex(null) : undefined
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
