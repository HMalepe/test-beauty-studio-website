import { shaderMaterial } from "@react-three/drei";
import { extend, type Object3DNode } from "@react-three/fiber";
import type { ShaderMaterial } from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uSpeed;
  varying vec2 vUv;

  vec3 stripeColor(float t) {
    t = fract(t);
    if (t < 0.333) return vec3(0.757, 0.231, 0.184); // barbershop red
    if (t < 0.666) return vec3(0.961, 0.937, 0.902); // warm white
    return vec3(0.176, 0.314, 0.686);                 // classic blue
  }

  void main() {
    // Diagonal stripe field — UV scroll mimics real pole helix without mesh spin
    float stripeCoord = vUv.y * 12.0 + vUv.x * 4.0 - uTime * uSpeed;
    vec3 color = stripeColor(stripeCoord);

    // Subtle cylindrical gloss
    float gloss = pow(max(0.0, sin(vUv.x * 6.28318 + uTime * 0.5)), 8.0) * 0.12;
    color += gloss;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const BarberPoleShaderMaterial = shaderMaterial(
  { uTime: 0, uSpeed: 0.3 },
  vertexShader,
  fragmentShader,
);

extend({ BarberPoleShaderMaterial });

export type BarberPoleShaderMaterialImpl = ShaderMaterial & {
  uTime: number;
  uSpeed: number;
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    barberPoleShaderMaterial: Object3DNode<
      BarberPoleShaderMaterialImpl,
      typeof BarberPoleShaderMaterial
    >;
  }
}
