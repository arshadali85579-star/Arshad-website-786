import { SkillCategory } from '../types';

export const skillsCategories: SkillCategory[] = [
  {
    category: "FRONTEND ENGINEERING",
    items: [
      {
        name: "React.js",
        level: "Advanced",
        description: "Component-driven architecture, custom hooks, reactive state workflows, and modern Suspense/Lazy patterns.",
        tags: ["Single-Page Apps", "Hooks", "Component Life-Cycle"]
      },
      {
        name: "TypeScript",
        level: "Core Strength",
        description: "Type-safe interfaces, generics, compile-time contract enforcement, and bulletproof maintainability.",
        tags: ["Strict Mode", "Generics", "Type Inference"]
      },
      {
        name: "JavaScript (ES6+)",
        level: "Expert",
        description: "Deep command of asynchronous event loops, DOM performance, closures, prototype mechanics, and modern APIs.",
        tags: ["Async/Await", "Promises", "Web APIs"]
      },
      {
        name: "HTML5 & Semantic Web",
        level: "Expert",
        description: "Accessible semantic structure, ARIA accessibility landmarks, structured microdata, and SEO hierarchy.",
        tags: ["A11y", "ARIA Landmarks", "SEO Markup"]
      },
      {
        name: "Modern CSS & Tailwind",
        level: "Advanced",
        description: "Utility-first design systems, responsive container layouts, custom keyframe choreographies, and CSS Grid.",
        tags: ["Tailwind CSS", "Flexbox/Grid", "Responsive Layouts"]
      }
    ]
  },
  {
    category: "CREATIVE & 3D DEVELOPMENT",
    items: [
      {
        name: "Three.js",
        level: "Active Specialty",
        description: "Scene orchestration, custom buffer geometries, procedural materials, PBR shaders, and camera kinematics.",
        tags: ["WebGL", "PBR Materials", "Scene Graph"]
      },
      {
        name: "React Three Fiber & Drei",
        level: "Core Practice",
        description: "Declarative 3D scene architecture, canvas integration within reactive React state, and procedural models.",
        tags: ["R3F", "Canvas Pipelines", "3D Interactions"]
      },
      {
        name: "GSAP & ScrollTrigger",
        level: "Advanced",
        description: "Complex timeline choreography, scroll-driven scrubbing, staggered editorial reveals, and magnetic interactions.",
        tags: ["Timelines", "ScrollTrigger", "Micro-Interactions"]
      },
      {
        name: "WebGL & Shaders",
        level: "Specialty",
        description: "Mathematical rendering concepts, vertex displacement, procedural noise, and performance-tuned draw calls.",
        tags: ["GLSL Basics", "Vertex Shaders", "Particles"]
      },
      {
        name: "Interaction & Motion Design",
        level: "Advanced",
        description: "Intentional micro-animations, cursor transformations, tactile feedback, and frame-perfect pacing.",
        tags: ["Fluid Curves", "Physics Motion", "User Ergonomics"]
      }
    ]
  },
  {
    category: "BACKEND & DATA SYSTEMS",
    items: [
      {
        name: "Node.js",
        level: "Intermediate / Advanced",
        description: "Event-driven runtime environments, asynchronous file I/O, server management, and REST microservices.",
        tags: ["Express", "NPM Ecosystem", "Server Logic"]
      },
      {
        name: "RESTful APIs",
        level: "Advanced",
        description: "Architecting resilient JSON APIs with authentication, payload validation, CORS policies, and rate limits.",
        tags: ["Endpoints", "HTTP Statuses", "JSON Payloads"]
      },
      {
        name: "Database Concepts",
        level: "Proficient",
        description: "Relational database schema modeling, SQL query optimization, NoSQL document structures, and Supabase integration.",
        tags: ["PostgreSQL", "Supabase", "Data Modeling"]
      },
      {
        name: "Server-Side Development",
        level: "Proficient",
        description: "Handling cloud webhooks, environment secrecy, middleware pipelines, and API integrations.",
        tags: ["Middleware", "Cloud Functions", "Security"]
      }
    ]
  },
  {
    category: "TOOLS & ECOSYSTEM",
    items: [
      {
        name: "Git & GitHub",
        level: "Advanced",
        description: "Version control hygiene, branch workflows, release tagging, automated CI/CD triggers, and collaborative reviews.",
        tags: ["Git CLI", "Version Control", "PR Workflows"]
      },
      {
        name: "Vite",
        level: "Expert",
        description: "Instantaneous Hot Module Replacement, optimized rollup chunking, bundle analysis, and lightning-fast builds.",
        tags: ["Fast HMR", "Rollup", "Modern Bundling"]
      },
      {
        name: "VS Code",
        level: "Expert",
        description: "Configured developer environment with TypeScript language servers, linting standards, and debugging toolchains.",
        tags: ["Tooling", "Linting", "Productivity"]
      },
      {
        name: "Figma",
        level: "Proficient",
        description: "Translating design blueprints, autolayout inspection, token extraction, and prototype comprehension.",
        tags: ["UI Inspection", "Design Tokens", "Wireframes"]
      }
    ]
  },
  {
    category: "AI & AUTOMATION",
    items: [
      {
        name: "AI APIs",
        level: "Proficient",
        description: "Integrating Gemini API and OpenAI endpoints into modern web applications for generative features.",
        tags: ["Gemini API", "OpenAI", "Streaming Responses"]
      },
      {
        name: "Prompt Engineering",
        level: "Advanced",
        description: "Structuring zero-shot, few-shot, and system prompt schemas for deterministic, production-grade JSON outputs.",
        tags: ["System Prompts", "Structured Output", "Context Pacing"]
      },
      {
        name: "AI-Assisted Development",
        level: "Power User",
        description: "Leveraging modern AI tooling to accelerate architecture scaffolding, unit testing, and algorithmic refactoring.",
        tags: ["Rapid Prototyping", "Code Quality", "Automated Testing"]
      },
      {
        name: "Automation Pipelines",
        level: "Proficient",
        description: "Connecting disparate third-party web services through scheduled routines, webhooks, and automated data processing.",
        tags: ["Cron Tasks", "Webhooks", "ETL Pipelines"]
      }
    ]
  }
];

export const editorialTechList = [
  { name: "THREE.JS", category: "3D Graphics", exp: "WebGL & Interactive 3D", status: "Primary Craft" },
  { name: "REACT 18", category: "Frontend", exp: "Component Architecture", status: "Core Engine" },
  { name: "TYPESCRIPT", category: "Language", exp: "Strict Type Safety", status: "Standard" },
  { name: "GSAP MOTION", category: "Animation", exp: "ScrollTrigger & Physics", status: "Kinetic Polish" },
  { name: "NODE.JS", category: "Backend", exp: "REST APIs & Middleware", status: "Server Architecture" },
  { name: "WEBGL", category: "Graphics", exp: "Shaders & Render Loop", status: "Hardware Accelerated" },
  { name: "TAILWIND CSS", category: "Styling", exp: "Design Tokens & Utility", status: "Rapid Layout" },
  { name: "SUPABASE", category: "Database", exp: "PostgreSQL & Auth", status: "Modern Backend" },
  { name: "AI APIS", category: "Intelligence", exp: "Gemini & LLM Pipelines", status: "Future-Ready" },
  { name: "VITE", category: "Build Tool", exp: "Instant HMR & Bundler", status: "Performance Tooling" }
];
