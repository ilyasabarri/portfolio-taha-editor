"use client";
import { useRef, useEffect, Suspense, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useLang } from "@/lib/lang-context";

type SoftwareType = "Pr" | "Ai" | "Ps" | "Ae" | "DaVinci" | "Blender";

/* ─── Dynamic 3D Texture Generator for Software Logos ───────── */
function createSoftwareTexture(type: SoftwareType): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;
  
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base background
  ctx.fillStyle = "#0c0c12";
  ctx.fillRect(0, 0, 512, 512);

  // Outer rounded square border & fill
  const radius = 64;
  ctx.beginPath();
  ctx.roundRect(24, 24, 464, 464, radius);

  if (type === "Pr") {
    ctx.fillStyle = "#00004e";
    ctx.fill();
    ctx.lineWidth = 18;
    ctx.strokeStyle = "#9999ff";
    ctx.stroke();

    ctx.font = "bold 230px sans-serif";
    ctx.fillStyle = "#9999ff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Pr", 256, 256);
  } else if (type === "Ai") {
    ctx.fillStyle = "#331100";
    ctx.fill();
    ctx.lineWidth = 18;
    ctx.strokeStyle = "#ff9900";
    ctx.stroke();

    ctx.font = "bold 230px sans-serif";
    ctx.fillStyle = "#ff9900";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Ai", 256, 256);
  } else if (type === "Ps") {
    ctx.fillStyle = "#001e36";
    ctx.fill();
    ctx.lineWidth = 18;
    ctx.strokeStyle = "#31a8ff";
    ctx.stroke();

    ctx.font = "bold 230px sans-serif";
    ctx.fillStyle = "#31a8ff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Ps", 256, 256);
  } else if (type === "Ae") {
    ctx.fillStyle = "#20003b";
    ctx.fill();
    ctx.lineWidth = 18;
    ctx.strokeStyle = "#cf96fd";
    ctx.stroke();

    ctx.font = "bold 230px sans-serif";
    ctx.fillStyle = "#cf96fd";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Ae", 256, 256);
  } else if (type === "DaVinci") {
    ctx.fillStyle = "#091424";
    ctx.fill();
    ctx.lineWidth = 18;
    ctx.strokeStyle = "#00ccff";
    ctx.stroke();

    // 3 Color Wheel Rings of DaVinci
    const centers = [
      { x: 256, y: 190, color: "#ff3344" },
      { x: 195, y: 295, color: "#33cc55" },
      { x: 317, y: 295, color: "#3388ff" },
    ];
    centers.forEach((c) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, 65, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.globalAlpha = 0.88;
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;
  } else if (type === "Blender") {
    ctx.fillStyle = "#1e1408";
    ctx.fill();
    ctx.lineWidth = 18;
    ctx.strokeStyle = "#ea7600";
    ctx.stroke();

    // Iconic Blender Orange Circle & Blue Eye
    ctx.beginPath();
    ctx.arc(256, 280, 85, 0, Math.PI * 2);
    ctx.fillStyle = "#ea7600";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(256, 280, 42, 0, Math.PI * 2);
    ctx.fillStyle = "#0066cc";
    ctx.fill();

    // Blender spokes
    ctx.beginPath();
    ctx.moveTo(256, 195);
    ctx.lineTo(256, 115);
    ctx.lineWidth = 26;
    ctx.strokeStyle = "#ea7600";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(315, 220);
    ctx.lineTo(380, 155);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(197, 220);
    ctx.lineTo(132, 155);
    ctx.stroke();
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
  glowColor: string;
}

function SoftwareCube3D({
  type,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  floatSpeed = 2,
  floatRotation = 0.3,
  glowColor,
}: SoftwareCubeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();

  const logoTexture = useMemo(() => createSoftwareTexture(type), [type]);

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
  const tileShape = new THREE.Shape();
  const width = 1.2;
  const height = 1.2;
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
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.035,
    bevelSegments: 5,
  };

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={floatRotation}
      floatIntensity={0.85}
    >
      <group
        ref={meshRef}
        position={position}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* 3D Tile Extruded Base */}
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[tileShape, extrudeSettings]} />
          <meshPhysicalMaterial
            color="#14141d"
            metalness={0.8}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={1.0}
            emissive={glowColor}
            emissiveIntensity={hovered ? 0.45 : 0.15}
          />
        </mesh>

        {/* Front Face Plane with Crisp Brand Logo Texture */}
        {logoTexture && (
          <mesh position={[0, 0, 0.23]}>
            <planeGeometry args={[1.15, 1.15]} />
            <meshBasicMaterial map={logoTexture} transparent />
          </mesh>
        )}

        {/* Glowing Back Ring */}
        <mesh position={[0, 0, -0.05]}>
          <torusGeometry args={[0.78, 0.015, 16, 64]} />
          <meshBasicMaterial color={glowColor} transparent opacity={hovered ? 0.85 : 0.35} />
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
              toneMappingExposure: 1.5,
            }}
          >
            {/* Ambient & Radiant Point Lights */}
            <ambientLight intensity={0.6} color="#ffb0b0" />
            <directionalLight position={[4, 8, 6]} intensity={3} color="#ffffff" />
            <directionalLight position={[-4, 3, -2]} intensity={1.5} color="#ff6655" />
            <pointLight position={[-4, 2, 2]} intensity={4.5} color="#E23829" distance={16} />
            <pointLight position={[4, -2, 2]} intensity={3.5} color="#FF5A4D" distance={14} />

            <Suspense fallback={null}>
              <ParticleAtmosphere count={2500} />

              {/* 3D Software Tool Cubes with Brand Logos Directly on Cubes */}
              {/* Left Side 3D Cubes */}
              <SoftwareCube3D
                type="Pr"
                glowColor="#9999ff"
                position={[-3.6, 1.4, 0.5]}
                rotation={[0.15, 0.25, -0.1]}
                scale={1.1}
                floatSpeed={2.2}
              />
              <SoftwareCube3D
                type="Ai"
                glowColor="#ff9900"
                position={[-3.1, -0.6, 1.2]}
                rotation={[-0.1, 0.3, 0.15]}
                scale={1.05}
                floatSpeed={1.8}
              />
              <SoftwareCube3D
                type="DaVinci"
                glowColor="#00ccff"
                position={[-4.1, -2.1, -0.2]}
                rotation={[0.2, 0.15, -0.05]}
                scale={0.95}
                floatSpeed={2.5}
              />

              {/* Right Side 3D Cubes */}
              <SoftwareCube3D
                type="Ps"
                glowColor="#31a8ff"
                position={[3.4, 0.9, 0.8]}
                rotation={[-0.15, -0.25, 0.1]}
                scale={1.1}
                floatSpeed={2.0}
              />
              <SoftwareCube3D
                type="Ae"
                glowColor="#cf96fd"
                position={[3.9, -1.2, 0.3]}
                rotation={[0.1, -0.2, -0.12]}
                scale={1.0}
                floatSpeed={2.4}
              />
              <SoftwareCube3D
                type="Blender"
                glowColor="#ea7600"
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

      {/* ── Center Visual Layer: TAHA & ELmaanaoui Titles ── */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative w-full text-center flex flex-col items-center justify-center select-none">
          {/* Giant 3D Backdrop Text "TAHA" */}
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
