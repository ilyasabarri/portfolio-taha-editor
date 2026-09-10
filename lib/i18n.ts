// lib/i18n.ts — All FR/EN translations for Taha El Maanaoui Portfolio

export type Locale = "en" | "fr";

export const translations = {
  en: {
    nav: {
      work: "WORK",
      contact: "CONTACT",
      about: "ABOUT",
      services: "SERVICES",
    },
    preloader: {
      loading: "LOADING",
      tagline: "TAHA EL MAANAOUI — VIDEO EDITOR",
    },
    hero: {
      title1: "CREATIVE",
      title2: "VIDEO",
      title3: "EDITING",
      scroll: "SCROLL TO EXPLORE",
      founded: "500+ PROJECTS DELIVERED",
      description:
        "CRAFTING HIGH-RETENTION, CINEMATIC VIDEO EDITS & POST-PRODUCTION ON DEMAND",
      description2:
        "FROM SHORTS TO DOCUMENTARIES, COMMERCIALS TO VSLS — BUILT ON COMMAND",
    },
    about: {
      label: "ABOUT ME",
      title1: "CRAFTING",
      title2: "VISUAL",
      title3: "IMPACT",
      p1: "I am Taha El Maanaoui, a dedicated professional video editor specializing in high-converting, cinematic post-production. With over 500 projects completed for 60+ global clients, I turn raw footage into high-retention stories that hook viewers and drive results.",
      p2: "Whether you need high-energy short-form content, persuasive VSLs, documentary-style storytelling, or full-scale brand commercials — I work on command to bring your exact vision to life with precision, speed, and creative flair.",
      stat1: { number: "500+", label: "Projects Delivered" },
      stat2: { number: "60+", label: "Global Clients" },
      stat3: { number: "100%", label: "Custom Edits On Demand" },
    },
    services: {
      label: "WHAT I DO",
      title: "VIDEO EDITING SERVICES",
      subtitle: "CUSTOM POST-PRODUCTION ON DEMAND",
      items: [
        {
          number: "01",
          title: "SHORTS / REELS / TIKTOK",
          desc: "High-hook, fast-paced short-form edits engineered for maximum retention & viral growth",
        },
        {
          number: "02",
          title: "UGC ADS",
          desc: "Authentic user-generated content ad edits engineered to convert viewers into buyers",
        },
        {
          number: "03",
          title: "E-COMMERCE PRODUCT ADS",
          desc: "High-converting product video ads featuring motion badges & problem-solution callouts",
        },
        {
          number: "04",
          title: "VIDEO SALES LETTERS (VSL)",
          desc: "Persuasive sales video edits with kinetic text, pattern interrupts, and visual pacing",
        },
        {
          number: "05",
          title: "BRAND COMMERCIALS",
          desc: "Cinematic commercial edits with sound design, color grading & premium visual storytelling",
        },
        {
          number: "06",
          title: "YOUTUBE VLOGS",
          desc: "Engaging travel & lifestyle vlog edits featuring dynamic pacing and custom audio polish",
        },
        {
          number: "07",
          title: "TALKING HEAD VIDEOS",
          desc: "Clean educational & creator video cuts with B-roll insertion, zooms & lower thirds",
        },
        {
          number: "08",
          title: "VIDEO DOCUMENTARIES / VIDEO ESSAYS",
          desc: "In-depth documentary edits featuring archival pacing, custom animation & narrative depth",
        },
        {
          number: "09",
          title: "PODCASTS / INTERVIEWS",
          desc: "Multi-camera audio & video podcast post-production with dynamic angle switching",
        },
        {
          number: "10",
          title: "SAAS PRODUCT DEMOS",
          desc: "Crisp UI/UX software product walkthrough videos with zoomed dashboards & voiceovers",
        },
        {
          number: "11",
          title: "EXPLAINER VIDEOS",
          desc: "Simplifying complex concepts into engaging visual stories with motion graphics",
        },
        {
          number: "12",
          title: "CORPORATE TRAINING VIDEOS",
          desc: "Polished staff onboarding and internal video training modules with multi-language captions",
        },
        {
          number: "13",
          title: "MUSIC VIDEOS",
          desc: "Rhythm-synced musical performance cuts with speed ramps, stylized color & visual effects",
        },
      ],
    },
    portfolio: {
      label: "MY WORK",
      title: "SELECTED PROJECTS",
      viewProject: "VIEW PROJECT",
      projects: [
        {
          number: "01",
          title: "LUXEBOUW SHOWCASE",
          category: "Brand Commercial · Video",
          description: "High-end architectural commercial edit featuring cinematic color grading & motion design",
          year: "2024",
          src: "/videos/luxebouw.mp4",
          isVideo: true,
        },
        {
          number: "02",
          title: "HIGH-CONVERTING VSL",
          category: "Video Sales Letter",
          description: "Persuasive VSL edit with kinetic typography and high-retention pacing",
          year: "2024",
          src: "/images/untitled29.png",
        },
        {
          number: "03",
          title: "VIRAL REELS & SHORTS",
          category: "Short-Form · TikTok",
          description: "Fast-paced social media growth edits with sound design & visual hooks",
          year: "2024",
          src: "/images/contactez.jpg",
        },
        {
          number: "04",
          title: "DOCUMENTARY ESSAY",
          category: "Video Essay · Documentary",
          description: "In-depth documentary edit with custom soundscapes and archival storytelling",
          year: "2023",
        },
        {
          number: "05",
          title: "SAAS PRODUCT DEMO",
          category: "SaaS Demo · Explainer",
          description: "Crisp UI/UX product walkthrough video with motion graphics",
          year: "2024",
        },
        {
          number: "06",
          title: "PODCAST & INTERVIEW",
          category: "Podcast · Multi-Cam",
          description: "Multi-camera audio/video post-production with dynamic speaker switching",
          year: "2023",
        },
      ],
    },
    team: {
      label: "SOLO EXCELLENCE",
      title: "THE EDITOR",
      subtitle: "100% HANDS-ON CRAFTSMANSHIP · NO MIDDLE-MEN",
      members: [
        { name: "500+ PROJECTS", role: "Delivered Worldwide" },
        { name: "60+ GLOBAL CLIENTS", role: "Creators, Brands & Agencies" },
        { name: "PREMIERE PRO & AFTER EFFECTS", role: "Core Editing & Motion Stack" },
        { name: "DAVINCI RESOLVE & BLENDER", role: "Color Grading & 3D Elements" },
        { name: "RETENTION PACING", role: "Hook Optimization & Cuts" },
        { name: "CINEMATIC SOUND DESIGN", role: "SFX, Audio Mixing & Polish" },
        { name: "ON-DEMAND EXECUTION", role: "Custom Post-Production to Order" },
      ],
    },
    testimonials: {
      label: "CLIENT FEEDBACK",
      title: "WHAT CLIENTS SAY",
      items: [
        {
          quote:
            "Taha transformed our raw footage into a viral VSL that doubled our conversion rate within the first week.",
          author: "C. MARTIN",
          company: "E-Commerce Founder",
        },
        {
          quote:
            "Working with Taha is seamless. Fast turnarounds, insane attention to pacing detail, and top-tier color grading.",
          author: "H. ROUSSEAU",
          company: "YouTube Channel Director",
        },
        {
          quote:
            "Taha edits on command—whatever format or concept we throw at him, he delivers a masterclass edit every time.",
          author: "A. IBRAHIM",
          company: "Creative Director",
        },
      ],
      clients: [
        "CREATOR MEDIA",
        "SAAS SCALE",
        "VOGUE LABS",
        "APEX ADS",
        "NARRATIVE STUDIO",
        "PODCAST HUB",
        "PRIME BRAND",
        "ALPHA FILMS",
      ],
    },
    contact: {
      label: "GET IN TOUCH",
      title1: "LET'S BUILD",
      title2: "YOUR NEXT",
      title3: "VIRAL EDIT",
      cta: "START A PROJECT",
      email: "tahaelmaanaoui@gmail.com",
      tagline: "© 2026 TAHA EL MAANAOUI — ALL RIGHTS RESERVED",
    },
  },
  fr: {
    nav: {
      work: "PROJETS",
      contact: "CONTACT",
      about: "À PROPOS",
      services: "SERVICES",
    },
    preloader: {
      loading: "CHARGEMENT",
      tagline: "TAHA EL MAANAOUI — MONTEUR VIDÉO",
    },
    hero: {
      title1: "MONTAGE",
      title2: "VIDÉO",
      title3: "CRÉATIF",
      scroll: "DÉFILER POUR EXPLORER",
      founded: "+500 PROJETS RÉALISÉS",
      description:
        "CRÉATION DE MONTAGES VIDÉO CINÉMATOGRAPHIQUES À HAUTE RÉTENTION SUR DEMANDE",
      description2:
        "DES SHORTS AUX DOCUMENTAIRES, PUBLICITÉS ET VSL — SUR COMMANDE",
    },
    about: {
      label: "À PROPOS",
      title1: "CRÉER UN",
      title2: "IMPACT",
      title3: "VISUEL",
      p1: "Je suis Taha El Maanaoui, monteur vidéo professionnel indépendant spécialisé dans la post-production à fort taux de conversion et cinématographique. Avec plus de 500 projets réalisés pour plus de 60 clients internationaux, je transforme des rushs bruts en histoires captives qui accrochent l'audience.",
      p2: "Que vous ayez besoin de formats courts dynamiques, de VSL persuasives, de documentaires captivants ou de publicités de marque — je travaille sur commande pour concrétiser votre vision exacte avec précision et rapidité.",
      stat1: { number: "500+", label: "Projets Livrés" },
      stat2: { number: "60+", label: "Clients Mondiaux" },
      stat3: { number: "100%", label: "Montages Sur Commande" },
    },
    services: {
      label: "SERVICES",
      title: "SERVICES DE MONTAGE VIDÉO",
      subtitle: "POST-PRODUCTION SUR DEMANDE",
      items: [
        {
          number: "01",
          title: "SHORTS / REELS / TIKTOK",
          desc: "Montages courts dynamiques conçus pour maximiser la rétention et l'engagement viral",
        },
        {
          number: "02",
          title: "UGC ADS",
          desc: "Publicités vidéo UGC authentiques conçues pour convertir les spectateurs en acheteurs",
        },
        {
          number: "03",
          title: "E-COMMERCE PRODUCT ADS",
          desc: "Publicités vidéo produit e-commerce à forte conversion avec badges animés",
        },
        {
          number: "04",
          title: "VIDEO SALES LETTERS (VSL)",
          desc: "Montages vidéo de vente persuasifs avec typographie cinétique et rythme percutant",
        },
        {
          number: "05",
          title: "BRAND COMMERCIALS",
          desc: "Montages cinématographiques avec design sonore, étalonnage et narration haut de gamme",
        },
        {
          number: "06",
          title: "YOUTUBE VLOGS",
          desc: "Montages vlogs voyage & lifestyle captivants avec rythme dynamique et mixage audio",
        },
        {
          number: "07",
          title: "TALKING HEAD VIDEOS",
          desc: "Montages vidéo éducatifs & créateurs avec B-roll, zooms et synthés épurés",
        },
        {
          number: "08",
          title: "VIDEO DOCUMENTARIES / VIDEO ESSAYS",
          desc: "Montages documentaires approfondis avec narration immersive et animation d'archives",
        },
        {
          number: "09",
          title: "PODCASTS / INTERVIEWS",
          desc: "Post-production vidéo & audio multi-caméras avec découpage d'angles dynamique",
        },
        {
          number: "10",
          title: "SAAS PRODUCT DEMOS",
          desc: "Présentations vidéo fluides d'interfaces logiciels SaaS avec zooms et voix off",
        },
        {
          number: "11",
          title: "EXPLAINER VIDEOS",
          desc: "Simplification de concepts complexes en histoires visuelles captivantes avec motion graphics",
        },
        {
          number: "12",
          title: "CORPORATE TRAINING VIDEOS",
          desc: "Modules vidéo de formation d'entreprise et d'intégration avec sous-titres multilingues",
        },
        {
          number: "13",
          title: "MUSIC VIDEOS",
          desc: "Montages de clips vidéo synchronisés sur le rythme musical avec effets visuels et étalonnage",
        },
      ],
    },
    portfolio: {
      label: "RÉALISATIONS",
      title: "PROJETS SÉLECTIONNÉS",
      viewProject: "VOIR LE PROJET",
      projects: [
        {
          number: "01",
          title: "SHOWCASE LUXEBOUW",
          category: "Publicité de Marque · Vidéo",
          description: "Montage publicitaire haut de gamme avec étalonnage cinématographique et motion design",
          year: "2024",
          src: "/videos/luxebouw.mp4",
          isVideo: true,
        },
        {
          number: "02",
          title: "VSL À HAUTE CONVERSION",
          category: "Video Sales Letter",
          description: "Montage VSL persuasif avec typographie animée et rythme captivant",
          year: "2024",
          src: "/images/untitled29.png",
        },
        {
          number: "03",
          title: "REELS & SHORTS VIRAUX",
          category: "Format Court · TikTok",
          description: "Montages réseaux sociaux ultra-dynamiques avec design sonore et hooks efficaces",
          year: "2024",
          src: "/images/contactez.jpg",
        },
        {
          number: "04",
          title: "DOCUMENTAIRE ESSAI",
          category: "Essai Vidéo · Documentaire",
          description: "Montage documentaire immersif avec ambiance sonore et narration d'archives",
          year: "2023",
        },
        {
          number: "05",
          title: "DÉMO PRODUIT SAAS",
          category: "Démo SaaS · Explication",
          description: "Présentation vidéo nette d'interface logicielle avec motion graphics",
          year: "2024",
        },
        {
          number: "06",
          title: "PODCAST & INTERVIEW",
          category: "Podcast · Multi-Cam",
          description: "Post-production vidéo/audio multi-caméras avec découpage dynamique",
          year: "2023",
        },
      ],
    },
    team: {
      label: "EXCELLENCE INDÉPENDANTE",
      title: "LE MONTEUR",
      subtitle: "100% ARTISANAT SUR MESURE · SANS INTERMÉDIAIRES",
      members: [
        { name: "+500 PROJETS", role: "Livrées dans le Monde Entier" },
        { name: "+60 CLIENTS MONDIAUX", role: "Créateurs, Marque & Agences" },
        { name: "PREMIERE PRO & AFTER EFFECTS", role: "Stack Principal de Montage & Motion" },
        { name: "DAVINCI RESOLVE & BLENDER", role: "Étalonnage & Éléments 3D" },
        { name: "RYTHME & RÉTENTION", role: "Hooks & Transitions Dynamiques" },
        { name: "DESIGN SONORE CINÉMATIQUE", role: "Effets Sonores & Mixage Audio" },
        { name: "RÉALISATION SUR DEMANDE", role: "Post-Production Sur Mesure" },
      ],
    },
    testimonials: {
      label: "AVIS CLIENTS",
      title: "TÉMOIGNAGES",
      items: [
        {
          quote:
            "Taha a transformé nos rushs en une VSL virale qui a doublé notre taux de conversion dès la première semaine.",
          author: "C. MARTIN",
          company: "Fondateur E-Commerce",
        },
        {
          quote:
            "Travailler avec Taha est fluide. Délais rapides, sens aiguisé du rythme et étalonnage au sommet.",
          author: "H. ROUSSEAU",
          company: "Directeur de Chaîne YouTube",
        },
        {
          quote:
            "Taha monte sur commande : quel que soit le format ou l'idée, il livre un résultat d'exception à chaque fois.",
          author: "A. IBRAHIM",
          company: "Directeur Créatif",
        },
      ],
      clients: [
        "CREATOR MEDIA",
        "SAAS SCALE",
        "VOGUE LABS",
        "APEX ADS",
        "NARRATIVE STUDIO",
        "PODCAST HUB",
        "PRIME BRAND",
        "ALPHA FILMS",
      ],
    },
    contact: {
      label: "NOUS CONTACTER",
      title1: "CRÉONS",
      title2: "VOTRE PROCHAIN",
      title3: "MONTAGE VIRAL",
      cta: "DÉMARRER UN PROJET",
      email: "tahaelmaanaoui@gmail.com",
      tagline: "© 2026 TAHA EL MAANAOUI — TOUS DROITS RÉSERVÉS",
    },
  },
};

export type Translations = typeof translations.en;
