"use client";
import { useRef, useEffect, Suspense, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useLang } from "@/lib/lang-context";

type SoftwareType = "Pr" | "Ai" | "Ps" | "Ae" | "DaVinci" | "Blender";

/* ─── 3D True Extruded Software Logos ───────────────────────── */
function PremiereProLogo3D({ color }: { color: string }) {
  const { pShape, pStem, rStem, rArch, rDot } = useMemo(() => {
    // Letter P Stem
    const pStem = new THREE.Shape();
    pStem.moveTo(-0.32, -0.24);
    pStem.lineTo(-0.20, -0.24);
    pStem.lineTo(-0.20, 0.24);
    pStem.lineTo(-0.32, 0.24);
    pStem.closePath();

    // Letter P Loop
    const pShape = new THREE.Shape();
    pShape.moveTo(-0.20, 0.02);
    pShape.lineTo(-0.02, 0.02);
    pShape.quadraticCurveTo(0.12, 0.02, 0.12, 0.13);
    pShape.quadraticCurveTo(0.12, 0.24, -0.02, 0.24);
    pShape.lineTo(-0.20, 0.24);
    pShape.closePath();

    const holeP = new THREE.Path();
    holeP.moveTo(-0.10, 0.08);
    holeP.lineTo(-0.02, 0.08);
    holeP.quadraticCurveTo(0.03, 0.08, 0.03, 0.13);
    holeP.quadraticCurveTo(0.03, 0.18, -0.02, 0.18);
    holeP.lineTo(-0.10, 0.18);
    holeP.closePath();
    pShape.holes.push(holeP);

    // Letter r Stem
    const rStem = new THREE.Shape();
    rStem.moveTo(0.04, -0.24);
    rStem.lineTo(0.14, -0.24);
    rStem.lineTo(0.14, 0.06);
    rStem.lineTo(0.04, 0.06);
    rStem.closePath();

    // Letter r Arch
    const rArch = new THREE.Shape();
    rArch.moveTo(0.14, -0.04);
    rArch.quadraticCurveTo(0.20, 0.06, 0.32, 0.06);
    rArch.lineTo(0.32, -0.02);
    rArch.quadraticCurveTo(0.24, -0.02, 0.14, -0.10);
    rArch.closePath();

    // Letter r Dot
    const rDot = new THREE.Shape();
    rDot.absarc(0.09, 0.16, 0.045, 0, Math.PI * 2, false);

    return { pShape, pStem, rStem, rArch, rDot };
  }, []);

  const extrudeOpts = {
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 4,
  };

  const mat = (
    <meshPhysicalMaterial
      color={color}
      metalness={0.9}
      roughness={0.12}
      clearcoat={1.0}
      clearcoatRoughness={0.05}
      reflectivity={1.0}
      emissive={color}
      emissiveIntensity={0.35}
    />
  );

  return (
    <group position={[0, 0, 0.12]}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[pStem, extrudeOpts]} />
        {mat}
      </mesh>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[pShape, extrudeOpts]} />
        {mat}
      </mesh>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[rStem, extrudeOpts]} />
        {mat}
      </mesh>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[rArch, extrudeOpts]} />
        {mat}
      </mesh>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[rDot, extrudeOpts]} />
        {mat}
      </mesh>
    </group>
  );
}

function IllustratorLogo3D({ color }: { color: string }) {
  const { aShape, iStem, iDot } = useMemo(() => {
    // Letter A
    const aShape = new THREE.Shape();
    aShape.moveTo(-0.28, -0.24);
    aShape.lineTo(-0.16, -0.24);
    aShape.lineTo(-0.10, -0.04);
    aShape.lineTo(0.02, -0.04);
    aShape.lineTo(0.08, -0.24);
    aShape.lineTo(0.20, -0.24);
    aShape.lineTo(-0.04, 0.24);
    aShape.lineTo(-0.04, 0.24);
    aShape.closePath();

    const holeA = new THREE.Path();
    holeA.moveTo(-0.07, 0.06);
    holeA.lineTo(0.00, 0.06);
    holeA.lineTo(-0.04, 0.18);
    holeA.closePath();
    aShape.holes.push(holeA);

    // Letter i Stem
    const iStem = new THREE.Shape();
    iStem.moveTo(0.12, -0.24);
    iStem.lineTo(0.24, -0.24);
    iStem.lineTo(0.24, 0.06);
    iStem.lineTo(0.12, 0.06);
    iStem.closePath();

    // Letter i Dot
    const iDot = new THREE.Shape();
    iDot.absarc(0.18, 0.17, 0.05, 0, Math.PI * 2, false);

    return { aShape, iStem, iDot };
  }, []);

  const extrudeOpts = {
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 4,
  };

  const mat = (
    <meshPhysicalMaterial
      color={color}
      metalness={0.9}
      roughness={0.12}
      clearcoat={1.0}
      reflectivity={1.0}
      emissive={color}
      emissiveIntensity={0.35}
    />
  );

  return (
    <group position={[0, 0, 0.12]}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[aShape, extrudeOpts]} />
        {mat}
      </mesh>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[iStem, extrudeOpts]} />
        {mat}
      </mesh>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[iDot, extrudeOpts]} />
        {mat}
      </mesh>
    </group>
  );
}

function PhotoshopLogo3D({ color }: { color: string }) {
  const { pStem, pLoop, sShape } = useMemo(() => {
    // P Stem
    const pStem = new THREE.Shape();
    pStem.moveTo(-0.32, -0.24);
    pStem.lineTo(-0.20, -0.24);
    pStem.lineTo(-0.20, 0.24);
    pStem.lineTo(-0.32, 0.24);
    pStem.closePath();

    // P Loop
    const pLoop = new THREE.Shape();
    pLoop.moveTo(-0.20, 0.02);
    pLoop.lineTo(-0.02, 0.02);
    pLoop.quadraticCurveTo(0.10, 0.02, 0.10, 0.13);
    pLoop.quadraticCurveTo(0.10, 0.24, -0.02, 0.24);
    pLoop.lineTo(-0.20, 0.24);
    pLoop.closePath();

    const holeP = new THREE.Path();
    holeP.moveTo(-0.10, 0.08);
    holeP.lineTo(-0.02, 0.08);
    holeP.quadraticCurveTo(0.02, 0.08, 0.02, 0.13);
    holeP.quadraticCurveTo(0.02, 0.18, -0.02, 0.18);
    holeP.lineTo(-0.10, 0.18);
    holeP.closePath();
    pLoop.holes.push(holeP);

    // Letter s
    const sShape = new THREE.Shape();
    sShape.moveTo(0.04, -0.24);
    sShape.lineTo(0.26, -0.24);
    sShape.lineTo(0.26, -0.16);
    sShape.lineTo(0.12, -0.16);
    sShape.quadraticCurveTo(0.08, -0.16, 0.08, -0.12);
    sShape.quadraticCurveTo(0.08, -0.08, 0.22, -0.04);
    sShape.quadraticCurveTo(0.28, 0.00, 0.28, 0.08);
    sShape.quadraticCurveTo(0.28, 0.18, 0.16, 0.18);
    sShape.lineTo(0.02, 0.18);
    sShape.lineTo(0.02, 0.10);
    sShape.lineTo(0.16, 0.10);
    sShape.quadraticCurveTo(0.20, 0.10, 0.20, 0.06);
    sShape.quadraticCurveTo(0.20, 0.02, 0.08, -0.02);
    sShape.quadraticCurveTo(0.02, -0.06, 0.02, -0.14);
    sShape.quadraticCurveTo(0.02, -0.24, 0.14, -0.24);
    sShape.closePath();

    return { pStem, pLoop, sShape };
  }, []);

  const extrudeOpts = {
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 4,
  };

  const mat = (
    <meshPhysicalMaterial
      color={color}
      metalness={0.9}
      roughness={0.12}
      clearcoat={1.0}
      reflectivity={1.0}
      emissive={color}
      emissiveIntensity={0.35}
    />
  );

  return (
    <group position={[0, 0, 0.12]}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[pStem, extrudeOpts]} />
        {mat}
      </mesh>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[pLoop, extrudeOpts]} />
        {mat}
      </mesh>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[sShape, extrudeOpts]} />
        {mat}
      </mesh>
    </group>
  );
}

function AfterEffectsLogo3D({ color }: { color: string }) {
  const { aShape, eShape } = useMemo(() => {
    // Letter A
    const aShape = new THREE.Shape();
    aShape.moveTo(-0.28, -0.24);
    aShape.lineTo(-0.16, -0.24);
    aShape.lineTo(-0.10, -0.04);
    aShape.lineTo(0.02, -0.04);
    aShape.lineTo(0.08, -0.24);
    aShape.lineTo(0.20, -0.24);
    aShape.lineTo(-0.04, 0.24);
    aShape.closePath();

    const holeA = new THREE.Path();
    holeA.moveTo(-0.07, 0.06);
    holeA.lineTo(0.00, 0.06);
    holeA.lineTo(-0.04, 0.18);
    holeA.closePath();
    aShape.holes.push(holeA);

    // Letter e
    const eShape = new THREE.Shape();
    eShape.moveTo(0.04, -0.24);
    eShape.lineTo(0.28, -0.24);
    eShape.lineTo(0.28, -0.16);
    eShape.lineTo(0.14, -0.16);
    eShape.lineTo(0.14, -0.06);
    eShape.lineTo(0.26, -0.06);
    eShape.lineTo(0.26, 0.02);
    eShape.lineTo(0.14, 0.02);
    eShape.lineTo(0.14, 0.10);
    eShape.lineTo(0.28, 0.10);
    eShape.lineTo(0.28, 0.18);
    eShape.lineTo(0.04, 0.18);
    eShape.closePath();

    return { aShape, eShape };
  }, []);

  const extrudeOpts = {
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 4,
  };

  const mat = (
    <meshPhysicalMaterial
      color={color}
      metalness={0.9}
      roughness={0.12}
      clearcoat={1.0}
      reflectivity={1.0}
      emissive={color}
      emissiveIntensity={0.35}
    />
  );

  return (
    <group position={[0, 0, 0.12]}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[aShape, extrudeOpts]} />
        {mat}
      </mesh>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[eShape, extrudeOpts]} />
        {mat}
      </mesh>
    </group>
  );
}

function DaVinciLogo3D() {
  return (
    <group position={[0, 0, 0.14]}>
      <mesh position={[-0.12, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.06, 32]} />
        <meshPhysicalMaterial color="#ff3344" metalness={0.8} roughness={0.2} emissive="#ff3344" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.12, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.06, 32]} />
        <meshPhysicalMaterial color="#33cc55" metalness={0.8} roughness={0.2} emissive="#33cc55" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -0.12, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.06, 32]} />
        <meshPhysicalMaterial color="#00aaff" metalness={0.8} roughness={0.2} emissive="#00aaff" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function BlenderLogo3D() {
  return (
    <group position={[0, 0, 0.14]}>
      {/* Outer 3D ring */}
      <mesh castShadow>
        <torusGeometry args={[0.22, 0.04, 16, 32]} />
        <meshPhysicalMaterial color="#ea7600" metalness={0.85} roughness={0.15} emissive="#ea7600" emissiveIntensity={0.4} />
      </mesh>
      {/* Inner blue eye */}
      <mesh position={[0, 0, 0.02]} castShadow>
        <cylinderGeometry args={[0.10, 0.10, 0.05, 32]} />
        <meshPhysicalMaterial color="#0066cc" metalness={0.9} roughness={0.1} emissive="#0066cc" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
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
    const tileShape = new THREE.Shape();
    const width = 1.25;
    const height = 1.25;
    const radius = 0.30;

    tileShape.moveTo(-width / 2 + radius, -height / 2);
    tileShape.lineTo(width / 2 - radius, -height / 2);
    tileShape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
    tileShape.lineTo(width / 2, height / 2 - radius);
    tileShape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
    tileShape.lineTo(-width / 2 + radius, height / 2);
    tileShape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
    tileShape.lineTo(-width / 2, -height / 2 + radius);
    tileShape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);
    return tileShape;
  }, []);

  // Outer Beveled 3D Border Geometry
  const borderShape = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 1.25, h = 1.25, r = 0.30;
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

    const hole = new THREE.Path();
    const iw = 1.10, ih = 1.10, ir = 0.24;
    hole.moveTo(-iw / 2 + ir, -ih / 2);
    hole.lineTo(iw / 2 - ir, -ih / 2);
    hole.quadraticCurveTo(iw / 2, -ih / 2, iw / 2, -ih / 2 + ir);
    hole.lineTo(iw / 2, ih / 2 - ir);
    hole.quadraticCurveTo(iw / 2, ih / 2, iw / 2 - ir, ih / 2);
    hole.lineTo(-iw / 2 + ir, ih / 2);
    hole.quadraticCurveTo(-iw / 2, ih / 2, -iw / 2, ih / 2 - ir);
    hole.lineTo(-iw / 2, -ih / 2 + ir);
    hole.quadraticCurveTo(-iw / 2, -ih / 2, -iw / 2 + ir, -ih / 2);

    shape.holes.push(hole);
    return shape;
  }, []);

  const extrudeTile = {
    depth: 0.24,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.035,
    bevelSegments: 5,
  };

  const extrudeBorder = {
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.01,
    bevelSegments: 3,
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
        {/* 3D Tile Extruded Base Mesh */}
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[tileShape, extrudeTile]} />
          <meshPhysicalMaterial
            color="#0d0d15"
            metalness={0.85}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={1.0}
            emissive={glowColor}
            emissiveIntensity={hovered ? 0.45 : 0.15}
          />
        </mesh>

        {/* 3D Extruded Outer Brand Border */}
        <mesh position={[0, 0, 0.23]} castShadow>
          <extrudeGeometry args={[borderShape, extrudeBorder]} />
          <meshPhysicalMaterial
            color={glowColor}
            metalness={0.9}
            roughness={0.1}
            clearcoat={1.0}
            emissive={glowColor}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* True 3D Extruded Logo Mesh Geometry */}
        {type === "Pr" && <PremiereProLogo3D color={glowColor} />}
        {type === "Ai" && <IllustratorLogo3D color={glowColor} />}
        {type === "Ps" && <PhotoshopLogo3D color={glowColor} />}
        {type === "Ae" && <AfterEffectsLogo3D color={glowColor} />}
        {type === "DaVinci" && <DaVinciLogo3D />}
        {type === "Blender" && <BlenderLogo3D />}

        {/* Glowing Back Ring */}
        <mesh position={[0, 0, -0.05]}>
          <torusGeometry args={[0.82, 0.016, 16, 64]} />
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

              {/* True 3D Software Tool Cubes with Extruded 3D Logos */}
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
