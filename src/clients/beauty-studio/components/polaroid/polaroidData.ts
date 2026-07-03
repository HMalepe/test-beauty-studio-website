export type PolaroidSpring = {
  stiffness: number;
  damping: number;
};

export type PolaroidTarget = {
  x: number;
  y: number;
  rotate: number;
};

export type PolaroidItem = {
  id: number;
  caption: string;
  author: string;
  imageSeed: string;
  target: PolaroidTarget;
  spring: PolaroidSpring;
  parallaxRate: number;
};

/** Hand-authored scatter positions inside 900×500 zone (center exclusion reserved). */
export const POLAROID_CARDS: PolaroidItem[] = [
  {
    id: 1,
    caption: "Best fade in Cape Town",
    author: "James M.",
    imageSeed: "barber-1",
    target: { x: -380, y: -190, rotate: -14 },
    spring: { stiffness: 220, damping: 22 },
    parallaxRate: 1.55,
  },
  {
    id: 2,
    caption: "Hot towel ritual, every time",
    author: "Marcus T.",
    imageSeed: "barber-2",
    target: { x: -260, y: 160, rotate: 11 },
    spring: { stiffness: 195, damping: 26 },
    parallaxRate: 1.35,
  },
  {
    id: 3,
    caption: "They remember your name",
    author: "David K.",
    imageSeed: "barber-3",
    target: { x: -120, y: -230, rotate: 6 },
    spring: { stiffness: 250, damping: 19 },
    parallaxRate: 1.25,
  },
  {
    id: 4,
    caption: "Line-up perfection",
    author: "Andile N.",
    imageSeed: "barber-4",
    target: { x: -360, y: 30, rotate: -8 },
    spring: { stiffness: 180, damping: 24 },
    parallaxRate: 1.5,
  },
  {
    id: 5,
    caption: "Old-school chair, new-school skill",
    author: "Ryan P.",
    imageSeed: "barber-5",
    target: { x: 120, y: 180, rotate: -16 },
    spring: { stiffness: 240, damping: 20 },
    parallaxRate: 1.2,
  },
  {
    id: 6,
    caption: "Straight razor confidence",
    author: "Chris L.",
    imageSeed: "barber-6",
    target: { x: 60, y: 210, rotate: 9 },
    spring: { stiffness: 205, damping: 25 },
    parallaxRate: 1.15,
  },
  {
    id: 7,
    caption: "My weekly reset",
    author: "Samuel B.",
    imageSeed: "barber-7",
    target: { x: 300, y: -170, rotate: -12 },
    spring: { stiffness: 260, damping: 18 },
    parallaxRate: 1.45,
  },
  {
    id: 8,
    caption: "Craft you can feel",
    author: "Tyler W.",
    imageSeed: "barber-8",
    target: { x: 380, y: 40, rotate: 15 },
    spring: { stiffness: 190, damping: 23 },
    parallaxRate: 1.6,
  },
  {
    id: 9,
    caption: "Worth every minute",
    author: "Jordan F.",
    imageSeed: "barber-9",
    target: { x: 180, y: -220, rotate: -6 },
    spring: { stiffness: 230, damping: 21 },
    parallaxRate: 1.3,
  },
  {
    id: 10,
    caption: "A proper gentleman's cut",
    author: "Henry R.",
    imageSeed: "barber-10",
    target: { x: 340, y: 200, rotate: 4 },
    spring: { stiffness: 215, damping: 26 },
    parallaxRate: 1.4,
  },
];

export const FAN_OUT_VH = 80;
export const PARALLAX_VH = 100;
export const SECTION_SCROLL_VH = FAN_OUT_VH + PARALLAX_VH;

export const ZONE_WIDTH = 900;
export const ZONE_HEIGHT = 500;
export const EXCLUSION_WIDTH = 480;
export const EXCLUSION_HEIGHT = 220;
