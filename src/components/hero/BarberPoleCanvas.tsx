"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import type { Group } from "three";
import type { MutableRefObject } from "react";
import { useIsMobile } from "./shared/useIsMobile";
import { BarberPoleScene } from "./BarberPoleScene";

function PoleSuspenseFallback() {
  return (
    <mesh>
      <cylinderGeometry args={[0.4, 0.4, 3, 16]} />
      <meshStandardMaterial color="#888" metalness={0.5} roughness={0.4} />
    </mesh>
  );
}

type BarberPoleCanvasProps = {
  scrollGroupRef: MutableRefObject<Group | null>;
  stripeSpeedRef: MutableRefObject<number>;
  onMeshReady: () => void;
};

export function BarberPoleCanvas({
  scrollGroupRef,
  stripeSpeedRef,
  onMeshReady,
}: BarberPoleCanvasProps) {
  const isMobile = useIsMobile();

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 2]}
      camera={{
        position: isMobile ? [0, 0, 6.8] : [0, 0, 5.5],
        fov: isMobile ? 34 : 38,
        near: 0.1,
        far: 100,
      }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={<PoleSuspenseFallback />}>
        <BarberPoleScene
          scrollGroupRef={scrollGroupRef}
          stripeSpeedRef={stripeSpeedRef}
          onMeshReady={onMeshReady}
        />
      </Suspense>
    </Canvas>
  );
}
