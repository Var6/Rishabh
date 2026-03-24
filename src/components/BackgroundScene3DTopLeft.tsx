"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Nucleus — rose/pink distorted icosahedron ─────────────────── */
function Nucleus({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = scroll * 0.0022;
    if (!ref.current) return;
    ref.current.rotation.x = t * 0.14 + s;
    ref.current.rotation.y = t * 0.20 + s * 0.8;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.52, 2]} />
      <MeshDistortMaterial
        color="#f43f5e"
        distort={0.25}
        speed={2.8}
        roughness={0.05}
        metalness={0.9}
        emissive="#be123c"
        emissiveIntensity={0.65}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}

/* ─── Electron: tiny sphere that orbits along a torus path ──────── */
function Electron({
  radius,
  speed,
  tiltX,
  tiltZ,
  color,
  scroll,
}: {
  radius: number;
  speed: number;
  tiltX: number;
  tiltZ: number;
  color: string;
  scroll: number;
}) {
  const ref    = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const s = scroll * 0.0015;
    const angle = t * speed + offset + s;
    // orbit in XZ plane then apply tilt via parent transform
    ref.current.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * Math.sin(tiltX),
      Math.sin(angle) * radius * Math.cos(tiltX)
    );
    // tiny self-spin
    ref.current.rotation.y = t * 2;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        roughness={0.1}
        metalness={0.5}
      />
    </mesh>
  );
}

/* ─── Orbital ring (torus) ──────────────────────────────────────── */
function OrbitalRing({
  scale,
  rotX,
  rotZ,
  color,
  scroll,
  spinSpeed,
}: {
  scale: number;
  rotX: number;
  rotZ: number;
  color: string;
  scroll: number;
  spinSpeed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const s = scroll * 0.002;
    ref.current.rotation.x = rotX + t * spinSpeed + s;
    ref.current.rotation.z = rotZ + t * spinSpeed * 0.6 + s * 0.5;
  });

  return (
    <mesh ref={ref} scale={scale}>
      <torusGeometry args={[1, 0.022, 8, 110]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}

/* ─── Scattered rose/amber particles ────────────────────────────── */
function AtomParticles({ scroll }: { scroll: number }) {
  const ref   = useRef<THREE.Points>(null);
  const count = 130;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.8 + Math.random() * 1.6;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y =  state.clock.getElapsedTime() * 0.05 + scroll * 0.0003;
    ref.current.rotation.x = -state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#fda4af" size={0.036} sizeAttenuation transparent opacity={0.75} />
    </points>
  );
}

function AtomScene({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // drifts DOWN as user scrolls (peeks more from top-left corner)
    groupRef.current.position.y =
      THREE.MathUtils.lerp(groupRef.current.position.y, scroll * 0.003, 0.06);
    groupRef.current.position.x =
      THREE.MathUtils.lerp(groupRef.current.position.x, scroll * 0.0006, 0.06);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[ 4,  4,  4]} intensity={7}   color="#f43f5e" />
      <pointLight position={[-3, -2,  3]} intensity={3.5} color="#fb923c" />
      <pointLight position={[ 0, -4,  2]} intensity={2}   color="#fbbf24" />

      <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.5}>
        <Nucleus scroll={scroll} />

        {/* Three orbital rings — different axes */}
        <OrbitalRing scale={1.3}  rotX={0}           rotZ={0}           color="#fb7185" scroll={scroll} spinSpeed={0.22} />
        <OrbitalRing scale={1.55} rotX={Math.PI / 3} rotZ={0}           color="#fbbf24" scroll={scroll} spinSpeed={0.16} />
        <OrbitalRing scale={1.8}  rotX={Math.PI / 2} rotZ={Math.PI / 4} color="#f97316" scroll={scroll} spinSpeed={0.11} />

        {/* One electron per ring */}
        <Electron radius={1.3}  speed={1.3} tiltX={0}           tiltZ={0} color="#fda4af" scroll={scroll} />
        <Electron radius={1.55} speed={0.9} tiltX={Math.PI / 3} tiltZ={0} color="#fde68a" scroll={scroll} />
        <Electron radius={1.8}  speed={0.7} tiltX={Math.PI / 2} tiltZ={0} color="#fed7aa" scroll={scroll} />
      </Float>

      <AtomParticles scroll={scroll} />
    </group>
  );
}

/* ─── Wrapper — fixed top-left corner, desktop only ─────────────── */
export default function BackgroundScene3DTopLeft() {
  const [scroll,  setScroll]  = useState(0);
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
      className="fixed pointer-events-none z-0 hidden sm:block opacity-30 dark:opacity-50"
      style={{
        top: 0,
        left: 0,
        width: 360,
        height: 360,
        transform: "translate(-95px, -95px)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <AtomScene scroll={scroll} />
      </Canvas>
    </div>
  );
}
