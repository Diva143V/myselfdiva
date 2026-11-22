/**
 * src/config/galaxyConfig.js — Single Source of Truth for Authored Galaxy
 * 
 * Defines the complete authored galactic hierarchy:
 * - Clusters (Thematic domain systems)
 * - Central Sun (Author core)
 * - Planetary systems (Language & technology anchors)
 * - Moons & Stations (Shipped software & active research projects)
 * - Guided flight tour route & composed camera parameters
 */

export const GALAXY_CONFIG = {
  galaxy: {
    name: 'Diva Universe',
    author: 'Diwakar Venkat Peddada',
    location: 'Visakhapatnam, India',
    established: 2026,
    coordinateSystem: 'Keplerian Heliocentric 3D',
    benchmarkTargets: {
      targetFps: 60,
      drawCallsMax: 100,
      bundlePayloadMaxMb: 3.0
    }
  },

  clusters: [
    {
      id: 'realtime',
      name: 'Real-Time Tools',
      description: 'Zero-latency overlays, desktop integration, and live transcription.',
      accent: '#a855f7'
    },
    {
      id: 'research',
      name: 'Research Systems',
      description: 'Biomedical AI, evidence contradiction engines, and neoantigen discovery.',
      accent: '#00e599'
    },
    {
      id: 'infrastructure',
      name: 'Developer Infrastructure',
      description: 'Causal knowledge graphs, MCP protocols, and high-performance algorithms.',
      accent: '#f97316'
    }
  ],

  sun: {
    id: 'sun',
    name: 'Diwakar',
    title: 'Overview',
    subtitle: 'Visakhapatnam, India · Andhra University CS \'28',
    radius: 22,
    color: 0xfffaed,
    emissive: 0xf59e0b,
    coronaScale: 4.6,
    lightIntensity: 2.8,
    priority: 100,
    classification: 'Identity & Overview',
    orbit: 'System Center',
    problem: 'Software portfolios often show static screenshots and bullet lists without showing how systems actually work or run.',
    whatItDoes: 'Central vantage point and overview for projects, architecture, and live software experiments.',
    metric: 'Real-time 60fps WebGL 3D system, under 100 draw calls, sub-3MB bundle with adaptive GPU governance.',
    tags: ['Three.js', 'WebGL 2', 'GSAP', 'Lenis', 'Vite', 'Post-Processing'],
    sourceUrl: 'https://github.com/Diva143V/myselfdiva'
  },

  planets: [
    {
      id: 'python',
      name: 'Python',
      clusterId: 'research',
      orbitIndex: 1,
      radius: 9.5,
      orbitRadius: 95,
      orbitSpeed: 0.0035,
      initialAngle: 0.6,
      inclination: 0.04,
      rotationSpeed: 0.004,
      color: 0x00e599,
      priority: 80,
      classification: 'Primary Language · Biomedical AI',
      orbit: 'Orbit 1 · Python',
      problem: 'Biomedical knowledge graphs and clinical trial registries require robust deterministic pipelines and asynchronous literature collection.',
      whatItDoes: 'Core language for AI literature synthesis, local embedding models, graph traversal algorithms, and automated bioinformatics pipelines.',
      metric: 'Powers Griffin Bio (10 modular collectors) and SyGriffin neoantigen discovery tools.',
      tags: ['Python 3.11+', 'FastAPI', 'ChromaDB', 'Reflex', 'Pytest'],
      sourceUrl: 'https://github.com/Diva143V/Griffin',
      description: 'Biomedical RAG, local models, and multi-source data pipelines.'
    },
    {
      id: 'csharp',
      name: 'C# / .NET',
      clusterId: 'realtime',
      orbitIndex: 2,
      radius: 10.5,
      orbitRadius: 175,
      orbitSpeed: 0.0022,
      initialAngle: 2.4,
      inclination: -0.06,
      rotationSpeed: 0.003,
      color: 0xa855f7,
      priority: 80,
      classification: 'Primary Language · Desktop Systems',
      orbit: 'Orbit 2 · C# / .NET',
      problem: 'Windows system audio and Live Captions hooks require low-overhead native interop and high-frequency UI updates without dropping frames.',
      whatItDoes: 'Architecture anchor for native Windows accessibility software, WPF overlays, hardware acceleration, and multi-threaded desktop software.',
      metric: 'Powers LiveSubs single self-contained .exe with real-time API translation hooks.',
      tags: ['C#', '.NET 8', 'WPF', 'Windows API', 'SQLite'],
      sourceUrl: 'https://github.com/Diva143V/LiveSubs',
      description: 'Windows accessibility overlays, Live Captions hooks, and WPF software.'
    },
    {
      id: 'rust',
      name: 'Rust',
      clusterId: 'infrastructure',
      orbitIndex: 3,
      radius: 9.0,
      orbitRadius: 260,
      orbitSpeed: 0.0016,
      initialAngle: 4.2,
      inclination: 0.08,
      rotationSpeed: 0.005,
      color: 0xf97316,
      priority: 80,
      classification: 'Primary Language · Systems & MCP',
      orbit: 'Orbit 3 · Rust',
      problem: 'LLM agents suffer from catastrophic memory loss across sessions, losing architectural context and human edits.',
      whatItDoes: 'Foundation for high-performance systems programming, MCP protocol servers, graph database indexing, and Tauri cross-platform software.',
      metric: 'Powers Knox MCP server with 8 focused tools and strict token budgets.',
      tags: ['Rust 1.85+', 'PetGraph', 'SQLite FTS5', 'Tauri v2', 'Tokio'],
      sourceUrl: 'https://github.com/Diva143V/Knox',
      description: 'MCP server stdio engine, causal graph algorithms, and Tauri desktop integration.'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      clusterId: 'infrastructure',
      orbitIndex: 4,
      radius: 8.0,
      orbitRadius: 345,
      orbitSpeed: 0.0011,
      initialAngle: 5.5,
      inclination: -0.05,
      rotationSpeed: 0.004,
      hasRings: true,
      color: 0x00f0ff,
      priority: 80,
      classification: 'Primary Language · Interfaces & WebGL',
      orbit: 'Orbit 4 · TypeScript',
      problem: 'Interactive 3D environments demand strict type-safety across custom shader uniforms, physics loops, and complex DOM overlays.',
      whatItDoes: 'Powers modern frontend architecture, Three.js 3D graphics, reactive user interfaces, and client-side tooling.',
      metric: 'Architectural foundation for myselfdiva 3D universe and interactive web applications.',
      tags: ['TypeScript', 'Three.js', 'Vite', 'React 19', 'GSAP'],
      sourceUrl: 'https://github.com/Diva143V/myselfdiva',
      description: 'Three.js, WebGL shaders, interface architecture, and modern web apps.'
    },
    {
      id: 'cpp',
      name: 'C++',
      clusterId: 'infrastructure',
      orbitIndex: 5,
      radius: 8.5,
      orbitRadius: 435,
      orbitSpeed: 0.0009,
      initialAngle: 1.5,
      inclination: 0.07,
      rotationSpeed: 0.003,
      color: 0xef4444,
      priority: 80,
      classification: 'Primary Language · Algorithms & Performance',
      orbit: 'Orbit 5 · C++',
      problem: 'Time-critical algorithmic competitions require microsecond-level cache locality and manual memory optimization.',
      whatItDoes: 'High-performance competitive programming, custom search data structures, branch-prediction tuning, and memory layout optimization.',
      metric: '1st place solver in HackMe 2024 optimization challenge.',
      tags: ['C++20', 'Data Structures', 'Competitive Programming', 'Algorithms'],
      sourceUrl: 'https://github.com/Diva143V',
      description: 'Algorithmic complexity reduction and high-performance search data structures.'
    }
  ],

  moons: [
    // Major Shipped & Active Case Studies
    {
      id: 'livesubs',
      name: 'LiveSubs',
      caseId: 'livesubs',
      parentPlanetId: 'csharp',
      isMajor: true,
      caseNumber: '01',
      status: 'Shipped',
      radius: 2.2,
      orbitRadius: 24,
      orbitSpeed: 0.011,
      initialAngle: 1.2,
      inclination: 0.15,
      priority: 95
    },
    {
      id: 'griffin',
      name: 'Griffin Bio',
      caseId: 'griffin',
      parentPlanetId: 'python',
      isMajor: true,
      caseNumber: '02',
      status: 'Active',
      radius: 2.1,
      orbitRadius: 22,
      orbitSpeed: 0.012,
      initialAngle: 0.8,
      inclination: 0.12,
      priority: 95
    },
    {
      id: 'knox',
      name: 'Knox',
      caseId: 'knox',
      parentPlanetId: 'rust',
      isMajor: true,
      caseNumber: '03',
      status: 'Shipped',
      radius: 2.0,
      orbitRadius: 20,
      orbitSpeed: 0.014,
      initialAngle: 2.9,
      inclination: -0.16,
      priority: 95
    },
    {
      id: 'sygriffin',
      name: 'SyGriffin',
      caseId: 'sygriffin',
      parentPlanetId: 'python',
      isMajor: true,
      caseNumber: '04',
      status: 'Scientific MVP',
      radius: 1.8,
      orbitRadius: 36,
      orbitSpeed: 0.008,
      initialAngle: 3.4,
      inclination: -0.18,
      priority: 95
    },

    // Supporting Project Moons
    {
      id: 'polaris',
      name: 'Polaris',
      parentPlanetId: 'python',
      isMajor: false,
      radius: 1.2,
      orbitRadius: 48,
      orbitSpeed: 0.006,
      initialAngle: 5.1,
      inclination: 0.1,
      priority: 45
    },
    {
      id: 'sita',
      name: 'Sita',
      parentPlanetId: 'python',
      isMajor: false,
      radius: 1.1,
      orbitRadius: 60,
      orbitSpeed: 0.005,
      initialAngle: 1.9,
      inclination: -0.14,
      priority: 40
    },
    {
      id: 'myselfdiva',
      name: 'myselfdiva',
      parentPlanetId: 'typescript',
      isMajor: false,
      radius: 1.4,
      orbitRadius: 24,
      orbitSpeed: 0.014,
      initialAngle: 2.1,
      inclination: 0.1,
      priority: 45
    },
    {
      id: 'hackme',
      name: 'HackMe 2024',
      parentPlanetId: 'cpp',
      isMajor: false,
      radius: 1.3,
      orbitRadius: 22,
      orbitSpeed: 0.016,
      initialAngle: 0.4,
      inclination: -0.12,
      priority: 45
    }
  ],

  caseStudies: [
    {
      id: 'livesubs',
      caseNumber: '01',
      title: 'LiveSubs',
      orbitLabel: 'Orbit 2 · C# / .NET',
      statusLabel: 'Shipped',
      targetBodyId: 'livesubs',
      parentPlanetId: 'csharp',
      problem: 'Speech in live streams, lectures, and calls moves faster than users can follow or translate using clumsy floating web translation windows.',
      description: 'Captures Windows Live Captions in real time, translates recognized speech through 9+ API backends (Google, DeepL, OpenAI, Ollama, LM Studio), and renders a responsive, always-on-top customizable subtitle bar over any active window or call.',
      metric: '9+ translation backends supported; self-contained single .exe (Windows x64) with zero runtime install; settings persisted in %AppData%\\LiveSubs\\setting.json; optional SQLite translation history database.',
      tags: ['C#', '.NET 8', 'WPF', 'Windows Live Captions', 'SQLite'],
      sourceUrl: 'https://github.com/Diva143V/LiveSubs',
      releaseUrl: 'https://github.com/Diva143V/LiveSubs/releases',
      progressMin: 0.14,
      progressMax: 0.33,
      cameraFraming: {
        elevationDeg: 28,
        distance: 36,
        targetOffsetX: -14,
        targetOffsetY: 3
      }
    },
    {
      id: 'griffin',
      caseNumber: '02',
      title: 'Griffin Bio',
      orbitLabel: 'Orbit 1 · Python',
      statusLabel: 'Active',
      targetBodyId: 'griffin',
      parentPlanetId: 'python',
      problem: 'Biomedical research papers are scattered across fragmented databases with conflicting clinical claims that take weeks to manually cross-check.',
      description: 'Scientific evidence synthesis and contradiction workbench. Collects literature from 10 modular source collectors, merges and deduplicates entries, generates sentence embeddings, and executes an automated Mixture-of-LLMs pipeline for claim extraction, Oxford evidence ranking, and consensus reports surfaced in Reflex.',
      metric: '10 modular source collectors (PubMed, Europe PMC, Semantic Scholar, OpenAlex, ClinicalTrials, bioRxiv, ChEMBL, UniProt, PubChem, dbSNP); Oxford Levels of Evidence ranking; 7 specialized reasoning agents with automated priority fallback.',
      tags: ['Python', 'ChromaDB', 'Ollama', 'Graph RAG', 'Reflex', 'Mixture of LLMs'],
      sourceUrl: 'https://github.com/Diva143V/Griffin',
      progressMin: 0.35,
      progressMax: 0.54,
      cameraFraming: {
        elevationDeg: 30,
        distance: 38,
        targetOffsetX: -15,
        targetOffsetY: 3
      }
    },
    {
      id: 'knox',
      caseNumber: '03',
      title: 'Knox',
      orbitLabel: 'Orbit 3 · Rust',
      statusLabel: 'Shipped',
      targetBodyId: 'knox',
      parentPlanetId: 'rust',
      problem: 'AI coding agents suffer from catastrophic amnesia, losing architectural rationale, design decisions, and constraints across sessions.',
      description: 'Persistent, cross-platform causal knowledge graph and Model Context Protocol (MCP) server in Rust. Captures architectural decisions, pre-flight constraints, and Git human edits, giving AI agents long-term causal memory across sessions.',
      metric: '8 focused MCP tools (knox_begin, knox_context, knox_check, knox_trace, knox_record, knox_handoff, knox_ask, knox_update); tool definition footprint budgeted <= 850 tokens; 50-pair calibrated guardrail with 0.60 overlap threshold; 5.46 MB LZMA setup wizard.',
      tags: ['Rust 1.85+', 'SQLite WAL & FTS5', 'PetGraph', 'Tauri v2', 'React 19', 'D3 Physics'],
      sourceUrl: 'https://github.com/Diva143V/Knox',
      progressMin: 0.56,
      progressMax: 0.75,
      cameraFraming: {
        elevationDeg: 28,
        distance: 35,
        targetOffsetX: -14,
        targetOffsetY: 3
      }
    },
    {
      id: 'sygriffin',
      caseNumber: '04',
      title: 'SyGriffin',
      orbitLabel: 'Orbit 1 · Python',
      statusLabel: 'Scientific MVP',
      targetBodyId: 'sygriffin',
      parentPlanetId: 'python',
      problem: 'Identifying clinically viable neoantigen candidates from raw tumor sequencing requires complex, opaque computational biology pipelines.',
      description: 'CLI-first AI bioinformatics platform and life-sciences research companion that parses tumor VCF files, predicts vaccine-relevant peptide targets, ranks candidates with transparent scoring, and preserves reproducible audit records for cancer vaccine research.',
      metric: 'Predicts peptide candidates matched to specific HLA alleles (e.g. HLA-A*02:01, melanoma, GRCh37); automated RNA-seq run validation checking matrix structure, sample-ID alignment, and batch-confounding.',
      tags: ['Python 3.11', 'Bun 1.3+', 'VEP', 'MHCflurry', 'uv', 'pytest', 'mypy'],
      sourceUrl: 'https://github.com/Diva143V/SyGriffin',
      progressMin: 0.77,
      progressMax: 0.98,
      cameraFraming: {
        elevationDeg: 34,
        distance: 44,
        targetOffsetX: -14,
        targetOffsetY: 2
      }
    }
  ],

  // Fallback / Overview flight spline waypoints
  splineWaypoints: [
    { x: 0, y: 220, z: 460 },     // Step 0: Hero elevated vantage point clear of text band
    { x: 45, y: 65, z: 175 },     // Step 1: Descending towards Orbit 1 (Python / Griffin)
    { x: 120, y: 45, z: 120 },    // Step 2: Gliding along Orbit 2 (C# / LiveSubs)
    { x: 160, y: 50, z: -80 },    // Step 3: Banking past Orbit 3 (Rust / Knox)
    { x: -120, y: 75, z: -220 },  // Step 4: Outer approach across TypeScript & C++
    { x: 0, y: 240, z: 560 }      // Step 5: Calm sections wide-angle overview
  ]
};

export function validateGalaxyConfig(cfg = GALAXY_CONFIG) {
  if (!cfg.sun || !cfg.sun.radius) throw new Error('GalaxyConfig: Sun configuration is missing.');
  if (!Array.isArray(cfg.planets) || cfg.planets.length === 0) throw new Error('GalaxyConfig: Planets array missing.');
  if (!Array.isArray(cfg.moons) || cfg.moons.length === 0) throw new Error('GalaxyConfig: Moons array missing.');
  if (!Array.isArray(cfg.caseStudies) || cfg.caseStudies.length === 0) throw new Error('GalaxyConfig: Case studies missing.');

  const planetIds = new Set(cfg.planets.map(p => p.id));
  for (const m of cfg.moons) {
    if (!planetIds.has(m.parentPlanetId)) {
      throw new Error(`GalaxyConfig: Moon "${m.id}" references non-existent parent planet "${m.parentPlanetId}".`);
    }
  }

  return true;
}
