"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
  isReady?: boolean;
}

export default function Preloader({ onComplete, isReady = false }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const logoGroupRef = useRef<SVGGElement>(null);
  const isReadyRef = useRef(isReady);

  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  useEffect(() => {
    // Animate logo on mount
    if (logoGroupRef.current) {
      gsap.fromTo(
        logoGroupRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    // Rotate arrow continuously
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotation: 360,
        duration: 3,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    }

    let currentProgress = 0;
    const minDuration = 2200; // minimum duration in ms
    const startTime = performance.now();
    let isDone = false;

    const tick = (now: number) => {
      if (isDone) return;
      const elapsed = now - startTime;
      const baseProgress = Math.min(elapsed / minDuration, 0.92);

      // If 3D canvas is ready, progress up to 100%
      if (isReadyRef.current) {
        const remainingTime = Math.max(0, elapsed - minDuration);
        const finishStep = 0.92 + Math.min((remainingTime + 300) / 500, 0.08);
        currentProgress = Math.max(baseProgress, finishStep);
      } else {
        currentProgress = baseProgress;
      }

      const eased = currentProgress < 1 ? 1 - Math.pow(1 - currentProgress, 3) : 1;
      const num = Math.min(Math.round(eased * 100), 100);
      setCount(num);

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${eased})`;
      }

      if (num < 100) {
        requestAnimationFrame(tick);
      } else {
        isDone = true;
        setTimeout(() => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1.0,
            ease: "power4.inOut",
            onComplete,
          });
        }, 200);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* Real brand logo */}
      <div
        ref={arrowRef as any}
        style={{
          position: "relative",
          width: "320px",
          height: "140px",
          marginBottom: "1.8rem",
        }}
      >
        <Image
          src="/images/logo.png"
          alt="Taha El Maanaoui — Video Editor"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Brand name */}
      <div style={{
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.6em",
        color: "rgba(255,255,255,0.4)",
        marginBottom: "3.5rem",
        textAlign: "center",
      }}>
        TAHA&nbsp;&nbsp;EL&nbsp;&nbsp;MAANAOUI
      </div>

      {/* Big counter */}
      <div style={{
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: "clamp(5rem, 12vw, 9rem)",
        color: "white",
        lineHeight: 1,
        minWidth: "3ch",
        textAlign: "center",
        marginBottom: "2rem",
        letterSpacing: "-0.02em",
      }}>
        {String(count).padStart(2, "0")}
      </div>

      {/* Progress bar */}
      <div style={{
        width: "min(240px, 60vw)",
        height: "1px",
        background: "rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
        borderRadius: "1px",
      }}>
        <div
          ref={fillRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, #E23829 0%, #FF5A4D 100%)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>

      {/* Loading label */}
      <div style={{
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "0.55rem",
        letterSpacing: "0.5em",
        color: "rgba(255,255,255,0.2)",
        marginTop: "1rem",
      }}>
        LOADING&nbsp;&nbsp;EXPERIENCE
      </div>
    </div>
  );
}
