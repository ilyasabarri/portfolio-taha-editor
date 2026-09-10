"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import CustomCursor from "@/components/CustomCursor";
import type { Metadata } from "next";

const SERVICES_OPTIONS = [
  "Shorts / Reels / TikTok",
  "UGC & Product Ads",
  "Video Sales Letters (VSL)",
  "Brand Commercials",
  "YouTube Vlogs & Talking Head",
  "Video Essays & Documentaries",
  "Podcasts & SaaS Demos",
  "Custom Video Edit On Demand",
];

const BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Let's discuss",
];

const TIMELINE_OPTIONS = [
  "ASAP",
  "1 – 2 months",
  "3 – 6 months",
  "6+ months",
  "Flexible",
];

type FormData = {
  name: string;
  email: string;
  company: string;
  services: string[];
  brief: string;
  budget: string;
  timeline: string;
};

export default function StartAProjectPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    services: [],
    brief: "",
    budget: "",
    timeline: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    // Hero reveal
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(
      ".hero-word",
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.1, stagger: 0.1, ease: "power4.out" }
    ).fromTo(
      ".form-reveal",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" },
      "-=0.4"
    );

    // Mouse parallax
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Build mailto body
    const body = encodeURIComponent(
      `New Project Inquiry from ${formData.name}\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company || "Not provided"}\n` +
        `Services: ${formData.services.join(", ") || "Not specified"}\n` +
        `Budget: ${formData.budget || "Not specified"}\n` +
        `Timeline: ${formData.timeline || "Not specified"}\n\n` +
        `Project Brief:\n${formData.brief}`
    );

    const subject = encodeURIComponent(`New Project Inquiry — ${formData.name}`);
    const mailtoLink = `mailto:tahaelmaanaoui@gmail.com?subject=${subject}&body=${body}`;

    // Small delay for UX
    await new Promise((r) => setTimeout(r, 600));

    // Open mailto via a hidden anchor so the browser doesn't navigate away
    // from the page (which would prevent the thank-you state from rendering).
    const a = document.createElement("a");
    a.href = mailtoLink;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return <SuccessState />;
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Nav ── */}
      <ProjectNav />

      {/* ══════════════ HERO ══════════════ */}
      <section
        className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden"
        style={{ background: "#000000" }}
      >
        {/* Red glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            left: "50%",
            transform: `translate(calc(-50% + ${mousePos.x * 20}px), ${mousePos.y * 15}px)`,
            width: "80vw",
            height: "60vh",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(226,56,41,0.18) 0%, transparent 65%)",
            filter: "blur(40px)",
            transition: "transform 0.6s ease-out",
          }}
        />

        <div ref={heroRef} className="max-w-7xl mx-auto relative">
          <div
            className="section-label mb-8 form-reveal"
            style={{ opacity: 0 }}
          >
            START A PROJECT
          </div>

          <h1
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: "clamp(4rem, 12vw, 11rem)",
              lineHeight: 0.87,
              overflow: "visible",
            }}
          >
            {["LET'S", "BUILD", "SOMETHING"].map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className="hero-word block"
                  style={{
                    opacity: 0,
                    color: i === 2 ? "#E23829" : "white",
                    transform: "translateY(110%)",
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="form-reveal mt-8 max-w-lg"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.04em",
              lineHeight: 1.8,
              opacity: 0,
            }}
          >
            Tell us about your vision. We'll get back to you within 24 hours to
            talk through next steps.
          </p>
        </div>
      </section>

      {/* ══════════════ FORM ══════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-0">
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-px" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <FormField
                label="YOUR NAME *"
                id="name"
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(v) => setFormData((p) => ({ ...p, name: v }))}
                focused={focusedField === "name"}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
              <FormField
                label="YOUR EMAIL *"
                id="email"
                type="email"
                required
                placeholder="hello@yourcompany.com"
                value={formData.email}
                onChange={(v) => setFormData((p) => ({ ...p, email: v }))}
                focused={focusedField === "email"}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                hasBorderLeft
              />
            </div>

            {/* Row 2: Company */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <FormField
                label="COMPANY / BRAND"
                id="company"
                type="text"
                placeholder="Optional"
                value={formData.company}
                onChange={(v) => setFormData((p) => ({ ...p, company: v }))}
                focused={focusedField === "company"}
                onFocus={() => setFocusedField("company")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Row 3: Services */}
            <div
              className="form-reveal py-10"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                opacity: 0,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: "1.5rem",
                }}
              >
                SERVICES NEEDED
              </div>
              <div className="flex flex-wrap gap-3">
                {SERVICES_OPTIONS.map((service) => {
                  const selected = formData.services.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      data-cursor
                      onClick={() => toggleService(service)}
                      style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        padding: "0.65rem 1.4rem",
                        borderRadius: "9999px",
                        border: selected
                          ? "1px solid #E23829"
                          : "1px solid rgba(255,255,255,0.12)",
                        background: selected ? "#E23829" : "transparent",
                        color: selected ? "white" : "rgba(255,255,255,0.5)",
                        cursor: "none",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 4: Brief */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="py-10">
                <label
                  htmlFor="brief"
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.3em",
                    color:
                      focusedField === "brief"
                        ? "#FF5A4D"
                        : "rgba(255,255,255,0.35)",
                    display: "block",
                    marginBottom: "1rem",
                    transition: "color 0.3s ease",
                  }}
                >
                  PROJECT BRIEF *
                </label>
                <textarea
                  id="brief"
                  required
                  placeholder="Tell us about your project — what are you trying to achieve, who is your audience, any references or inspiration?"
                  rows={6}
                  value={formData.brief}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, brief: e.target.value }))
                  }
                  onFocus={() => setFocusedField("brief")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    borderBottom: `1px solid ${focusedField === "brief" ? "#FF5A4D" : "rgba(255,255,255,0.1)"}`,
                    color: "white",
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.02em",
                    lineHeight: 1.7,
                    padding: "0.5rem 0",
                    resize: "none",
                    outline: "none",
                    transition: "border-color 0.3s ease",
                  }}
                />
              </div>
            </div>

            {/* Row 5: Budget + Timeline */}
            <div
              className="form-reveal grid grid-cols-1 md:grid-cols-2 gap-8 py-10"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                opacity: 0,
              }}
            >
              {/* Budget */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.3em",
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: "1rem",
                  }}
                >
                  BUDGET RANGE
                </div>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      data-cursor
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          budget: p.budget === opt ? "" : opt,
                        }))
                      }
                      style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.15em",
                        padding: "0.5rem 1rem",
                        borderRadius: "9999px",
                        border:
                          formData.budget === opt
                            ? "1px solid #FF5A4D"
                            : "1px solid rgba(255,255,255,0.1)",
                        background:
                          formData.budget === opt
                            ? "rgba(255,90,77,0.12)"
                            : "transparent",
                        color:
                          formData.budget === opt
                            ? "#FF5A4D"
                            : "rgba(255,255,255,0.4)",
                        cursor: "none",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.3em",
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: "1rem",
                  }}
                >
                  TIMELINE
                </div>
                <div className="flex flex-wrap gap-2">
                  {TIMELINE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      data-cursor
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          timeline: p.timeline === opt ? "" : opt,
                        }))
                      }
                      style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.15em",
                        padding: "0.5rem 1rem",
                        borderRadius: "9999px",
                        border:
                          formData.timeline === opt
                            ? "1px solid #FF5A4D"
                            : "1px solid rgba(255,255,255,0.1)",
                        background:
                          formData.timeline === opt
                            ? "rgba(255,90,77,0.12)"
                            : "transparent",
                        color:
                          formData.timeline === opt
                            ? "#FF5A4D"
                            : "rgba(255,255,255,0.4)",
                        cursor: "none",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="form-reveal pt-12 pb-8" style={{ opacity: 0 }}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <p
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.3)",
                    maxWidth: "280px",
                    lineHeight: 1.8,
                  }}
                >
                  WE RESPOND WITHIN 24H AND TREAT EVERY INQUIRY WITH FULL DISCRETION.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  data-cursor
                  className="group relative overflow-hidden"
                  style={{
                    padding: "1.4rem 3.5rem",
                    border: "1px solid #E23829",
                    borderRadius: "9999px",
                    background: "transparent",
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.25em",
                    color: "white",
                    cursor: "none",
                    transition: "color 0.4s ease",
                    opacity: submitting ? 0.6 : 1,
                  }}
                >
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "#E23829",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
                    }}
                    onMouseEnter={(e) => {
                      if (submitting) return;
                      (e.currentTarget as HTMLElement).style.transform = "scaleX(1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scaleX(0)";
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    {submitting ? "SENDING..." : "SEND YOUR BRIEF"}
                    {!submitting && (
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
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

function ProjectNav() {
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
        className="group flex items-center gap-2"
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

      <div style={{ width: "80px" }} />
    </nav>
  );
}

function FormField({
  label,
  id,
  type,
  required,
  placeholder,
  value,
  onChange,
  focused,
  onFocus,
  onBlur,
  hasBorderLeft,
}: {
  label: string;
  id: string;
  type: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  hasBorderLeft?: boolean;
}) {
  return (
    <div
      className="form-reveal py-10"
      style={{
        paddingLeft: hasBorderLeft ? "2rem" : "0",
        borderLeft: hasBorderLeft ? "1px solid rgba(255,255,255,0.07)" : "none",
        opacity: 0,
      }}
    >
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "0.58rem",
          letterSpacing: "0.3em",
          color: focused ? "#FF5A4D" : "rgba(255,255,255,0.35)",
          display: "block",
          marginBottom: "1rem",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${focused ? "#FF5A4D" : "rgba(255,255,255,0.1)"}`,
          color: "white",
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontSize: "1.1rem",
          letterSpacing: "0.02em",
          padding: "0.5rem 0",
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
      />
    </div>
  );
}

function SuccessState() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#000000" }}
    >
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />
      <div
        style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: "clamp(4rem, 12vw, 10rem)",
          lineHeight: 0.9,
          color: "white",
          marginBottom: "2rem",
        }}
      >
        YOUR BRIEF{" "}
        <span style={{ color: "#FF5A4D" }}>IS ON ITS WAY</span>
      </div>
      <p
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "3rem",
          lineHeight: 1.9,
        }}
      >
        THANK YOU — WE'LL BE IN TOUCH WITHIN 24 HOURS.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          color: "#E23829",
          textDecoration: "none",
          padding: "1rem 2.5rem",
          border: "1px solid #E23829",
          borderRadius: "9999px",
          transition: "all 0.3s ease",
        }}
      >
        ← BACK TO HOME
      </Link>
    </div>
  );
}
