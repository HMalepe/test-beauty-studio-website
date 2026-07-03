"use client";

import { Environment } from "@react-three/drei";
import type { Group } from "three";
import type { MutableRefObject } from "react";
import { ScrollRazorGroup } from "./StraightRazor";
import { HeroLighting } from "./shared/HeroLighting";
import { HeroPostEffects } from "./shared/HeroPostEffects";
import { useIsMobile } from "./shared/useIsMobile";

type RazorSceneProps = {
  scrollGroupRef: MutableRefObject<Group | null>;
  scrollProgressRef: MutableRefObject<number>;
  onMeshReady: () => void;
};

export function RazorScene({
  scrollGroupRef,
  scrollProgressRef,
  onMeshReady,
}: RazorSceneProps) {
  const isMobile = useIsMobile();

  return (
    <>
      <HeroLighting />
      <Environment preset="studio" />

      <ScrollRazorGroup
        scrollGroupRef={scrollGroupRef}
        scrollProgressRef={scrollProgressRef}
        onMeshReady={onMeshReady}
      />

      {!isMobile && <HeroPostEffects />}
    </>
  );
}
