# Sayyad Arshad — Creative Developer 3D Portfolio

An original, award-level personal portfolio website for **Sayyad Arshad** (Creative Web Developer, B.E. AIDS — 4th Year).

Inspired by the visual language, typography rhythm, and interaction standards of world-class creative developer portfolios (deep charcoal `#07090b`, warm ivory `#f7f4ee`, acid yellow `#fbe052` accents, architectural dashed rails, and Three.js WebGL interactivity).

---

## ⚡ Key Highlights & Features

- **Interactive 3D WebGL Canvas (Three.js)**:
  - **Hero 3D Core**: Procedural metallic icosahedron, outer electric yellow wireframe cage, rotating orbital rings, and mouse-reactive parallax.
  - **Selected Work 3D Viewport**: Interactive 3D perspective display responding to active project selection.
  - **Dedicated 3D Creative Laboratory**: Real-time WebGL shader playground with live topology switcher (Torus Knot, Sphere, Octahedron), wireframe/solid toggle, speed controls, and FPS telemetry HUD.
- **Fluid Kinetic Motion & Kinetic Scroll**:
  - **Lenis Smooth Scroll** integration with natural inertia.
  - Custom precision cursor with contextual hover modes (`VIEW`, `ROTATE`, magnetic button snaps).
  - Minimalist 0–100% technical loader sequence.
- **Architectural Editorial Typography & Layout**:
  - Archivo Display + Space Mono typography.
  - Architectural dashed guide rails (`nx-dashed-rail`).
  - Asymmetric project layouts with modal technical inspection.
  - Multi-column expandable expertise accordion.
  - Minimal sticky navigation + full-screen split drawer with WhatsApp & inquiry previews.
  - Direct WhatsApp messaging with prefilled context and validated project inquiry form.

---

## 🛠️ Tech Stack

- **Framework**: React 18 & TypeScript 5
- **Build Tool**: Vite 6 (Optimized rollup chunking for Three.js and vendor assets)
- **Styling**: Tailwind CSS & Custom PostCSS design tokens
- **3D Graphics**: Three.js & WebGL 2.0
- **Animation & Scrolling**: Lenis & GSAP
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production files will be generated in the `dist/` directory.

---

## 🖼️ How to Add Your Own Photo

1. Place your photograph as `arshad-profile.jpg` in:
   `public/assets/arshad-profile.jpg`
2. The portfolio is pre-configured with:
   - High-contrast editorial duotone styling
   - Subtle interactive mouse parallax
   - Scanline and ambient vignette overlay
   - Smooth grayscale-to-color hover transition

---

## 📂 Project Architecture

```
├── dist/                          # Production build output (Ready for Netlify / Vercel / Cloudflare)
├── public/
│   └── assets/                    # Static assets & profile images
├── src/
│   ├── components/                # Navigation, MobileMenu, CustomCursor, PageLoader, DashedRail
│   ├── data/                      # Centralized editable data (personal, projects, services, skills, faqs)
│   ├── sections/                  # 12 Page sections (Hero, Activity, Services, Work, About, 3D Lab, FAQ, Contact...)
│   ├── three/                     # WebGL 3D canvases (HeroCanvas, PortfolioCanvas, LabCanvas)
│   ├── types/                     # TypeScript definitions
│   ├── App.tsx                    # Main app coordinator with Lenis smooth scroll
│   ├── index.css                  # Tailwind + design tokens + custom film grain
│   └── main.tsx                   # React entry point
├── package.json
└── vite.config.ts
```

---

## 👤 Identity & Contact

- **Name**: Sayyad Arshad
- **Degree**: B.E. in Artificial Intelligence & Data Science (4th Year)
- **Email**: arshadali85579@gmail.com
- **Phone / WhatsApp**: +91 7249448712
- **Location**: Sarola Baddi, Jamkhed Road, Maharashtra 414201, India
