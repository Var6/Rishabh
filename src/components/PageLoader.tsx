"use client";
import { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ─── 3D gem ──────────────────────────────────────────────────── */
function LoaderGem() {
  const knotRef  = useRef<THREE.Mesh>(null);
  const cageRef  = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.32;
      knotRef.current.rotation.y = t * 0.44;
    }
    if (cageRef.current) {
      cageRef.current.rotation.x = -t * 0.14;
      cageRef.current.rotation.y =  t * 0.20;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z  =  t * 0.26;
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.18;
      ring2Ref.current.rotation.x =  t * 0.12 + Math.PI / 3;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.65}>
      {/* Torus-knot jewel */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[0.7, 0.24, 160, 20, 2, 3]} />
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.22}
          speed={3.0}
          roughness={0.03}
          metalness={0.95}
          emissive="#5b21b6"
          emissiveIntensity={0.65}
          transparent
          opacity={0.93}
        />
      </mesh>

      {/* Icosahedron wireframe cage */}
      <mesh ref={cageRef} scale={1.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Orbital ring — violet */}
      <mesh ref={ring1Ref} scale={1.55}>
        <torusGeometry args={[1, 0.028, 8, 110]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.62} />
      </mesh>

      {/* Orbital ring — cyan */}
      <mesh ref={ring2Ref} scale={1.95}>
        <torusGeometry args={[1, 0.020, 8, 110]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.42} />
      </mesh>
    </Float>
  );
}

/* ─── Surrounding particles ───────────────────────────────────── */
function LoaderParticles() {
  const ref   = useRef<THREE.Points>(null);
  const count = 160;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 2.2 + Math.random() * 2.2;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y =  state.clock.getElapsedTime() * 0.07;
    ref.current.rotation.x =  state.clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c4b5fd" size={0.038} sizeAttenuation transparent opacity={0.82} />
    </points>
  );
}

function LoaderScene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[ 5,  5,  5]}  intensity={9}   color="#6d28d9" />
      <pointLight position={[-5, -3,  3]}  intensity={4.5} color="#a855f7" />
      <pointLight position={[ 0, -5,  2]}  intensity={3}   color="#22d3ee" />
      <LoaderGem />
      <LoaderParticles />
    </>
  );
}

/* ─── Loader shell ────────────────────────────────────────────── */
export default function PageLoader() {
  const [visible,  setVisible]  = useState(true);
  const [started,  setStarted]  = useState(false); // triggers CSS progress bar

  useEffect(() => {
    // Lock scroll while loader is up
    document.body.style.overflow = "hidden";

    // Kick off CSS progress bar on next tick
    const t1 = setTimeout(() => setStarted(true), 50);

    // Dismiss after bar finishes (2 s bar + 300 ms buffer)
    const t2 = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0f] select-none"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Radial glow behind the gem */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 48%, rgba(109,40,217,0.22) 0%, transparent 70%)",
            }}
          />

          {/* 3-D canvas */}
          <motion.div
            style={{ width: 300, height: 300 }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Canvas
              camera={{ position: [0, 0, 6], fov: 48 }}
              gl={{ antialias: true, alpha: true }}
              style={{ width: "100%", height: "100%" }}
            >
              <LoaderScene />
            </Canvas>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-white text-xl sm:text-2xl font-extrabold tracking-[0.25em] -mt-2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55, ease: "easeOut" }}
          >
            RISHABH{" "}
            <span className="gradient-text">RANJAN</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-slate-500 text-[11px] tracking-[0.3em] uppercase mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            Full-Stack Developer
          </motion.p>

          {/* Progress bar */}
          <div className="mt-10 w-44 h-[2px] rounded-full bg-white/8 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all ease-linear"
              style={{
                width: started ? "100%" : "0%",
                transitionDuration: "2000ms",
              }}
            />
          </div>

          {/* Pulsing dots */}
          <motion.div
            className="flex gap-1.5 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1 h-1 rounded-full bg-indigo-400"
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
