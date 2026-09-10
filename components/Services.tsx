"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/lang-context";

gsap.registerPlugin(ScrollTrigger);

// Maps service title → route slug
const SERVICE_SLUGS: Record<string, string> = {
  "3D & CGI": "3d-cgi",
  "GRAPHIC DESIGN": "graphic-design",
  "DESIGN GRAPHIQUE": "graphic-design",
  "PHOTOGRAPHY": "photography",
  "PHOTOGRAPHIE": "photography",
  "VIDEOGRAPHY": "videography",
  "VIDÉOGRAPHIE": "videography",
  "SOUND DESIGN": "sound-design",
  "DESIGN SONORE": "sound-design",
  "ARCHITECTURE": "architecture",
  "WEB & DIGITAL": "web-digital",
};

export default function Services() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".service-reveal");

    gsap.fromTo(
      items,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-40 px-6 md:px-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #3d0706 0%, #751210 50%, #E23829 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="section-label mb-4">{t.services.label}</div>
            <h2
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                color: "white",
                lineHeight: 0.9,
              }}
            >
              {t.services.title}
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.4)",
              maxWidth: "220px",
            }}
          >
            {t.services.subtitle}
          </p>
        </div>

        {/* Services list */}
        <div>
          {t.services.items.map((service, i) => {
            const slug = SERVICE_SLUGS[service.title];
            const inner = (
              <div className="flex items-center justify-between gap-6">
                {/* Number */}
                <span
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    color:
                      hoveredIndex === i
                        ? "#C8FF00"
                        : "rgba(255,255,255,0.3)",
                    minWidth: "2.5rem",
                    transition: "color 0.3s ease",
                  }}
                >
                  {service.number}
                </span>

                {/* Title */}
                <div className="flex-1">
                  <h3
                    style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                      color:
                        hoveredIndex === i ? "#ffffff" : "rgba(255,255,255,0.85)",
                      letterSpacing: "0.05em",
                      transition: "color 0.3s ease",
                      lineHeight: 1,
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description — visible on hover */}
                <p
                  className="hidden md:block"
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.45)",
                    maxWidth: "260px",
                    textAlign: "right",
                    opacity: hoveredIndex === i ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {service.desc}
                </p>

                {/* Arrow */}
                <span
                  style={{
                    color: hoveredIndex === i ? "#C8FF00" : "rgba(255,255,255,0.2)",
                    fontSize: "1.2rem",
                    transition: "color 0.3s ease, transform 0.3s ease",
                    transform: hoveredIndex === i ? "translateX(6px)" : "translateX(0)",
                    display: "inline-block",
                  }}
                >
                  →
                </span>
              </div>
            );

            return slug ? (
              <Link
                key={i}
                href={`/services/${slug}`}
                className="service-item service-reveal block"
                data-cursor
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  padding: "1.8rem 0",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                {inner}
              </Link>
            ) : (
              <div
                key={i}
                className="service-item service-reveal"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-cursor
                style={{
                  padding: "1.8rem 0",
                  cursor: "default",
                }}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
