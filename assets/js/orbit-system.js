/**
 * orbit-system.js — Celestial Mechanics & Interactive System Map
 * 
 * Rebuilds Diwakar Venkat Peddada's portfolio as a simulated Solar System:
 * - Center: Sun (Diwakar)
 * - 5 Concentric Planets: Python, C#/.NET, Rust, TypeScript, C++
 * - Moons: LiveSubs, Griffin, Knox, SyGriffin, Polaris, Sita, myselfdiva, HackMe
 * - Real orbital physics with Keplerian drift (angle, velocity, radius)
 * - Staged Ignition Sequence on initial load
 * - Camera zoom and focus glide transitions
 * - Synchronized accessible HTML/SVG targeting overlay (keyboard navigable)
 * - Probe telemetry readout controller with native <dialog>
 * - Responsive GSAP ScrollTrigger integration (desktop pinned journey, mobile vertical deck)
 */

(function () {
  'use strict';

  var container = document.getElementById('system-map-viewport');
  var canvas = document.getElementById('orbit-canvas');
  var overlay = document.getElementById('orbit-interactive-overlay');
  var probeModal = document.getElementById('probe-modal');

  if (!container || !canvas || !overlay) return;

  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var width = 0;
  var height = 0;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isPaused = reducedMotion;
  var animFrameId = null;
  var lastTime = 0;

  // Staged Ignition Sequence
  // 0.0 -> 0.3: Sun flare ignition
  // 0.3 -> 0.7: Gravitational wave orbit ring expansion
  // 0.7 -> 1.0: Planets and moons streak into their orbits
  // 1.0+: Steady-state baseline drift
  var ignitionProgress = reducedMotion ? 1.0 : 0.0;
  var ignitionDuration = 1400; // ms
  var ignitionStartTime = 0;

  // Camera state for smooth zooms
  var camera = {
    x: 0,
    y: 0,
    scale: 1,
    targetX: 0,
    targetY: 0,
    targetScale: 1
  };

  // Celestial Database — Pure public real data from GitHub & READMEs
  var CELESTIAL_DATA = {
    sun: {
      id: 'sun',
      type: 'star',
      name: 'Diwakar Venkat Peddada',
      subtitle: 'The Core · Software Engineer & AI Developer',
      location: 'Visakhapatnam, India',
      status: 'AI developer intern at Aegion Dynamic Solutions',
      summary: 'Building software that keeps up with live things — speech turning into subtitles, papers turning into evidence, and agents that remember decisions from six sessions ago.',
      radius: 28,
      color: '#f59e0b'
    },
    // --- 5 PLANETS (LANGUAGES) ---
    python: {
      id: 'python',
      type: 'planet',
      orbitIndex: 1,
      name: 'Python',
      label: 'PYTHON',
      orbitRadius: 125,
      speed: 0.00045,
      angle: 0.8,
      size: 11,
      evidence: 'Griffin Bio / SyGriffin / Polaris',
      work: 'Biomedical RAG, local models, data pipelines',
      color: '#fbbf24'
    },
    csharp: {
      id: 'csharp',
      type: 'planet',
      orbitIndex: 2,
      name: 'C# / .NET',
      label: 'C# / .NET',
      orbitRadius: 195,
      speed: 0.00032,
      angle: 2.4,
      size: 11,
      evidence: 'LiveSubs',
      work: 'Windows overlays, live captions, WPF',
      color: '#fbbf24'
    },
    rust: {
      id: 'rust',
      type: 'planet',
      orbitIndex: 3,
      name: 'Rust',
      label: 'RUST',
      orbitRadius: 265,
      speed: 0.00024,
      angle: 4.1,
      size: 10,
      evidence: 'Knox',
      work: 'MCP server, graph core, Tauri desktop integration',
      color: '#fbbf24'
    },
    typescript: {
      id: 'typescript',
      type: 'planet',
      orbitIndex: 4,
      name: 'TypeScript',
      label: 'TYPESCRIPT',
      orbitRadius: 335,
      speed: 0.00018,
      angle: 5.3,
      size: 9.5,
      evidence: 'myselfdiva',
      work: 'React, Vite, modern interface architecture',
      color: '#fbbf24'
    },
    cpp: {
      id: 'cpp',
      type: 'planet',
      orbitIndex: 5,
      name: 'C++',
      label: 'C++',
      orbitRadius: 405,
      speed: 0.00013,
      angle: 1.5,
      size: 9,
      evidence: 'HackMe 2024 Solver',
      work: 'Algorithms and high-performance data structures',
      color: '#fbbf24'
    },

    // --- MOONS (PROJECT CASE STUDIES & WORK) ---
    livesubs: {
      id: 'livesubs',
      type: 'moon',
      parent: 'csharp',
      isMajor: true,
      caseNumber: '01',
      name: 'LiveSubs',
      classification: 'MAJOR MOON · REAL-TIME WINDOWS OVERLAY',
      problem: 'Speech in meetings and video streams moves faster than users can read or translate using conventional transcription windows.',
      whatItDoes: 'Captures Windows Live Captions in real time, translates recognized speech through 9+ API backends (Google, DeepL, OpenAI, Ollama, LM Studio), and renders a responsive, always-on-top customizable subtitle bar over any active window or call.',
      stack: ['C#', '.NET 8', 'WPF', 'Windows Live Captions API', 'SQLite'],
      metric: '9+ translation backends supported; self-contained single .exe (Windows x64) with zero runtime install; settings persisted in %AppData%\\LiveSubs\\setting.json; optional SQLite translation history.',
      sourceUrl: 'https://github.com/Diva143V/LiveSubs',
      releaseUrl: 'https://github.com/Diva143V/LiveSubs/releases',
      orbitRadius: 42,
      speed: 0.0018,
      angle: 0.5,
      size: 7.5,
      color: '#ffffff'
    },
    griffin: {
      id: 'griffin',
      type: 'moon',
      parent: 'python',
      isMajor: true,
      caseNumber: '02',
      name: 'Griffin Bio',
      classification: 'MAJOR MOON · BIOMEDICAL EVIDENCE WORKBENCH',
      problem: 'Biomedical research papers are scattered across fragmented silos with conflicting clinical claims that take researchers weeks to manually synthesize.',
      whatItDoes: 'Collects literature and scientific data from 10 modular source collectors, merges and deduplicates entries, generates sentence embeddings, and runs an automated Mixture-of-LLMs pipeline for claim extraction, Oxford evidence ranking, contradiction detection, and consensus synthesis surfaced through a Reflex web dashboard.',
      stack: ['Python', 'ChromaDB', 'Ollama', 'Graph RAG', 'Reflex', 'Mixture of LLMs'],
      metric: '10 modular source collectors (PubMed, Europe PMC, Semantic Scholar, OpenAlex, ClinicalTrials, bioRxiv, ChEMBL, UniProt, PubChem, dbSNP); Oxford Levels of Evidence ranking; 7 specialized reasoning agents.',
      sourceUrl: 'https://github.com/Diva143V/Griffin',
      orbitRadius: 44,
      speed: 0.0021,
      angle: 1.1,
      size: 7.5,
      color: '#ffffff'
    },
    knox: {
      id: 'knox',
      type: 'moon',
      parent: 'rust',
      isMajor: true,
      caseNumber: '03',
      name: 'Knox',
      classification: 'MAJOR MOON · CAUSAL GRAPH & MCP SERVER',
      problem: 'AI coding agents suffer from catastrophic amnesia, losing architectural rationale, design decisions, and constraints across sessions and tool switches.',
      whatItDoes: 'A persistent, cross-platform knowledge graph and Model Context Protocol (MCP) server in Rust that captures architectural decisions, pre-flight constraints, and Git human edits, giving AI agents long-term causal memory.',
      stack: ['Rust 1.85+', 'SQLite WAL & FTS5', 'PetGraph', 'Tauri v2', 'React 19', 'Tailwind v4', 'D3 Physics'],
      metric: '8 focused MCP tools (knox_begin, knox_context, knox_check, knox_trace, etc.); tool definition footprint <= 850 tokens; 50-pair calibrated guardrail with 0.60 overlap threshold; 5.46 MB LZMA setup wizard.',
      sourceUrl: 'https://github.com/Diva143V/Knox',
      orbitRadius: 46,
      speed: 0.0017,
      angle: 3.2,
      size: 7.5,
      color: '#ffffff'
    },
    sygriffin: {
      id: 'sygriffin',
      type: 'moon',
      parent: 'python',
      isMajor: true,
      caseNumber: '04',
      name: 'SyGriffin',
      classification: 'MAJOR MOON · NEOANTIGEN DISCOVERY PLATFORM',
      problem: 'Identifying clinically viable neoantigen candidates from raw tumor sequencing requires complex, opaque computational biology pipelines.',
      whatItDoes: 'A CLI-first AI bioinformatics platform and life-sciences research companion that parses tumor VCF files, predicts vaccine-relevant peptide targets, ranks candidates with transparent scoring, and preserves reproducible audit records.',
      stack: ['Python 3.11', 'Bun 1.3+', 'VEP', 'MHCflurry', 'uv', 'pytest', 'mypy'],
      metric: 'Predicts peptide candidates matched to specific HLA alleles (e.g. HLA-A*02:01, melanoma, GRCh37); automated RNA-seq run validation checking matrix structure, sample-ID alignment, and batch-confounding.',
      sourceUrl: 'https://github.com/Diva143V/SyGriffin',
      orbitRadius: 62,
      speed: 0.0014,
      angle: 4.2,
      size: 7,
      color: '#ffffff'
    },
    // Minor Moons
    polaris: {
      id: 'polaris',
      type: 'moon',
      parent: 'python',
      isMajor: false,
      name: 'Polaris (Kg-Library-API)',
      classification: 'MINOR MOON · THINK-ON-GRAPH LIBRARY',
      problem: 'High LLM inference cost and latency during multi-hop graph queries over complex factual networks.',
      whatItDoes: 'Storage-agnostic Knowledge Graph library with deterministic Python graph traversal and credit-controlled AI escalation.',
      stack: ['Python', 'FastAPI', 'Think-on-Graph', 'Uvicorn'],
      metric: 'Deterministic graph traversal executes in < 5ms; 3-perspective synthesis (Knowledge, Expert, Combined); pluggable Domain Packs for external MCP tools.',
      sourceUrl: 'https://github.com/Diva143V/Kg-Library-API',
      orbitRadius: 82,
      speed: 0.001,
      angle: 2.1,
      size: 5,
      color: '#94a3b8'
    },
    sita: {
      id: 'sita',
      type: 'moon',
      parent: 'python',
      isMajor: false,
      name: 'Sita',
      classification: 'MINOR MOON · PRECURSOR EVIDENCE PIPELINE',
      problem: 'Synthesizing disparate clinical evidence on metformin therapy in breast cancer.',
      whatItDoes: 'End-to-end evidence ingestion and contradiction pipeline that laid the architectural foundation for Griffin Bio.',
      stack: ['Python', 'Embeddings', 'PubMed API', 'Semantic Search'],
      metric: 'Aggregated 3 medical databases and resolved semantic contradictions; precursor to Griffin Bio.',
      sourceUrl: 'https://github.com/Diva143V/Sita',
      orbitRadius: 98,
      speed: 0.0008,
      angle: 5.6,
      size: 4.5,
      color: '#94a3b8'
    },
    myselfdiva: {
      id: 'myselfdiva',
      type: 'moon',
      parent: 'typescript',
      isMajor: false,
      name: 'myselfdiva',
      classification: 'MINOR MOON · PERSONAL UNIVERSE PORTFOLIO',
      problem: 'Generic templated portfolio sites fail to communicate the engineering depth and physical real-time systems ethos.',
      whatItDoes: 'Rebuilds personal identity as an interactive solar system where languages are planets and projects are moons.',
      stack: ['TypeScript', 'Vite', 'HTML5 Canvas', 'GSAP', 'Accessibility'],
      metric: 'Full 60fps orbital physics simulation; total page payload < 300 KB; WCAG 2.2 compliant with native <dialog> and light dismiss.',
      sourceUrl: 'https://github.com/Diva143V/myselfdiva',
      orbitRadius: 40,
      speed: 0.0023,
      angle: 1.8,
      size: 5,
      color: '#94a3b8'
    },
    hackme: {
      id: 'hackme',
      type: 'moon',
      parent: 'cpp',
      isMajor: false,
      name: 'HackMe 2024 Solver',
      classification: 'MINOR MOON · FIRST PLACE HACKATHON WIN',
      problem: 'Naive graph search algorithms timed out under strict competition time constraints.',
      whatItDoes: 'First-place winning optimization in C++ redesigning search data structures and pruning redundant search passes.',
      stack: ['C++', 'Algorithms', 'Data Structures', 'Competitive Programming'],
      metric: 'Cut runtime from timeout to sub-second evaluation, winning 1st place at HackMe 2024.',
      sourceUrl: 'https://github.com/Diva143V/myselfdiva',
      orbitRadius: 38,
      speed: 0.0025,
      angle: 3.7,
      size: 5.5,
      color: '#94a3b8'
    }
  };

  var planetsList = [
    CELESTIAL_DATA.python,
    CELESTIAL_DATA.csharp,
    CELESTIAL_DATA.rust,
    CELESTIAL_DATA.typescript,
    CELESTIAL_DATA.cpp
  ];

  var moonsList = [
    CELESTIAL_DATA.livesubs,
    CELESTIAL_DATA.griffin,
    CELESTIAL_DATA.knox,
    CELESTIAL_DATA.sygriffin,
    CELESTIAL_DATA.polaris,
    CELESTIAL_DATA.sita,
    CELESTIAL_DATA.myselfdiva,
    CELESTIAL_DATA.hackme
  ];

  var activeFocusBody = null;
  var hoveredBody = null;

  function resize() {
    var rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height || Math.min(window.innerHeight * 0.88, 760);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Dynamic orbit scaling based on screen width
    var scaleFactor = Math.max(0.48, Math.min(1.0, width / 980));
    planetsList.forEach(function (p, idx) {
      p.currentRadius = (95 + idx * 68) * scaleFactor;
    });

    if (reducedMotion || isPaused) {
      render(performance.now());
    }
  }

  function getSystemCenter() {
    return {
      x: width * 0.5,
      y: height * 0.5
    };
  }

  function updatePhysics(dt) {
    if (reducedMotion) return;

    var dtMultiplier = dt / 16.666; // Normalized to 60fps

    // Staged ignition progression
    if (ignitionProgress < 1.0) {
      var elapsed = performance.now() - ignitionStartTime;
      ignitionProgress = Math.min(1.0, elapsed / ignitionDuration);
    }

    // Advance planet orbits
    planetsList.forEach(function (p) {
      p.angle += p.speed * dtMultiplier;
    });

    // Advance moon orbits
    moonsList.forEach(function (m) {
      m.angle += m.speed * dtMultiplier;
    });

    // Smooth camera glide
    camera.x += (camera.targetX - camera.x) * 0.08;
    camera.y += (camera.targetY - camera.y) * 0.08;
    camera.scale += (camera.targetScale - camera.scale) * 0.08;
  }

  function computePositions() {
    var center = getSystemCenter();
    var ign = ignitionProgress;

    // Sun position
    CELESTIAL_DATA.sun.x = center.x;
    CELESTIAL_DATA.sun.y = center.y;

    // Calculate planets
    planetsList.forEach(function (p) {
      var r = (p.currentRadius || p.orbitRadius) * Math.min(1.0, ign * 1.3);
      p.x = center.x + Math.cos(p.angle) * r;
      p.y = center.y + Math.sin(p.angle) * r;
    });

    // Calculate moons relative to parent planet
    moonsList.forEach(function (m) {
      var parent = CELESTIAL_DATA[m.parent];
      if (!parent) return;
      var mr = m.orbitRadius * Math.min(1.0, Math.max(0, (ign - 0.3) * 1.5));
      m.x = parent.x + Math.cos(m.angle) * mr;
      m.y = parent.y + Math.sin(m.angle) * mr;
    });
  }

  function render(timestamp) {
    if (!lastTime) {
      lastTime = timestamp;
      ignitionStartTime = timestamp;
    }
    var dt = Math.min(timestamp - lastTime, 64);
    lastTime = timestamp;

    updatePhysics(dt);
    computePositions();

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    var center = getSystemCenter();

    ctx.save();
    // Apply camera transform around active focus or system center
    ctx.translate(center.x, center.y);
    ctx.scale(camera.scale, camera.scale);
    ctx.translate(-center.x - camera.x, -center.y - camera.y);

    var ign = ignitionProgress;

    // --- 1. DRAW ORBIT RINGS ---
    planetsList.forEach(function (p) {
      var r = (p.currentRadius || p.orbitRadius) * Math.min(1.0, ign * 1.25);
      var isRingActive = (activeFocusBody && (activeFocusBody.id === p.id || activeFocusBody.parent === p.id)) ||
                         (hoveredBody && (hoveredBody.id === p.id || hoveredBody.parent === p.id));

      ctx.beginPath();
      ctx.arc(center.x, center.y, r, 0, Math.PI * 2);

      if (isRingActive) {
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
        ctx.lineWidth = 1.4;
      } else {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
        ctx.lineWidth = 0.9;
      }
      ctx.stroke();

      // Orbit label (subtle monospace on the ring)
      if (width > 640 && ign > 0.6) {
        ctx.save();
        ctx.font = '500 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = isRingActive ? 'rgba(245, 158, 11, 0.8)' : 'rgba(100, 116, 139, 0.45)';
        ctx.fillText('ORBIT ' + p.orbitIndex + ' // ' + p.label, center.x + r + 4, center.y - 3);
        ctx.restore();
      }
    });

    // --- 2. DRAW MOON ORBIT RINGS AROUND PARENT PLANETS ---
    if (ign > 0.4) {
      moonsList.forEach(function (m) {
        var parent = CELESTIAL_DATA[m.parent];
        if (!parent) return;

        var isMoonActive = (activeFocusBody && activeFocusBody.id === m.id) || (hoveredBody && hoveredBody.id === m.id);

        ctx.beginPath();
        ctx.arc(parent.x, parent.y, m.orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isMoonActive ? 'rgba(245, 158, 11, 0.5)' : 'rgba(148, 163, 184, 0.08)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    }

    // --- 3. DRAW THE SUN (DIWAKAR) ---
    var sun = CELESTIAL_DATA.sun;
    var sunScale = Math.min(1.0, ign * 1.5);
    var sunPulse = 1.0 + Math.sin(timestamp * 0.002) * 0.05;
    var sunR = sun.radius * sunScale * sunPulse;

    // Outer Solar Flare Halo
    var corona = ctx.createRadialGradient(sun.x, sun.y, sunR * 0.4, sun.x, sun.y, sunR * 2.8);
    corona.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
    corona.addColorStop(0.5, 'rgba(245, 158, 11, 0.12)');
    corona.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sunR * 2.8, 0, Math.PI * 2);
    ctx.fillStyle = corona;
    ctx.fill();

    // Photosphere Core
    var sunGrad = ctx.createRadialGradient(sun.x - sunR * 0.2, sun.y - sunR * 0.2, 0, sun.x, sun.y, sunR);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.4, '#fef08a');
    sunGrad.addColorStop(0.8, '#f59e0b');
    sunGrad.addColorStop(1, '#b45309');

    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sunR, 0, Math.PI * 2);
    ctx.fillStyle = sunGrad;
    ctx.fill();

    // Sun Label
    ctx.save();
    ctx.font = '700 10px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f1f5f9';
    ctx.fillText('DIWAKAR', sun.x, sun.y + sunR + 15);
    ctx.font = '500 7.5px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('THE SUN // CORE', sun.x, sun.y + sunR + 25);
    ctx.restore();

    // Dim factor when a body is active
    var dimOther = activeFocusBody ? 0.22 : 1.0;

    // --- 4. DRAW PLANETS ---
    planetsList.forEach(function (p) {
      var isFocused = activeFocusBody && activeFocusBody.id === p.id;
      var isHovered = hoveredBody && hoveredBody.id === p.id;
      var isRelated = activeFocusBody && activeFocusBody.parent === p.id;
      var alpha = (isFocused || isHovered || isRelated) ? 1.0 : dimOther;

      ctx.save();
      ctx.globalAlpha = alpha;

      // Planet Sphere
      var pGrad = ctx.createRadialGradient(p.x - p.size * 0.3, p.y - p.size * 0.3, 0, p.x, p.y, p.size);
      pGrad.addColorStop(0, '#fef3c7');
      pGrad.addColorStop(0.5, '#f59e0b');
      pGrad.addColorStop(1, '#1e293b');

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = pGrad;
      ctx.fill();

      // Atmospheric rim stroke
      ctx.strokeStyle = (isFocused || isHovered) ? '#f59e0b' : 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Monospace Label
      ctx.font = '600 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = (isFocused || isHovered) ? '#fbbf24' : '#e2e8f0';
      ctx.fillText(p.label, p.x, p.y - p.size - 6);

      ctx.restore();
    });

    // --- 5. DRAW MOONS ---
    moonsList.forEach(function (m) {
      var isFocused = activeFocusBody && activeFocusBody.id === m.id;
      var isHovered = hoveredBody && hoveredBody.id === m.id;
      var alpha = (isFocused || isHovered) ? 1.0 : dimOther;

      ctx.save();
      ctx.globalAlpha = alpha;

      // Moon Body
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
      ctx.fillStyle = (isFocused || isHovered || m.isMajor) ? '#ffffff' : '#94a3b8';
      ctx.fill();

      if (isFocused || isHovered) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Glowing outer halo
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size + 4, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Moon Label
      if (m.isMajor || isHovered || isFocused || width > 768) {
        ctx.font = (m.isMajor || isFocused) ? '700 8.5px "Space Grotesk", sans-serif' : '500 7.5px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = (isFocused || isHovered) ? '#fbbf24' : (m.isMajor ? '#f1f5f9' : '#94a3b8');
        ctx.fillText(m.name, m.x, m.y + m.size + 11);
      }

      ctx.restore();
    });

    // --- 6. TARGETING RETICLE (WHEN A BODY IS FOCUSED OR HOVERED) ---
    var targeted = activeFocusBody || hoveredBody;
    if (targeted && targeted.x !== undefined && targeted.y !== undefined) {
      ctx.save();
      var reticleR = targeted.size ? (targeted.size + 12) : 34;

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.2;

      // 4 Bracket Corners
      var cornerLen = 6;
      // Top-Left
      ctx.beginPath();
      ctx.moveTo(targeted.x - reticleR, targeted.y - reticleR + cornerLen);
      ctx.lineTo(targeted.x - reticleR, targeted.y - reticleR);
      ctx.lineTo(targeted.x - reticleR + cornerLen, targeted.y - reticleR);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(targeted.x + reticleR - cornerLen, targeted.y - reticleR);
      ctx.lineTo(targeted.x + reticleR, targeted.y - reticleR);
      ctx.lineTo(targeted.x + reticleR, targeted.y - reticleR + cornerLen);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(targeted.x - reticleR, targeted.y + reticleR - cornerLen);
      ctx.lineTo(targeted.x - reticleR, targeted.y + reticleR);
      ctx.lineTo(targeted.x - reticleR + cornerLen, targeted.y + reticleR);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(targeted.x + reticleR - cornerLen, targeted.y + reticleR);
      ctx.lineTo(targeted.x + reticleR, targeted.y + reticleR);
      ctx.lineTo(targeted.x + reticleR, targeted.y + reticleR - cornerLen);
      ctx.stroke();

      // Telemetry Coordinate readout
      ctx.font = '600 7px "JetBrains Mono", monospace';
      ctx.fillStyle = '#fbbf24';
      ctx.textAlign = 'left';
      ctx.fillText('TARGET LOCK // ' + targeted.name.toUpperCase(), targeted.x + reticleR + 6, targeted.y - 4);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
      ctx.fillText('STATUS: LOCKED', targeted.x + reticleR + 6, targeted.y + 6);

      ctx.restore();
    }

    ctx.restore();

    // Synchronize HTML/SVG interactive overlay buttons
    syncOverlayNodes();

    if (!isPaused && !reducedMotion) {
      animFrameId = requestAnimationFrame(render);
    }
  }

  // --- INTERACTIVE ACCESSIBILITY OVERLAY ---
  // Renders focusable <button> elements synchronized to the celestial body coordinates
  function buildOverlayMarkup() {
    overlay.innerHTML = '';

    // Sun node
    var sunBtn = document.createElement('button');
    sunBtn.type = 'button';
    sunBtn.className = 'orbit-node-btn node-sun';
    sunBtn.dataset.id = 'sun';
    sunBtn.setAttribute('aria-label', 'Focus Solar Core: Diwakar Venkat Peddada');
    overlay.appendChild(sunBtn);

    // Planet nodes
    planetsList.forEach(function (p) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'orbit-node-btn node-planet';
      btn.dataset.id = p.id;
      btn.setAttribute('aria-label', 'Focus Planet: ' + p.name + ' (' + p.work + ')');
      overlay.appendChild(btn);
    });

    // Moon nodes
    moonsList.forEach(function (m) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'orbit-node-btn node-moon' + (m.isMajor ? ' node-major' : '');
      btn.dataset.id = m.id;
      btn.setAttribute('aria-label', 'Focus Moon: ' + m.name + ' (' + m.classification + ')');
      overlay.appendChild(btn);
    });

    // Event delegation
    overlay.addEventListener('click', function (e) {
      var btn = e.target.closest('.orbit-node-btn');
      if (!btn) return;
      var id = btn.dataset.id;
      if (CELESTIAL_DATA[id]) {
        selectBody(CELESTIAL_DATA[id], true);
      }
    });

    overlay.addEventListener('pointerenter', function (e) {
      var btn = e.target.closest('.orbit-node-btn');
      if (!btn) return;
      var id = btn.dataset.id;
      if (CELESTIAL_DATA[id]) {
        hoveredBody = CELESTIAL_DATA[id];
      }
    }, true);

    overlay.addEventListener('pointerleave', function (e) {
      var btn = e.target.closest('.orbit-node-btn');
      if (!btn) return;
      hoveredBody = null;
    }, true);
  }

  function syncOverlayNodes() {
    var center = getSystemCenter();
    var allNodes = overlay.querySelectorAll('.orbit-node-btn');

    for (var i = 0; i < allNodes.length; i++) {
      var btn = allNodes[i];
      var id = btn.dataset.id;
      var body = CELESTIAL_DATA[id];
      if (!body || body.x === undefined || body.y === undefined) continue;

      // Map canvas coordinate through camera transformation
      var screenX = center.x + (body.x - center.x - camera.x) * camera.scale;
      var screenY = center.y + (body.y - center.y - camera.y) * camera.scale;
      var clickRadius = Math.max(22, (body.size || body.radius || 10) * camera.scale + 6);

      btn.style.left = screenX + 'px';
      btn.style.top = screenY + 'px';
      btn.style.width = (clickRadius * 2) + 'px';
      btn.style.height = (clickRadius * 2) + 'px';
      btn.style.transform = 'translate(-50%, -50%)';

      if (activeFocusBody && activeFocusBody.id === id) {
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.removeAttribute('aria-selected');
      }
    }
  }

  // --- SELECTION & CAMERA FOCUS ---
  function selectBody(body, openReadout) {
    activeFocusBody = body;

    if (!body) {
      // Zoom back to system overview
      camera.targetX = 0;
      camera.targetY = 0;
      camera.targetScale = 1;
      closeProbeReadout();
      return;
    }

    // Zoom camera towards targeted body
    var center = getSystemCenter();
    if (body.id === 'sun') {
      camera.targetX = 0;
      camera.targetY = 0;
      camera.targetScale = 1.25;
    } else {
      camera.targetX = (body.x - center.x) * 0.75;
      camera.targetY = (body.y - center.y) * 0.75;
      camera.targetScale = 1.65;
    }

    if (openReadout) {
      displayProbeReadout(body);
    }
  }

  // --- PROBE TELEMETRY READOUT DIALOG ---
  var probeTitle = document.getElementById('probe-title');
  var probeClassification = document.getElementById('probe-classification');
  var probeProblem = document.getElementById('probe-problem');
  var probeAction = document.getElementById('probe-action');
  var probeStack = document.getElementById('probe-stack');
  var probeMetric = document.getElementById('probe-metric');
  var probeSourceLink = document.getElementById('probe-source-link');
  var probeReleaseLink = document.getElementById('probe-release-link');
  var probeCoordinates = document.getElementById('probe-coordinates');

  function displayProbeReadout(body) {
    if (!probeModal) return;

    if (probeTitle) probeTitle.textContent = body.name;
    if (probeClassification) probeClassification.textContent = body.classification || body.subtitle || 'CELESTIAL BODY';

    if (probeCoordinates) {
      var angleDeg = Math.round(((body.angle || 0) % (Math.PI * 2)) * (180 / Math.PI));
      probeCoordinates.textContent = 'SECTOR // ORBIT ' + (body.orbitIndex || 'CORE') + ' · AZIMUTH ' + angleDeg + '°';
    }

    if (probeProblem) {
      probeProblem.textContent = body.problem || body.work || body.summary || '';
      probeProblem.parentElement.hidden = !body.problem;
    }

    if (probeAction) {
      probeAction.textContent = body.whatItDoes || body.evidence || body.summary || '';
    }

    if (probeMetric) {
      probeMetric.textContent = body.metric || body.status || '';
      probeMetric.parentElement.hidden = !body.metric;
    }

    if (probeStack) {
      probeStack.innerHTML = '';
      var tags = body.stack || (body.evidence ? body.evidence.split(' / ') : []);
      tags.forEach(function (tag) {
        var pill = document.createElement('span');
        pill.className = 'probe-tag';
        pill.textContent = tag.trim();
        probeStack.appendChild(pill);
      });
      probeStack.parentElement.hidden = tags.length === 0;
    }

    if (probeSourceLink) {
      if (body.sourceUrl) {
        probeSourceLink.href = body.sourceUrl;
        probeSourceLink.hidden = false;
      } else {
        probeSourceLink.hidden = true;
      }
    }

    if (probeReleaseLink) {
      if (body.releaseUrl) {
        probeReleaseLink.href = body.releaseUrl;
        probeReleaseLink.hidden = false;
      } else {
        probeReleaseLink.hidden = true;
      }
    }

    // Open native dialog modal
    if (!probeModal.open) {
      try {
        probeModal.showModal();
      } catch (err) {
        probeModal.setAttribute('open', '');
      }
    }

    // Modern web guidance: light-dismiss fallback for <dialog closedby="any">
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      probeModal.dataset.fallbackDismiss = 'true';
    }
  }

  function closeProbeReadout() {
    if (probeModal && probeModal.open) {
      probeModal.close();
      if (activeFocusBody) {
        // Return focus to triggering button
        var btn = overlay.querySelector('[data-id="' + activeFocusBody.id + '"]');
        if (btn) btn.focus();
      }
      activeFocusBody = null;
      camera.targetX = 0;
      camera.targetY = 0;
      camera.targetScale = 1.0;
    }
  }

  if (probeModal) {
    probeModal.addEventListener('close', function () {
      probeModal.returnValue = '';
      activeFocusBody = null;
      camera.targetX = 0;
      camera.targetY = 0;
      camera.targetScale = 1.0;
    });

    // Light-dismiss click-outside detection per modern web guidance
    var pressedOutside = false;
    var isOutside = function (e, dialog) {
      var r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };

    probeModal.addEventListener('pointerdown', function (e) {
      pressedOutside = isOutside(e, probeModal);
    });

    probeModal.addEventListener('pointerup', function (e) {
      if (pressedOutside && isOutside(e, probeModal)) {
        probeModal.close();
      }
    });

    var closeBtn = probeModal.querySelector('.probe-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeProbeReadout();
      });
    }
  }

  // --- GSAP SCROLLTRIGGER JOURNEY (DESKTOP) ---
  function initScrollJourney() {
    if (reducedMotion || window.innerWidth < 768 || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var section = document.getElementById('work-system-container');
    if (!section) return;

    // Sequence of 4 featured project moons
    var journeyMoons = [
      CELESTIAL_DATA.livesubs,
      CELESTIAL_DATA.griffin,
      CELESTIAL_DATA.knox,
      CELESTIAL_DATA.sygriffin
    ];

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=2400',
      pin: true,
      scrub: 0.6,
      onUpdate: function (self) {
        var progress = self.progress;
        var stepIndex = Math.floor(progress * journeyMoons.length);
        stepIndex = Math.min(stepIndex, journeyMoons.length - 1);

        var moon = journeyMoons[stepIndex];
        if (moon && (!activeFocusBody || activeFocusBody.id !== moon.id)) {
          selectBody(moon, false);
          // Highlight corresponding card in sidebar
          document.querySelectorAll('.pinned-case-card').forEach(function (card) {
            card.classList.toggle('active', card.dataset.caseId === moon.id);
          });
        }
      },
      onLeave: function () {
        selectBody(null, false);
      },
      onLeaveBack: function () {
        selectBody(null, false);
      }
    });
  }

  // Handle section visibility (IntersectionObserver)
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (!isPaused && !reducedMotion && !animFrameId) {
            lastTime = performance.now();
            animFrameId = requestAnimationFrame(render);
          }
        } else {
          if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
          }
        }
      });
    }, { threshold: 0.05 });
    io.observe(container);
  }

  // Tab visibility changes
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    } else {
      if (!isPaused && !reducedMotion && !animFrameId) {
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(render);
      }
    }
  });

  // Public Orbit API for external cards and buttons
  window.OrbitSystemAPI = {
    selectBodyById: function (id, openModal) {
      if (CELESTIAL_DATA[id]) {
        selectBody(CELESTIAL_DATA[id], openModal !== false);
      }
    },
    resetView: function () {
      selectBody(null, false);
    },
    pause: function () {
      isPaused = true;
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    },
    resume: function () {
      if (reducedMotion) return;
      isPaused = false;
      if (!animFrameId) {
        lastTime = performance.now();
        animFrameId = requestAnimationFrame(render);
      }
    }
  };

  // Wire up cards outside the canvas (e.g. static case studies and stack items)
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-focus-celestial]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var id = this.dataset.focusCelestial;
        if (CELESTIAL_DATA[id]) {
          // Scroll smoothly to the system map if not already there
          var mapSec = document.getElementById('system-map');
          if (mapSec && window.innerWidth >= 768) {
            mapSec.scrollIntoView({ behavior: 'smooth' });
          }
          selectBody(CELESTIAL_DATA[id], true);
        }
      });
    });
  });

  // Init
  window.addEventListener('resize', resize, { passive: true });
  buildOverlayMarkup();
  resize();

  if (!reducedMotion) {
    animFrameId = requestAnimationFrame(render);
    // Initialize ScrollTrigger after load
    window.addEventListener('load', initScrollJourney);
  } else {
    render(performance.now());
  }
})();
