"use client";
import { useLang } from "@/lib/lang-context";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navigation() {
  const { t, toggleLocale, locale } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-3 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(0,0,0,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      {/* Logo — actual brand PNG */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        data-cursor
        className="group flex items-center"
        style={{ background: "none", border: "none", padding: 0, cursor: "none" }}
      >
        <div
          className="relative w-[140px] h-[60px] md:w-[240px] md:h-[104px] transition-transform duration-300 ease-out group-hover:scale-105 group-hover:opacity-90"
        >
          <Image
            src="/images/logo.png"
            alt="North Creative Agency"
            fill
            style={{ objectFit: "contain", objectPosition: "left center" }}
            priority
          />
        </div>
      </button>

      {/* Right nav */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={() => scrollTo("work")}
          className="pill-btn text-white/70 hover:text-white"
          data-cursor
        >
          {t.nav.work}
        </button>

        <span className="text-white/20 hidden md:block" style={{ fontFamily: "monospace" }}>
          ———
        </span>

        <button
          onClick={() => scrollTo("contact")}
          className="pill-btn text-white/70 hover:text-white"
          data-cursor
        >
          {t.nav.contact}
        </button>

        {/* EN / FR toggle (Desktop) */}
        <button
          onClick={toggleLocale}
          data-cursor
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ml-2 backdrop-blur-md"
          style={{
            border: "1px solid rgba(255,90,77,0.4)",
            color: "#FF5A4D",
            letterSpacing: "0.15em",
            background: "rgba(226,56,41,0.08)",
            cursor: "none",
          }}
        >
          <span className={locale === "en" ? "opacity-100" : "opacity-35"}>EN</span>
          <span className="opacity-30">/</span>
          <span className={locale === "fr" ? "opacity-100" : "opacity-35"}>FR</span>
        </button>
      </div>
    </nav>

    {/* EN / FR toggle (Mobile Fixed) */}
    <button
      onClick={toggleLocale}
      className="md:hidden fixed bottom-6 right-6 z-[90] flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 backdrop-blur-md"
      style={{
        border: "1px solid rgba(255,90,77,0.4)",
        color: "#FF5A4D",
        letterSpacing: "0.15em",
        background: "rgba(226,56,41,0.08)",
      }}
    >
      <span className={locale === "en" ? "opacity-100" : "opacity-35"}>EN</span>
      <span className="opacity-30">/</span>
      <span className={locale === "fr" ? "opacity-100" : "opacity-35"}>FR</span>
    </button>
    </>
  );
}
