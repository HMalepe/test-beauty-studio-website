export function HeroLighting() {
  return (
    <>
      <directionalLight
        position={[4, 5, 3]}
        intensity={2.5}
        color="#fff4e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={1.2}
        color="#a8c8ff"
      />
      <directionalLight position={[0, -3, 4]} intensity={0.4} color="#ffffff" />
      <ambientLight intensity={0.08} />
    </>
  );
}
