"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/lang-context";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const titles = sectionRef.current.querySelectorAll(".reveal-title");
    const paras = sectionRef.current.querySelectorAll(".reveal-para");
    const stats = sectionRef.current.querySelectorAll(".reveal-stat");

    gsap.fromTo(
      titles,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      paras,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      }
    );

    gsap.fromTo(
      stats,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
        },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-40 px-6 md:px-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #1c0303 50%, #3d0706 100%)",
      }}
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(226,56,41,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(226,56,41,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Section label */}
      <div className="reveal-para section-label mb-8">{t.about.label}</div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start max-w-7xl mx-auto">
        {/* Left — Big title */}
        <div>
          <h2
            ref={titleRef}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(5rem, 10vw, 9rem)",
              lineHeight: 0.9,
              color: "white",
            }}
          >
            <div className="reveal-title overflow-hidden">
              <span className="block">{t.about.title1}</span>
            </div>
            <div className="reveal-title overflow-hidden">
              <span className="block text-gradient-red">{t.about.title2}</span>
            </div>
            <div className="reveal-title overflow-hidden">
              <span className="block" style={{ color: "#E23829" }}>
                {t.about.title3}
              </span>
            </div>
          </h2>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-14">
            {[t.about.stat1, t.about.stat2, t.about.stat3].map((stat, i) => (
              <div key={i} className="reveal-stat">
                <div
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    color: "#FF5A4D",
                    lineHeight: 1,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
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

        {/* Right — Text content */}
        <div className="flex flex-col gap-6 md:pt-8">
          {/* Decorative line */}
          <div className="reveal-para flex items-center gap-4">
            <div style={{ width: "40px", height: "1px", background: "#E23829" }} />
            <span
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              SOLO VIDEO EDITOR
            </span>
          </div>

          <p
            className="reveal-para"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.85,
            }}
          >
            {t.about.p1}
          </p>

          <p
            className="reveal-para"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.85,
            }}
          >
            {t.about.p2}
          </p>

          {/* CTA link */}
          <button
            className="reveal-para self-start group flex items-center gap-3 mt-4"
            data-cursor
            onClick={() =>
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                color: "#FF5A4D",
              }}
            >
              DISCOVER OUR WORK
            </span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-2"
              style={{ color: "#FF5A4D" }}
            >
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
