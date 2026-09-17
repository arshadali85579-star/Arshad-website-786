import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'creative-portfolio',
    number: '01',
    title: 'Creative 3D Portfolio',
    tagline: 'Immersive Editorial Digital Experience',
    category: 'Creative Development & 3D Web',
    description: 'An international award-level developer portfolio inspired by contemporary digital design studios. Powered by custom Three.js WebGL procedural geometry, Lenis smooth scrolling, GSAP timeline choreography, high-contrast typography, and real-time interactive shaders.',
    technologies: ['React 18', 'TypeScript', 'Three.js', 'WebGL', 'GSAP', 'Lenis', 'Tailwind CSS'],
    year: '2026',
    link: '#',
    isExternal: false,
    featured: true,
    badge: '3D WebGL',
    previewType: 'webgl',
    highlights: [
      'Interactive procedural polyhedral 3D mesh responding in real-time to cursor kinematics',
      'Dual-layer architectural dashed rails with precision layout grids',
      'Custom adaptive desktop cursor with context-aware magnetic anchors',
      'High-performance 60 FPS animation pipeline with graceful WebGL fallback'
    ],
    metrics: '60 FPS WebGL'
  },
  {
    id: 'shaikh-studio',
    number: '02',
    title: 'Shaikh Studio',
    tagline: 'Civil Engineering & Architectural Design Studio',
    category: 'Architectural & Engineering Platform',
    description: 'High-performance web experience engineered for Er. Akib Shaikh Civil Engineering Studio in Ashti, Maharashtra. Features structural design showcases, residential and commercial planning portfolios, client consultation intake, and responsive Cloudflare Workers edge deployment.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Workers', 'Vite'],
    year: '2025 – 2026',
    link: 'https://shaikh-studio-premium1.arshadali85579.workers.dev',
    isExternal: true,
    featured: true,
    badge: 'Live Client Work',
    previewType: 'interactive',
    highlights: [
      'High-performance Cloudflare Workers edge deployment with sub-100ms TTFB across regional nodes',
      'Architectural blueprint and structural project portfolio showcase',
      'Automated client project consultation inquiry and WhatsApp dispatch workflows'
    ],
    metrics: '100% Edge Hosted'
  },
  {
    id: 'sp-college-pharmacy',
    number: '03',
    title: 'S P College of Pharmacy',
    tagline: 'Academic Institutional Portal & Campus System',
    category: 'Educational Platform',
    description: 'A modern, high-credibility institutional website for a premier pharmacy degree and diploma college. Features department galleries, interactive faculty profiles, curriculum blueprints, laboratory facilities showcase, and automated admission inquiry routing.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'EmailJS', 'Framer Motion'],
    year: '2025',
    link: 'https://spcollegeofpharmacy.com/',
    isExternal: true,
    featured: true,
    badge: 'Live Production',
    previewType: 'visual',
    highlights: [
      'Architected comprehensive department infrastructure showcase with 8+ specialized laboratory tours',
      'Built verified admission inquiry mechanism with serverless form processing',
      'Engineered accessible semantic structure ensuring strict compliance with accreditation standards'
    ],
    metrics: '100% Mobile Responsive'
  },
  {
    id: 'sp-technical-institute',
    number: '04',
    title: 'S P Technical Institute',
    tagline: 'Engineering & Vocational Education Platform',
    category: 'Web Platform & Portal',
    description: 'Enterprise website designed for technical engineering and vocational skill advancement. Incorporates dynamic course tracks, student achievements, placement cell showcases, and an interactive syllabus roadmap.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'EmailJS', 'Lucide Icons'],
    year: '2025',
    link: 'https://sptechnicalinstitute.com/',
    isExternal: true,
    featured: true,
    badge: 'Live Production',
    previewType: 'interactive',
    highlights: [
      'Engineered course catalog filtering by technical discipline and certification duration',
      'Integrated real-time inquiry verification and contact dispatch',
      'Minimalist, high-legibility interface built for fast loading on 4G/5G mobile connections'
    ],
    metrics: 'Optimized Mobile UI'
  },
  {
    id: 'sameer-xerox',
    number: '05',
    title: 'Sameer Xerox & Cyber Cafe',
    tagline: 'Digital Services & E-Governance Platform',
    category: 'Full-Stack Web Application',
    description: 'A comprehensive digital portal and client inquiry management platform built for a busy cyber center and business services enterprise. Features service catalog browsing, document checklists, fast quotation workflows, and direct WhatsApp integrations.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloudflare', 'Supabase'],
    year: '2025 – 2026',
    link: 'https://www.sameerxerox.in/',
    isExternal: true,
    featured: false,
    badge: 'Live Production',
    previewType: 'interactive',
    highlights: [
      'Engineered dynamic catalog of 30+ citizen e-governance and corporate documentation services',
      'Sub-second first contentful paint with automated image pipeline and lazy loading',
      'Integrated live direct WhatsApp quotation generator for instant customer onboarding'
    ],
    metrics: '99.8% Lighthouse Score'
  },
  {
    id: 'adarsh-sanstha',
    number: '06',
    title: 'Adarsh Seva Bhavi Sanstha',
    tagline: 'Non-Profit Organization & Social Initiative Platform',
    category: 'Non-Profit & Community',
    description: 'Official digital home for Adarsh Seva Bhavi Sanstha, highlighting educational drives, rural community welfare, health camps, and social development initiatives across Maharashtra.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive Design'],
    year: '2024 – 2025',
    link: 'https://adarshsevabhavisanstha.com/',
    isExternal: true,
    featured: false,
    badge: 'Social Impact',
    previewType: 'visual',
    highlights: [
      'Designed community-first visual storytelling highlighting key social programs and milestones',
      'Structured transparent project updates and volunteer enrollment workflows',
      'Optimized performance for accessibility across tier-2 and rural regional networks'
    ],
    metrics: 'Community Focus'
  }
];
