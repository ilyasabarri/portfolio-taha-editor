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
  title: "North Creative Agency — Creative Digital Experiences",
  description:
    "North Creative Agency is a full-service creative studio specialising in 3D, CGI, branding, photography, videography, sound design, architecture and web design.",
  keywords: [
    "creative agency",
    "3D CGI",
    "branding",
    "photography",
    "videography",
    "architecture",
    "sound design",
    "north creative",
  ],
  openGraph: {
    title: "North Creative Agency",
    description: "Creative Digital Experiences",
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
