"use client";

import { useCallback, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { MutableRefObject } from "react";
import "./BarberPoleMaterial";
import type { BarberPoleShaderMaterialImpl } from "./BarberPoleMaterial";

const CHROME = {
  color: "#f0f0f0",
  metalness: 1,
  roughness: 0.1,
  envMapIntensity: 1.5,
};

const POLE_RADIUS = 0.4;
const POLE_HEIGHT = 3;
const CAP_RADIUS = 0.44;

type BarberPoleMeshProps = {
  stripeSpeedRef: MutableRefObject<number>;
};

function BarberPoleMesh({ stripeSpeedRef }: BarberPoleMeshProps) {
  const materialRef = useRef<BarberPoleShaderMaterialImpl>(null);

  useFrame((state) => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uTime = state.clock.elapsedTime;
    mat.uSpeed = stripeSpeedRef.current;
  });

  const halfHeight = POLE_HEIGHT / 2;

  return (
    <group>
      {/* Striped cylinder core */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[POLE_RADIUS, POLE_RADIUS, POLE_HEIGHT, 32]} />
        <barberPoleShaderMaterial ref={materialRef} />
      </mesh>

      {/* Chrome cap — top */}
      <mesh castShadow position={[0, halfHeight + 0.12, 0]}>
        <sphereGeometry args={[CAP_RADIUS, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <mesh castShadow position={[0, halfHeight + 0.08, 0]}>
        <cylinderGeometry args={[CAP_RADIUS * 0.85, CAP_RADIUS, 0.16, 24]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>

      {/* Chrome cap — bottom */}
      <mesh castShadow position={[0, -halfHeight - 0.12, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[CAP_RADIUS, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      <mesh castShadow position={[0, -halfHeight - 0.08, 0]}>
        <cylinderGeometry args={[CAP_RADIUS, CAP_RADIUS * 0.85, 0.16, 24]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
    </group>
  );
}

type ScrollBarberPoleGroupProps = {
  scrollGroupRef: MutableRefObject<Group | null>;
  stripeSpeedRef: MutableRefObject<number>;
  onMeshReady: () => void;
};

export function ScrollBarberPoleGroup({
  scrollGroupRef,
  stripeSpeedRef,
  onMeshReady,
}: ScrollBarberPoleGroupProps) {
  const readyCalled = useRef(false);

  const setGroupRef = useCallback(
    (node: Group | null) => {
      scrollGroupRef.current = node;
      if (node && !readyCalled.current) {
        readyCalled.current = true;
        onMeshReady();
      }
    },
    [scrollGroupRef, onMeshReady],
  );

  return (
    <group ref={setGroupRef} position={[1.2, 0, 0]}>
      <BarberPoleMesh stripeSpeedRef={stripeSpeedRef} />
    </group>
  );
}
