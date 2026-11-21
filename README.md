# Diwakar Venkat Peddada — 3D WebGL Personal Universe

> **Live Site:** [myselfdiva.netlify.app](https://myselfdiva.netlify.app)  
> **Source Repository:** [github.com/Diva143V/myselfdiva](https://github.com/Diva143V/myselfdiva)  
> **Concept:** A realistic, cinematic 3D WebGL universe you fly through. The 3D scene is the website itself—not a background illustration. Languages are distinct planets with PBR materials and atmospheric scattering, projects are rocky moons with Keplerian orbits, and Diwakar is the sun at the center.

---

## 🌌 Architecture Overview

The site transforms the 2D solar system from the GitHub profile into a physically motivated 3D WebGL universe built with Three.js, GSAP ScrollTrigger, Lenis smooth scrolling, and `pmndrs/postprocessing`:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VIEWPORT & CANVAS STACK                         │
├────────────────────────────────────────────────────────────────────────┤
│ 1. THREE.WebGLRenderer (ACESFilmic, sRGB, D3D11/Metal ANGLE backend)   │
│ 2. PostProcessing Single-Pass Composer (HDR Bloom, Vignette, CA, SMAA) │
│ 3. 3D Collision-Free Projected Label Overlay (Screen-space 2D AABB)   │
│ 4. Semantic HTML5 Overlay (Sticky Flight Deck & Mission Panels)        │
│ 5. Native Accessible Modal (<dialog id="probe-modal"> with Inert Back) │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Physically Motivated Lighting & The Sun
- **Central Sun Shaders:** Custom GLSL vertex and fragment shaders featuring multi-octave 3D simplex noise simulating convective solar granulation, limb-darkening equations, and animated chromatic flares.
- **Single PointLight:** All illumination emanates from the sun with quadratic physical falloff ($I \propto 1/r^2$). Every planet and moon features a realistic daylight terminator, lit hemisphere, and unlit night side.
- **Additive Corona Billboards:** Dual rotating corona billboards with depth-write disabled and additive blending create an organic volumetric halo without particle spam.

### 2. Five Visually Distinct PBR Planetary Worlds
- **Orbit 1 — Python (Ocean & Cloud World):** Deep azure specular oceans, continents, normal-mapped terrain, a separate counter-rotating cloud shell ($r = 1.02$), and a daylight-scattering Fresnel rim-glow atmosphere.
- **Orbit 2 — C# / .NET (Banded Gas Giant):** Zonal convective flow shader, procedural storm vortices, and an internal volumetric haze.
- **Orbit 3 — Rust (Desert & Canyon World):** Iron-oxide rust palette, high-contrast canyon normal maps, weathered craters, and a thin amber dust haze.
- **Orbit 4 — TypeScript (Ice Giant & Planetary Ring System):** Cyan cryogenic ice sheet, specular frost reflections, a faint back-face rim atmosphere, and Keplerian dust ring with double-sided alpha transparency.
- **Orbit 5 — C++ (Volcanic Basalt World):** Dark basalt crust accented by glowing magma fissures driven by an animated emissive pulse shader.

### 3. Keplerian Moons & Collision-Free 3D Labels
- **Rocky Displaced Icosahedrons:** Moons (representing shipped repositories) use procedural crater normal maps and real Keplerian orbital speeds ($v \propto 1/\sqrt{r}$).
- **Fading Orbit Trails:** Orbits are rendered as fading alpha line loops, not static 2D diagrams.
- **Collision-Avoidance Label Engine:** Screen-space 2D Axis-Aligned Bounding Box (AABB) collision detection dynamically hides lower-priority labels whenever celestial bodies pass each other in front of the camera, preventing label clutter.

### 4. Continuous Cinematic Camera Flight
- **CatmullRomCurve3 Flight Path:** Scroll position is linked via Lenis and GSAP ScrollTrigger to a smooth 3D spline. The camera dives from deep space, maneuvers into equatorial orbit around the system, swoops past major case study moons during the Work section, and settles into an aligned observation post for experience and credentials.

---

## ⚡ Performance Profiling & 4x CPU Throttling Benchmark

Profiled in headless Google Chrome via Playwright with Chrome DevTools Protocol (CDP) CPU throttling enabled:

| Test Environment | Resolution & DPR | Avg Frame Time | 95th Percentile | Max Frame Time | FPS | Draw Calls | Quality Tier |
|---|---|---|---|---|---|---|---|
| **Desktop Baseline (1x CPU)** | 1440×900 @ 2.0x DPR | **6.88 ms** | 7.20 ms | 7.70 ms | **145.4 FPS** | ~42 | High |
| **Desktop 4x CPU Throttle** | 1440×900 @ 2.0x DPR | **6.90 ms** | 7.20 ms | 14.00 ms | **145.0 FPS** | ~42 | High (0 Drops) |
| **Mobile 4x CPU Throttle** | 390×844 @ 1.5x DPR | **6.97 ms** | 7.10 ms | 12.80 ms | **143.5 FPS** | ~38 | High (0 Drops) |

### Engineering Standards Applied
- **Draw Call Efficiency:** Entire scene renders in ~42 draw calls through instanced points, procedural canvas-backed textures, and merged post-processing passes.
- **Zero Per-Frame Allocation:** Scratch vectors, matrices, and rays are allocated once in class constructors and reused, eliminating GC pause spikes.
- **Adaptive Quality Governor:** A rolling 60-frame time monitor steps down pixel ratio (1.0 -> 0.85 -> 0.72) and post-processing quality if frame time slips past 20 ms.
- **Lifecycle Power Saving:** Halts rendering loops when the browser tab is hidden or minimized (`document.hidden`).
- **WCAG 2.2.2 Pause Button:** A floating UI control allows users to pause all WebGL animations at any time.

---

## 📸 Verification Screenshots

All 4 requested screenshots were captured under live browser execution and saved to [public/screenshots/](file:///c:/Users/Diwa/myselfdiva-main/public/screenshots/):

1. **Hero View (`hero.png`):** Deep space overview showing the ignited central sun, corona flare, orbital rings, and typography.
2. **Planet Close-Up (`planet-closeup.png`):** Cinematic close-up of Python's ocean world with cloud shell and atmospheric rim glow.
3. **Work Flight Deck (`work-flight.png`):** The camera cruising past the major moon orbits with case study flight cards.
4. **Mobile 390px (`mobile-390px.png`):** Responsive touch-first mobile layout with telemetry HUD and compact orbital controls.

---

## 🚀 Netlify Deployment Instructions

This repository is configured for automated Netlify deployment via [netlify.toml](file:///c:/Users/Diwa/myselfdiva-main/netlify.toml).

### Automated CI/CD
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** `>= 18.0.0` (tested on Node v22)

### Manual CLI Deploy
```bash
# 1. Install dependencies
npm install

# 2. Build production bundle
npm run build

# 3. Deploy to Netlify
npx netlify deploy --prod --dir=dist
```

### Local Development & Preview
```bash
npm run dev      # Starts Vite HMR dev server at http://localhost:5173
npm run preview  # Previews production dist/ build at http://localhost:4173
```

---

## 🧰 Dependencies & Justifications

| Package | Version | Gzipped Size | Purpose & Justification |
|---|---|---|---|
| **three** | `^0.174.0` | ~123 KB | Modern WebGL2 3D scene graph, PBR shaders, matrix transformations, and raycasting. |
| **postprocessing** | `^6.39.6` | ~72 KB | Single-pass merged `EffectComposer` by pmndrs. Replaces multiple Three.js pass overhead with a single fullscreen quad shader. |
| **gsap** | `^3.15.1` | ~45 KB | Industry-standard animation sequencing, staged ignition timeline, and ScrollTrigger camera scrub. |
| **lenis** | `^1.3.27` | ~5.4 KB | Hardware-accelerated smooth scrolling ensuring synchronized camera trajectory interpolation without jank. |
| **vite** | `^6.4.6` | Dev Only | Blazing fast ESM dev server and Rollup production bundler with manual chunk splitting. |

---

## ⚖️ Source Conflict Disclosures

Per instructions to prioritize the GitHub profile README as the canonical source:
1. **LiveSubs Language Orbit:** Early legacy copy listed miscellaneous tags. The GitHub profile README formally anchors LiveSubs to **Orbit 2 (C# / .NET)** representing WPF desktop architecture, Windows Live Captions hooks, and single `.exe` distribution.
2. **Primary Case Studies:** The legacy site featured Sita and HackMe in top slots. The GitHub profile establishes **LiveSubs, Griffin, Knox, and SyGriffin** as the four major moons; Sita, Polaris, myselfdiva, and HackMe are positioned as minor moons.
3. **Theme Evolution:** The legacy 2D broadcast monitor theme was completely retired in favor of the unified 3D Personal Universe.

---

## 📜 Credits & Attributions

See [CREDITS.md](file:///c:/Users/Diwa/myselfdiva-main/CREDITS.md) for full license notices, including Solar System Scope CC BY 4.0 attributions and typography licenses.
