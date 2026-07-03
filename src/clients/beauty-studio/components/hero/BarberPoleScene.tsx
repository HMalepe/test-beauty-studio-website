"use client";

import { Environment } from "@react-three/drei";
import type { Group } from "three";
import type { MutableRefObject } from "react";
import { ScrollBarberPoleGroup } from "./BarberPole";
import { HeroLighting } from "./shared/HeroLighting";
import { HeroPostEffects } from "./shared/HeroPostEffects";
import { useIsMobile } from "./shared/useIsMobile";

type BarberPoleSceneProps = {
  scrollGroupRef: MutableRefObject<Group | null>;
  stripeSpeedRef: MutableRefObject<number>;
  onMeshReady: () => void;
};

export function BarberPoleScene({
  scrollGroupRef,
  stripeSpeedRef,
  onMeshReady,
}: BarberPoleSceneProps) {
  const isMobile = useIsMobile();

  return (
    <>
      <HeroLighting />
      <Environment preset="studio" />

      <ScrollBarberPoleGroup
        scrollGroupRef={scrollGroupRef}
        stripeSpeedRef={stripeSpeedRef}
        onMeshReady={onMeshReady}
      />

      {!isMobile && <HeroPostEffects />}
    </>
  );
}
