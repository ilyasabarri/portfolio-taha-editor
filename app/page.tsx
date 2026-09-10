"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import MarqueeStrip from "@/components/MarqueeStrip";

function HeroFallback() {
  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-between h-[100dvh] md:h-[100svh]"
      style={{ background: "#040101" }}
    >
      {/* Sleek top loading line animation */}
      <div className="absolute top-0 left-0 right-0 h-1 z-50 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#E23829] via-[#FF5A4D] to-[#E23829] animate-pulse" />
      </div>

      {/* Backdrop Layer: TAHA ELMAANAOUI */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-start pt-24 sm:pt-24 md:pt-20 pointer-events-none overflow-hidden select-none">
        <div className="relative w-full text-center flex flex-col items-center justify-center">
          <div className="relative w-[92vw] max-w-6xl flex justify-center px-2">
            <img
              src="/taha-title-logo.png"
              alt="TAHA"
              className="w-full h-auto object-contain max-h-[25vh] sm:max-h-[48vh] md:max-h-[58vh] scale-100 sm:scale-115 md:scale-120 transform origin-top"
              style={{
                filter:
                  "drop-shadow(0 0 50px rgba(226,56,41,0.85)) drop-shadow(0 25px 40px rgba(0,0,0,0.95))",
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
              fontSize: "clamp(2.4rem, 10vw, 11rem)",
              color: "#FFF0F0",
              textShadow:
                "0 0 10px #FF5A4D, 0 0 25px #E23829, 0 0 50px #E23829",
              whiteSpace: "nowrap",
            }}
          >
            ELmaanaoui
          </div>
        </div>
      </div>

      {/* Center Layer: Hero Person Cutout */}
      <div className="absolute inset-0 z-[3] flex items-end justify-center pointer-events-none overflow-hidden">
        <div
          className="relative w-full max-w-4xl h-[68vh] sm:h-[88vh] md:h-[95vh] flex items-end justify-center"
          style={{
            filter:
              "drop-shadow(0 0 40px rgba(226,56,41,0.5)) drop-shadow(0 25px 45px rgba(0,0,0,0.95))",
          }}
        >
          <img
            src="/taha-hero.png"
            alt="Taha ELmaanaoui"
            className="hidden md:block h-full w-auto max-w-full object-contain object-bottom scale-110"
            style={{
              maxHeight: "95vh",
              maskImage: "linear-gradient(to top, black 88%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, black 88%, transparent 100%)",
            }}
          />
          <img
            src="/taha-hero-mobile.png"
            alt="Taha ELmaanaoui"
            className="block md:hidden h-full w-auto object-contain object-bottom scale-100"
            style={{
              maxHeight: "68vh",
              maskImage: "linear-gradient(to top, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, black 88%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-6 z-30 md:bottom-8 md:right-10 md:left-auto pointer-events-auto">
        <div className="flex items-center gap-3 text-white/70">
          <span className="text-xs sm:text-[0.7rem] md:text-[0.6rem] font-mono tracking-[0.3em] font-bold">
            SCROLL
          </span>
          <span className="text-lg md:text-sm">↓</span>
        </div>
      </div>
    </section>
  );
}

// Load 3D hero client-side only (no SSR for WebGL)
const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

const DISCIPLINES = [
  "UGC ADS",
  "E-COMMERCE PRODUCT ADS",
  "VIDEO SALES LETTERS (VSL)",
  "BRAND COMMERCIALS",
  "YOUTUBE VLOGS",
  "TALKING HEAD VIDEOS",
  "VIDEO DOCUMENTARIES / VIDEO ESSAYS",
  "PODCASTS / INTERVIEWS",
  "MUSIC VIDEOS",
  "EXPLAINER VIDEOS",
  "SAAS PRODUCT DEMOS",
];

const MARQUEE_2 = [
  "TAHA ELMAANAOUI",
  "VIDEO EDITOR & 3D ARTIST",
  "CREATIVE VISION",
  "PREMIUM EDITING",
  "3D CGI & MOTION GRAPHICS",
  "TAHA ELMAANAOUI",
  "CREATIVE VISION",
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Preloader */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Main site */}
      <main
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease 0.2s",
        }}
      >
        {/* Navigation */}
        <Navigation />

        {/* Hero — 3D scene */}
        <HeroScene />

        {/* Scrolling discipline ticker */}
        <MarqueeStrip items={DISCIPLINES} speed={32} />

        {/* About */}
        <About />

        {/* Accent marquee */}
        <MarqueeStrip items={MARQUEE_2} speed={22} reverse accent />

        {/* Services — blue gradient section */}
        <Services />

        {/* Portfolio — fullscreen + grid */}
        <Portfolio />

        {/* Team */}
        <Team />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact + footer */}
        <Contact />
      </main>
    </>
  );
}
