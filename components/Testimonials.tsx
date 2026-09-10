"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/lang-context";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((i) => (i + 1) % t.testimonials.items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [t]);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".t-reveal"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  const clients = t.testimonials.clients;

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1c0303 0%, #000000 100%)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      {/* Divider top */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #E23829, #FF5A4D, transparent)",
          marginBottom: "5rem",
        }}
      />

      {/* Client logos marquee */}
      <div className="overflow-hidden mb-16">
        <div className="marquee-track">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                padding: "0 3rem",
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.2)",
                whiteSpace: "nowrap",
                transition: "color 0.3s ease",
              }}
              className="hover:text-white"
              data-cursor
            >
              {client}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial quote */}
      <div className="px-6 md:px-12 max-w-5xl mx-auto">
        <div className="section-label t-reveal mb-8">{t.testimonials.label}</div>

        <div className="relative" style={{ minHeight: "200px" }}>
          {t.testimonials.items.map((item, i) => (
            <div
              key={i}
              style={{
                position: i === 0 ? "relative" : "absolute",
                top: 0,
                left: 0,
                right: 0,
                opacity: activeQuote === i ? 1 : 0,
                transform: activeQuote === i ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                pointerEvents: activeQuote === i ? "all" : "none",
              }}
            >
              {/* Big quote mark */}
              <div
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: "8rem",
                  color: "#E23829",
                  lineHeight: 0.5,
                  marginBottom: "1rem",
                  opacity: 0.5,
                }}
              >
                "
              </div>

              <blockquote
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                  maxWidth: "800px",
                }}
              >
                {item.quote}
              </blockquote>

              <div className="flex items-center gap-4 mt-6">
                <div
                  style={{ width: "30px", height: "1px", background: "#FF5A4D" }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-space-mono), monospace",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      color: "white",
                    }}
                  >
                    {item.author}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-space-mono), monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote dots */}
        <div className="flex items-center gap-3 mt-12">
          {t.testimonials.items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveQuote(i)}
              data-cursor
              style={{
                width: activeQuote === i ? "2rem" : "0.4rem",
                height: "0.4rem",
                borderRadius: "9999px",
                background: activeQuote === i ? "#FF5A4D" : "rgba(255,255,255,0.2)",
                transition: "all 0.4s ease",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* Divider bottom */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #E23829, transparent)",
          marginTop: "5rem",
        }}
      />
    </section>
  );
}
