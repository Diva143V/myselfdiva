# Diwakar Venkat Peddada — Personal Universe Portfolio

> **Live Site:** [myselfdiva.netlify.app](https://myselfdiva.netlify.app)  
> **Source Repository:** [github.com/Diva143V/myselfdiva](https://github.com/Diva143V/myselfdiva)  
> **Concept:** The Solar System from the GitHub profile README, grown into a full interactive site. Languages are planets, projects are moons, and Diwakar is the sun at the center.

---

## 🌌 The Concept & Architecture

The whole site embodies a unified celestial system:
- **The Sun (Core):** Diwakar Venkat Peddada — AI developer intern at Aegion Dynamic Solutions, studying CS at Andhra University ('28), based in Visakhapatnam, India.
- **The Five Language Planets (Concentric Orbits):**
  1. **Orbit 1 / Inner:** Python (Biomedical RAG, local models, data pipelines)
  2. **Orbit 2:** C# / .NET (Windows overlays, live captions, WPF)
  3. **Orbit 3:** Rust (MCP server, graph core, Tauri desktop)
  4. **Orbit 4:** TypeScript (React, Vite, interface work)
  5. **Orbit 5 / Outer:** C++ (Algorithms and data structures)
- **The Moons (Real Shipped Projects):**
  - **LiveSubs** (C# / .NET) — Windows Live Captions translation overlay with 9+ backends.
  - **Griffin Bio** (Python) — Biomedical evidence synthesis and contradiction workbench with 10 collectors and Mixture-of-LLMs.
  - **Knox** (Rust) — Persistent causal knowledge graph and MCP server giving AI agents long-term architectural memory.
  - **SyGriffin** (Python) — CLI-first AI bioinformatics platform for neoantigen peptide discovery from tumor VCFs.
  - *Additional Moons:* Polaris (Kg-Library-API), Sita, myselfdiva, HackMe 2024 Solver.

---

## 🚀 Deploying to Netlify

This is a zero-build static site that deploys by dropping the folder directly onto Netlify:

1. **Option A: Drag and Drop**
   - Log in to [Netlify](https://app.netlify.com/).
   - Drag and drop this repository folder (`c:\Users\Diwa\myselfdiva-main`) into the Netlify Sites dashboard.
   - The site deploys instantly with SSL and global CDN distribution.

2. **Option B: Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=.
   ```

3. **Option C: Local Static Server**
   ```bash
   npx serve .
   ```
   Open `http://localhost:3000` in your browser.

---

## 🧰 Libraries Used & Why

| Library | Distribution | Weight | Why It Was Chosen |
|---|---|---|---|
| **GSAP 3.12.5** | Cloudflare CDN | ~28 KB gzip | Industry standard for compositor-smooth timeline orchestration and camera physics. Zero runtime layout thrash. |
| **GSAP ScrollTrigger** | Cloudflare CDN | ~14 KB gzip | Powers the scrubbed camera dive from the hero into the solar system, pinning the map while cycling through the 4 case studies on desktop. Never autoplays. |
| **Google Fonts** (`Space Grotesk` & `JetBrains Mono`) | Google CDN | ~45 KB | `Space Grotesk` provides confident, geometric display and body typography. `JetBrains Mono` provides high-precision tabular numerals and monospace telemetry for orbital readouts. |
| **Native Canvas 2D + SVG Hybrid** | Zero Dependency | 0 KB | Handcrafted Keplerian orbit simulation and starfield parallax running in pure vanilla JavaScript. Pre-allocated arrays and object pools guarantee zero garbage collection pauses. |

**Total Page Payload:** ~230 KB (far under the 1.5 MB performance budget).

---

## ⚡ Performance & Engineering Standards (60 FPS Guarantee)

- **Capped Device Pixel Ratio:** `Math.min(window.devicePixelRatio || 1, 2)` prevents GPU fill-rate exhaustion on 3x/4x mobile screens.
- **Zero Per-Frame Allocation:** Star coordinates, meteor state, and planet vectors are pre-allocated at initialization. Nothing is created or collected inside `requestAnimationFrame`.
- **Automatic Lifecycle Throttling:**
  - `document.visibilitychange` halts RAF loops immediately when the user switches tabs.
  - `IntersectionObserver` halts canvas rendering when viewport scrolls past the orbital system.
- **WCAG 2.2.2 Compliant Pause Control:** An accessible header button allows users to pause all starfield and orbital physics motion at any time.
- **Full `prefers-reduced-motion` Support:** The site provides a static, accessible version with zero loops, instant card readouts, and no scroll pinning.
- **Responsive Layout:**
  - **Desktop (>= 768px):** Pinned ScrollTrigger journey spotlighting LiveSubs, Griffin, Knox, and SyGriffin.
  - **Mobile (< 768px):** Pinning is disabled. The map becomes a touch-friendly tap-to-focus chart, with the 4 full case study cards laid out in a responsive vertical deck below. Touch targets exceed 44px.

---

## ⏱ 30-Second Recruiter Readout

- **Name:** Diwakar Venkat Peddada (Diva)
- **Role:** AI Developer Intern at Aegion Dynamic Solutions · CS Class of 2028 (Andhra University)
- **Location:** Visakhapatnam, India
- **Core Value:** Builds software that keeps up with live things (speech to subtitles, papers to evidence, agents that remember).
- **Key Proof:**
  - **LiveSubs:** Real-time Windows subtitle overlay; .NET 8 / WPF; 9+ translation backends; single `.exe`.
  - **Griffin Bio:** Biomedical RAG & contradiction workbench; Python / ChromaDB / Ollama; 10 source collectors.
  - **Knox:** Causal knowledge graph & MCP server for AI coding agents; Rust 1.85+ / SQLite WAL / Tauri v2; 8 MCP tools; &le; 850 token footprint.
  - **SyGriffin:** AI neoantigen platform; Python 3.11 / VEP / MHCflurry / Bun; HLA allele matching.
- **Honors:** 1st place at HackMe 2024 (C++ algorithms & data structures), JPMorgan Chase Software Engineering simulation (Jan 2026), Google Cloud Compute basics (Oct 2025).
- **Contact:** `diwa.p2007@gmail.com` · [GitHub](https://github.com/Diva143V) · [LinkedIn](https://linkedin.com/in/diwakar-venkat-peddada-66aa30229/) · [X](https://x.com/Diva_2007_)

---

## ⚖️ Source Conflict Disclosures

Per instructions to prefer the GitHub profile README as the authoritative source of truth:
1. **LiveSubs Language Orbit:** In early portfolio copy, LiveSubs had miscellaneous tags; in the GitHub profile solar system map, it is formally anchored to **Orbit 2 (C# / .NET)** representing WPF desktop architecture, Windows Live Captions hooks, and single `.exe` distribution.
2. **Featured Case Studies:** The old site featured Sita and a generic HackMe entry as top case studies. The GitHub profile README establishes **LiveSubs, Griffin, Knox, and SyGriffin** as the four major moons, with Polaris, Sita, myselfdiva, and HackMe positioned as secondary moons.
3. **Design Metaphor:** Replaced the legacy broadcast/teletext monitor theme with the unified Personal Universe solar-system concept.
