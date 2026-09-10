"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/lang-context";

gsap.registerPlugin(ScrollTrigger);

const CARD_COLORS = [
  { bg: "linear-gradient(140deg, #E23829 0%, #3D0706 100%)", accent: "#FF5A4D" },
  { bg: "linear-gradient(140deg, #580B09 0%, #200404 100%)", accent: "#FF5A4D" },
  { bg: "linear-gradient(140deg, #E23829 0%, #1c0303 100%)", accent: "#ffffff" },
  { bg: "linear-gradient(140deg, #4A0807 0%, #150202 100%)", accent: "#FF5A4D" },
  { bg: "linear-gradient(140deg, #751210 0%, #290403 100%)", accent: "#FF5A4D" },
  { bg: "linear-gradient(140deg, #3A0504 0%, #100101 100%)", accent: "#E23829" },
  { bg: "linear-gradient(140deg, #E23829 0%, #580B09 100%)", accent: "#FF5A4D" },
];

// Geometric SVG accent per card
function CardGeometry({ index, accent }: { index: number; accent: string }) {
  const shapes = [
    // Compass rose
    <svg key="c" viewBox="0 0 120 120" fill="none" style={{ width: "100%", height: "100%" }}>
      <polygon points="60,8 52,55 60,48 68,55" fill={accent} opacity="0.3" />
      <polygon points="60,48 52,65 60,112 68,65" fill={accent} opacity="0.15" />
      <polygon points="8,60 55,52 48,60 55,68" fill={accent} opacity="0.15" />
      <polygon points="48,60 65,52 112,60 65,68" fill={accent} opacity="0.15" />
      <circle cx="60" cy="60" r="52" stroke={accent} strokeWidth="0.5" opacity="0.2" />
      <circle cx="60" cy="60" r="36" stroke={accent} strokeWidth="0.5" opacity="0.12" />
    </svg>,
    // Grid
    <svg key="g" viewBox="0 0 120 120" fill="none" style={{ width: "100%", height: "100%" }}>
      <line x1="30" y1="0" x2="30" y2="120" stroke={accent} strokeWidth="0.5" opacity="0.25" />
      <line x1="60" y1="0" x2="60" y2="120" stroke={accent} strokeWidth="0.5" opacity="0.25" />
      <line x1="90" y1="0" x2="90" y2="120" stroke={accent} strokeWidth="0.5" opacity="0.25" />
      <line x1="0" y1="30" x2="120" y2="30" stroke={accent} strokeWidth="0.5" opacity="0.25" />
      <line x1="0" y1="60" x2="120" y2="60" stroke={accent} strokeWidth="0.5" opacity="0.25" />
      <line x1="0" y1="90" x2="120" y2="90" stroke={accent} strokeWidth="0.5" opacity="0.25" />
      <circle cx="60" cy="60" r="20" stroke={accent} strokeWidth="1" opacity="0.3" />
      <circle cx="60" cy="60" r="3" fill={accent} opacity="0.5" />
    </svg>,
    // North arrow
    <svg key="n" viewBox="0 0 120 120" fill="none" style={{ width: "100%", height: "100%" }}>
      <polygon points="60,10 45,70 60,60 75,70" fill={accent} opacity="0.35" />
      <polygon points="60,60 50,72 60,110 70,72" fill={accent} opacity="0.2" />
      <circle cx="60" cy="60" r="52" stroke={accent} strokeWidth="0.6" opacity="0.2" />
    </svg>,
    // Triangle
    <svg key="t" viewBox="0 0 120 120" fill="none" style={{ width: "100%", height: "100%" }}>
      <polygon points="60,10 110,100 10,100" stroke={accent} strokeWidth="1" fill="none" opacity="0.3" />
      <polygon points="60,30 90,80 30,80" fill={accent} opacity="0.12" />
      <polygon points="60,50 75,75 45,75" fill={accent} opacity="0.2" />
    </svg>,
    // Hexagon
    <svg key="h" viewBox="0 0 120 120" fill="none" style={{ width: "100%", height: "100%" }}>
      <polygon points="60,8 102,32 102,88 60,112 18,88 18,32" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.25" />
      <polygon points="60,28 84,41 84,79 60,92 36,79 36,41" stroke={accent} strokeWidth="0.5" fill="none" opacity="0.18" />
      <circle cx="60" cy="60" r="12" fill={accent} opacity="0.15" />
    </svg>,
    // Waveform
    <svg key="w" viewBox="0 0 120 120" fill="none" style={{ width: "100%", height: "100%" }}>
      <polyline points="0,60 15,35 30,75 45,25 60,80 75,30 90,70 105,45 120,60" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.4" />
      <polyline points="0,60 15,50 30,65 45,45 60,68 75,48 90,62 105,52 120,60" stroke={accent} strokeWidth="0.6" fill="none" opacity="0.2" />
    </svg>,
    // Orbit
    <svg key="o" viewBox="0 0 120 120" fill="none" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="60" cy="60" rx="52" ry="22" stroke={accent} strokeWidth="0.8" opacity="0.25" />
      <ellipse cx="60" cy="60" rx="22" ry="52" stroke={accent} strokeWidth="0.8" opacity="0.25" />
      <circle cx="60" cy="60" r="6" fill={accent} opacity="0.35" />
      <circle cx="60" cy="60" r="36" stroke={accent} strokeWidth="0.4" opacity="0.15" />
    </svg>,
  ];
  return shapes[index % shapes.length];
}

export default function Team() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".tc");
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      }
    );
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-6 md:px-12 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #E23829 0%, #751210 45%, #1c0303 100%)",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="section-label mb-3">{t.team.label}</div>
            <h2 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              color: "white",
              lineHeight: 0.9,
            }}>
              {t.team.title}
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.63rem",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.4)",
          }}>
            {t.team.subtitle}
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {t.team.members.map((member, i) => {
            const card = CARD_COLORS[i % CARD_COLORS.length];
            const isHovered = hovered === i;
            return (
              <div
                key={i}
                className="tc"
                data-cursor
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  aspectRatio: "0.62",
                  borderRadius: "6px",
                  overflow: "hidden",
                  position: "relative",
                  background: card.bg,
                  cursor: "none",
                  transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
                  transform: isHovered ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
                  boxShadow: isHovered
                    ? `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${card.accent}33`
                    : "0 4px 20px rgba(0,0,0,0.3)",
                  border: `1px solid ${isHovered ? card.accent + "44" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {/* Geometry */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                  opacity: isHovered ? 0.6 : 0.4,
                  transition: "opacity 0.4s ease",
                }}>
                  <CardGeometry index={i} accent={card.accent} />
                </div>

                {/* Top number */}
                <div style={{
                  position: "absolute",
                  top: "0.7rem",
                  left: "0.7rem",
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.52rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.25)",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Accent dot */}
                <div style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: card.accent,
                  opacity: isHovered ? 1 : 0.4,
                  transition: "opacity 0.3s ease",
                }} />

                {/* Bottom info */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "2.5rem 0.75rem 0.75rem",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                }}>
                  <div style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.1em",
                    color: "white",
                    lineHeight: 1.5,
                    marginBottom: "0.2rem",
                  }}>
                    {member.name}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontSize: "0.58rem",
                    color: card.accent,
                    opacity: 0.9,
                    lineHeight: 1.3,
                  }}>
                    {member.role}
                  </div>
                </div>

                {/* Hover line accent */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "2px",
                  width: isHovered ? "100%" : "0%",
                  background: card.accent,
                  transition: "width 0.4s ease",
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
