"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import type { Group } from "three";
import type { MutableRefObject } from "react";
import { HeroCanvasFallback } from "./HeroCanvasFallback";
import { RazorScene } from "./RazorScene";

function CanvasSuspenseFallback() {
  return (
    <mesh rotation={[0.15, 0.4, 0]}>
      <boxGeometry args={[0.9, 0.02, 0.14]} />
      <meshStandardMaterial color="#888" metalness={0.8} roughness={0.3} />
    </mesh>
  );
}

type RazorCanvasProps = {
  scrollGroupRef: MutableRefObject<Group | null>;
  scrollProgressRef: MutableRefObject<number>;
  onMeshReady: () => void;
};

export function RazorCanvas({
  scrollGroupRef,
  scrollProgressRef,
  onMeshReady,
}: RazorCanvasProps) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, 4.2], fov: 42, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={<CanvasSuspenseFallback />}>
        <RazorScene
          scrollGroupRef={scrollGroupRef}
          scrollProgressRef={scrollProgressRef}
          onMeshReady={onMeshReady}
        />
      </Suspense>
    </Canvas>
  );
}

export { HeroCanvasFallback };
