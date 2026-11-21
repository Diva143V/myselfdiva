/**
 * ProbeModal.js — Accessible Probe Telemetry Dialog & Camera Inspection Bridge
 * 
 * Complies strictly with Modern Web Guidance:
 * - Native <dialog> with showModal() and closedby="any"
 * - overscroll-behavior: contain on dialog and backdrop
 * - Non-destructive light-dismiss fallback for outside click gestures
 * - Returns focus seamlessly to invoker on dismiss
 */

import { GALAXY_CONFIG } from '../config/galaxyConfig.js';

export const CELESTIAL_PROBE_DATABASE = {
  sun: {
    id: 'sun',
    name: 'Sun // Diwakar',
    classification: 'SOLAR PROTOCOL // SYSTEM CORE',
    orbit: 'Center // Galactic Origin',
    status: 'Core Host // Active Identity',
    problem: 'Traditional technical portfolios are fragmented across resumes, GitHub repos, and shallow static bullet points that fail to convey architectural depth.',
    whatItDoes: 'Acts as the central heliocentric gravity core of the Diva Universe, orchestrating real-time Keplerian orbital physics, adaptive GPU governance, and deep-space cinematic lighting across all technology domains.',
    stack: ['Three.js', 'WebGL 2', 'GSAP', 'Lenis', 'Vite', 'postprocessing'],
    metric: 'Architectural targets: 60fps simulation budget, < 100 draw calls, < 3 MB bundle; dynamically regulated by AdaptiveGovernor based on device performance.',
    sourceUrl: 'https://github.com/Diva143V/myselfdiva'
  },
  python: {
    id: 'python',
    name: 'Python System',
    classification: 'ORBITAL ANCHOR // BIOMEDICAL AI',
    orbit: 'Orbit 1 · Python',
    status: 'Active Domain',
    problem: 'Biomedical knowledge graphs and clinical trial registries require robust deterministic pipelines and asynchronous literature collection.',
    whatItDoes: 'Core language for AI literature synthesis, local embedding models, graph traversal algorithms, and automated bioinformatics pipelines.',
    stack: ['Python 3.11+', 'FastAPI', 'ChromaDB', 'Reflex', 'Pytest'],
    metric: 'Powers Griffin Bio (10 modular collectors) and SyGriffin neoantigen discovery tools.',
    sourceUrl: 'https://github.com/Diva143V/Griffin'
  },
  csharp: {
    id: 'csharp',
    name: 'C# / .NET System',
    classification: 'ORBITAL ANCHOR // DESKTOP SYSTEMS',
    orbit: 'Orbit 2 · C# / .NET',
    status: 'Active Domain',
    problem: 'Windows system audio and Live Captions hooks require low-overhead native interop and high-frequency UI updates without dropping frames.',
    whatItDoes: 'Architecture anchor for native Windows accessibility software, WPF overlays, hardware acceleration, and multi-threaded desktop software.',
    stack: ['C#', '.NET 8', 'WPF', 'Windows API', 'SQLite'],
    metric: 'Powers LiveSubs single self-contained .exe with real-time API translation hooks.',
    sourceUrl: 'https://github.com/Diva143V/LiveSubs',
    releaseUrl: 'https://github.com/Diva143V/LiveSubs/releases'
  },
  rust: {
    id: 'rust',
    name: 'Rust System',
    classification: 'ORBITAL ANCHOR // SYSTEMS & MCP',
    orbit: 'Orbit 3 · Rust',
    status: 'Active Domain',
    problem: 'LLM agents require sub-millisecond causal context retrieval and memory persistence without memory corruption or runtime crashes.',
    whatItDoes: 'Foundation for high-performance systems programming, MCP protocol servers, graph database indexing, and Tauri cross-platform software.',
    stack: ['Rust 1.85+', 'PetGraph', 'SQLite FTS5', 'Tauri v2', 'Tokio'],
    metric: 'Powers Knox MCP server with 8 focused tools and strict token budgets.',
    sourceUrl: 'https://github.com/Diva143V/Knox'
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript System',
    classification: 'ORBITAL ANCHOR // INTERFACES & WEBGL',
    orbit: 'Orbit 4 · TypeScript',
    status: 'Active Domain',
    problem: 'Interactive 3D environments demand strict type-safety across custom shader uniforms, physics loops, and complex DOM overlays.',
    whatItDoes: 'Powers modern frontend architecture, Three.js 3D graphics, reactive user interfaces, and client-side tooling.',
    stack: ['TypeScript', 'Three.js', 'Vite', 'React 19', 'GSAP'],
    metric: 'Architectural foundation for myselfdiva 3D universe and interactive web applications.',
    sourceUrl: 'https://github.com/Diva143V/myselfdiva'
  },
  cpp: {
    id: 'cpp',
    name: 'C++ System',
    classification: 'ORBITAL ANCHOR // LOW-LEVEL ALGORITHMS',
    orbit: 'Orbit 5 · C++',
    status: 'Active Domain',
    problem: 'Time-critical algorithmic competitions require microsecond-level cache locality and manual memory optimization.',
    whatItDoes: 'High-performance competitive programming, custom search data structures, branch-prediction tuning, and memory layout optimization.',
    stack: ['C++20', 'Data Structures', 'Competitive Programming', 'Algorithms'],
    metric: '1st place solver in HackMe 2024 optimization challenge.',
    sourceUrl: 'https://github.com/Diva143V'
  },
  livesubs: {
    id: 'livesubs',
    name: 'LiveSubs',
    classification: 'MAJOR MOON // REAL-TIME OVERLAY',
    orbit: 'Orbit 2 · C# / .NET',
    status: 'Shipped // Self-Contained .exe',
    problem: 'Speech in meetings and video streams moves faster than users can read or translate using conventional transcription windows.',
    whatItDoes: 'Captures Windows Live Captions in real time, translates recognized speech through 9+ API backends (Google, DeepL, OpenAI, Ollama, LM Studio), and renders a responsive, always-on-top customizable subtitle bar over any active window or call.',
    stack: ['C#', '.NET 8', 'WPF', 'Windows Live Captions API', 'SQLite'],
    metric: '9+ translation backends supported; self-contained single .exe (Windows x64) with zero runtime install; settings persisted in %AppData%\\LiveSubs\\setting.json; optional SQLite translation history database.',
    sourceUrl: 'https://github.com/Diva143V/LiveSubs',
    releaseUrl: 'https://github.com/Diva143V/LiveSubs/releases'
  },
  griffin: {
    id: 'griffin',
    name: 'Griffin Bio',
    classification: 'MAJOR MOON // BIOMEDICAL WORKBENCH',
    orbit: 'Orbit 1 · Python',
    status: 'Active // Production RAG',
    problem: 'Biomedical research papers are scattered across fragmented silos with conflicting clinical claims that take weeks to manually synthesize.',
    whatItDoes: 'Collects literature and scientific data from 10 modular source collectors, merges and deduplicates entries, generates sentence embeddings, and executes an automated Mixture-of-LLMs pipeline for claim extraction, Oxford evidence ranking, contradiction detection, and consensus synthesis surfaced through a Reflex web dashboard.',
    stack: ['Python', 'ChromaDB', 'Ollama', 'Graph RAG', 'Reflex', 'Mixture of LLMs'],
    metric: '10 modular source collectors (PubMed, Europe PMC, Semantic Scholar, OpenAlex, ClinicalTrials, bioRxiv, ChEMBL, UniProt, PubChem, dbSNP); Oxford Levels of Evidence ranking; 7 specialized reasoning agents.',
    sourceUrl: 'https://github.com/Diva143V/Griffin'
  },
  knox: {
    id: 'knox',
    name: 'Knox',
    classification: 'MAJOR MOON // CAUSAL KNOWLEDGE GRAPH',
    orbit: 'Orbit 3 · Rust',
    status: 'Shipped // v2.1.0 NSIS Wizard',
    problem: 'AI coding agents suffer from catastrophic amnesia, losing architectural rationale, design decisions, and constraints across sessions and tool switches.',
    whatItDoes: 'A persistent, cross-platform causal knowledge graph and Model Context Protocol (MCP) server built in Rust. It captures architectural decisions, pre-flight constraints, and developer human edits across disparate coding sessions (Antigravity, Cursor, Claude Code, Gemini CLI), giving AI agents long-term causal memory.',
    stack: ['Rust 1.85+', 'SQLite WAL & FTS5', 'PetGraph', 'Tauri v2', 'React 19', 'Tailwind v4', 'D3 Physics'],
    metric: '8 focused MCP tools (knox_begin, knox_context, knox_check, knox_trace, knox_record, knox_handoff, knox_ask, knox_update); tool definition footprint budgeted <= 850 tokens; 50-pair calibrated guardrail with 0.60 overlap threshold; 5.46 MB LZMA setup wizard.',
    sourceUrl: 'https://github.com/Diva143V/Knox'
  },
  sygriffin: {
    id: 'sygriffin',
    name: 'SyGriffin',
    classification: 'MAJOR MOON // NEOANTIGEN DISCOVERY',
    orbit: 'Orbit 1 · Python',
    status: 'Active // Scientific MVP',
    problem: 'Identifying clinically viable neoantigen candidates from raw tumor mutations requires complex, opaque computational biology pipelines.',
    whatItDoes: 'A CLI-first AI bioinformatics platform and life-sciences research companion that parses tumor VCF files, predicts vaccine-relevant peptide targets, ranks candidates with transparent scoring, and preserves reproducible audit records for cancer vaccine research.',
    stack: ['Python 3.11', 'Bun 1.3+', 'VEP', 'MHCflurry', 'uv', 'pytest', 'mypy'],
    metric: 'Predicts peptide candidates matched to specific HLA alleles (e.g. HLA-A*02:01, melanoma, GRCh37); automated RNA-seq run validation checking matrix structure, sample-ID alignment, replicate counts, and batch-confounding.',
    sourceUrl: 'https://github.com/Diva143V/SyGriffin'
  },
  polaris: {
    id: 'polaris',
    name: 'Polaris (Kg-Library-API)',
    classification: 'SUPPORTING MOON // THINK-ON-GRAPH',
    orbit: 'Orbit 1 · Python',
    status: 'Active // Core Library',
    problem: 'High LLM inference cost and latency during multi-hop graph queries over complex factual networks.',
    whatItDoes: 'Modular, storage-agnostic Knowledge Graph library with deterministic Python graph traversal and credit-controlled AI escalation.',
    stack: ['Python', 'FastAPI', 'Poetry', 'Think-on-Graph', 'Pytest'],
    metric: 'Deterministic graph traversal executes in < 5ms; 3-perspective synthesis (Knowledge, Expert, Combined); pluggable Domain Packs for external MCP tools.',
    sourceUrl: 'https://github.com/Diva143V/Kg-Library-API'
  },
  sita: {
    id: 'sita',
    name: 'Sita',
    classification: 'SUPPORTING MOON // PRECURSOR PIPELINE',
    orbit: 'Orbit 1 · Python',
    status: 'Shipped // Historical Precursor',
    problem: 'Synthesizing disparate clinical evidence on metformin therapy in breast cancer.',
    whatItDoes: 'End-to-end evidence ingestion and contradiction pipeline that laid the architectural foundation for Griffin Bio.',
    stack: ['Python', 'Embeddings', 'PubMed API', 'Semantic Search'],
    metric: 'Aggregated 3 medical databases and resolved semantic contradictions; precursor to Griffin Bio.',
    sourceUrl: 'https://github.com/Diva143V/Sita'
  },
  myselfdiva: {
    id: 'myselfdiva',
    name: 'myselfdiva',
    classification: 'SUPPORTING MOON // PERSONAL UNIVERSE',
    orbit: 'Orbit 4 · TypeScript',
    status: 'Production // Live Site',
    problem: 'Flat 2D diagram portfolios fail to communicate real-time systems depth.',
    whatItDoes: 'Rebuilds personal identity as a realistic cinematic WebGL 3D universe with PBR atmospheres and Keplerian orbital drift.',
    stack: ['Three.js', 'Vite', 'GSAP', 'Lenis', 'postprocessing'],
    metric: 'Architectural targets: 60fps simulation budget, under 100 draw calls, and total bundle payload < 3 MB; dynamically governed by AdaptiveGovernor based on device performance.',
    sourceUrl: 'https://github.com/Diva143V/myselfdiva'
  },
  hackme: {
    id: 'hackme',
    name: 'HackMe 2024 Solver',
    classification: 'SUPPORTING MOON // 1ST PLACE WIN',
    orbit: 'Orbit 5 · C++',
    status: 'First Place // Competition Win',
    problem: 'Naive graph search algorithms timed out under strict competition time constraints.',
    whatItDoes: 'First-place winning algorithmic optimization in C++ redesigning search data structures and pruning redundant search passes.',
    stack: ['C++', 'Algorithms', 'Data Structures', 'Competitive Programming'],
    metric: 'Cut runtime from timeout to sub-second evaluation, winning 1st place at HackMe 2024.',
    sourceUrl: 'https://github.com/Diva143V/myselfdiva'
  }
};

export class ProbeModal {
  constructor(universeScene) {
    this.universe = universeScene;
    this.modal = document.getElementById('probe-modal');
    this.titleEl = document.getElementById('probe-title');
    this.classEl = document.getElementById('probe-classification');
    this.problemEl = document.getElementById('probe-problem');
    this.actionEl = document.getElementById('probe-action');
    this.metricEl = document.getElementById('probe-metric');
    this.stackEl = document.getElementById('probe-stack');
    this.sourceLinkEl = document.getElementById('probe-source-link');
    this.releaseLinkEl = document.getElementById('probe-release-link');
    this.closeBtn = this.modal?.querySelector('.probe-close-btn');

    this.invokerElement = null;

    this.bindEvents();
  }

  bindEvents() {
    if (!this.modal) return;

    // Light-dismiss click outside detection per Modern Web Guidance
    let pressedOutside = false;
    const isOutside = (e) => {
      const r = this.modal.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };

    this.modal.addEventListener('pointerdown', (e) => {
      pressedOutside = isOutside(e);
    });

    this.modal.addEventListener('pointerup', (e) => {
      if (pressedOutside && isOutside(e)) {
        this.close();
      }
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    this.modal.addEventListener('close', () => {
      this.modal.returnValue = '';
      this.universe.clearFocus();
      if (this.invokerElement) {
        this.invokerElement.focus();
        this.invokerElement = null;
      }
    });

    // Listen for custom universe selection events
    window.addEventListener('universe:select-moon', (e) => {
      this.open(e.detail.moonId);
    });

    window.addEventListener('universe:select-planet', (e) => {
      this.open(e.detail.planetId);
    });

    // Wire up all buttons/cards that request celestial telemetry inspection
    document.querySelectorAll('[data-inspect-celestial]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.invokerElement = el;
        this.open(el.dataset.inspectCelestial);
      });
    });
  }

  open(celestialId) {
    const key = (celestialId || '').toLowerCase().trim();
    const data = CELESTIAL_PROBE_DATABASE[key];
    if (!data || !this.modal) return;

    // Populate UI fields
    if (this.titleEl) this.titleEl.textContent = data.name;
    if (this.classEl) this.classEl.textContent = `${data.classification} · ${data.orbit}`;
    if (this.problemEl) this.problemEl.textContent = data.problem;
    if (this.actionEl) this.actionEl.textContent = data.whatItDoes;
    if (this.metricEl) this.metricEl.innerHTML = `<b>Measurable Detail:</b> ${data.metric}`;

    if (this.stackEl) {
      this.stackEl.innerHTML = '';
      (data.stack || []).forEach((tag) => {
        const pill = document.createElement('span');
        pill.className = 'probe-tag';
        pill.textContent = tag;
        this.stackEl.appendChild(pill);
      });
    }

    if (this.sourceLinkEl) {
      this.sourceLinkEl.href = data.sourceUrl || '#';
      this.sourceLinkEl.hidden = !data.sourceUrl;
    }

    if (this.releaseLinkEl) {
      this.releaseLinkEl.href = data.releaseUrl || '#';
      this.releaseLinkEl.hidden = !data.releaseUrl;
    }

    // Zoom camera directly to the celestial body
    this.universe.focusOnBody(celestialId);

    // Open native dialog modal
    if (!this.modal.open) {
      this.modal.showModal();
    }
  }

  close() {
    if (this.modal && this.modal.open) {
      this.modal.close();
    }
  }
}
