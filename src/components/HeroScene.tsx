"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.22;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
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
      <mesh scale={1.18}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#818cf8" wireframe opacity={0.3} transparent />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 80;
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
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#6366f1" />
      <pointLight position={[-5, -5, -3]} intensity={1.5} color="#a855f7" />
      <pointLight position={[0, 3, 2]} intensity={1} color="#22d3ee" />
      <FloatingOrb />
      <Particles />
    </Canvas>
  );
}
