"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import useMobileSceneConfig from "./useMobileSceneConfig";

/* ─── Galaxy-spiral particle cloud ─────────────────────────────── */
function GalaxyParticles({ scroll, isMobile }: { scroll: number; isMobile: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = isMobile ? 90 : 200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const arm = i % 2; // 2-arm spiral
      const angle = (i / count) * Math.PI * 9 + arm * Math.PI;
      const radius = 0.5 + (i / count) * 3.5;
      arr[i * 3]     = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.28;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.55;
      arr[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.28;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y =
      state.clock.getElapsedTime() * 0.045 + scroll * 0.0004;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#c4b5fd"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

/* ─── Accent outer dot ring (cyan) ─────────────────────────────── */
function AccentRingParticles({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = isMobile ? 28 : 60;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 2.2 + (Math.random() - 0.5) * 0.15;
      arr[i * 3]     = Math.cos(angle) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = -state.clock.getElapsedTime() * 0.07;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#38bdf8"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
}

/* ─── Central crystal: torus-knot + cage + two orbital rings ───── */
function Crystal({ scroll, isMobile }: { scroll: number; isMobile: boolean }) {
  const knotRef  = useRef<THREE.Mesh>(null);
  const cageRef  = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = scroll * 0.0022;   // ← was 0.0008 — 2.75× more responsive

    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.09 + s;
      knotRef.current.rotation.y = t * 0.13 + s * 0.6;
    }
    if (cageRef.current) {
      cageRef.current.rotation.x = -t * 0.04 + s * 0.5;
      cageRef.current.rotation.y =  t * 0.07 + s * 0.3;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.08 + s * 0.6;
      ring1Ref.current.rotation.x = Math.PI / 3 + s * 0.7;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.06 + s * 0.4;
      ring2Ref.current.rotation.z =  t * 0.05 + s * 0.3;
    }
  });

  return (
    <Float speed={isMobile ? 1.2 : 0.9} rotationIntensity={isMobile ? 0.18 : 0.12} floatIntensity={isMobile ? 0.72 : 0.55}>
      {/* Torus-knot jewel */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[0.55, 0.18, 140, 16, 2, 3]} />
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.18}
          speed={2.4}
          roughness={0.04}
          metalness={0.95}
          emissive="#5b21b6"
          emissiveIntensity={0.55}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Icosahedron wireframe cage */}
      <mesh ref={cageRef} scale={1.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Orbital ring 1 — violet */}
      <mesh ref={ring1Ref} scale={1.4}>
        <torusGeometry args={[1, 0.025, 8, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.65} />
      </mesh>

      {/* Orbital ring 2 — sky blue */}
      <mesh ref={ring2Ref} scale={1.8} rotation={[Math.PI / 2.3, 0.4, 0]}>
        <torusGeometry args={[1, 0.018, 8, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>
    </Float>
  );
}

/* ─── Root scene — drifts upward + right on scroll ─────────────── */
function Scene({ scroll, isMobile }: { scroll: number; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // upward drift + slight rightward swing + Z tilt as user scrolls
    groupRef.current.position.y =
      THREE.MathUtils.lerp(groupRef.current.position.y, -scroll * 0.003, 0.06);
    groupRef.current.position.x =
      THREE.MathUtils.lerp(groupRef.current.position.x,  scroll * 0.0008, 0.06);
    groupRef.current.rotation.z =
      THREE.MathUtils.lerp(groupRef.current.rotation.z,  scroll * 0.0004, 0.05);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[4,  4,  4]}  intensity={6}   color="#6d28d9" />
      <pointLight position={[-3, -2,  3]} intensity={3.5} color="#a855f7" />
      <pointLight position={[0,  -4,  2]} intensity={2}   color="#22d3ee" />

      <Crystal scroll={scroll} isMobile={isMobile} />
      <GalaxyParticles scroll={scroll} isMobile={isMobile} />
      <AccentRingParticles isMobile={isMobile} />
    </group>
  );
}

export default function BackgroundScene3D() {
  const { mounted, isMobile, scroll } = useMobileSceneConfig();

  if (!mounted) return null;

  return (
    <div
      className="fixed pointer-events-none z-0 opacity-25 dark:opacity-45 sm:opacity-35 sm:dark:opacity-55"
      style={{
        bottom: isMobile ? 24 : 0,
        left: isMobile ? -48 : 0,
        width: isMobile ? 220 : 380,
        height: isMobile ? 220 : 380,
        transform: isMobile ? "translate(0, 0)" : "translate(-90px, 90px)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, isMobile ? 6.2 : 5.5], fov: isMobile ? 54 : 46 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.6]}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene scroll={scroll} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
