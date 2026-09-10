"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceData } from "@/lib/services-data";
import CustomCursor from "@/components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

interface ServicePageLayoutProps {
  service: ServiceData;
}

export default function ServicePageLayout({ service }: ServicePageLayoutProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeModalProject, setActiveModalProject] = useState<ServiceData["projects"][0] | null>(null);

  useEffect(() => {
    // Hero text reveal
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      ".hero-line-inner",
      { y: 30, opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.1, stagger: 0.12, ease: "power4.out" }
    )
      .fromTo(
        ".hero-meta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ".hero-stat",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      );

    // Scroll reveals
    gsap.utils.toArray<Element>(".scroll-reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    });

    gsap.utils.toArray<Element>(".project-card").forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  // Mouse parallax on hero
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <CustomCursor />

      {/* ── Video Modal Lightbox ── */}
      {activeModalProject && (
        <VideoModal
          project={activeModalProject}
          accentColor={service.accentColor}
          onClose={() => setActiveModalProject(null)}
        />
      )}

      {/* ── Noise overlay ── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Navigation bar ── */}
      <ServiceNav accentColor={service.accentColor} />

      {/* ══════════════ HERO ══════════════ */}
      <section
        ref={heroRef}
        id="hero"
        className="relative flex flex-col justify-end min-h-screen px-6 md:px-12 pb-16 overflow-hidden"
        style={{ background: "#000000" }}
      >
        {/* Animated gradient blob */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            right: "-10%",
            width: "70vw",
            height: "70vw",
            maxWidth: "900px",
            maxHeight: "900px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(226,56,41,0.22) 0%, transparent 65%)",
            transform: `translate(${mousePos.x * 18}px, ${mousePos.y * 14}px)`,
            transition: "transform 0.6s ease-out",
            filter: "blur(40px)",
          }}
        />

        {/* Background grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(226,56,41,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(226,56,41,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "40%",
            background: "linear-gradient(to top, #000000 0%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* Top-Right Floating Interactive Video Editing Suite Widget */}
        <div
          className="hero-meta absolute top-[20%] right-[6%] hidden lg:flex flex-col gap-3 w-[360px] pointer-events-auto"
          style={{
            zIndex: 10,
            transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -10}px)`,
            transition: "transform 0.5s ease-out",
          }}
        >
          {/* Main Glass Widget Box */}
          <div
            className="p-5 rounded-xl border border-white/10 group cursor-none transition-all duration-500"
            data-cursor
            onClick={() => {
              if (service.projects.length > 0) {
                setActiveModalProject(service.projects[0]);
              }
            }}
            style={{
              background: "linear-gradient(135deg, rgba(28,3,3,0.85) 0%, rgba(10,2,2,0.92) 100%)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(226,56,41,0.15)",
              border: "1px solid rgba(255,90,77,0.3)",
            }}
          >
            {/* Widget Header HUD */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5A4D] animate-pulse" />
                <span
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  REC · 00:02:14:09
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.5rem",
                  letterSpacing: "0.15em",
                  color: service.accentColor,
                  background: `${service.accentColor}18`,
                  padding: "0.15rem 0.5rem",
                  borderRadius: "9999px",
                }}
              >
                PRO RES 4K
              </span>
            </div>

            {/* Video Screen Preview Box */}
            <div
              className="relative h-[160px] rounded-lg overflow-hidden flex flex-col justify-between p-3 border border-white/10 mb-3"
              style={{
                background: "linear-gradient(140deg, #3D0706 0%, #150202 100%)",
              }}
            >
              {/* Grid texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Top Watermark */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.48rem",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(0,0,0,0.5)",
                    padding: "0.15rem 0.4rem",
                    borderRadius: "3px",
                  }}
                >
                  {service.shortTitle.toUpperCase()} REEL
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.48rem",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  PREMIERE / DAVINCI
                </span>
              </div>

              {/* Center Play Button HUD */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: service.accentColor,
                    boxShadow: `0 0 25px ${service.accentColor}bb`,
                  }}
                >
                  <span className="text-black text-sm ml-0.5">▶</span>
                </div>
                <span
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.52rem",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  CLICK TO WATCH DEMO REEL
                </span>
              </div>

              {/* Bottom Placeholder Note */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.48rem",
                    color: "#FF5A4D",
                    letterSpacing: "0.1em",
                  }}
                >
                  + DROP CLIENT VIDEO HERE
                </span>
                <div className="flex items-end gap-0.5 h-3">
                  {[0.4, 0.8, 0.5, 0.9, 0.6].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: "2px",
                        height: `${h * 100}%`,
                        background: service.accentColor,
                        borderRadius: "1px",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div>
                <div
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "1.1rem",
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  99.4%
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.45rem",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  RETENTION
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "1.1rem",
                    color: service.accentColor,
                    lineHeight: 1,
                  }}
                >
                  CINEMA
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.45rem",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  COLOR GRADE
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "1.1rem",
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  24-BIT
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.45rem",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  AUDIO MIX
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Label */}
        <div
          className="hero-meta section-label mb-6"
          style={{ position: "relative", zIndex: 3 }}
        >
          {service.heroLabel}
        </div>

        {/* Main heading */}
        <div className="hero-title-container relative max-w-5xl" style={{ zIndex: 3 }}>
          <h1
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
              lineHeight: 0.95,
              color: "white",
              letterSpacing: "0.02em",
            }}
          >
            <span className="hero-line-inner inline-block" style={{ opacity: 0 }}>
              {service.headline}
            </span>
          </h1>
        </div>

        {/* Subheadline + stats */}
        <div
          className="flex flex-col md:flex-row items-start md:items-end justify-between mt-10 gap-8 relative"
          style={{ zIndex: 3 }}
        >
          <div className="max-w-xl">
            <p
              className="hero-meta"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.04em",
                lineHeight: 1.7,
                opacity: 0,
              }}
            >
              {service.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 md:gap-12">
            {service.stats.map((stat, i) => (
              <div key={i} className="hero-stat text-right" style={{ opacity: 0 }}>
                <div
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    color: service.accentColor,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.25em",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "0.3rem",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SELECTED WORK ══════════════ */}
      <section className="py-24 md:py-36 px-6 md:px-12 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #000000 0%, #1c0303 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-16">
            <div className="section-label mb-4">SELECTED WORK</div>
            <h2
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                color: "white",
                lineHeight: 0.9,
              }}
            >
              {service.shortTitle} PROJECTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.projects.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                index={i}
                accentColor={service.accentColor}
                onOpenModal={() => setActiveModalProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ OUR APPROACH ══════════════ */}
      <section
        className="py-24 md:py-36 px-6 md:px-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1c0303 0%, #3d0706 50%, #751210 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-16">
            <div className="section-label mb-4">
              HOW I WORK
            </div>
            <h2
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                color: "white",
                lineHeight: 0.9,
              }}
            >
              THE PROCESS
            </h2>
          </div>

          <div className="space-y-0">
            {service.approach.map((step, i) => (
              <ApproachStep
                key={i}
                step={step}
                accentColor={service.accentColor}
                isLast={i === service.approach.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section
        className="py-24 md:py-32 px-6 md:px-12 text-center relative overflow-hidden"
        style={{ background: "#000000" }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(226,56,41,0.25) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative scroll-reveal">
          <p
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "2rem",
            }}
          >
            READY TO CREATE SOMETHING EXTRAORDINARY?
          </p>
          <h2
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              color: "white",
              lineHeight: 0.9,
              marginBottom: "3rem",
            }}
          >
            START A{" "}
            <span style={{ color: service.accentColor }}>PROJECT</span>
          </h2>
          <Link
            href="/start-a-project"
            data-cursor
            className="group relative inline-flex items-center gap-4 overflow-hidden"
            style={{
              padding: "1.3rem 3rem",
              border: `1px solid ${service.accentColor}`,
              borderRadius: "9999px",
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              color: "white",
              textDecoration: "none",
              transition: "color 0.4s ease",
            }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: service.accentColor,
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scaleX(1)";
                (e.currentTarget.parentElement as HTMLElement).style.color = "#000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scaleX(0)";
                (e.currentTarget.parentElement as HTMLElement).style.color = "white";
              }}
            />
            <span className="relative z-10">LET'S WORK TOGETHER</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer
        className="px-6 md:px-12 py-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © 2026 TAHA EL MAANAOUI — ALL RIGHTS RESERVED
          </p>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            className="hover:text-white"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </footer>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

function ServiceNav({ accentColor }: { accentColor: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <Link
        href="/"
        data-cursor
        className="group flex items-center gap-3"
        style={{ textDecoration: "none" }}
      >
        <span
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.45)",
            transition: "color 0.3s ease",
          }}
          className="group-hover:text-white"
        >
          ← HOME
        </span>
      </Link>

      <div
        style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: "1rem",
          letterSpacing: "0.25em",
          color: "white",
        }}
      >
        TAHA EL MAANAOUI
      </div>

      <Link
        href="/start-a-project"
        data-cursor
        className="group flex items-center gap-2"
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          color: accentColor,
          textDecoration: "none",
          padding: "0.5rem 1rem",
          border: `1px solid ${accentColor}33`,
          borderRadius: "9999px",
          transition: "all 0.3s ease",
        }}
      >
        START A PROJECT
      </Link>
    </nav>
  );
}

function ProjectCard({
  project,
  index,
  accentColor,
  onOpenModal,
}: {
  project: ServiceData["projects"][0];
  index: number;
  accentColor: string;
  onOpenModal: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const colors = [
    "linear-gradient(140deg, #E23829 0%, #3D0706 100%)",
    "linear-gradient(140deg, #580B09 0%, #200404 100%)",
    "linear-gradient(140deg, #4A0807 0%, #150202 100%)",
    "linear-gradient(140deg, #751210 0%, #290403 100%)",
  ];
  const bgColor = colors[index % colors.length];

  return (
    <div
      className="project-card group relative overflow-hidden cursor-none"
      style={{ opacity: 0 }}
      data-cursor
      onClick={onOpenModal}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video Preview Frame */}
      <div
        className="relative overflow-hidden flex flex-col justify-between p-5"
        style={{
          height: "280px",
          background: bgColor,
          border: `1px solid ${hovered ? accentColor + "66" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "4px",
          transition: "all 0.4s ease",
          boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.6), 0 0 25px ${accentColor}33` : "none",
        }}
      >
        {/* Real Video or Grid texture */}
        {(project as any).src ? (
          <video
            src={(project as any).src}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
        )}

        {/* Top HUD bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(8px)",
              padding: "0.25rem 0.6rem",
              borderRadius: "3px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            SHOWCASE #{String(index + 1).padStart(2, "0")}
          </div>

          <div
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.5rem",
              letterSpacing: "0.15em",
              color: accentColor,
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}33`,
              padding: "0.2rem 0.55rem",
              borderRadius: "9999px",
            }}
          >
            4K · 60FPS
          </div>
        </div>

        {/* Center Play Button HUD */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 my-auto pointer-events-none">
          <div
            className="flex items-center justify-center transition-all duration-400"
            style={{
              width: hovered ? "64px" : "54px",
              height: hovered ? "64px" : "54px",
              borderRadius: "50%",
              background: hovered ? accentColor : "rgba(0,0,0,0.6)",
              border: `1.5px solid ${accentColor}`,
              boxShadow: hovered ? `0 0 30px ${accentColor}aa` : `0 0 15px ${accentColor}33`,
              transform: hovered ? "scale(1.1)" : "scale(1)",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                color: hovered ? "#000" : "white",
                marginLeft: "3px",
                transition: "color 0.3s ease",
              }}
            >
              ▶
            </span>
          </div>

          <div
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.25em",
              color: hovered ? "white" : "rgba(255,255,255,0.6)",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              transition: "color 0.3s ease",
            }}
          >
            {hovered ? "CLICK TO PLAY DEMO" : "PREVIEW EDIT"}
          </div>
        </div>

        {/* Bottom HUD: Animated Audio Waveform & Client Placeholder Watermark */}
        <div className="relative z-10 flex items-end justify-between">
          <div
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.5rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.3)",
              background: "rgba(0,0,0,0.5)",
              padding: "0.2rem 0.5rem",
              borderRadius: "3px",
            }}
          >
            {(project as any).src ? "CLIENT FOOTAGE LINKED" : "+ REPLACE WITH CLIENT VIDEO"}
          </div>

          {/* Animated audio equalizer bars */}
          <div className="flex items-end gap-1 h-4">
            {[0.4, 0.9, 0.6, 0.3, 0.8, 0.5].map((h, bi) => (
              <div
                key={bi}
                style={{
                  width: "2px",
                  height: hovered ? `${h * 100}%` : `${h * 40}%`,
                  background: accentColor,
                  borderRadius: "1px",
                  transition: "height 0.3s ease",
                  opacity: hovered ? 0.9 : 0.4,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hover accent bottom border line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-500"
          style={{
            background: accentColor,
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Info below */}
      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "1.5rem",
              letterSpacing: "0.05em",
              color: hovered ? accentColor : "white",
              lineHeight: 1,
              transition: "color 0.3s ease",
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
              whiteSpace: "nowrap",
              marginTop: "0.2rem",
            }}
          >
            {project.year}
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.45)",
            marginTop: "0.3rem",
          }}
        >
          {project.category}
        </p>
      </div>
    </div>
  );
}

function ApproachStep({
  step,
  accentColor,
  isLast,
}: {
  step: ServiceData["approach"][0];
  accentColor: string;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="scroll-reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2.5rem 0",
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.07)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="flex items-start gap-8 md:gap-16">
        <span
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: hovered ? accentColor : "rgba(255,255,255,0.25)",
            minWidth: "2.5rem",
            paddingTop: "0.35rem",
            transition: "color 0.3s ease",
          }}
        >
          {step.number}
        </span>

        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-16">
          <h3
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: hovered ? "white" : "rgba(255,255,255,0.8)",
              letterSpacing: "0.05em",
              lineHeight: 1,
              minWidth: "280px",
              transition: "color 0.3s ease",
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.9,
              maxWidth: "420px",
              opacity: hovered ? 1 : 0.7,
              transition: "opacity 0.3s ease",
            }}
          >
            {step.description}
          </p>
        </div>

        <span
          style={{
            color: hovered ? accentColor : "rgba(255,255,255,0.15)",
            fontSize: "1.4rem",
            transition: "color 0.3s ease, transform 0.3s ease",
            transform: hovered ? "translateX(6px)" : "translateX(0)",
            display: "inline-block",
            marginLeft: "auto",
          }}
        >
          →
        </span>
      </div>
    </div>
  );
}

/* ─── Interactive Video Lightbox Modal ─── */
function VideoModal({
  project,
  accentColor,
  onClose,
}: {
  project: ServiceData["projects"][0];
  accentColor: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 20px 80px rgba(0,0,0,0.9), 0 0 50px ${accentColor}22`,
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: accentColor,
                background: `${accentColor}18`,
                padding: "0.2rem 0.6rem",
                borderRadius: "9999px",
              }}
            >
              SHOWCASE PLAYER
            </span>
            <span
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {project.category} · {project.year}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2 text-xl font-mono"
            data-cursor
          >
            ✕
          </button>
        </div>

        {/* Video Player Display Area */}
        <div
          className="relative w-full bg-black flex items-center justify-center overflow-hidden"
          style={{ height: "min(460px, 55vh)" }}
        >
          {(project as any).src ? (
            <video
              src={(project as any).src}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <div
              className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center"
              style={{
                background: "linear-gradient(140deg, #1c0303 0%, #3d0706 50%, #000000 100%)",
              }}
            >
              {/* Grid texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{
                  background: `${accentColor}20`,
                  border: `2px solid ${accentColor}`,
                  boxShadow: `0 0 40px ${accentColor}66`,
                }}
              >
                <span className="text-2xl text-white ml-1">▶</span>
              </div>

              <h4
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: "2.5rem",
                  color: "white",
                  letterSpacing: "0.05em",
                }}
              >
                {project.title}
              </h4>

              <p
                className="mt-2 max-w-md"
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.6,
                }}
              >
                {project.description}
              </p>

              <div
                className="mt-6 flex items-center gap-2 px-4 py-2 rounded-md"
                style={{
                  background: "rgba(255,90,77,0.1)",
                  border: "1px dashed rgba(255,90,77,0.4)",
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "#FF5A4D",
                }}
              >
                <span>🎬 READY FOR CLIENT VIDEO EMBED</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / CTAs */}
        <div className="p-6 bg-white/[0.02] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tags.map((tag, ti) => (
                <span
                  key={ti}
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.06)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              TAHA EL MAANAOUI · HIGH-RETENTION POST-PRODUCTION
            </p>
          </div>

          <Link
            href="/start-a-project"
            onClick={onClose}
            data-cursor
            className="group px-6 py-3 rounded-full text-xs font-mono font-bold tracking-widest text-black transition-all duration-300 flex items-center gap-2"
            style={{
              background: accentColor,
              boxShadow: `0 0 20px ${accentColor}55`,
            }}
          >
            REQUEST SIMILAR EDIT →
          </Link>
        </div>
      </div>
    </div>
  );
}
