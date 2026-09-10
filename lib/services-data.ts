// lib/services-data.ts — Video Editing Disciplines & Post-Production Services for Taha El Maanaoui

export interface ServiceProject {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
}

export interface ServiceApproachStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  headline: string;
  subheadline: string;
  description: string;
  accentColor: string;
  heroLabel: string;
  stats: { value: string; label: string }[];
  approach: ServiceApproachStep[];
  projects: ServiceProject[];
}

export const services: ServiceData[] = [
  {
    slug: "shorts-reels-tiktok",
    title: "Shorts / Reels / TikTok",
    shortTitle: "Short-Form",
    headline: "SHORTS / REELS / TIKTOK",
    subheadline: "HIGH-RETENTION VIRAL SHORT-FORM POST-PRODUCTION",
    description:
      "Transforming long-form video, raw clips, and scripts into fast-paced, high-hook short-form videos engineered to capture attention, maximize retention, and scale social reach on TikTok, Instagram Reels, and YouTube Shorts.",
    accentColor: "#FF5A4D",
    heroLabel: "DISCIPLINE 01",
    stats: [
      { value: "500+", label: "Videos Edited" },
      { value: "90%+", label: "Avg Audience Retention" },
      { value: "24-48H", label: "Fast Turnaround" },
    ],
    approach: [
      {
        number: "01",
        title: "HOOK & STORY CURATION",
        description:
          "Analyzing raw footage to isolate the strongest visual & verbal hooks in the first 3 seconds.",
      },
      {
        number: "02",
        title: "DYNAMIC PACING & KINETIC TEXT",
        description:
          "Adding snappy cuts, kinetic captions, sound effects, and pattern interrupts to maintain maximum viewer focus.",
      },
      {
        number: "03",
        title: "COLOR & SOUND MASTERING",
        description:
          "Polishing audio, adding background music tracks, and applying punchy color grades tailored for mobile screens.",
      },
    ],
    projects: [
      {
        title: "VIRAL REELS SHOWCASE",
        category: "Short-Form · Social Growth",
        year: "2024",
        description: "Fast-paced Instagram Reels edit generating 1M+ views with kinetic captions",
        tags: ["Reels", "Retention", "Kinetic Text"],
      },
      {
        title: "TIKTOK HOOK AD",
        category: "TikTok · Viral Edit",
        year: "2024",
        description: "Hook-optimized TikTok edit driving massive engagement for e-commerce brand",
        tags: ["TikTok", "Viral Hook", "SFX"],
      },
      {
        title: "YOUTUBE SHORTS BATCH",
        category: "Shorts · Content Repurposing",
        year: "2024",
        description: "Repurposed long-form podcast clips into high-performing YouTube Shorts",
        tags: ["YouTube Shorts", "Podcast Clip", "Subtitles"],
      },
    ],
  },
  {
    slug: "ugc-product-ads",
    title: "UGC & E-Commerce Product Ads",
    shortTitle: "UGC & Ads",
    headline: "UGC & E-COMMERCE PRODUCT ADS",
    subheadline: "HIGH-CONVERTING AD POST-PRODUCTION FOR SCALING BRANDS",
    description:
      "Turning raw user-generated content and product footage into high-converting video ad creatives optimized for Meta, TikTok Ads, and YouTube pre-rolls.",
    accentColor: "#E23829",
    heroLabel: "DISCIPLINE 02",
    stats: [
      { value: "3X+", label: "ROAS Impact" },
      { value: "100+", label: "Ad Variations" },
      { value: "Custom", label: "Hook Testing Edits" },
    ],
    approach: [
      {
        number: "01",
        title: "CREATIVE BRIEF & HOOK VARIANTS",
        description:
          "Structuring multiple scroll-stopping video hooks to test across ad campaigns.",
      },
      {
        number: "02",
        title: "FEATURE HIGHLIGHTS & SOCIAL PROOF",
        description:
          "Integrating callouts, problem-solution arcs, customer reviews, and dynamic product motion graphics.",
      },
      {
        number: "03",
        title: "CTA & FORMAT OPTIMIZATION",
        description:
          "Delivering ready-to-launch ad variations formatted for 9:16, 4:5, and 16:9 ad placements.",
      },
    ],
    projects: [
      {
        title: "E-COM PRODUCT LAUNCH AD",
        category: "Product Ad · Meta Ads",
        year: "2024",
        description: "High-energy e-commerce video ad edit highlighting product benefits & urgency",
        tags: ["E-Commerce", "Meta Ads", "Motion Graphics"],
      },
      {
        title: "UGC SKINTREAT CAMPAIGN",
        category: "UGC Ad · TikTok Ads",
        year: "2024",
        description: "Authentic UGC video ad edit featuring dynamic split screens and voiceover sync",
        tags: ["UGC", "TikTok Ads", "Direct Response"],
      },
    ],
  },
  {
    slug: "vsl-sales-letters",
    title: "Video Sales Letters (VSL)",
    shortTitle: "VSL",
    headline: "VIDEO SALES LETTERS (VSL)",
    subheadline: "PERSUASIVE SALES EDITS ENGINEERED FOR CONVERSIONS",
    description:
      "Crafting high-converting Video Sales Letters that pair clear sales messaging with engaging visual pacing, kinetic typography, B-roll overlays, and custom sound design.",
    accentColor: "#FF5A4D",
    heroLabel: "DISCIPLINE 03",
    stats: [
      { value: "50+", label: "VSLs Delivered" },
      { value: "2X", label: "Conversion Uplift" },
      { value: "Full", label: "Post-Production" },
    ],
    approach: [
      {
        number: "01",
        title: "SCRIPT TIMING & PACING",
        description:
          "Structuring the audio track to ensure maximum clarity, emphasis, and persuasive momentum.",
      },
      {
        number: "02",
        title: "VISUAL B-ROLL & KINETIC TEXT",
        description:
          "Layering relevant visual footage, chart animations, and kinetic text to reinforce every sales point.",
      },
      {
        number: "03",
        title: "AUDIO MASTERING & CLEANUP",
        description:
          "Cleaning vocal audio, balancing background soundscapes, and polishing the final edit.",
      },
    ],
    projects: [
      {
        title: "HIGH-TICKET ACADEMY VSL",
        category: "VSL · Sales Funnel",
        year: "2024",
        description: "15-minute high-ticket course VSL with kinetic text and custom visual B-roll",
        tags: ["VSL", "Sales Funnel", "Kinetic Text"],
      },
    ],
  },
  {
    slug: "brand-commercials",
    title: "Brand Commercials",
    shortTitle: "Commercials",
    headline: "BRAND COMMERCIALS",
    subheadline: "CINEMATIC COMMERCIAL POST-PRODUCTION & COLOR GRADING",
    description:
      "Delivering high-end, cinematic video commercials for brands, products, and services with premium color grading, sound design, and seamless editing.",
    accentColor: "#E23829",
    heroLabel: "DISCIPLINE 04",
    stats: [
      { value: "Cinema", label: "Color Grading" },
      { value: "4K/8K", label: "Footage Support" },
      { value: "Custom", label: "Sound FX & Mix" },
    ],
    approach: [
      {
        number: "01",
        title: "STORY ASSEMBLY",
        description:
          "Assembling the narrative cut to match the brand tone and emotional beats.",
      },
      {
        number: "02",
        title: "COLOR GRADING & VFX",
        description:
          "Applying mood-setting color grades in DaVinci Resolve and integrating clean visual effects.",
      },
      {
        number: "03",
        title: "SOUND DESIGN & MASTERING",
        description:
          "Creating immersive audio environments with custom sound effects and licensed music.",
      },
    ],
    projects: [
      {
        title: "LUXEBOUW ARCHITECTURAL FILM",
        category: "Brand Commercial · Film",
        year: "2024",
        description: "Cinematic commercial edit showcasing luxury residential architecture",
        tags: ["Commercial", "Architecture", "Cinematic"],
      },
    ],
  },
  {
    slug: "youtube-talking-head",
    title: "YouTube Vlogs & Talking Head",
    shortTitle: "YouTube",
    headline: "YOUTUBE VLOGS & TALKING HEAD",
    subheadline: "ENGAGING LONG-FORM CONTENT BUILT FOR AUDIENCE RETENTION",
    description:
      "Transforming raw YouTube talking head footage and vlog clips into engaging, highly-polished videos complete with graphics, lower thirds, SFX, and pacing cuts.",
    accentColor: "#FF5A4D",
    heroLabel: "DISCIPLINE 05",
    stats: [
      { value: "100+", label: "YouTube Videos" },
      { value: "High", label: "Retention Rate" },
      { value: "Custom", label: "Motion Graphics" },
    ],
    approach: [
      {
        number: "01",
        title: "ROUGH CUT & DEAD-AIR REMOVAL",
        description:
          "Trimming pauses, stutters, and filler words for a tight, engaging flow.",
      },
      {
        number: "02",
        title: "GRAPHICS, B-ROLL & MEMES",
        description:
          "Adding context visuals, lower thirds, zoom-ins, and sound effects to prevent audience drop-off.",
      },
      {
        number: "03",
        title: "FINAL POLISH & THUMBNAIL STILLS",
        description:
          "Final color grade, audio leveling, and thumbnail highlight extraction.",
      },
    ],
    projects: [
      {
        title: "CREATOR VLOG & TUTORIAL",
        category: "YouTube · Long-Form",
        year: "2024",
        description: "Engaging 20-minute creator video with dynamic B-roll and screen edits",
        tags: ["YouTube", "Vlog", "Talking Head"],
      },
    ],
  },
  {
    slug: "documentaries-essays",
    title: "Video Essays & Documentaries",
    shortTitle: "Documentaries",
    headline: "VIDEO ESSAYS & DOCUMENTARIES",
    subheadline: "DEEP NARRATIVE STORYTELLING & ARCHIVAL EDITING",
    description:
      "Crafting immersive mini-documentaries, video essays, and investigative video stories with rich soundscapes, historical archive integration, and seamless storytelling.",
    accentColor: "#E23829",
    heroLabel: "DISCIPLINE 06",
    stats: [
      { value: "Deep", label: "Narrative Pacing" },
      { value: "Custom", label: "Map & Chart Anim" },
      { value: "Full", label: "Audio Storytelling" },
    ],
    approach: [
      {
        number: "01",
        title: "NARRATIVE STRUCTURING",
        description:
          "Mapping out chapters and thematic pacing to guide the viewer through complex topics.",
      },
      {
        number: "02",
        title: "ARCHIVAL & GRAPHIC OVERLAYS",
        description:
          "Integrating news clips, historical images, custom map graphics, and document callouts.",
      },
      {
        number: "03",
        title: "ATMOSPHERIC SOUNDSCAPE",
        description:
          "Designing dramatic audio builds, vocal isolation, and cinematic scores.",
      },
    ],
    projects: [
      {
        title: "DOCUMENTARY ESSAY FILM",
        category: "Documentary · Video Essay",
        year: "2023",
        description: "Mini-documentary edit with custom motion maps and archival audio polish",
        tags: ["Documentary", "Video Essay", "Storytelling"],
      },
    ],
  },
  {
    slug: "podcasts-saas-demos",
    title: "Podcasts & SaaS Product Demos",
    shortTitle: "Podcasts & Demos",
    headline: "PODCASTS & SAAS PRODUCT DEMOS",
    subheadline: "CLEAN MULTI-CAM EDITING & PRODUCT WALKTHROUGHS",
    description:
      "Providing multi-camera podcast editing, interview cuts, and clean SaaS software product walkthrough videos that present complex platforms in sleek, digestible video formats.",
    accentColor: "#FF5A4D",
    heroLabel: "DISCIPLINE 07",
    stats: [
      { value: "Multi-Cam", label: "Auto-Switching" },
      { value: "SaaS", label: "UI Motion Highlights" },
      { value: "Studio", label: "Audio Mastering" },
    ],
    approach: [
      {
        number: "01",
        title: "MULTI-CAM SYNC & AUDIO CLEANUP",
        description:
          "Synchronizing multi-angle cameras and removing noise/room echo from microphones.",
      },
      {
        number: "02",
        title: "UI ANIMATION & ZOOM HIGHLIGHTS",
        description:
          "Framing SaaS software dashboards with smooth zooms, cursor tracks, and callouts.",
      },
      {
        number: "03",
        title: "CHAPTER BREAKS & EXPORT",
        description:
          "Exporting full episodes along with bite-sized highlights for social promotion.",
      },
    ],
    projects: [
      {
        title: "SAAS PLATFORM WALKTHROUGH",
        category: "SaaS Demo · Explainer",
        year: "2024",
        description: "Sleek SaaS product demo video with zoomed UI highlights & voiceover",
        tags: ["SaaS", "Product Demo", "Explainer"],
      },
    ],
  },
];

export const servicesSlugs = services.map((s) => s.slug);

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
