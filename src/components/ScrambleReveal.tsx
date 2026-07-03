"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const GLYPH_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*";
const LOCK_STAGGER_MS = 28;
const SCRAMBLE_TICK_MS = 40;
const WIDTH_TOLERANCE_PX = 1;

type HeadingTag = "h1" | "h2" | "h3" | "span";

type ScrambleRevealProps = {
  text: string;
  as?: HeadingTag;
  className?: string;
  /** Set when nested inside a parent heading that provides aria-label */
  nested?: boolean;
} & Omit<ComponentPropsWithoutRef<"h1">, "as" | "children">;

type CharCell = {
  target: string;
  display: string;
  locked: boolean;
  scramble: boolean;
  useMono: boolean;
};

function randomGlyph() {
  return GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)] ?? "X";
}

function buildScrambleSet() {
  const size = 8 + Math.floor(Math.random() * 7);
  return Array.from({ length: size }, randomGlyph);
}

function pickFromSet(set: string[]) {
  return set[Math.floor(Math.random() * set.length)] ?? randomGlyph();
}

function isScrambleable(char: string) {
  return char.trim().length > 0 && char !== "\n";
}

function measureCharWidth(char: string, font: string) {
  if (typeof document === "undefined") return 0;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;
  ctx.font = font;
  return ctx.measureText(char).width;
}

function buildWordMonoMap(text: string, serifFont: string, monoFont: string) {
  const words = text.split(/(\s+)/);
  const map = new Map<number, boolean>();
  let wordIndex = 0;

  words.forEach((segment) => {
    if (/^\s+$/.test(segment) || segment.length === 0) return;

    let wordNeedsMono = false;
    for (const char of segment) {
      if (!isScrambleable(char)) continue;
      const serifW = measureCharWidth(char, serifFont);
      const monoW = measureCharWidth(char, monoFont);
      if (Math.abs(serifW - monoW) > WIDTH_TOLERANCE_PX) {
        wordNeedsMono = true;
        break;
      }
    }
    map.set(wordIndex, wordNeedsMono);
    wordIndex += 1;
  });

  return map;
}

function getWordIndexAt(text: string, charIndex: number) {
  let wordIndex = 0;
  let inWord = false;

  for (let i = 0; i <= charIndex; i += 1) {
    const char = text[i];
    const isSpace = char === " " || char === "\n" || char === "\t";
    if (!isSpace && !inWord) {
      inWord = true;
    } else if (isSpace && inWord) {
      wordIndex += 1;
      inWord = false;
    }
  }

  return wordIndex;
}

function createInitialCells(text: string, wordMono: Map<number, boolean>): CharCell[] {
  return [...text].map((target, index) => {
    const scramble = isScrambleable(target);
    const wordIndex = getWordIndexAt(text, index);
    const useMono = wordMono.get(wordIndex) ?? true;

    return {
      target,
      display: scramble ? randomGlyph() : target,
      locked: !scramble,
      scramble,
      useMono: scramble ? true : useMono,
    };
  });
}

export function ScrambleReveal({
  text,
  as = "h2",
  className = "",
  nested = false,
  ...rest
}: ScrambleRevealProps) {
  const Tag = as as ElementType;
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const [cells, setCells] = useState<CharCell[]>(() =>
    [...text].map((target) => ({
      target,
      display: target,
      locked: true,
      scramble: false,
      useMono: false,
    })),
  );

  const wordMonoMap = useMemo(() => {
    if (typeof window === "undefined") return new Map<number, boolean>();
    const serifFont = "600 48px var(--font-serif), Georgia, serif";
    const monoFont = "600 48px ui-monospace, SFMono-Regular, Menlo, monospace";
    return buildWordMonoMap(text, serifFont, monoFont);
  }, [text]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    if (reducedMotion) {
      setCells(
        [...text].map((target) => ({
          target,
          display: target,
          locked: true,
          scramble: false,
          useMono: false,
        })),
      );
      return;
    }

    const node = rootRef.current;
    let wordMono = wordMonoMap;

    if (node) {
      const style = getComputedStyle(node);
      const serifFont = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const monoFont = `${style.fontWeight} ${style.fontSize} ui-monospace, SFMono-Regular, Menlo, monospace`;
      wordMono = buildWordMonoMap(text, serifFont, monoFont);
    }

    setCells(createInitialCells(text, wordMono));

    const scrambleableIndices = [...text]
      .map((char, index) => (isScrambleable(char) ? index : -1))
      .filter((index) => index >= 0);

    const lockTimers: ReturnType<typeof setTimeout>[] = [];
    let scrambleSet = buildScrambleSet();

    const tick = setInterval(() => {
      scrambleSet = buildScrambleSet();
      setCells((prev) =>
        prev.map((cell) =>
          cell.locked || !cell.scramble
            ? cell
            : { ...cell, display: pickFromSet(scrambleSet) },
        ),
      );
    }, SCRAMBLE_TICK_MS);

    scrambleableIndices.forEach((charIndex, order) => {
      const timer = setTimeout(() => {
        setCells((prev) =>
          prev.map((cell, index) => {
            if (index !== charIndex) return cell;
            const wordIndex = getWordIndexAt(text, index);
            const useMono = wordMono.get(wordIndex) ?? true;
            return {
              ...cell,
              display: cell.target,
              locked: true,
              useMono,
            };
          }),
        );
      }, order * LOCK_STAGGER_MS);
      lockTimers.push(timer);
    });

    return () => {
      clearInterval(tick);
      lockTimers.forEach(clearTimeout);
    };
  }, [inView, reducedMotion, text, wordMonoMap]);

  return (
    <Tag
      ref={rootRef}
      className={className}
      aria-hidden={nested ? true : undefined}
      {...rest}
    >
      {cells.map((cell, index) => {
        if (cell.target === "\n") {
          return <br key={`br-${index}`} />;
        }

        const fontClass = cell.locked && !cell.useMono ? "font-serif" : "font-mono";

        return (
          <span
            key={`${index}-${cell.locked ? "locked" : "scr"}`}
            className={`inline-block ${fontClass}`}
            style={{
              opacity: cell.locked ? 1 : 0.6,
              minWidth: cell.scramble ? "0.62em" : undefined,
              textAlign: "center",
            }}
            aria-hidden={!cell.locked}
          >
            {cell.display}
          </span>
        );
      })}
      {!nested && (
        <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      )}
    </Tag>
  );
}
