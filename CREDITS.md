# Third-Party Assets, Libraries & Attributions

This project (*myselfdiva* 3D WebGL Portfolio) builds upon open-source software, generative algorithms, and astronomical reference data.

---

### 1. Planetary & Astronomical Textures
- **Solar System Scope Textures**  
  - Source: [Solar System Scope](https://www.solarsystemscope.com/textures/)  
  - License: [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)  
  - Usage & Attribution: The planetary surface topography palettes, gas giant atmospheric banding ratios, and crater distribution models were derived and inspired by Solar System Scope's high-resolution reference maps. Surface textures are generated procedurally at runtime via high-performance HTML5 Canvas 2D simplex noise and octave synthesis algorithms to achieve 0-byte external network overhead.

---

### 2. Core Libraries & Runtime Engines
- **Three.js (v0.174.0)**  
  - Author: Ricardo Cabello (Mr.doob) and the Three.js Authors  
  - License: [MIT License](https://github.com/mrdoob/three.js/blob/dev/LICENSE)  
  - Purpose: Core WebGL2 scene graph, PBR shading (`MeshStandardMaterial`), camera projection, matrix mathematics, raycasting, and buffer geometries.

- **postprocessing (v6.39.6)**  
  - Author: Raoul van Rüschen (pmndrs)  
  - License: [Zlib License](https://github.com/pmndrs/postprocessing/blob/master/LICENSE.md)  
  - Purpose: GPU post-processing pipeline featuring merged single-pass `EffectComposer`, HDR Selective Bloom, Vignette, Chromatic Aberration, and Subpixel Morphological Antialiasing (SMAA).

- **GSAP & ScrollTrigger (v3.15.1)**  
  - Author: GreenSock  
  - License: Standard GreenSock License / Free for public web portfolios  
  - Purpose: Timeline orchestration for the staged ignition sequence, camera spline scrubbing, magnetic interactive controls, and accessible `<dialog>` probe readout transitions.

- **Lenis Smooth Scroll (v1.3.27)**  
  - Author: Studio Freight / Darkroom Engineering  
  - License: [MIT License](https://github.com/darkroomengineering/lenis/blob/main/LICENSE)  
  - Purpose: Normalized inertial scroll orchestration integrated with GSAP `ScrollTrigger.update` and requestAnimationFrame.

- **Vite (v6.4.6)**  
  - Author: Evan You and Vite Contributors  
  - License: [MIT License](https://github.com/vitejs/vite/blob/main/LICENSE)  
  - Purpose: Modern ESM development server, Rollup production bundling, and vendor chunk tree-shaking.

---

### 3. Typography
- **Space Grotesk**  
  - Author: Florian Karsten  
  - License: [SIL Open Font License, Version 1.1](http://scripts.sil.org/OFL)  
  - Purpose: Display headlines, celestial body names, and section titles.

- **JetBrains Mono**  
  - Author: JetBrains  
  - License: [SIL Open Font License, Version 1.1](http://scripts.sil.org/OFL)  
  - Purpose: Mission telemetry readouts, probe technical specifications, coordinate telemetry, and code tokens.

---

### 4. Astronomy & Physics References
- **NASA Jet Propulsion Laboratory (JPL) / Caltech**  
  - Keplerian orbital mechanics formulas, astronomical unit scaling factors, and solar corona spectroscopic visualization data.
