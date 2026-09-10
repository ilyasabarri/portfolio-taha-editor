"use client";

interface MarqueeStripProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  accent?: boolean;
}

export default function MarqueeStrip({
  items,
  speed = 28,
  reverse = false,
  accent = false,
}: MarqueeStripProps) {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: accent
          ? "1px solid rgba(255,90,77,0.2)"
          : "1px solid rgba(226,56,41,0.25)",
        borderBottom: accent
          ? "1px solid rgba(255,90,77,0.2)"
          : "1px solid rgba(226,56,41,0.25)",
        padding: "0.85rem 0",
        background: accent
          ? "rgba(255,90,77,0.04)"
          : "rgba(226,56,41,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                fontWeight: 600,
                color: accent
                  ? "rgba(255,180,180,0.85)"
                  : "rgba(255,255,255,0.85)",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
            <span
              style={{
                fontSize: "0.45rem",
                color: accent ? "#FF5A4D" : "#E23829",
                opacity: 0.85,
              }}
            >
              ◆
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
