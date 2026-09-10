"use client";
import { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useLang } from "@/lib/lang-context";

/* ─── North Arrow 3D ─────────────────────────────────────────── */
function NorthArrow3D() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const targetRotY = useRef(0);
  const targetRotX = useRef(0);

  useFrame((state) => {
    if (!groupRef.current || !innerRef.current) return;
    const t = state.clock.elapsedTime;

    // Smooth mouse tracking
    targetRotY.current = mouse.x * 0.5 + Math.sin(t * 0.25) * 0.3;
    targetRotX.current = mouse.y * -0.25 + Math.sin(t * 0.18) * 0.12;

    groupRef.current.rotation.y +=
      (targetRotY.current - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x +=
      (targetRotX.current - groupRef.current.rotation.x) * 0.06;

    // Subtle inner group bob
    innerRef.current.position.y = Math.sin(t * 0.6) * 0.08;

    // Pulse scale
    const pulse = 1 + Math.sin(t * 1.2) * 0.012;
    innerRef.current.scale.setScalar(pulse);
  });

  // Upper arrow shape
  const arrowShape = new THREE.Shape();
  arrowShape.moveTo(0, 2.4);       // tip
  arrowShape.lineTo(-1.05, 0.3);   // left wing
  arrowShape.lineTo(-0.35, 0.55);  // left inner
  arrowShape.lineTo(-0.35, -1.1);  // shaft left
  arrowShape.lineTo(0.35, -1.1);   // shaft right
  arrowShape.lineTo(0.35, 0.55);   // right inner
  arrowShape.lineTo(1.05, 0.3);    // right wing
  arrowShape.closePath();

  // Lower blue tail
  const tailShape = new THREE.Shape();
  tailShape.moveTo(-0.35, -1.1);
  tailShape.lineTo(0, -2.3);
  tailShape.lineTo(0.35, -1.1);
  tailShape.closePath();

  const extrudeSettings = {
    depth: 0.48,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.055,
    bevelSegments: 6,
  };

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        {/* Chrome arrow body */}
        <mesh castShadow receiveShadow position={[-0.24, 0, 0]}>
          <extrudeGeometry args={[arrowShape, extrudeSettings]} />
          <meshPhysicalMaterial
            color="#d8dff8"
            metalness={1}
            roughness={0.04}
            envMapIntensity={3.5}
            reflectivity={1}
            clearcoat={0.8}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Brand-blue tail */}
        <mesh castShadow position={[-0.24, 0, 0]}>
          <extrudeGeometry args={[tailShape, { ...extrudeSettings, depth: 0.48 }]} />
          <meshPhysicalMaterial
            color="#E23829"
            metalness={0.75}
            roughness={0.15}
            emissive="#7F1D1D"
            emissiveIntensity={0.8}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Red orbit ring */}
        <mesh rotation={[0, 0, 0]} position={[0, 0, -0.26]}>
          <torusGeometry args={[2.1, 0.012, 16, 160]} />
          <meshBasicMaterial color="#E23829" transparent opacity={0.6} />
        </mesh>

        {/* Radiant coral dashed orbit */}
        <mesh rotation={[Math.PI * 0.08, 0, Math.PI * 0.08]} position={[0, 0, -0.36]}>
          <torusGeometry args={[2.55, 0.006, 8, 96]} />
          <meshBasicMaterial color="#FF5A4D" transparent opacity={0.4} />
        </mesh>

        {/* Inner glow sphere */}
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshBasicMaterial color="#FF3322" transparent opacity={0.12} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Particle field ─────────────────────────────────────────── */
function ParticleField({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions, velocities, colors] = (() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 8;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi) - 1;
      vel[i3] = (Math.random() - 0.5) * 0.004;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.004;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.003;
      const rnd = Math.random();
      if (rnd < 0.55) { col[i3] = 1.0; col[i3 + 1] = 0.9; col[i3 + 2] = 0.9; } // soft white-pink
      else if (rnd < 0.82) { col[i3] = 0.88; col[i3 + 1] = 0.22; col[i3 + 2] = 0.16; } // radiant red
      else { col[i3] = 1.0; col[i3 + 1] = 0.35; col[i3 + 2] = 0.3; } // coral light
    }
    return [pos, vel, col];
  })();

  const posRef = useRef(positions);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3] + Math.sin(t * 0.25 + i * 0.07) * 0.0008;
      arr[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.2 + i * 0.05) * 0.0008;
      arr[i3 + 2] += velocities[i3 + 2];
      arr[i3] += (mouse.x * 2 - arr[i3]) * 0.0002;
      arr[i3 + 1] += (mouse.y * 2 - arr[i3 + 1]) * 0.0002;
      const d = Math.sqrt(arr[i3] ** 2 + arr[i3 + 1] ** 2 + arr[i3 + 2] ** 2);
      if (d > 11) { arr[i3] *= 0.88; arr[i3 + 1] *= 0.88; arr[i3 + 2] *= 0.88; }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posRef.current, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.032} vertexColors transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ─── Ambient glow ───────────────────────────────────────────── */
function AmbientGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.08 + Math.sin(clock.elapsedTime * 0.9) * 0.03;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[4, 32, 32]} />
      <meshBasicMaterial color="#E23829" transparent opacity={0.08} side={THREE.BackSide} />
    </mesh>
  );
}

/* ─── Hero Section ───────────────────────────────────────────── */
export default function HeroScene() {
  const { t } = useLang();
  const [ready, setReady] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay canvas mount until after hydration
    const id = setTimeout(() => {
      setReady(true);
      
      // Text reveal animation
      if (textRef.current) {
        gsap.to(textRef.current.querySelectorAll(".line-inner"), {
          y: "0%",
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.2,
        });
      }
    }, 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", background: "#000000" }}
    >
      {/* Three.js Canvas */}
      {ready && (
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 52 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.6 }}
          >
            {/* Lights */}
            <ambientLight intensity={0.5} color="#ffb0b0" />
            <directionalLight position={[4, 8, 6]} intensity={3.5} color="#ffffff" castShadow />
            <directionalLight position={[-4, 3, -2]} intensity={1.2} color="#ff8080" />
            <pointLight position={[-5, 4, 3]} intensity={4} color="#E23829" distance={18} />
            <pointLight position={[5, -3, 2]} intensity={2.5} color="#FF5A4D" distance={14} />
            <pointLight position={[0, 6, 1]} intensity={2} color="#ffffff" distance={12} />
            <rectAreaLight
              position={[3, 2, 5]}
              rotation={[0, -Math.PI / 5, 0]}
              width={6}
              height={6}
              intensity={5}
              color="#ffffff"
            />

            <Suspense fallback={null}>
              <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
                <NorthArrow3D />
              </Float>
              <ParticleField count={3000} />
              <AmbientGlow />
              <Environment preset="studio" />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "45%",
          background: "linear-gradient(to top, #000000 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Hero text */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12 md:pb-18"
        style={{ zIndex: 10 }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          {/* Big stacked title */}
          <div ref={textRef} className="hero-title-container">
            <div
              className="hero-text-line"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "clamp(4.5rem, 12vw, 11rem)",
                lineHeight: 0.87,
                color: "white",
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              }}
            >
              <div className="overflow-hidden">
                <div className="line-inner translate-y-full glitch-text" data-text={t.hero.title1}>
                  {t.hero.title1}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="line-inner translate-y-full glitch-text" data-text={t.hero.title2}>
                  {t.hero.title2}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="line-inner translate-y-full glitch-text" data-text={t.hero.title3} style={{ color: "#E23829" }}>
                  {t.hero.title3}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3 max-w-xs text-left md:text-right">
            <div className="section-label">{t.hero.founded}</div>
            <p style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.07em",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.9,
            }}>
              {t.hero.description}
            </p>
            <div className="flex items-center justify-start md:justify-end gap-3 mt-1">
              <span style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.28)",
              }}>
                {t.hero.scroll}
              </span>
              <div className="scroll-indicator" style={{ color: "rgba(255,255,255,0.28)" }}>↓</div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
