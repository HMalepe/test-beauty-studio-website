export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  baseColor: string;
  hoverColor: string;
  icon: "scissors" | "beard" | "towel" | "color" | "style";
};

export const SERVICES: ServiceItem[] = [
  {
    id: "cuts",
    title: "Cuts",
    description: "Precision fades & classic scissor work",
    baseColor: "#2a1816",
    hoverColor: "#c13b2f",
    icon: "scissors",
  },
  {
    id: "beard",
    title: "Beard Trim",
    description: "Shape, line, and define",
    baseColor: "#1f1a14",
    hoverColor: "#a0522d",
    icon: "beard",
  },
  {
    id: "shave",
    title: "Hot Towel Shave",
    description: "Straight razor, steamed ritual",
    baseColor: "#141c24",
    hoverColor: "#2a5c8a",
    icon: "towel",
  },
  {
    id: "color",
    title: "Color",
    description: "Grey blend & tone refresh",
    baseColor: "#1a1424",
    hoverColor: "#6b3fa0",
    icon: "color",
  },
  {
    id: "styling",
    title: "Styling",
    description: "Finish, texture & hold",
    baseColor: "#201c16",
    hoverColor: "#c9a876",
    icon: "style",
  },
];

export const CARD_SIZE = 240;
export const CARD_GAP = 24;
export const MAGNETIC_RADIUS = 120;
export const MAX_DISPLACEMENT = 16;
export const NEIGHBOR_BLEED = 0.3;

export function getGridColumnCount(containerWidth: number): number {
  const stride = CARD_SIZE + CARD_GAP;
  return Math.max(1, Math.min(SERVICES.length, Math.floor((containerWidth + CARD_GAP) / stride)));
}

export function getNeighborIndices(
  index: number,
  columnCount: number,
  total: number,
): number[] {
  const neighbors: number[] = [];
  const row = Math.floor(index / columnCount);
  const col = index % columnCount;

  if (col > 0) neighbors.push(index - 1);
  if (col < columnCount - 1 && index + 1 < total) neighbors.push(index + 1);
  if (row > 0) neighbors.push(index - columnCount);
  if (index + columnCount < total) neighbors.push(index + columnCount);

  return neighbors;
}

export function computeDisplacement(
  clientX: number,
  clientY: number,
  centerX: number,
  centerY: number,
): { x: number; y: number } | null {
  const dx = clientX - centerX;
  const dy = clientY - centerY;
  const distance = Math.hypot(dx, dy);

  if (distance > MAGNETIC_RADIUS || distance === 0) return null;

  const magnitude = Math.min(MAX_DISPLACEMENT, (distance / MAGNETIC_RADIUS) * MAX_DISPLACEMENT);
  return {
    x: (dx / distance) * magnitude,
    y: (dy / distance) * magnitude,
  };
}
