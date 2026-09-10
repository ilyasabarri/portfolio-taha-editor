// lib/services-data.ts — Complete 13 Video Editing Services & Post-Production Disciplines for Taha El Maanaoui

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
      "Transforming raw video clips, long-form content, and scripts into fast-paced, high-hook short-form videos engineered to capture attention, maximize retention, and scale reach across TikTok, Instagram Reels, and YouTube Shorts.",
    accentColor: "#FF5A4D",
    heroLabel: "SERVICE 01",
    stats: [
      { value: "500+", label: "Shorts & Reels Edited" },
      { value: "90%+", label: "Avg Audience Retention" },
      { value: "24-48H", label: "Fast Turnaround" },
    ],
    approach: [
      {
        number: "01",
        title: "HOOK & STORY CURATION",
        description:
          "Isolating the strongest visual and verbal hooks in the first 3 seconds of raw footage.",
      },
      {
        number: "02",
        title: "DYNAMIC PACING & KINETIC TEXT",
        description:
          "Adding snappy cuts, kinetic captions, sound effects, and pattern interrupts to lock viewer attention.",
      },
      {
        number: "03",
        title: "COLOR & SOUND MASTERING",
        description:
          "Polishing audio tracks, adding background music, and applying punchy mobile-first color grades.",
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
        title: "TIKTOK HOOK EDIT",
        category: "TikTok · Viral Edit",
        year: "2024",
        description: "Hook-optimized TikTok video edit driving massive organic engagement",
        tags: ["TikTok", "Viral Hook", "SFX"],
      },
    ],
  },
  {
    slug: "ugc-ads",
    title: "UGC Ads",
    shortTitle: "UGC Ads",
    headline: "UGC ADS",
    subheadline: "HIGH-CONVERTING USER-GENERATED CONTENT AD CREATIVES",
    description:
      "Turning raw customer clips and creator footage into high-performing UGC video ad creatives engineered to convert viewers into buyers on Meta, TikTok Ads, and YouTube.",
    accentColor: "#E23829",
    heroLabel: "SERVICE 02",
    stats: [
      { value: "3X+", label: "ROAS Impact" },
      { value: "100+", label: "UGC Ads Delivered" },
      { value: "Custom", label: "Hook Variant Edits" },
    ],
    approach: [
      {
        number: "01",
        title: "HOOK STRUCTURE & CURATION",
        description:
          "Structuring multiple scroll-stopping video hooks per ad batch to maximize ROAS testing.",
      },
      {
        number: "02",
        title: "PROBLEM-SOLUTION PACING",
        description:
          "Layering authentic voiceovers, product callouts, and customer proof points into a seamless narrative.",
      },
      {
        number: "03",
        title: "AD VARIANT EXPORTS",
        description:
          "Exporting ready-to-launch UGC ad variations formatted for 9:16, 4:5, and 16:9 placements.",
      },
    ],
    projects: [
      {
        title: "UGC SKINCARE CAMPAIGN",
        category: "UGC Ad · TikTok Ads",
        year: "2024",
        description: "Authentic UGC video ad edit with voiceover sync and dynamic text callouts",
        tags: ["UGC", "TikTok Ads", "Direct Response"],
      },
    ],
  },
  {
    slug: "ecommerce-product-ads",
    title: "E-Commerce Product Ads",
    shortTitle: "Product Ads",
    headline: "E-COMMERCE PRODUCT ADS",
    subheadline: "HIGH-IMPACT VIDEO ADS DESIGNED TO SCALE SALES",
    description:
      "Editing high-energy e-commerce product videos that highlight features, demonstrate value, and drive immediate purchase intent across digital ad networks.",
    accentColor: "#FF5A4D",
    heroLabel: "SERVICE 03",
    stats: [
      { value: "High", label: "Conversion Lift" },
      { value: "Motion", label: "Graphics & Badges" },
      { value: "Multi-Platform", label: "Ad Formats" },
    ],
    approach: [
      {
        number: "01",
        title: "FOOTAGE ASSEMBLY & SHOWCASE",
        description:
          "Combining macro product shots, usage clips, and lifestyle angles into a crisp commercial cut.",
      },
      {
        number: "02",
        title: "FEATURE CALLOUTS & BADGES",
        description:
          "Integrating kinetic typography, discount badges, and problem-solution visual overlays.",
      },
      {
        number: "03",
        title: "CTA ENHANCEMENT",
        description:
          "Creating high-impact end-screen calls to action optimized for ad conversions.",
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
    ],
  },
  {
    slug: "vsl-sales-letters",
    title: "Video Sales Letters (VSL)",
    shortTitle: "VSL",
    headline: "VIDEO SALES LETTERS (VSL)",
    subheadline: "PERSUASIVE SALES EDITS ENGINEERED FOR MAXIMUM CONVERSIONS",
    description:
      "Crafting high-converting Video Sales Letters that pair clear sales messaging with engaging visual pacing, kinetic typography, B-roll overlays, and custom audio mixing.",
    accentColor: "#E23829",
    heroLabel: "SERVICE 04",
    stats: [
      { value: "50+", label: "VSLs Delivered" },
      { value: "2X", label: "Conversion Uplift" },
      { value: "Full", label: "Post-Production" },
    ],
    approach: [
      {
        number: "01",
        title: "SCRIPT PACING & AUDIO CLEANUP",
        description:
          "Refining audio tracks for maximum voice clarity and persuasive timing.",
      },
      {
        number: "02",
        title: "VISUAL B-ROLL & KINETIC TEXT",
        description:
          "Layering visual proof, chart animations, and kinetic text overlays to reinforce every sales point.",
      },
      {
        number: "03",
        title: "FINAL SOUND & POLISH",
        description:
          "Mastering background music levels and adding subtle sound effects for transition impact.",
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
      "Delivering high-end cinematic video commercials for brands, products, and services with premium color grading, sound design, and seamless storytelling cuts.",
    accentColor: "#FF5A4D",
    heroLabel: "SERVICE 05",
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
    slug: "youtube-vlogs",
    title: "YouTube Vlogs",
    shortTitle: "YouTube Vlogs",
    headline: "YOUTUBE VLOGS",
    subheadline: "DYNAMIC LONG-FORM STORYTELLING BUILT FOR RETENTION",
    description:
      "Transforming raw vlog clips and travel footage into engaging, highly-polished YouTube videos complete with storytelling cuts, sound design, and visual pacing.",
    accentColor: "#E23829",
    heroLabel: "SERVICE 06",
    stats: [
      { value: "100+", label: "YouTube Edits" },
      { value: "High", label: "Watch Time Lift" },
      { value: "Full", label: "SFX & Music Mix" },
    ],
    approach: [
      {
        number: "01",
        title: "NARRATIVE CUT & PACING",
        description:
          "Structuring raw vlog clips into a cohesive, engaging storyline that maintains watch time.",
      },
      {
        number: "02",
        title: "SOUND DESIGN & MUSIC SYNC",
        description:
          "Pairing upbeat soundtracks with environmental sound effects for high immersion.",
      },
      {
        number: "03",
        title: "COLOR & TEXT GRAPHICS",
        description:
          "Applying vibrant color grades, lower thirds, and travel location callouts.",
      },
    ],
    projects: [
      {
        title: "TRAVEL & LIFESTYLE VLOG",
        category: "YouTube · Vlog",
        year: "2024",
        description: "High-energy travel vlog edit featuring seamless transitions & custom soundscapes",
        tags: ["YouTube", "Vlog", "Travel"],
      },
    ],
  },
  {
    slug: "talking-head-videos",
    title: "Talking Head Videos",
    shortTitle: "Talking Head",
    headline: "TALKING HEAD VIDEOS",
    subheadline: "POLISHED EDUCATIONAL & CREATOR CONTENT EDITS",
    description:
      "Editing clean, professional talking head videos for YouTube creators, educators, and thought leaders with graphics, lower thirds, dead-air removal, and B-roll inserts.",
    accentColor: "#FF5A4D",
    heroLabel: "SERVICE 07",
    stats: [
      { value: "Clean", label: "Dead-Air Trimming" },
      { value: "Dynamic", label: "B-Roll & Graphics" },
      { value: "Pro", label: "Audio Polish" },
    ],
    approach: [
      {
        number: "01",
        title: "PAUSE & STUTTER REMOVAL",
        description:
          "Removing silent gaps, stutters, and repetitive takes to create a tight speech rhythm.",
      },
      {
        number: "02",
        title: "GRAPHICS & B-ROLL INSERTION",
        description:
          "Overlaying relevant diagrams, screen recordings, stock B-roll, and lower thirds.",
      },
      {
        number: "03",
        title: "ZOOMS & SOUND FX",
        description:
          "Adding subtle punch-in zooms and accent SFX to keep viewers visual attention.",
      },
    ],
    projects: [
      {
        title: "CREATOR TUTORIAL & TALKING HEAD",
        category: "YouTube · Talking Head",
        year: "2024",
        description: "Engaging educational talking head video with dynamic screen inserts",
        tags: ["Talking Head", "YouTube", "Educational"],
      },
    ],
  },
  {
    slug: "video-documentaries-essays",
    title: "Video Documentaries / Video Essays",
    shortTitle: "Documentaries",
    headline: "VIDEO DOCUMENTARIES / VIDEO ESSAYS",
    subheadline: "DEEP NARRATIVE STORYTELLING & ARCHIVAL EDITING",
    description:
      "Crafting immersive mini-documentaries and video essays with rich soundscapes, historical archive integration, map animations, and deep narrative storytelling.",
    accentColor: "#E23829",
    heroLabel: "SERVICE 08",
    stats: [
      { value: "Deep", label: "Narrative Pacing" },
      { value: "Custom", label: "Map & Archive Anim" },
      { value: "Full", label: "Audio Storytelling" },
    ],
    approach: [
      {
        number: "01",
        title: "NARRATIVE STRUCTURING",
        description:
          "Mapping out chapters and thematic pacing to guide viewers through complex subjects.",
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
    slug: "podcasts-interviews",
    title: "Podcasts / Interviews",
    shortTitle: "Podcasts",
    headline: "PODCASTS / INTERVIEWS",
    subheadline: "MULTI-CAM PODCAST POST-PRODUCTION & AUDIO MASTERING",
    description:
      "Providing multi-camera podcast editing, interview cuts, room-noise reduction, and audio/video synchronization for show hosts and media brands.",
    accentColor: "#FF5A4D",
    heroLabel: "SERVICE 09",
    stats: [
      { value: "Multi-Cam", label: "Auto-Switching" },
      { value: "Studio", label: "Audio Mastering" },
      { value: "Social", label: "Clips Included" },
    ],
    approach: [
      {
        number: "01",
        title: "MULTI-CAM SYNC & AUDIO CLEANUP",
        description:
          "Synchronizing multi-angle camera tracks and removing room echo and background noise.",
      },
      {
        number: "02",
        title: "SPEAKER SWITCHING & GRAPHICS",
        description:
          "Cutting between host and guest angles with smooth transitions and name tags.",
      },
      {
        number: "03",
        title: "HIGHLIGHT REEL EXTRACTION",
        description:
          "Cutting key moments into vertical video snippets for social promotion.",
      },
    ],
    projects: [
      {
        title: "MULTI-CAM PODCAST EPISODE",
        category: "Podcast · Multi-Cam",
        year: "2024",
        description: "Full multi-camera podcast episode edit with custom lower thirds & clip exports",
        tags: ["Podcast", "Multi-Cam", "Audio Mixing"],
      },
    ],
  },
  {
    slug: "saas-product-demos",
    title: "SaaS Product Demos",
    shortTitle: "SaaS Demos",
    headline: "SAAS PRODUCT DEMOS",
    subheadline: "CLEAN SOFTWARE WALKTHROUGHS & UI MOTION HIGHLIGHTS",
    description:
      "Editing crisp SaaS software product walkthrough videos that present complex platforms in sleek, highly-digestible video formats.",
    accentColor: "#E23829",
    heroLabel: "SERVICE 10",
    stats: [
      { value: "SaaS", label: "UI Motion Highlights" },
      { value: "Crisp", label: "Voiceover Sync" },
      { value: "Custom", label: "Cursor Tracking" },
    ],
    approach: [
      {
        number: "01",
        title: "SCREEN RECORDING CLEANUP",
        description:
          "Trimming awkward pauses during screen captures and smoothing mouse cursor movements.",
      },
      {
        number: "02",
        title: "UI ANIMATION & CALLOUTS",
        description:
          "Adding smooth zooms onto key UI dashboards, feature highlights, and callout graphics.",
      },
      {
        number: "03",
        title: "VOICEOVER & AUDIO MASTERING",
        description:
          "Syncing crisp voiceovers with background tracks for professional product demos.",
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
  {
    slug: "explainer-videos",
    title: "Explainer Videos",
    shortTitle: "Explainer Videos",
    headline: "EXPLAINER VIDEOS",
    subheadline: "SIMPLIFYING COMPLEX CONCEPTS THROUGH VISUAL MOTION",
    description:
      "Editing engaging explainer videos that break down complex ideas, services, and products into easy-to-understand visual stories.",
    accentColor: "#FF5A4D",
    heroLabel: "SERVICE 11",
    stats: [
      { value: "High", label: "Comprehension Rate" },
      { value: "Custom", label: "Graphic Overlays" },
      { value: "Clear", label: "Narrative Flow" },
    ],
    approach: [
      {
        number: "01",
        title: "SCRIPT & VISUAL MATCHING",
        description:
          "Pairing every sentence of the voiceover with precise visual metaphors and graphics.",
      },
      {
        number: "02",
        title: "MOTION GRAPHICS & TEXT",
        description:
          "Integrating kinetic text, icon animations, and clean visual transitions.",
      },
      {
        number: "03",
        title: "AUDIO & SOUND FX",
        description:
          "Layering pops, swooshes, and music sync to make concepts memorable.",
      },
    ],
    projects: [
      {
        title: "FINTECH EXPLAINER FILM",
        category: "Explainer · Motion",
        year: "2024",
        description: "Clear, engaging explainer edit for a complex financial technology platform",
        tags: ["Explainer", "Fintech", "Motion Graphics"],
      },
    ],
  },
  {
    slug: "corporate-training-videos",
    title: "Corporate Training Videos",
    shortTitle: "Corporate Training",
    headline: "CORPORATE TRAINING VIDEOS",
    subheadline: "POLISHED INTERNAL & ONBOARDING VIDEO EDITS",
    description:
      "Editing professional corporate training, staff onboarding, and internal communications videos that maintain clarity, authority, and engagement.",
    accentColor: "#E23829",
    heroLabel: "SERVICE 12",
    stats: [
      { value: "Corporate", label: "Brand Alignment" },
      { value: "Chapter", label: "Navigation Markers" },
      { value: "Subtitles", label: "Multi-Language" },
    ],
    approach: [
      {
        number: "01",
        title: "CONTENT MODULE STRUCTURING",
        description:
          "Dividing long corporate presentations into clear, digestible learning modules.",
      },
      {
        number: "02",
        title: "SLIDE & B-ROLL SYNCHRONIZATION",
        description:
          "Syncing speaker footage with high-res presentation slides and workplace B-roll.",
      },
      {
        number: "03",
        title: "BRAND & SUBTITLE COMPLIANCE",
        description:
          "Ensuring corporate brand guidelines and subtitle accessibility standards are met.",
      },
    ],
    projects: [
      {
        title: "GLOBAL ONBOARDING MODULE",
        category: "Corporate · Training",
        year: "2024",
        description: "Polished corporate onboarding video edit with multi-language captions",
        tags: ["Corporate", "Training", "Onboarding"],
      },
    ],
  },
  {
    slug: "music-videos",
    title: "Music Videos",
    shortTitle: "Music Videos",
    headline: "MUSIC VIDEOS",
    subheadline: "CREATIVE & CINEMATIC MUSIC POST-PRODUCTION",
    description:
      "Editing visually stunning music videos featuring rhythm-synced cuts, stylised color grades, speed ramps, and visual effects that elevate artists' music.",
    accentColor: "#FF5A4D",
    heroLabel: "SERVICE 13",
    stats: [
      { value: "Beat-Synced", label: "Rhythm Cutting" },
      { value: "Stylised", label: "VFX & Color" },
      { value: "4K Cinema", label: "Mastering" },
    ],
    approach: [
      {
        number: "01",
        title: "BEAT SYNC & PERFORMANCE CUT",
        description:
          "Cutting artist performance clips in perfect sync with the musical rhythm and bass drops.",
      },
      {
        number: "02",
        title: "STYLATED EFFECTS & SPEED RAMPS",
        description:
          "Applying dynamic speed ramps, light leaks, film grain, and custom visual effects.",
      },
      {
        number: "03",
        title: "CINEMATIC COLOR GRADE",
        description:
          "Crafting mood-defining color grades that suit the genre and visual aesthetic of the track.",
      },
    ],
    projects: [
      {
        title: "ARTIST SINGLE MUSIC VIDEO",
        category: "Music Video · Film",
        year: "2024",
        description: "Rhythm-synced music video edit with stylized color grading & visual transitions",
        tags: ["Music Video", "Rhythm Sync", "Color Grade"],
      },
    ],
  },
];

export const servicesSlugs = services.map((s) => s.slug);

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
