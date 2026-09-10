"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const logoGroupRef = useRef<SVGGElement>(null);

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

    let current = 0;
    const duration = 2600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1;
      current = Math.round(eased * 100);
      setCount(current);

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${eased})`;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1.0,
            ease: "power4.inOut",
            onComplete,
          });
        }, 300);
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
          alt="North Creative Agency"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Agency name */}
      <div style={{
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.6em",
        color: "rgba(255,255,255,0.3)",
        marginBottom: "3.5rem",
        textAlign: "center",
      }}>
        NORTH&nbsp;&nbsp;CREATIVE&nbsp;&nbsp;AGENCY
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
