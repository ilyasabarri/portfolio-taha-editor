"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/lang-context";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const chars = sectionRef.current.querySelectorAll(".contact-char");
    const reveals = sectionRef.current.querySelectorAll(".c-reveal");

    gsap.fromTo(
      chars,
      { y: 120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.03,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      reveals,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      }
    );
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="contact-char inline-block"
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between py-20 px-6 md:px-12 overflow-hidden"
      style={{
        background: "#000000",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(226,56,41,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Top label */}
      <div className="section-label c-reveal">{t.contact.label}</div>

      {/* Main CTA title */}
      <div className="flex-1 flex flex-col justify-center py-10">
        <div
          className="contact-title overflow-hidden"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            lineHeight: 0.88,
          }}
        >
          <div
            style={{
              fontSize: "clamp(4rem, 13vw, 13rem)",
              color: "white",
              overflow: "hidden",
            }}
          >
            {splitChars(t.contact.title1)}
          </div>
          <div
            style={{
              fontSize: "clamp(4rem, 13vw, 13rem)",
              color: "#E23829",
              overflow: "hidden",
            }}
          >
            {splitChars(t.contact.title2)}
          </div>
          <div
            style={{
              fontSize: "clamp(4rem, 13vw, 13rem)",
              color: "white",
              overflow: "hidden",
            }}
          >
            {splitChars(t.contact.title3)}
          </div>
        </div>
      </div>

      {/* Bottom contact info */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        {/* Email */}
        <div className="c-reveal">
          <div
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "0.5rem",
            }}
          >
            EMAIL
          </div>
          <a
            href={`mailto:${t.contact.email}`}
            data-cursor
            className="group flex items-center gap-3"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              color: "white",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            {t.contact.email}
            <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </a>
        </div>

        {/* CTA button */}
        <div className="c-reveal">
          <Link
            href="/start-a-project"
            data-cursor
            className="group relative overflow-hidden inline-flex items-center"
            style={{
              padding: "1.2rem 2.5rem",
              border: "1px solid #E23829",
              borderRadius: "9999px",
              background: "transparent",
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              color: "white",
              textDecoration: "none",
              transition: "color 0.4s ease",
            }}
          >
            {/* Fill on hover */}
            <span
              className="absolute inset-0 rounded-full transition-transform duration-500 ease-expo"
              style={{
                background: "#E23829",
                transform: "scaleX(0)",
                transformOrigin: "left",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scaleX(0)";
              }}
            />
            <span className="relative z-10 flex items-center gap-3">
              {t.contact.cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>

        {/* Social links */}
        <div className="c-reveal flex flex-col gap-2">
          {["INSTAGRAM", "BEHANCE", "LINKEDIN"].map((social) => (
            <a
              key={social}
              href="#"
              data-cursor
              className="group flex items-center gap-2"
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
            >
              <span className="transition-all duration-300 group-hover:text-white group-hover:mr-1">
                {social}
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer tagline */}
      <div
        className="c-reveal mt-12 pt-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          {t.contact.tagline}
        </p>
      </div>
    </section>
  );
}
