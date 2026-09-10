"use client";
import { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import Image from "next/image";
import { useLang } from "@/lib/lang-context";

/* ─── 3D Software Badge Component ───────────────────────────── */
interface SoftwareBadgeProps {
  label: string;
  sublabel?: string;
  bgGradient: string[];
  textColor: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  floatSpeed?: number;
  floatRotation?: number;
}

function SoftwareBadge3D({
  label,
  sublabel,
  bgGradient,
  textColor,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  floatSpeed = 2,
  floatRotation = 0.3,
}: SoftwareBadgeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Smooth mouse parallax
    const targetX = position[0] + mouse.x * 0.35;
    const targetY = position[1] + mouse.y * 0.25;
    
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    
    // Slight hover tilt & scale pulse
    const targetScale = hovered ? scale * 1.15 : scale;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  // Create rounded rectangle tile shape
  const tileShape = new THREE.Shape();
  const width = 1.1;
  const height = 1.1;
  const radius = 0.28;

  tileShape.moveTo(-width / 2 + radius, -height / 2);
  tileShape.lineTo(width / 2 - radius, -height / 2);
  tileShape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
  tileShape.lineTo(width / 2, height / 2 - radius);
  tileShape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
  tileShape.lineTo(-width / 2 + radius, height / 2);
  tileShape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
  tileShape.lineTo(-width / 2, -height / 2 + radius);
  tileShape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);

  const extrudeSettings = {
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 4,
  };

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={floatRotation}
      floatIntensity={0.8}
    >
      <group
        ref={meshRef}
        position={position}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* 3D Rounded Tile Body */}
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[tileShape, extrudeSettings]} />
          <meshPhysicalMaterial
            color={bgGradient[0]}
            metalness={0.65}
            roughness={0.2}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
            emissive={bgGradient[1] || bgGradient[0]}
            emissiveIntensity={hovered ? 0.4 : 0.15}
          />
        </mesh>

        {/* Outer subtle glow ring */}
        <mesh position={[0, 0, -0.05]}>
          <torusGeometry args={[0.72, 0.012, 16, 64]} />
          <meshBasicMaterial color={textColor} transparent opacity={hovered ? 0.8 : 0.3} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── 3D Text Backdrop "TAHA" ───────────────────────────────── */
function BackdropTitle3D() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle mouse tilt
    groupRef.current.rotation.y = mouse.x * 0.08 + Math.sin(t * 0.3) * 0.02;
    groupRef.current.rotation.x = -mouse.y * 0.05 + Math.cos(t * 0.25) * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, 0.6, -1.8]}>
      {/* Background red radiant glow orb */}
      <mesh position={[0, 0, -0.8]}>
        <sphereGeometry args={[4.2, 32, 32]} />
        <meshBasicMaterial color="#E23829" transparent opacity={0.18} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

/* ─── Particle Atmosphere ───────────────────────────────────── */
function ParticleAtmosphere({ count = 2500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions, colors] = (() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 7;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi) - 1.5;

      const rnd = Math.random();
      if (rnd < 0.6) {
        col[i3] = 0.88; col[i3 + 1] = 0.22; col[i3 + 2] = 0.16; // Radiant red
      } else if (rnd < 0.85) {
        col[i3] = 1.0; col[i3 + 1] = 0.45; col[i3 + 2] = 0.35; // Radiant coral
      } else {
        col[i3] = 1.0; col[i3 + 1] = 0.9; col[i3 + 2] = 0.9; // Soft white highlight
      }
    }
    return [pos, col];
  })();

  const posRef = useRef(positions);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.035;
    ref.current.rotation.x = Math.sin(t * 0.02) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posRef.current, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Hero Section Component ────────────────────────────────── */
export default function HeroScene() {
  const { t } = useLang();
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setReady(true);
    }, 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full overflow-hidden flex flex-col justify-between"
      style={{ height: "100svh", background: "#050101" }}
    >
      {/* ── 3D Canvas Background & Floating Software Badges ── */}
      {ready && (
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <Canvas
            camera={{ position: [0, 0, 7.5], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.5,
            }}
          >
            {/* Ambient & Radiant Point Lights */}
            <ambientLight intensity={0.6} color="#ffb0b0" />
            <directionalLight position={[4, 8, 6]} intensity={3} color="#ffffff" />
            <directionalLight position={[-4, 3, -2]} intensity={1.5} color="#ff6655" />
            <pointLight position={[-4, 2, 2]} intensity={4.5} color="#E23829" distance={16} />
            <pointLight position={[4, -2, 2]} intensity={3.5} color="#FF5A4D" distance={14} />
            <pointLight position={[0, 4, 1]} intensity={2.5} color="#ffffff" distance={12} />

            <Suspense fallback={null}>
              <BackdropTitle3D />
              <ParticleAtmosphere count={2500} />

              {/* 3D Software Badges Floating Left & Right */}
              {/* Left Side Badges */}
              <SoftwareBadge3D
                label="Pr"
                sublabel="Premiere"
                bgGradient={["#000055", "#0000aa"]}
                textColor="#9999ff"
                position={[-3.6, 1.4, 0.5]}
                rotation={[0.15, 0.25, -0.1]}
                scale={1.1}
                floatSpeed={2.2}
              />
              <SoftwareBadge3D
                label="Ai"
                sublabel="Illustrator"
                bgGradient={["#331100", "#ff6600"]}
                textColor="#ffaa00"
                position={[-3.1, -0.6, 1.2]}
                rotation={[-0.1, 0.3, 0.15]}
                scale={1.05}
                floatSpeed={1.8}
              />
              <SoftwareBadge3D
                label="DaVinci"
                sublabel="Resolve"
                bgGradient={["#111122", "#0088cc"]}
                textColor="#00ccff"
                position={[-4.1, -2.1, -0.2]}
                rotation={[0.2, 0.15, -0.05]}
                scale={0.95}
                floatSpeed={2.5}
              />

              {/* Right Side Badges */}
              <SoftwareBadge3D
                label="Ps"
                sublabel="Photoshop"
                bgGradient={["#001133", "#0066cc"]}
                textColor="#31a8ff"
                position={[3.4, 0.9, 0.8]}
                rotation={[-0.15, -0.25, 0.1]}
                scale={1.1}
                floatSpeed={2.0}
              />
              <SoftwareBadge3D
                label="Ae"
                sublabel="After Effects"
                bgGradient={["#220033", "#9900cc"]}
                textColor="#cf96fd"
                position={[3.9, -1.2, 0.3]}
                rotation={[0.1, -0.2, -0.12]}
                scale={1.0}
                floatSpeed={2.4}
              />
              <SoftwareBadge3D
                label="Blender"
                sublabel="3D"
                bgGradient={["#2a1800", "#e87d0d"]}
                textColor="#ea7600"
                position={[2.7, -2.3, 1.0]}
                rotation={[-0.2, -0.1, 0.08]}
                scale={1.05}
                floatSpeed={1.9}
              />

              <Environment preset="studio" />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* ── Center Visual Layer: TAHA / ELmaanaoui Title & Portrait Cutout ── */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center pointer-events-none overflow-hidden">
        {/* Giant 3D Backdrop Text "TAHA" */}
        <div className="relative w-full text-center flex flex-col items-center justify-center select-none">
          <h1
            className="tracking-tighter font-extrabold uppercase"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(7rem, 23vw, 22rem)",
              lineHeight: 0.82,
              background: "linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 45%, #999999 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 45px rgba(226,56,41,0.65)) drop-shadow(0 20px 30px rgba(0,0,0,0.9))",
              letterSpacing: "0.02em",
            }}
          >
            TAHA
          </h1>

          {/* Neon Radiant Red Cursive Script "ELmaanaoui" Overlay */}
          <div
            className="absolute z-20 font-bold"
            style={{
              top: "46%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-3deg)",
              fontFamily: '"Dancing Script", "Brush Script MT", cursive',
              fontSize: "clamp(3.5rem, 11vw, 10rem)",
              color: "#FFF0F0",
              textShadow:
                "0 0 10px #FF5A4D, 0 0 25px #E23829, 0 0 50px #E23829, 0 0 80px #841512",
              whiteSpace: "nowrap",
            }}
          >
            ELmaanaoui
          </div>
        </div>
      </div>

      {/* ── Floating Software Badges (HTML Overlay with 3D feel for crisp branding) ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none flex justify-between items-center px-4 md:px-12">
        {/* Left Side Floating Badges */}
        <div className="flex flex-col gap-6 md:gap-10 pointer-events-auto">
          {/* Premiere Pro */}
          <div className="group relative flex items-center gap-3 bg-gradient-to-br from-[#0f0a28]/90 to-[#040114]/90 border border-[#9999ff]/40 px-4 py-3 rounded-2xl backdrop-blur-md shadow-[0_0_25px_rgba(153,153,255,0.2)] hover:scale-110 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#000055] border border-[#9999ff] flex items-center justify-center font-bold text-lg text-[#9999ff]">
              Pr
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-mono text-white/90 font-bold">Premiere Pro</div>
              <div className="text-[0.6rem] font-mono text-white/40">Video Editing</div>
            </div>
          </div>

          {/* Illustrator */}
          <div className="group relative flex items-center gap-3 bg-gradient-to-br from-[#28140a]/90 to-[#140801]/90 border border-[#ffaa00]/40 px-4 py-3 rounded-2xl backdrop-blur-md shadow-[0_0_25px_rgba(255,170,0,0.2)] hover:scale-110 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#331100] border border-[#ffaa00] flex items-center justify-center font-bold text-lg text-[#ffaa00]">
              Ai
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-mono text-white/90 font-bold">Illustrator</div>
              <div className="text-[0.6rem] font-mono text-white/40">Vector Graphic</div>
            </div>
          </div>

          {/* DaVinci Resolve */}
          <div className="group relative flex items-center gap-3 bg-gradient-to-br from-[#0a1828]/90 to-[#010a14]/90 border border-[#00ccff]/40 px-4 py-3 rounded-2xl backdrop-blur-md shadow-[0_0_25px_rgba(0,204,255,0.2)] hover:scale-110 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#002244] border border-[#00ccff] flex items-center justify-center font-bold text-sm text-[#00ccff]">
              DaVinci
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-mono text-white/90 font-bold">Resolve</div>
              <div className="text-[0.6rem] font-mono text-white/40">Color Grading</div>
            </div>
          </div>
        </div>

        {/* Right Side Floating Badges */}
        <div className="flex flex-col gap-6 md:gap-10 pointer-events-auto">
          {/* Photoshop */}
          <div className="group relative flex items-center gap-3 bg-gradient-to-br from-[#0a1c33]/90 to-[#010c1a]/90 border border-[#31a8ff]/40 px-4 py-3 rounded-2xl backdrop-blur-md shadow-[0_0_25px_rgba(49,168,255,0.2)] hover:scale-110 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#001133] border border-[#31a8ff] flex items-center justify-center font-bold text-lg text-[#31a8ff]">
              Ps
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-xs font-mono text-white/90 font-bold">Photoshop</div>
              <div className="text-[0.6rem] font-mono text-white/40">Image Design</div>
            </div>
          </div>

          {/* After Effects */}
          <div className="group relative flex items-center gap-3 bg-gradient-to-br from-[#200a33]/90 to-[#0c011a]/90 border border-[#cf96fd]/40 px-4 py-3 rounded-2xl backdrop-blur-md shadow-[0_0_25px_rgba(207,150,253,0.2)] hover:scale-110 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#220033] border border-[#cf96fd] flex items-center justify-center font-bold text-lg text-[#cf96fd]">
              Ae
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-xs font-mono text-white/90 font-bold">After Effects</div>
              <div className="text-[0.6rem] font-mono text-white/40">VFX & Motion</div>
            </div>
          </div>

          {/* Blender */}
          <div className="group relative flex items-center gap-3 bg-gradient-to-br from-[#2b1805]/90 to-[#140901]/90 border border-[#ea7600]/40 px-4 py-3 rounded-2xl backdrop-blur-md shadow-[0_0_25px_rgba(234,118,0,0.2)] hover:scale-110 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-[#2a1800] border border-[#ea7600] flex items-center justify-center font-bold text-xs text-[#ea7600]">
              Blender
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-xs font-mono text-white/90 font-bold">Blender 3D</div>
              <div className="text-[0.6rem] font-mono text-white/40">3D Animation</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar: Tagline & Scroll Down ── */}
      <div className="relative z-20 w-full px-6 md:px-12 pb-8 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
        {/* Left Founded Label */}
        <div className="text-xs font-mono text-white/40 tracking-[0.3em] uppercase">
          EST. 2024 • TAHA ELMAANAOUl
        </div>

        {/* Center Tagline */}
        <div
          className="text-center font-mono font-bold tracking-[0.35em] text-white/90 uppercase text-xs md:text-sm"
          style={{
            textShadow: "0 0 15px rgba(226,56,41,0.5)",
          }}
        >
          STRATEGY &nbsp;•&nbsp; EDITING &nbsp;•&nbsp; SUCCESS
        </div>

        {/* Right Scroll Indicator */}
        <div
          className="flex items-center gap-3 cursor-pointer text-white/50 hover:text-white transition-colors"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-[0.6rem] font-mono tracking-[0.3em]">SCROLL</span>
          <span className="scroll-indicator">↓</span>
        </div>
      </div>
    </section>
  );
}
