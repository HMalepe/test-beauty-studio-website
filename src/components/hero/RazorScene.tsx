"use client";

import { useEffect, useState } from "react";
import { Environment } from "@react-three/drei";
import type { Group } from "three";
import type { MutableRefObject } from "react";
import { RazorPostEffects } from "./RazorPostEffects";
import { ScrollRazorGroup } from "./StraightRazor";

type RazorSceneProps = {
  scrollGroupRef: MutableRefObject<Group | null>;
  scrollProgressRef: MutableRefObject<number>;
  onMeshReady: () => void;
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function RazorScene({
  scrollGroupRef,
  scrollProgressRef,
  onMeshReady,
}: RazorSceneProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Key light — warm, upper-right */}
      <directionalLight
        position={[4, 5, 3]}
        intensity={2.5}
        color="#fff4e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Rim light — cool, behind-left */}
      <directionalLight
        position={[-4, 2, -3]}
        intensity={1.2}
        color="#a8c8ff"
      />

      {/* Soft fill — front-bottom, neutral */}
      <directionalLight position={[0, -3, 4]} intensity={0.4} color="#ffffff" />

      <ambientLight intensity={0.08} />

      <Environment preset="studio" />

      <ScrollRazorGroup
        scrollGroupRef={scrollGroupRef}
        scrollProgressRef={scrollProgressRef}
        onMeshReady={onMeshReady}
      />

      {!isMobile && <RazorPostEffects />}
    </>
  );
}
