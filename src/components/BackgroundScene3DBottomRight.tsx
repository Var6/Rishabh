"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import useMobileSceneConfig from "./useMobileSceneConfig";

/* ─── Helix: stacked tori with progressive tilt (DNA-like) ──────── */
function HelixStack({ scroll }: { scroll: number }) {
  const RINGS = 7;
  const refs  = Array.from({ length: RINGS }, () => useRef<THREE.Mesh>(null)); // eslint-disable-line react-hooks/rules-of-hooks

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = scroll * 0.0022;
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const phase = (i / RINGS) * Math.PI * 2;
      ref.current.rotation.y = t * 0.25 + phase + s * (1 + i * 0.15);
      ref.current.rotation.x = t * 0.10 + phase * 0.5 + s * 0.4;
    });
  });

  return (
    <>
      {refs.map((ref, i) => {
        const y     = (i / (RINGS - 1) - 0.5) * 2.8;
        const scale = 0.65 + i * 0.09;
        const alpha = 0.35 + i * 0.07;
        const color = i % 2 === 0 ? "#34d399" : "#6ee7b7";
        return (
          <mesh key={i} ref={ref} position={[0, y, 0]} scale={scale}>
            <torusGeometry args={[1, 0.032, 8, 90]} />
            <meshBasicMaterial color={color} transparent opacity={alpha} />
          </mesh>
        );
      })}
    </>
  );
}

/* ─── Central emerald sphere (DNA spine) ────────────────────────── */
function DNACore({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = scroll * 0.002;
    if (!ref.current) return;
    ref.current.rotation.x = t * 0.18 + s;
    ref.current.rotation.y = t * 0.26 + s * 0.7;
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.48, 1]} />
      <MeshDistortMaterial
        color="#10b981"
        distort={0.28}
        speed={2.5}
        roughness={0.05}
        metalness={0.9}
        emissive="#065f46"
        emissiveIntensity={0.7}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}

/* ─── Outer wireframe cage ───────────────────────────────────────── */
function DNACage({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = scroll * 0.0018;
    if (!ref.current) return;
    ref.current.rotation.x = -t * 0.05 + s * 0.4;
    ref.current.rotation.y =  t * 0.08 + s * 0.3;
  });

  return (
    <mesh ref={ref} scale={2.0}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

/* ─── Emerald particle cloud ─────────────────────────────────────── */
function EmeraldParticles({ scroll, isMobile }: { scroll: number; isMobile: boolean }) {
  const ref   = useRef<THREE.Points>(null);
  const count = isMobile ? 60 : 140;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.9 + Math.random() * 1.7;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = -state.clock.getElapsedTime() * 0.045 - scroll * 0.0003;
    ref.current.rotation.x =  state.clock.getElapsedTime() * 0.028;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#6ee7b7" size={0.034} sizeAttenuation transparent opacity={0.72} />
    </points>
  );
}

function DNAScene({ scroll, isMobile }: { scroll: number; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // drifts UP as user scrolls (opposite to top-left which drifts down)
    groupRef.current.position.y =
      THREE.MathUtils.lerp(groupRef.current.position.y, -scroll * 0.003, 0.06);
    groupRef.current.position.x =
      THREE.MathUtils.lerp(groupRef.current.position.x, -scroll * 0.0006, 0.06);
    groupRef.current.rotation.z =
      THREE.MathUtils.lerp(groupRef.current.rotation.z,  scroll * 0.0003, 0.05);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[-4,  4,  4]} intensity={7}   color="#10b981" />
      <pointLight position={[ 3, -2,  3]} intensity={3.5} color="#34d399" />
      <pointLight position={[ 0,  4,  2]} intensity={2.5} color="#6ee7b7" />

      <Float speed={isMobile ? 1.15 : 0.9} rotationIntensity={isMobile ? 0.18 : 0.12} floatIntensity={isMobile ? 0.58 : 0.48}>
        <DNACore  scroll={scroll} />
        <DNACage  scroll={scroll} />
        <HelixStack scroll={scroll} />
      </Float>

      <EmeraldParticles scroll={scroll} isMobile={isMobile} />
    </group>
  );
}

export default function BackgroundScene3DBottomRight() {
  const { mounted, isMobile, scroll } = useMobileSceneConfig();

  if (!mounted) return null;

  return (
    <div
      className="fixed pointer-events-none z-0 opacity-20 dark:opacity-40 sm:opacity-30 sm:dark:opacity-50"
      style={{
        bottom: isMobile ? 16 : 0,
        right: isMobile ? -46 : 0,
        width: isMobile ? 190 : 360,
        height: isMobile ? 190 : 360,
        transform: isMobile ? "translate(0, 0)" : "translate(95px, 95px)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, isMobile ? 6.2 : 5.5], fov: isMobile ? 56 : 46 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.6]}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <DNAScene scroll={scroll} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
