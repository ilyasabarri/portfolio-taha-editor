"use client";
import { useRef, useEffect, Suspense, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useLang } from "@/lib/lang-context";

type SoftwareType = "Pr" | "Ai" | "Ps" | "Ae" | "DaVinci" | "Blender";

interface SoftwareConfig {
  tileColor: string;
  tileEmissive: string;
  borderColor: string;
  textColor: string;
}

const SOFTWARE_THEMES: Record<SoftwareType, SoftwareConfig> = {
  Pr: {
    tileColor: "#060948",
    tileEmissive: "#161b78",
    borderColor: "#9999ff",
    textColor: "#9999ff",
  },
  Ai: {
    tileColor: "#3a1200",
    tileEmissive: "#662000",
    borderColor: "#ff9900",
    textColor: "#ffaa00",
  },
  Ps: {
    tileColor: "#001b3a",
    tileEmissive: "#003366",
    borderColor: "#31a8ff",
    textColor: "#31a8ff",
  },
  Ae: {
    tileColor: "#22003d",
    tileEmissive: "#440070",
    borderColor: "#cf96fd",
    textColor: "#cf96fd",
  },
  DaVinci: {
    tileColor: "#091628",
    tileEmissive: "#003366",
    borderColor: "#00ccff",
    textColor: "#00ccff",
  },
  Blender: {
    tileColor: "#281400",
    tileEmissive: "#502800",
    borderColor: "#ea7600",
    textColor: "#ea7600",
  },
};

/* ─── Dynamic High-Definition Texture Generator ─────────────── */
function createSoftwareLogoTexture(type: SoftwareType, config: SoftwareConfig): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Clear canvas background to transparent (no dark square corners!)
  ctx.clearRect(0, 0, 512, 512);

  // Outer Light-Colored Rounded String Border
  const radius = 76;
  ctx.beginPath();
  ctx.roundRect(42, 42, 428, 428, radius);
  ctx.lineWidth = 34;
  ctx.strokeStyle = config.borderColor;
  ctx.shadowColor = config.borderColor;
  ctx.shadowBlur = 25;
  ctx.stroke();

  // Reset shadow blur for crisp text
  ctx.shadowBlur = 10;

  // Draw Logo Text / Graphics
  if (type === "Pr" || type === "Ai" || type === "Ps" || type === "Ae") {
    ctx.font = "900 240px 'Space Grotesk', -apple-system, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Subtle glow on text
    ctx.shadowColor = config.borderColor;
    ctx.shadowBlur = 15;
    ctx.fillText(type, 256, 256);
  } else if (type === "DaVinci") {
    // Official DaVinci Resolve 3-Petal Color Swirl (Red/Green/Blue Gradients)
    ctx.save();
    ctx.translate(256, 260);

    const daVinciColors = [
      { start: "#FF3B30", end: "#FF9500" }, // Red-Orange (Top)
      { start: "#34C759", end: "#00C7BE" }, // Green-Teal (Right)
      { start: "#007AFF", end: "#5856D6" }, // Blue-Purple (Left)
    ];

    const angles = [-Math.PI / 2, (1 * Math.PI) / 6, (5 * Math.PI) / 6];

    angles.forEach((angle, idx) => {
      ctx.save();
      ctx.rotate(angle);

      const grad = ctx.createLinearGradient(0, -115, 0, -15);
      grad.addColorStop(0, daVinciColors[idx].start);
      grad.addColorStop(1, daVinciColors[idx].end);

      ctx.beginPath();
      ctx.moveTo(0, -115);
      ctx.bezierCurveTo(55, -115, 65, -35, 0, -15);
      ctx.bezierCurveTo(-65, -35, -55, -115, 0, -115);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.shadowColor = daVinciColors[idx].start;
      ctx.shadowBlur = 18;
      ctx.fill();

      ctx.restore();
    });

    // Inner dark center swirl accent
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(4, 8, 24, 0.7)";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#000000";
    ctx.fill();

    ctx.restore();
  } else if (type === "Blender") {
    // Official Blender Icon (Orange Body + 3 Spoke Arms + White & Blue Center Eye)
    const cx = 256;
    const cy = 280;

    ctx.save();

    // 1. Outer Orange Hub
    ctx.fillStyle = "#EA7600";
    ctx.shadowColor = "#EA7600";
    ctx.shadowBlur = 18;

    ctx.beginPath();
    ctx.arc(cx, cy, 75, 0, Math.PI * 2);
    ctx.fill();

    // 2. 3 Spoke Arms (Top-Left, Top, Top-Right)
    const armAngles = [-Math.PI * 0.75, -Math.PI * 0.5, -Math.PI * 0.25];
    const armLength = 125;
    const armRadius = 20;

    armAngles.forEach((angle) => {
      const tipX = cx + Math.cos(angle) * armLength;
      const tipY = cy + Math.sin(angle) * armLength;

      const perpX = Math.cos(angle + Math.PI / 2) * armRadius;
      const perpY = Math.sin(angle + Math.PI / 2) * armRadius;

      ctx.beginPath();
      ctx.moveTo(cx + perpX, cy + perpY);
      ctx.lineTo(tipX + perpX, tipY + perpY);
      ctx.arc(tipX, tipY, armRadius, angle + Math.PI / 2, angle - Math.PI / 2, false);
      ctx.lineTo(cx - perpX, cy - perpY);
      ctx.closePath();
      ctx.fill();
    });

    // 3. Inner White Ring
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(cx, cy, 48, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    // 4. Inner Blue Eye
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fillStyle = "#225B99";
    ctx.fill();

    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/* ─── 3D Software Tool Cube Component ───────────────────────── */
interface SoftwareCubeProps {
  type: SoftwareType;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  floatSpeed?: number;
  floatRotation?: number;
  floatIntensity?: number;
}

function SoftwareCube3D({
  type,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  floatSpeed = 2,
  floatRotation = 0.3,
  floatIntensity = 0.3,
}: SoftwareCubeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();

  const theme = SOFTWARE_THEMES[type];
  const logoTexture = useMemo(() => createSoftwareLogoTexture(type, theme), [type, theme]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Mouse parallax tracking
    const targetX = position[0] + mouse.x * 0.45;
    const targetY = position[1] + mouse.y * 0.35;

    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;

    // Hover scale interpolation
    const targetScale = hovered ? scale * 1.18 : scale;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  // Rounded 3D tile geometry
  const tileShape = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 1.65;
    const height = 1.65;
    const radius = 0.38;

    shape.moveTo(-width / 2 + radius, -height / 2);
    shape.lineTo(width / 2 - radius, -height / 2);
    shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
    shape.lineTo(width / 2, height / 2 - radius);
    shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
    shape.lineTo(-width / 2 + radius, height / 2);
    shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
    shape.lineTo(-width / 2, -height / 2 + radius);
    shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);
    return shape;
  }, []);

  const extrudeTile = {
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.035,
    bevelSegments: 6,
  };

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={floatRotation}
      floatIntensity={floatIntensity}
    >
      <group
        ref={meshRef}
        position={position}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* 3D Tile Extruded Base Mesh (Sleek Glossy Finish from Screenshot) */}
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[tileShape, extrudeTile]} />
          <meshPhysicalMaterial
            color={theme.tileColor}
            metalness={0.7}
            roughness={0.08}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
            reflectivity={1.0}
            emissive={theme.tileEmissive}
            emissiveIntensity={hovered ? 0.55 : 0.28}
          />
        </mesh>

        {/* Front Face Plane with Ultra-Crisp Software Logo Texture */}
        {logoTexture && (
          <mesh position={[0, 0, 0.262]}>
            <planeGeometry args={[1.58, 1.58]} />
            <meshBasicMaterial map={logoTexture} transparent />
          </mesh>
        )}

        {/* Glowing Orbit Ring Behind Tile */}
        <mesh position={[0, 0, -0.05]}>
          <torusGeometry args={[1.05, 0.018, 16, 64]} />
          <meshBasicMaterial color={theme.borderColor} transparent opacity={hovered ? 0.85 : 0.4} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Particle Atmosphere ───────────────────────────────────── */
function ParticleAtmosphere({ count = 2500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 7.5;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi) - 1.5;

      const rnd = Math.random();
      if (rnd < 0.6) {
        col[i3] = 0.88; col[i3 + 1] = 0.22; col[i3 + 2] = 0.16; // Radiant red
      } else if (rnd < 0.85) {
        col[i3] = 1.0; col[i3 + 1] = 0.45; col[i3 + 2] = 0.35; // Radiant coral
      } else {
        col[i3] = 1.0; col[i3 + 1] = 0.9; col[i3 + 2] = 0.9; // Soft highlight
      }
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.03;
    ref.current.rotation.x = Math.sin(t * 0.02) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Responsive 3D Scene Controller ────────────────────────── */
function ResponsiveScene() {
  const { camera, size } = useThree();
  const isMobile = size.width < 768;

  useEffect(() => {
    if (isMobile) {
      camera.position.z = 10.8; // Pull back camera on mobile phone screens so all 3D cubes fit!
    } else {
      camera.position.z = 7.5;
    }
    camera.updateProjectionMatrix();
  }, [camera, size.width, isMobile]);

  // Adjust horizontal spread and scaling dynamically for mobile vs desktop
  const xMult = isMobile ? 0.65 : 1.0;
  const scaleMult = isMobile ? 0.85 : 1.0;

  return (
    <>
      {/* Left Side 3D Cubes */}
      <SoftwareCube3D
        type="Pr"
        position={[-4.4 * xMult, isMobile ? 2.6 : 2.1, 0.4]}
        rotation={[0.15, 0.25, -0.1]}
        scale={0.75 * scaleMult}
        floatSpeed={1.8}
        floatIntensity={0.25}
      />
      <SoftwareCube3D
        type="Ai"
        position={[-3.7 * xMult, isMobile ? 0.6 : 0.1, 1.0]}
        rotation={[-0.1, 0.3, 0.15]}
        scale={0.72 * scaleMult}
        floatSpeed={1.5}
        floatIntensity={0.22}
      />
      <SoftwareCube3D
        type="DaVinci"
        position={[-4.5 * xMult, isMobile ? -1.5 : -1.9, 0.2]}
        rotation={[0.2, 0.15, -0.05]}
        scale={0.70 * scaleMult}
        floatSpeed={2.0}
        floatIntensity={0.25}
      />

      {/* Right Side 3D Cubes */}
      <SoftwareCube3D
        type="Ps"
        position={[4.4 * xMult, isMobile ? 2.5 : 2.0, 0.6]}
        rotation={[-0.15, -0.25, 0.1]}
        scale={0.75 * scaleMult}
        floatSpeed={1.7}
        floatIntensity={0.25}
      />
      <SoftwareCube3D
        type="Ae"
        position={[3.7 * xMult, isMobile ? 0.5 : 0.0, 0.8]}
        rotation={[0.1, -0.2, -0.12]}
        scale={0.72 * scaleMult}
        floatSpeed={1.9}
        floatIntensity={0.22}
      />
      <SoftwareCube3D
        type="Blender"
        position={[4.5 * xMult, isMobile ? -1.6 : -2.0, 0.4]}
        rotation={[-0.2, -0.1, 0.08]}
        scale={0.70 * scaleMult}
        floatSpeed={1.6}
        floatIntensity={0.25}
      />
    </>
  );
}

/* ─── Hero Section Component ────────────────────────────────── */
export default function HeroScene() {
  const { t } = useLang();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setReady(true);
    }, 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex flex-col justify-between"
      style={{ height: "100svh", background: "#040101" }}
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
              toneMappingExposure: 1.6,
            }}
          >
            {/* Ambient & Radiant Point Lights */}
            <ambientLight intensity={0.7} color="#ffc0c0" />
            <directionalLight position={[4, 8, 6]} intensity={3.5} color="#ffffff" castShadow />
            <directionalLight position={[-4, 3, -2]} intensity={1.8} color="#ff8877" />
            <pointLight position={[-4, 2, 3]} intensity={5.0} color="#E23829" distance={18} />
            <pointLight position={[4, -2, 3]} intensity={4.0} color="#FF5A4D" distance={16} />
            <pointLight position={[0, 4, 2]} intensity={3.0} color="#ffffff" distance={14} />

            <Suspense fallback={null}>
              <ParticleAtmosphere count={2500} />
              <ResponsiveScene />
              <Environment preset="studio" />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* ── Background Layer 1: Backdrop Text "TAHA" & "ELmaanaoui" (Behind Head on Mobile & Laptop) ── */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-20 pointer-events-none overflow-hidden select-none">
        <div className="relative w-full text-center flex flex-col items-center justify-center">
          {/* Custom TAHA Graphic Logo Backdrop (Enlarged) */}
          <div className="relative w-[96vw] max-w-6xl flex justify-center px-2">
            <img
              src="/taha-title-logo.png"
              alt="TAHA"
              className="w-full h-auto object-contain max-h-[40vh] sm:max-h-[48vh] md:max-h-[58vh] scale-110 sm:scale-115 md:scale-120 transform origin-top transition-transform duration-500"
              style={{
                filter:
                  "drop-shadow(0 0 60px rgba(226,56,41,0.85)) drop-shadow(0 25px 40px rgba(0,0,0,0.95))",
              }}
            />
          </div>

          {/* Neon Radiant Red Cursive Script "ELmaanaoui" Overlay */}
          <div
            className="absolute z-20 font-bold"
            style={{
              top: "46%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-3deg)",
              fontFamily: '"Dancing Script", "Brush Script MT", cursive',
              fontSize: "clamp(3.5rem, 13vw, 11rem)",
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

      {/* ── Center Layer 2: 3D Hero Person Cutout (Mobile & Desktop Responsive Images) ── */}
      <div className="absolute inset-0 z-[3] flex items-end justify-center pointer-events-none overflow-hidden">
        <div
          className="relative w-full max-w-4xl h-[82vh] sm:h-[88vh] md:h-[95vh] flex items-end justify-center"
          style={{
            filter:
              "drop-shadow(0 0 40px rgba(226,56,41,0.5)) drop-shadow(0 25px 45px rgba(0,0,0,0.95))",
          }}
        >
          {/* Desktop / Laptop Hero Cutout */}
          <img
            src="/taha-hero.png"
            alt="Taha ELmaanaoui - Video Editor & 3D Artist"
            className="hidden md:block h-full w-auto max-w-full object-contain object-bottom scale-110 transform transition-transform duration-700 ease-out"
            style={{
              maxHeight: "95vh",
              maskImage: "linear-gradient(to top, black 88%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, black 88%, transparent 100%)",
            }}
          />

          {/* Mobile / Phone Optimized Hero Cutout */}
          <img
            src="/taha-hero-mobile.png"
            alt="Taha ELmaanaoui - Video Editor & 3D Artist"
            className="block md:hidden h-full w-auto object-contain object-bottom scale-100 transform transition-transform duration-700 ease-out"
            style={{
              maxHeight: "82vh",
              maskImage: "linear-gradient(to top, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, black 88%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* ── Scroll Down Indicator at Bottom ── */}
      <div className="relative z-20 w-full px-6 md:px-12 pb-8 flex items-center justify-end pointer-events-auto">
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
