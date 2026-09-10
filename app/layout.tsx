import type { Metadata } from "next";
import { Space_Mono, Space_Grotesk, Dancing_Script } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const dancing = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-dancing",
});

// Using a system fallback for Bebas Neue-style display; 
// we'll load from Google Fonts via CSS
export const metadata: Metadata = {
  title: "Taha El Maanaoui — Senior Video Editor & Post-Production Specialist",
  description:
    "Official portfolio of Taha El Maanaoui, senior solo video editor with over 500+ completed projects and 60+ global clients. Specializing in high-retention video edits across Shorts, VSLs, Commercials, Documentaries, UGC Ads, and custom post-production on command.",
  keywords: [
    "Taha El Maanaoui",
    "video editor",
    "post production",
    "Premiere Pro editor",
    "After Effects motion graphics",
    "VSL editor",
    "Shorts Reels TikTok editor",
    "UGC video ads",
    "documentary video editor",
    "YouTube vlog editor",
  ],
  openGraph: {
    title: "Taha El Maanaoui — Senior Video Editor",
    description: "High-retention cinematic video edits & custom post-production on demand.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${spaceMono.variable} ${spaceGrotesk.variable} ${dancing.variable} bg-black text-white antialiased overflow-x-hidden`}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
