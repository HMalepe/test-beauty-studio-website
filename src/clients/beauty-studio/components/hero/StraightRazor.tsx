"use client";

import { useCallback, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { MutableRefObject, ReactNode } from "react";

export function StraightRazor() {
  return (
    <group rotation={[0.15, 0, 0.05]}>
      {/* Chrome blade */}
      <mesh castShadow receiveShadow position={[0, 0.008, 0.42]}>
        <boxGeometry args={[0.95, 0.012, 0.14]} />
        <meshStandardMaterial
          color="#f0f0f0"
          metalness={1}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Blade spine / tang */}
      <mesh castShadow position={[0, 0.02, 0.02]}>
        <boxGeometry args={[0.12, 0.025, 0.35]} />
        <meshStandardMaterial
          color="#c8c8c8"
          metalness={1}
          roughness={0.2}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Pivot pin */}
      <mesh position={[0, 0.02, -0.08]}>
        <cylinderGeometry args={[0.018, 0.018, 0.16, 12]} />
        <meshStandardMaterial
          color="#d4d4d4"
          metalness={1}
          roughness={0.25}
        />
      </mesh>

      {/* Dark handle scales */}
      <mesh castShadow position={[0, 0, -0.38]}>
        <boxGeometry args={[0.1, 0.04, 0.42]} />
        <meshStandardMaterial
          color="#1a1208"
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* Handle end cap */}
      <mesh position={[0, 0, -0.62]}>
        <cylinderGeometry args={[0.045, 0.055, 0.06, 16]} />
        <meshStandardMaterial
          color="#2a1f12"
          metalness={0.4}
          roughness={0.55}
        />
      </mesh>

      {/* Decorative pin on handle */}
      <mesh position={[0, 0.022, -0.38]}>
        <cylinderGeometry args={[0.012, 0.012, 0.1, 8]} />
        <meshStandardMaterial
          color="#8a7355"
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

type IdleRazorGroupProps = {
  scrollProgressRef: MutableRefObject<number>;
  children: ReactNode;
};

export function IdleRazorGroup({
  scrollProgressRef,
  children,
}: IdleRazorGroupProps) {
  const idleRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!idleRef.current) return;
    if (scrollProgressRef.current > 0.001) return;
    idleRef.current.rotation.y += 0.05 * delta;
  });

  return <group ref={idleRef}>{children}</group>;
}

type ScrollRazorGroupProps = {
  scrollGroupRef: MutableRefObject<Group | null>;
  scrollProgressRef: MutableRefObject<number>;
  onMeshReady: () => void;
};

export function ScrollRazorGroup({
  scrollGroupRef,
  scrollProgressRef,
  onMeshReady,
}: ScrollRazorGroupProps) {
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
    <group ref={setGroupRef}>
      <IdleRazorGroup scrollProgressRef={scrollProgressRef}>
        <StraightRazor />
      </IdleRazorGroup>
    </group>
  );
}
