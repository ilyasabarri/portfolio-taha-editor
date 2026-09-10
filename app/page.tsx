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

// Load 3D hero client-side only (no SSR for WebGL)
const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: "100svh", background: "#000" }}
      className="flex items-center justify-center"
    >
      <div
        style={{
          color: "rgba(255,255,255,0.15)",
          fontFamily: "monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.4em",
        }}
      >
        INITIALIZING 3D ENGINE...
      </div>
    </div>
  ),
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
