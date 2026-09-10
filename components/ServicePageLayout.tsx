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

  useEffect(() => {
    // Hero text reveal
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      ".hero-line-inner",
      { y: "110%", opacity: 0 },
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

  const isAccentGreen = service.accentColor === "#C8FF00";

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <CustomCursor />

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
            background: isAccentGreen
              ? "radial-gradient(ellipse, rgba(200,255,0,0.06) 0%, transparent 60%)"
              : "radial-gradient(ellipse, rgba(0,25,255,0.1) 0%, transparent 60%)",
            transform: `translate(${mousePos.x * 18}px, ${mousePos.y * 14}px)`,
            transition: "transform 0.6s ease-out",
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

        {/* Label */}
        <div
          className="hero-meta section-label mb-6"
          style={{ position: "relative", zIndex: 3 }}
        >
          {service.heroLabel}
        </div>

        {/* Main heading */}
        <div className="hero-title-container relative" style={{ zIndex: 3, overflow: "visible" }}>
          <h1
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(5rem, 15vw, 14rem)",
              lineHeight: 0.87,
              color: "white",
              overflow: "visible",
            }}
          >
            {service.headline.split(" ").map((word, wi) => (
              <span key={wi} className="block overflow-hidden">
                <span
                  className="hero-line-inner block translate-y-full"
                  style={{ opacity: 0, color: wi % 2 === 1 && service.headline.split(" ").length > 1 ? service.accentColor : "white" }}
                >
                  {word}
                </span>
              </span>
            ))}
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
                color: "rgba(255,255,255,0.55)",
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
                    color: "rgba(255,255,255,0.35)",
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
      <section className="py-24 md:py-36 px-6 md:px-12" style={{ background: "#080808" }}>
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ OUR APPROACH ══════════════ */}
      <section
        className="py-24 md:py-36 px-6 md:px-12"
        style={{
          background: isAccentGreen
            ? "linear-gradient(180deg, #000730 0%, #000d80 50%, #0019FF 100%)"
            : "linear-gradient(180deg, #050505 0%, #080808 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal mb-16">
            <div className="section-label mb-4" style={{ color: isAccentGreen ? "rgba(200,255,0,0.6)" : undefined }}>
              HOW WE WORK
            </div>
            <h2
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                color: "white",
                lineHeight: 0.9,
              }}
            >
              OUR APPROACH
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
            background: "radial-gradient(ellipse, rgba(0,25,255,0.12) 0%, transparent 70%)",
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
}: {
  project: ServiceData["projects"][0];
  index: number;
  accentColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  const colors = [
    "rgba(0,25,255,0.08)",
    "rgba(200,255,0,0.05)",
    "rgba(255,255,255,0.04)",
    "rgba(0,25,255,0.12)",
    "rgba(200,255,0,0.07)",
    "rgba(255,255,255,0.06)",
  ];
  const bgColor = colors[index % colors.length];

  return (
    <div
      className="project-card group relative overflow-hidden"
      style={{ opacity: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Colour placeholder block */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "260px",
          background: bgColor,
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "2px",
          transition: "border-color 0.3s ease",
          borderColor: hovered ? `${accentColor}44` : "rgba(255,255,255,0.06)",
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Project number */}
        <div
          className="absolute top-5 left-5"
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Hover accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-transform duration-500"
          style={{
            background: accentColor,
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
          }}
        />

        {/* Tags on hover */}
        <div
          className="absolute top-4 right-4 flex flex-col gap-1 items-end transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)" }}
        >
          {project.tags.slice(0, 2).map((tag, ti) => (
            <span
              key={ti}
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.2em",
                color: accentColor,
                background: `${accentColor}15`,
                padding: "0.2rem 0.5rem",
                borderRadius: "9999px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Info below */}
      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "1.4rem",
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
              color: "rgba(255,255,255,0.3)",
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
            fontSize: "0.58rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.35)",
            marginTop: "0.4rem",
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
