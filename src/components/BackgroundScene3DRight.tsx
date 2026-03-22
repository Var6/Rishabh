"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Nebula puff particles ─────────────────────────────────────── */
function NebulaPuff({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Points>(null);
  const count = 180;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spherical shell distribution
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.8 + Math.random() * 1.8;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y =  state.clock.getElapsedTime() * 0.04 - scroll * 0.0004;
    ref.current.rotation.x =  state.clock.getElapsedTime() * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#67e8f9"
        size={0.032}
        sizeAttenuation
        transparent
        opacity={0.75}
      />
    </points>
  );
}

/* ─── Accent violet micro-star ring ────────────────────────────── */
function StarRingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 55;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 2.4 + (Math.random() - 0.5) * 0.12;
      arr[i * 3]     = Math.cos(angle) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.18;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.09;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#e879f9"
        size={0.042}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

/* ─── Gyroscope crystal: 3 axis-locked rings + octahedron core ─── */
function Gyroscope({ scroll }: { scroll: number }) {
  const coreRef  = useRef<THREE.Mesh>(null);
  const ringXRef = useRef<THREE.Mesh>(null); // spins on X
  const ringYRef = useRef<THREE.Mesh>(null); // spins on Y
  const ringZRef = useRef<THREE.Mesh>(null); // spins on Z
  const cageRef  = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = scroll * 0.0009;

    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.18 + s;
      coreRef.current.rotation.y = t * 0.22 + s * 0.7;
    }
    if (ringXRef.current) {
      ringXRef.current.rotation.x = t * 0.5 + s * 1.2; // fast X spin
    }
    if (ringYRef.current) {
      ringYRef.current.rotation.y = t * 0.38 + s * 0.8; // medium Y spin
    }
    if (ringZRef.current) {
      ringZRef.current.rotation.z = -t * 0.28 + s * 0.5; // counter-rotate Z
      ringZRef.current.rotation.x = Math.PI / 4;
    }
    if (cageRef.current) {
      cageRef.current.rotation.x = -t * 0.06;
      cageRef.current.rotation.y =  t * 0.09 + s * 0.3;
    }
  });

  return (
    <Float speed={1.0} rotationIntensity={0.14} floatIntensity={0.5}>
      {/* Octahedron core — cyan glow */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.6, 0]} />
        <MeshDistortMaterial
          color="#06b6d4"
          distort={0.22}
          speed={2.6}
          roughness={0.04}
          metalness={0.9}
          emissive="#0e7490"
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Dodecahedron wireframe cage */}
      <mesh ref={cageRef} scale={1.5}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.14} />
      </mesh>

      {/* Gyroscope ring — X axis (cyan) */}
      <mesh ref={ringXRef} scale={1.2}>
        <torusGeometry args={[1, 0.028, 8, 100]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
      </mesh>

      {/* Gyroscope ring — Y axis (magenta) */}
      <mesh ref={ringYRef} scale={1.4} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.022, 8, 100]} />
        <meshBasicMaterial color="#e879f9" transparent opacity={0.55} />
      </mesh>

      {/* Gyroscope ring — Z axis (violet) */}
      <mesh ref={ringZRef} scale={1.6}>
        <torusGeometry args={[1, 0.018, 8, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.45} />
      </mesh>
    </Float>
  );
}

/* ─── Root scene — drifts downward on scroll ────────────────────── */
function Scene({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // drifts DOWN (opposite to left scene which drifts up)
    groupRef.current.position.y =
      THREE.MathUtils.lerp(groupRef.current.position.y, scroll * 0.0012, 0.05);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[-4,  4,  4]}  intensity={6}   color="#0891b2" />
      <pointLight position={[ 3, -2,  3]}  intensity={3.5} color="#c026d3" />
      <pointLight position={[ 0,  4,  2]}  intensity={2}   color="#8b5cf6" />

      <Gyroscope scroll={scroll} />
      <NebulaPuff scroll={scroll} />
      <StarRingParticles />
    </group>
  );
}

/* ─── Wrapper — fixed right-center, desktop only ───────────────── */
export default function BackgroundScene3DRight() {
  const [scroll, setScroll]   = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setMounted(true);
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed pointer-events-none z-0 hidden sm:block opacity-35 dark:opacity-55"
      style={{
        right: 0,
        top: "50%",
        width: 380,
        height: 380,
        transform: "translate(90px, -50%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene scroll={scroll} />
      </Canvas>
    </div>
  );
}
