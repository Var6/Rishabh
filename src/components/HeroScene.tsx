"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import useMobileSceneConfig from "./useMobileSceneConfig";

function FloatingOrb({ scroll, isMobile }: { scroll: number; isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    const scrollFactor = scroll * (isMobile ? 0.0016 : 0.001);
    meshRef.current.rotation.x = elapsed * (isMobile ? 0.22 : 0.15) + scrollFactor;
    meshRef.current.rotation.y = elapsed * (isMobile ? 0.3 : 0.22) + scrollFactor * 0.7;

    if (cageRef.current) {
      cageRef.current.rotation.x = -elapsed * 0.08 + scrollFactor * 0.5;
      cageRef.current.rotation.y = elapsed * 0.12 + scrollFactor * 0.35;
    }
  });

  return (
    <Float speed={isMobile ? 1.8 : 1.4} rotationIntensity={isMobile ? 0.55 : 0.4} floatIntensity={isMobile ? 1 : 0.8}>
      {/* Solid glowing core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#6366f1"
          distort={0.35}
          speed={2.5}
          roughness={0.05}
          metalness={0.9}
          opacity={0.85}
          transparent
        />
      </mesh>
      {/* Outer wireframe cage */}
      <mesh ref={cageRef} scale={isMobile ? 1.26 : 1.18}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#818cf8" wireframe opacity={0.3} transparent />
      </mesh>
    </Float>
  );
}

function Particles({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 42 : 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  const geoRef = useRef<THREE.BufferGeometry>(null);
  useFrame((state) => {
    if (geoRef.current) {
      geoRef.current.attributes.position.needsUpdate = true;
      const pos = geoRef.current.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.002;
      }
    }
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#a5b4fc" size={0.04} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

export default function HeroScene() {
  const { mounted, isMobile, scroll } = useMobileSceneConfig();

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, isMobile ? 4.4 : 4], fov: isMobile ? 56 : 50 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      dpr={isMobile ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: !isMobile, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#6366f1" />
      <pointLight position={[-5, -5, -3]} intensity={1.5} color="#a855f7" />
      <pointLight position={[0, 3, 2]} intensity={1} color="#22d3ee" />
      <FloatingOrb scroll={scroll} isMobile={isMobile} />
      <Particles isMobile={isMobile} />
    </Canvas>
  );
}
