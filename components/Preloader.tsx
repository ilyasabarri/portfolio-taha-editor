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

    // Pulse logo continuously
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        scale: 1.04,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
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
      {/* Taha El Maanaoui Hero Logo Graphic */}
      <div
        ref={arrowRef as any}
        className="relative w-[85vw] max-w-md flex flex-col items-center justify-center mb-6 select-none"
      >
        <div className="relative w-full flex justify-center">
          <img
            src="/taha-title-logo.png"
            alt="TAHA"
            className="w-full h-auto object-contain max-h-[110px] sm:max-h-[140px]"
            style={{
              filter:
                "drop-shadow(0 0 35px rgba(226,56,41,0.85)) drop-shadow(0 15px 30px rgba(0,0,0,0.95))",
            }}
          />
        </div>
        <div
          className="absolute z-20 font-bold"
          style={{
            top: "44%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-3deg)",
            fontFamily: '"Dancing Script", "Brush Script MT", cursive',
            fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
            color: "#FFF0F0",
            textShadow:
              "0 0 10px #FF5A4D, 0 0 25px #E23829, 0 0 45px #E23829",
            whiteSpace: "nowrap",
          }}
        >
          ELmaanaoui
        </div>
      </div>

      {/* Brand subtitle */}
      <div style={{
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.6em",
        color: "rgba(255,255,255,0.4)",
        marginBottom: "2.5rem",
        textAlign: "center",
      }}>
        VIDEO&nbsp;&nbsp;EDITOR&nbsp;&nbsp;&amp;&nbsp;&nbsp;3D&nbsp;&nbsp;ARTIST
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
