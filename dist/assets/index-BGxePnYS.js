import{n as $,o as F,h as O,q as H,r as le,s as re,t as Te,G as j,C as I,u as De,v as q,w as U,M as z,x as ce,y as de,z as k,H as v,f as Ee,I as Le,g as fe,J as ge,K as ye,Q as ke,X as J,Y as Ae,Z as ze,e as Ie,_ as Re,P as Ne,$ as Be,a0 as We,S as Fe,a1 as Oe,a2 as Ge,V as he,a3 as Ve,a4 as _e,a5 as Ue}from"./three-C9Ks7P2h.js";import{g as D,S as ne}from"./gsap-Jiz4vAvE.js";import{E as He,R as je,B as qe,V as Ke,S as Ye,a as Xe}from"./postprocessing-Cyowcl8P.js";import{L as $e}from"./lenis-9qxpAu3p.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function o(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(i){if(i.ep)return;i.ep=!0;const a=o(i);fetch(i.href,a)}})();const A={galaxy:{name:"Diva Universe",author:"Diwakar Venkat Peddada",location:"Visakhapatnam, India",established:2026,coordinateSystem:"Keplerian Heliocentric 3D",benchmarkTargets:{targetFps:60,drawCallsMax:100,bundlePayloadMaxMb:3}},clusters:[{id:"realtime",name:"Real-Time Tools",description:"Zero-latency overlays, desktop integration, and live transcription.",accent:"#a855f7"},{id:"research",name:"Research Systems",description:"Biomedical AI, evidence contradiction engines, and neoantigen discovery.",accent:"#00e599"},{id:"infrastructure",name:"Developer Infrastructure",description:"Causal knowledge graphs, MCP protocols, and high-performance algorithms.",accent:"#f97316"}],sun:{id:"sun",name:"Diwakar",title:"Overview",subtitle:"Visakhapatnam, India · Andhra University CS '28",radius:22,color:16775917,emissive:16096779,coronaScale:4.6,lightIntensity:2.8,priority:100,classification:"Identity & Overview",orbit:"System Center",problem:"Software portfolios often show static screenshots and bullet lists without showing how systems actually work or run.",whatItDoes:"Central vantage point and overview for projects, architecture, and live software experiments.",metric:"Real-time 60fps WebGL 3D system, under 100 draw calls, sub-3MB bundle with adaptive GPU governance.",tags:["Three.js","WebGL 2","GSAP","Lenis","Vite","Post-Processing"],sourceUrl:"https://github.com/Diva143V/myselfdiva"},planets:[{id:"python",name:"Python",clusterId:"research",orbitIndex:1,radius:9.5,orbitRadius:95,orbitSpeed:.224,initialAngle:.6,inclination:.04,rotationSpeed:.015,color:58777,priority:80,classification:"Primary Language · Biomedical AI",orbit:"Orbit 1 · Python",problem:"Biomedical knowledge graphs and clinical trial registries require robust deterministic pipelines and asynchronous literature collection.",whatItDoes:"Core language for AI literature synthesis, local embedding models, graph traversal algorithms, and automated bioinformatics pipelines.",metric:"Powers Griffin Bio (10 modular collectors) and SyGriffin neoantigen discovery tools.",tags:["Python 3.11+","FastAPI","ChromaDB","Reflex","Pytest"],sourceUrl:"https://github.com/Diva143V/Griffin",description:"Biomedical RAG, local models, and multi-source data pipelines."},{id:"csharp",name:"C# / .NET",clusterId:"realtime",orbitIndex:2,radius:10.5,orbitRadius:175,orbitSpeed:.165,initialAngle:2.4,inclination:-.06,rotationSpeed:.012,color:11032055,priority:80,classification:"Primary Language · Desktop Systems",orbit:"Orbit 2 · C# / .NET",problem:"Windows system audio and Live Captions hooks require low-overhead native interop and high-frequency UI updates without dropping frames.",whatItDoes:"Architecture anchor for native Windows accessibility software, WPF overlays, hardware acceleration, and multi-threaded desktop software.",metric:"Powers LiveSubs single self-contained .exe with real-time API translation hooks.",tags:["C#",".NET 8","WPF","Windows API","SQLite"],sourceUrl:"https://github.com/Diva143V/LiveSubs",description:"Windows accessibility overlays, Live Captions hooks, and WPF software."},{id:"rust",name:"Rust",clusterId:"infrastructure",orbitIndex:3,radius:9,orbitRadius:260,orbitSpeed:.125,initialAngle:4.2,inclination:.08,rotationSpeed:.014,color:16347926,priority:80,classification:"Primary Language · Systems & MCP",orbit:"Orbit 3 · Rust",problem:"LLM agents suffer from catastrophic memory loss across sessions, losing architectural context and human edits.",whatItDoes:"Foundation for high-performance systems programming, MCP protocol servers, graph database indexing, and Tauri cross-platform software.",metric:"Powers Knox MCP server with 8 focused tools and strict token budgets.",tags:["Rust 1.85+","PetGraph","SQLite FTS5","Tauri v2","Tokio"],sourceUrl:"https://github.com/Diva143V/Knox",description:"MCP server stdio engine, causal graph algorithms, and Tauri desktop integration."},{id:"typescript",name:"TypeScript",clusterId:"infrastructure",orbitIndex:4,radius:8,orbitRadius:345,orbitSpeed:.098,initialAngle:5.5,inclination:-.05,rotationSpeed:.012,hasRings:!0,color:61695,priority:80,classification:"Primary Language · Interfaces & WebGL",orbit:"Orbit 4 · TypeScript",problem:"Interactive 3D environments demand strict type-safety across custom shader uniforms, physics loops, and complex DOM overlays.",whatItDoes:"Powers modern frontend architecture, Three.js 3D graphics, reactive user interfaces, and client-side tooling.",metric:"Architectural foundation for myselfdiva 3D universe and interactive web applications.",tags:["TypeScript","Three.js","Vite","React 19","GSAP"],sourceUrl:"https://github.com/Diva143V/myselfdiva",description:"Three.js, WebGL shaders, interface architecture, and modern web apps."},{id:"cpp",name:"C++",clusterId:"infrastructure",orbitIndex:5,radius:8.5,orbitRadius:435,orbitSpeed:.08,initialAngle:1.5,inclination:.07,rotationSpeed:.01,color:15680580,priority:80,classification:"Primary Language · Algorithms & Performance",orbit:"Orbit 5 · C++",problem:"Time-critical algorithmic competitions require microsecond-level cache locality and manual memory optimization.",whatItDoes:"High-performance competitive programming, custom search data structures, branch-prediction tuning, and memory layout optimization.",metric:"1st place solver in HackMe 2024 optimization challenge.",tags:["C++20","Data Structures","Competitive Programming","Algorithms"],sourceUrl:"https://github.com/Diva143V",description:"Algorithmic complexity reduction and high-performance search data structures."}],moons:[{id:"livesubs",name:"LiveSubs",caseId:"livesubs",parentPlanetId:"csharp",isMajor:!0,caseNumber:"01",status:"Shipped",terrainType:"anorthosite",radius:3.5,orbitRadius:26,orbitSpeed:.628,initialAngle:1.2,inclination:.15,priority:95},{id:"griffin",name:"Griffin Bio",caseId:"griffin",parentPlanetId:"python",isMajor:!0,caseNumber:"02",status:"Active",terrainType:"europa_ice",radius:3.5,orbitRadius:24,orbitSpeed:.698,initialAngle:.8,inclination:.12,priority:95},{id:"knox",name:"Knox",caseId:"knox",parentPlanetId:"rust",isMajor:!0,caseNumber:"03",status:"Shipped",terrainType:"volcanic_iron",radius:3.4,orbitRadius:22,orbitSpeed:.571,initialAngle:2.9,inclination:-.16,priority:95},{id:"sygriffin",name:"SyGriffin",caseId:"sygriffin",parentPlanetId:"python",isMajor:!0,caseNumber:"04",status:"Scientific MVP",terrainType:"regolith_crater",radius:3.2,orbitRadius:36,orbitSpeed:.449,initialAngle:3.4,inclination:-.18,priority:95},{id:"polaris",name:"Polaris",parentPlanetId:"python",isMajor:!1,terrainType:"volcanic_iron",radius:2.3,orbitRadius:46,orbitSpeed:.393,initialAngle:5.1,inclination:.1,priority:45},{id:"sita",name:"Sita",parentPlanetId:"python",isMajor:!1,terrainType:"anorthosite",radius:2.2,orbitRadius:56,orbitSpeed:.349,initialAngle:1.9,inclination:-.14,priority:40},{id:"myselfdiva",name:"myselfdiva",parentPlanetId:"typescript",isMajor:!1,terrainType:"europa_ice",radius:2.4,orbitRadius:26,orbitSpeed:.524,initialAngle:2.1,inclination:.1,priority:45},{id:"hackme",name:"HackMe 2024",parentPlanetId:"cpp",isMajor:!1,terrainType:"volcanic_iron",radius:2.3,orbitRadius:24,orbitSpeed:.628,initialAngle:.4,inclination:-.12,priority:45}],caseStudies:[{id:"livesubs",caseNumber:"01",title:"LiveSubs",orbitLabel:"Orbit 2 · C# / .NET",statusLabel:"Shipped",targetBodyId:"livesubs",parentPlanetId:"csharp",problem:"Speech in live streams, lectures, and calls moves faster than users can follow or translate using clumsy floating web translation windows.",description:"Captures Windows Live Captions in real time, translates recognized speech through 9+ API backends (Google, DeepL, OpenAI, Ollama, LM Studio), and renders a responsive, always-on-top customizable subtitle bar over any active window or call.",metric:"9+ translation backends supported; self-contained single .exe (Windows x64) with zero runtime install; settings persisted in %AppData%\\LiveSubs\\setting.json; optional SQLite translation history database.",tags:["C#",".NET 8","WPF","Windows Live Captions","SQLite"],sourceUrl:"https://github.com/Diva143V/LiveSubs",releaseUrl:"https://github.com/Diva143V/LiveSubs/releases",progressMin:.12,progressMax:.32,cameraFraming:{elevationDeg:28,distance:36,targetOffsetX:-14,targetOffsetY:3}},{id:"griffin",caseNumber:"02",title:"Griffin Bio",orbitLabel:"Orbit 1 · Python",statusLabel:"Active",targetBodyId:"griffin",parentPlanetId:"python",problem:"Biomedical research papers are scattered across fragmented databases with conflicting clinical claims that take weeks to manually cross-check.",description:"Scientific evidence synthesis and contradiction workbench. Collects literature from 10 modular source collectors, merges and deduplicates entries, generates sentence embeddings, and executes an automated Mixture-of-LLMs pipeline for claim extraction, Oxford evidence ranking, and consensus reports surfaced in Reflex.",metric:"10 modular source collectors (PubMed, Europe PMC, Semantic Scholar, OpenAlex, ClinicalTrials, bioRxiv, ChEMBL, UniProt, PubChem, dbSNP); Oxford Levels of Evidence ranking; 7 specialized reasoning agents with automated priority fallback.",tags:["Python","ChromaDB","Ollama","Graph RAG","Reflex","Mixture of LLMs"],sourceUrl:"https://github.com/Diva143V/Griffin",progressMin:.35,progressMax:.55,cameraFraming:{elevationDeg:30,distance:38,targetOffsetX:-15,targetOffsetY:3}},{id:"knox",caseNumber:"03",title:"Knox",orbitLabel:"Orbit 3 · Rust",statusLabel:"Shipped",targetBodyId:"knox",parentPlanetId:"rust",problem:"AI coding agents suffer from catastrophic amnesia, losing architectural rationale, design decisions, and constraints across sessions.",description:"Persistent, cross-platform causal knowledge graph and Model Context Protocol (MCP) server in Rust. Captures architectural decisions, pre-flight constraints, and Git human edits, giving AI agents long-term causal memory across sessions.",metric:"8 focused MCP tools (knox_begin, knox_context, knox_check, knox_trace, knox_record, knox_handoff, knox_ask, knox_update); tool definition footprint budgeted <= 850 tokens; 50-pair calibrated guardrail with 0.60 overlap threshold; 5.46 MB LZMA setup wizard.",tags:["Rust 1.85+","SQLite WAL & FTS5","PetGraph","Tauri v2","React 19","D3 Physics"],sourceUrl:"https://github.com/Diva143V/Knox",progressMin:.58,progressMax:.77,cameraFraming:{elevationDeg:28,distance:35,targetOffsetX:-14,targetOffsetY:3}},{id:"sygriffin",caseNumber:"04",title:"SyGriffin",orbitLabel:"Orbit 1 · Python",statusLabel:"Scientific MVP",targetBodyId:"sygriffin",parentPlanetId:"python",problem:"Identifying clinically viable neoantigen candidates from raw tumor sequencing requires complex, opaque computational biology pipelines.",description:"CLI-first AI bioinformatics platform and life-sciences research companion that parses tumor VCF files, predicts vaccine-relevant peptide targets, ranks candidates with transparent scoring, and preserves reproducible audit records for cancer vaccine research.",metric:"Predicts peptide candidates matched to specific HLA alleles (e.g. HLA-A*02:01, melanoma, GRCh37); automated RNA-seq run validation checking matrix structure, sample-ID alignment, and batch-confounding.",tags:["Python 3.11","Bun 1.3+","VEP","MHCflurry","uv","pytest","mypy"],sourceUrl:"https://github.com/Diva143V/SyGriffin",progressMin:.8,progressMax:.99,cameraFraming:{elevationDeg:34,distance:44,targetOffsetX:-14,targetOffsetY:2}}],splineWaypoints:[{x:0,y:220,z:460},{x:45,y:65,z:175},{x:120,y:45,z:120},{x:160,y:50,z:-80},{x:-120,y:75,z:-220},{x:0,y:240,z:560}]};function Qe(n=3400){const e=new $,o=new Float32Array(n*3),t=new Float32Array(n*3),i=new Float32Array(n),a=new Float32Array(n*2),r=480,s=1400;for(let h=0;h<n;h++){const M=Math.random(),x=Math.random(),C=M*2*Math.PI,T=Math.acos(2*x-1),E=r+Math.random()*(s-r),G=E*Math.sin(T)*Math.cos(C),N=E*Math.sin(T)*Math.sin(C)*.45,B=E*Math.cos(T);if(o[h*3]=G,o[h*3+1]=N,o[h*3+2]=B,h<n*.65)t[h*3]=.85,t[h*3+1]=.9,t[h*3+2]=1,i[h]=1,a[h*2]=.8+Math.random()*1.5,a[h*2+1]=Math.random()*Math.PI*2;else if(h<n*.92){const V=Math.random()>.45;t[h*3]=V?.98:.92,t[h*3+1]=V?.72:.94,t[h*3+2]=V?.22:.98,i[h]=1.6,a[h*2]=1.5+Math.random()*2.5,a[h*2+1]=Math.random()*Math.PI*2}else t[h*3]=1,t[h*3+1]=.98,t[h*3+2]=.92,i[h]=2.4,a[h*2]=2+Math.random()*3,a[h*2+1]=Math.random()*Math.PI*2}e.setAttribute("position",new F(o,3)),e.setAttribute("color",new F(t,3)),e.setAttribute("size",new F(i,1)),e.setAttribute("twinkle",new F(a,2));const l=new O({uniforms:{uTime:{value:0}},vertexShader:`
      attribute vec3 color;
      attribute float size;
      attribute vec2 twinkle;

      uniform float uTime;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;

        // Twinkle modulation
        float tw = sin(uTime * twinkle.x + twinkle.y) * 0.35 + 0.65;
        vAlpha = tw;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (400.0 / -mvPosition.z) * tw;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        // Soft circular gaussian falloff for organic star appearance
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        float intensity = exp(-dist * dist * 10.0);
        gl_FragColor = vec4(vColor * intensity, vAlpha * intensity);
      }
    `,transparent:!0,depthWrite:!1,blending:H}),m=new le(e,l);m.matrixAutoUpdate=!1,m.updateMatrix();const c=450,u=new $,f=new Float32Array(c*3),g=new Float32Array(c*3);for(let h=0;h<c;h++){const M=h/c*Math.PI*2,x=550+Math.random()*300,C=(Math.random()-.5)*140;f[h*3]=Math.cos(M)*x+C,f[h*3+1]=(Math.random()-.5)*90,f[h*3+2]=Math.sin(M)*x+C,Math.random()>.6?(g[h*3]=.96*.25,g[h*3+1]=.62*.25,g[h*3+2]=.04*.25):(g[h*3]=.15*.3,g[h*3+1]=.25*.3,g[h*3+2]=.55*.3)}u.setAttribute("position",new F(f,3)),u.setAttribute("color",new F(g,3));const P=document.createElement("canvas");P.width=64,P.height=64;const w=P.getContext("2d"),y=w.createRadialGradient(32,32,0,32,32,32);y.addColorStop(0,"rgba(255, 255, 255, 0.85)"),y.addColorStop(.35,"rgba(255, 255, 255, 0.35)"),y.addColorStop(.7,"rgba(255, 255, 255, 0.08)"),y.addColorStop(1,"rgba(255, 255, 255, 0)"),w.fillStyle=y,w.fillRect(0,0,64,64);const S=new re(P),d=new Te({size:28,map:S,vertexColors:!0,transparent:!0,opacity:.09,depthWrite:!1,blending:H}),p=new le(u,d);p.matrixAutoUpdate=!1,p.updateMatrix();const b=new j;return b.add(m),b.add(p),{group:b,update(h){l.uniforms.uTime.value=h}}}const ee={uniforms:{uTime:{value:0},uColorCore:{value:new I(1,.98,.88)},uColorMid:{value:new I(1,.72,.22)},uColorLimb:{value:new I(.96,.44,.08)},uGranulationScale:{value:18},uTurbulenceSpeed:{value:.16}},vertexShader:`
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = normalize(position);
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,fragmentShader:`
    precision highp float;

    uniform float uTime;
    uniform vec3 uColorCore;
    uniform vec3 uColorMid;
    uniform vec3 uColorLimb;
    uniform float uGranulationScale;
    uniform float uTurbulenceSpeed;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vViewPosition;

    // Fast 3D Simplex Noise & Hash with strict Gustavson precision
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    vec3 hash33(vec3 p) {
      p = fract(p * vec3(0.1031, 0.1030, 0.0973));
      p += dot(p, p.yxz + 33.33);
      return fract((p.xxy + p.yxx) * p.zyx);
    }

    // 3D Voronoi returning vec2(d1, d2)
    vec2 voronoi3D(vec3 p) {
      vec3 b = floor(p);
      vec3 f = fract(p);
      float d1 = 8.0;
      float d2 = 8.0;
      for (int z = -1; z <= 1; z++) {
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec3 lattice = vec3(float(x), float(y), float(z));
            vec3 offset = hash33(b + lattice);
            vec3 diff = lattice + offset - f;
            float d = length(diff);
            if (d < d1) {
              d2 = d1;
              d1 = d;
            } else if (d < d2) {
              d2 = d;
            }
          }
        }
      }
      return vec2(d1, d2);
    }

    float fbm(vec3 p) {
      float total = 0.0;
      float amp = 0.55;
      float freq = 1.0;
      for (int i = 0; i < 4; i++) {
        total += snoise(p * freq) * amp;
        freq *= 2.06;
        amp *= 0.48;
      }
      return total;
    }

    // Magnetic Active Plage & Flare Generator (Warm bright incandescent regions - Zero black spots)
    float evaluateActivePlages(vec3 p, float t) {
      vec3 unitP = normalize(p);
      float rotSpeed = 0.035 * (1.0 - 0.22 * unitP.y * unitP.y);
      float angle = t * rotSpeed;
      float ca = cos(angle);
      float sa = sin(angle);
      vec3 rotP = vec3(unitP.x * ca - unitP.z * sa, unitP.y, unitP.x * sa + unitP.z * ca);

      // Active solar latitudes
      float latBand = smoothstep(0.06, 0.18, abs(rotP.y)) * (1.0 - smoothstep(0.38, 0.52, abs(rotP.y)));

      // Magnetic plage clusters on solar disc
      vec3 spotCenter1 = normalize(vec3(0.52, 0.24, 0.82));
      vec3 spotCenter2 = normalize(vec3(0.64, 0.20, 0.74));
      vec3 spotCenter3 = normalize(vec3(-0.45, -0.22, 0.86));
      vec3 spotCenter4 = normalize(vec3(-0.32, -0.18, 0.93));

      float d1 = length(rotP - spotCenter1);
      float d2 = length(rotP - spotCenter2);
      float d3 = length(rotP - spotCenter3);
      float d4 = length(rotP - spotCenter4);

      float minD = min(min(d1, d2 * 1.15), min(d3, d4 * 1.25));

      // Faculae / Plages: bright magnetic beaches and thermal flares
      float faculaeNoise = fbm(rotP * 12.0);
      float faculae = (1.0 - smoothstep(0.04, 0.32, minD)) * smoothstep(0.12, 0.60, faculaeNoise) * latBand;

      return faculae;
    }

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      // 1. Classical Astrophysical 5th-Order Limb Darkening (Calibrated for warm glowing limb)
      float mu = max(dot(normal, viewDir), 0.0);
      float limbDarkening = 0.48 + 0.52 * pow(mu, 0.65);

      // 2. Convective Bénard Granulation Cells
      float t = uTime * uTurbulenceSpeed;
      vec3 p = vPosition * uGranulationScale;

      // Dual-phase boiling plasma motion
      vec3 flow1 = p + vec3(t * 0.30, t * 0.16, t * 0.10);
      vec3 flow2 = p * 1.6 - vec3(t * 0.20, -t * 0.25, t * 0.12);

      vec2 v1 = voronoi3D(flow1);
      float boilingNoise = fbm(flow2);

      // Distance to cell boundary (intergranular downdraft lanes)
      float edgeDist = v1.y - v1.x;
      float lane = 1.0 - smoothstep(0.015, 0.16, edgeDist);
      
      // Center upwelling (convex thermal expansion)
      float cellCenter = 1.0 - smoothstep(0.0, 0.45, v1.x);

      // True polygonal granulation texture
      float granule = clamp(cellCenter * 0.65 + (1.0 - lane) * 0.50 + boilingNoise * 0.20, 0.0, 1.0);

      // 3. Active Magnetic Plages (Zero black spots, purely radiant energy)
      float faculae = evaluateActivePlages(vPosition, uTime);

      // 4. Color Thermal Gradient Synthesis
      // Fusion core incandescent white-gold -> radiant amber -> warm golden limb
      vec3 plasmaColor = mix(uColorMid, uColorCore, pow(granule, 1.3));
      plasmaColor = mix(uColorLimb, plasmaColor, limbDarkening);

      // Intergranular warm lanes (subtle contrast without blackening)
      plasmaColor = mix(plasmaColor, uColorLimb * 0.95, lane * 0.35);

      // Apply faculae (bright radiant incandescent magnetic beaches)
      vec3 faculaeColor = vec3(1.25, 1.18, 0.95);
      plasmaColor = mix(plasmaColor, faculaeColor, faculae * 0.45);

      // 5. Chromospheric Limb Flare Prominences
      float limbGrazing = 1.0 - mu;
      float prominenceNoise = snoise(vPosition * 16.0 + vec3(0.0, t * 0.6, 0.0));
      float prominences = smoothstep(0.80, 0.98, limbGrazing) * smoothstep(0.18, 0.70, prominenceNoise);

      // 6. Filmic Luminance Compression (Incandescent radiant glow without clipping blowout)
      float emission = 1.08 + pow(granule, 1.5) * 0.32 + faculae * 0.35 + prominences * 0.45;
      vec3 finalColor = plasmaColor * emission;

      vec3 compressed = finalColor / (finalColor + vec3(0.38));
      compressed = pow(compressed, vec3(0.94)) * 1.35;

      gl_FragColor = vec4(compressed, 1.0);
    }
  `};function Ze(n=36){const e=new j,o=new De(16774630,3.2,0,0);o.position.set(0,0,0),e.add(o);const t=new q(n,64,64),i=new O({uniforms:U.clone(ee.uniforms),vertexShader:ee.vertexShader,fragmentShader:ee.fragmentShader}),a=new z(t,i);e.add(a);const r=document.createElement("canvas");r.width=512,r.height=512;const s=r.getContext("2d"),l=s.createRadialGradient(256,256,0,256,256,256);l.addColorStop(0,"rgba(255, 245, 210, 0.16)"),l.addColorStop(.32,"rgba(255, 220, 120, 0.28)"),l.addColorStop(.385,"rgba(255, 185, 45, 0.68)"),l.addColorStop(.55,"rgba(245, 135, 18, 0.32)"),l.addColorStop(.78,"rgba(195, 70, 5, 0.08)"),l.addColorStop(1,"rgba(0, 0, 0, 0)"),s.fillStyle=l,s.fillRect(0,0,512,512),s.save(),s.translate(256,256);for(let d=0;d<32;d++){const p=d/32*Math.PI*2,b=135+Math.sin(d*3.7)*75,h=s.createLinearGradient(0,0,Math.cos(p)*b,Math.sin(p)*b);h.addColorStop(0,"rgba(255, 210, 100, 0.14)"),h.addColorStop(.4,"rgba(255, 160, 30, 0.10)"),h.addColorStop(1,"rgba(255, 90, 10, 0)"),s.strokeStyle=h,s.lineWidth=2+d%3,s.beginPath(),s.moveTo(Math.cos(p)*98,Math.sin(p)*98),s.lineTo(Math.cos(p)*(98+b),Math.sin(p)*(98+b)),s.stroke()}s.restore();const m=new re(r),c=new ce({map:m,blending:H,transparent:!0,opacity:.45,depthWrite:!1}),u=new de(c);u.scale.set(n*2.6,n*2.6,1),e.add(u);const f=document.createElement("canvas");f.width=512,f.height=128;const g=f.getContext("2d"),P=g.createRadialGradient(256,64,0,256,64,256);P.addColorStop(0,"rgba(255, 235, 190, 0.28)"),P.addColorStop(.2,"rgba(245, 150, 15, 0.15)"),P.addColorStop(.75,"rgba(0, 0, 0, 0)"),g.fillStyle=P,g.fillRect(0,0,512,128);const w=new re(f),y=new ce({map:w,blending:H,transparent:!0,opacity:.28,depthWrite:!1}),S=new de(y);return S.scale.set(n*5.8,n*1.2,1),e.add(S),{group:e,light:o,mesh:a,coronaSprite:u,streakSprite:S,update(d,p,b=!1){const h=d*.001;i.uniforms.uTime.value=h;const M=b?1.6:2.8,x=b?.18:.55,C=1+Math.sin(h*1.4)*.03,T=n*M*C;u.scale.set(T,T,1),c.opacity=k.lerp(c.opacity,x,.08),y.opacity=k.lerp(y.opacity,b?.08:.32,.08)}}}const te={uniforms:{uColor:{value:new v(.22,.74,.97)},uTwilightColor:{value:new v(.98,.45,.12)},uSunPosition:{value:new v(0,0,0)},uAtmospherePower:{value:4.2},uAtmosphereIntensity:{value:.85}},vertexShader:`
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    void main() {
      // World-space normal for physical directional Rayleigh scattering
      vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;

      // World-space view direction towards camera
      vViewDir = normalize(cameraPosition - worldPosition.xyz);

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,fragmentShader:`
    uniform vec3 uColor;
    uniform vec3 uTwilightColor;
    uniform vec3 uSunPosition;
    uniform float uAtmospherePower;
    uniform float uAtmosphereIntensity;

    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    void main() {
      vec3 normal = normalize(vWorldNormal);
      vec3 viewDir = normalize(vViewDir);

      // Inverted Fresnel for back-face atmosphere shell: brightest at the grazing horizon
      float fresnel = 1.0 - max(dot(normal, viewDir), 0.0);
      fresnel = pow(fresnel, uAtmospherePower);

      // Light direction from planetary surface to the Sun at (0, 0, 0)
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);
      
      // Rayleigh day/night limb modulation: atmosphere glows on the sun-facing limb
      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.20, 0.25, NdotL);
      float twilightFactor = smoothstep(-0.25, 0.05, NdotL) * smoothstep(0.35, 0.0, NdotL);

      // Atmosphere fades out on the night hemisphere so dark shadow is transparent
      float alpha = fresnel * (0.02 + 0.98 * dayFactor) * uAtmosphereIntensity;
      
      // Shift towards twilight amber/vermilion at grazing terminator
      vec3 finalColor = mix(uColor, uTwilightColor, twilightFactor * 0.75);
      finalColor *= (0.8 + 0.5 * dayFactor);

      gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
    }
  `},oe={uniforms:{uSunPosition:{value:new v(0,0,0)},uPlanetPosition:{value:new v(0,0,0)},uPlanetRadius:{value:20},uInnerRadius:{value:20*1.45},uOuterRadius:{value:20*2.5}},vertexShader:`
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    varying vec3 vLocalPosition;
    varying vec3 vViewDir;

    void main() {
      vUv = uv;
      vLocalPosition = position;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      
      // World-space view direction towards camera
      vViewDir = normalize(cameraPosition - worldPos.xyz);
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,fragmentShader:`
    precision highp float;

    uniform vec3 uSunPosition;
    uniform vec3 uPlanetPosition;
    uniform float uPlanetRadius;
    uniform float uInnerRadius;
    uniform float uOuterRadius;

    varying vec3 vWorldPosition;
    varying vec2 vUv;
    varying vec3 vLocalPosition;
    varying vec3 vViewDir;

    void main() {
      // RingGeometry after rotateX(PI/2) lies in the XZ plane: r = length(xz)
      float r = length(vLocalPosition.xz);
      if (r < uInnerRadius || r > uOuterRadius) {
        discard;
      }

      // Normalized radial coordinate across ring breadth (0.0 at inner, 1.0 at outer)
      float normR = (r - uInnerRadius) / (uOuterRadius - uInnerRadius);

      // Multi-scale procedural concentric ring bands & micro-grooves
      float bRingDense = smoothstep(0.0, 0.60, normR) * smoothstep(0.66, 0.60, normR);
      float mainBands = sin(normR * 72.0) * 0.35 + 0.65;
      float microGrooves = sin(normR * 260.0) * 0.18 + 0.82;
      
      // Major Cassini Division (Clear gap at 0.64)
      float cassiniGap = smoothstep(0.012, 0.038, abs(normR - 0.64));

      // Minor Encke Division (Narrow gap at 0.88)
      float enckeGap = smoothstep(0.006, 0.020, abs(normR - 0.88));

      float density = mainBands * microGrooves * cassiniGap * enckeGap;
      float alpha = clamp(0.28 + density * 0.62 + bRingDense * 0.15, 0.0, 0.92);

      // Saturnian Color Palette: Glacial Cyan-Ice, Frost Silver, Pale Gold Dust
      vec3 innerCrepe = vec3(0.48, 0.75, 0.92);
      vec3 brightB = vec3(0.88, 0.96, 1.0);
      vec3 outerA = vec3(0.55, 0.82, 0.95);

      vec3 ringColor = mix(innerCrepe, brightB, smoothstep(0.05, 0.55, normR));
      ringColor = mix(ringColor, outerA, smoothstep(0.65, 0.95, normR));

      // Forward Mie Ice Scattering (Backlit glint when looking towards the Sun)
      vec3 viewDir = vViewDir;
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);
      float forwardMie = pow(max(dot(-viewDir, lightDir), 0.0), 10.0) * 2.2;

      // --- ANALYTICAL PLANET SHADOW CASTING ---
      vec3 sunToFrag = vWorldPosition - uSunPosition;
      vec3 rayDir = normalize(sunToFrag);
      vec3 sunToPlanet = uPlanetPosition - uSunPosition;

      float t = dot(sunToPlanet, rayDir);
      float shadowFactor = 1.0;
      if (t > 0.0 && length(sunToFrag) > t) {
        vec3 closestPoint = uSunPosition + rayDir * t;
        float distToRay = length(closestPoint - uPlanetPosition);
        shadowFactor = smoothstep(uPlanetRadius * 0.97, uPlanetRadius * 1.03, distToRay);
      }

      vec3 ambient = vec3(0.035, 0.055, 0.075);
      vec3 litColor = ringColor * (ambient + shadowFactor * 1.15) + vec3(0.85, 0.95, 1.0) * forwardMie * shadowFactor;

      gl_FragColor = vec4(litColor, alpha * (0.15 + 0.85 * shadowFactor));
    }
  `},K=`
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  float fbm3D(vec3 p, int octaves) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(12.34, 56.78, 90.12);
    for (int i = 0; i < 5; ++i) {
      if (i >= octaves) break;
      v += a * snoise(p);
      p = p * 2.02 + shift;
      a *= 0.5;
    }
    return v;
  }

  vec3 hash33(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.xxy + p.yxx) * p.zyx);
  }

  // 3D Voronoi returning vec2(d1, d2)
  vec2 voronoi3D(vec3 p) {
    vec3 b = floor(p);
    vec3 f = fract(p);
    float d1 = 8.0;
    float d2 = 8.0;
    for (int z = -1; z <= 1; z++) {
      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec3 lattice = vec3(float(x), float(y), float(z));
          vec3 offset = hash33(b + lattice);
          vec3 diff = lattice + offset - f;
          float d = length(diff);
          if (d < d1) {
            d2 = d1;
            d1 = d;
          } else if (d < d2) {
            d2 = d;
          }
        }
      }
    }
    return vec2(d1, d2);
  }
`,Y=`
  varying vec3 vPosition;       // Normalized local position on unit sphere [-1, 1]
  varying vec3 vWorldNormal;    // World-space geometric normal
  varying vec3 vWorldPosition;  // World-space fragment position
  varying vec3 vViewDir;        // World-space view direction towards camera

  void main() {
    vPosition = normalize(position);
    
    // Transform normal to world space (using modelMatrix rotation)
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;

    // View direction vector pointing from surface to camera in world space
    vViewDir = normalize(cameraPosition - worldPos.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`,be={uniforms:{uTime:{value:0},uSunPosition:{value:new v(0,0,0)}},vertexShader:Y,fragmentShader:`
    precision highp float;
    ${K}

    uniform float uTime;
    uniform vec3 uSunPosition;

    varying vec3 vPosition;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    float pythonElevation(vec3 p) {
      float continent = fbm3D(p * 2.2, 4);
      float coastal = snoise(p * 4.8) * 0.22;
      float elev = continent + coastal;
      float mountainMask = smoothstep(0.08, 0.38, elev);
      float mountains = pow(max(snoise(p * 7.5), 0.0), 2.2) * 0.45 * mountainMask;
      return elev + mountains;
    }

    vec3 calculateMountainNormal(vec3 p, vec3 geomWorldNormal, vec3 viewDir, out float outElevation, out vec3 outT, out vec3 outB) {
      vec3 up = abs(geomWorldNormal.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
      vec3 T = normalize(cross(up, geomWorldNormal));
      vec3 B = cross(geomWorldNormal, T);
      outT = T;
      outB = B;

      vec3 localUp = abs(p.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
      vec3 localT = normalize(cross(localUp, p));
      vec3 localB = cross(p, localT);

      float pixelWidth = length(fwidth(p));
      float eps = max(0.012, pixelWidth * 1.6);

      float h0 = pythonElevation(p);
      float hT = pythonElevation(normalize(p + localT * eps));
      float hB = pythonElevation(normalize(p + localB * eps));
      outElevation = h0;

      float dHdT = clamp((hT - h0) / eps, -1.5, 1.5);
      float dHdB = clamp((hB - h0) / eps, -1.5, 1.5);

      vec3 perturbed = normalize(geomWorldNormal - (T * dHdT + B * dHdB) * 0.12);

      float limbFactor = clamp(dot(geomWorldNormal, viewDir), 0.0, 1.0);
      float normalWeight = smoothstep(0.04, 0.28, limbFactor);
      return normalize(mix(geomWorldNormal, perturbed, normalWeight));
    }

    void main() {
      vec3 geomNormal = vWorldNormal;
      vec3 viewDir = vViewDir;
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);

      float elevation = 0.0;
      vec3 T, B;
      vec3 normal = calculateMountainNormal(vPosition, geomNormal, viewDir, elevation, T, B);

      // Physical day/night terminator in world space
      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.06, 0.22, NdotL);
      float twilight = smoothstep(-0.22, 0.06, NdotL) * (1.0 - smoothstep(0.0, 0.32, NdotL));

      vec3 surfaceColor;
      float isWater = 0.0;
      float specular = 0.0;

      if (elevation < 0.06) {
        // --- NATURAL BATHYMETRIC OCEAN DEPTH ---
        isWater = 1.0;
        float depth = 1.0 - smoothstep(-0.42, 0.06, elevation);
        vec3 shallowReef = vec3(0.02, 0.52, 0.62);   // Natural turquoise shallows
        vec3 midOcean = vec3(0.02, 0.26, 0.52);     // Azure continental shelf
        vec3 deepAbyss = vec3(0.01, 0.05, 0.18);    // Deep oceanic abyss
        
        surfaceColor = mix(shallowReef, midOcean, smoothstep(0.0, 0.35, depth));
        surfaceColor = mix(surfaceColor, deepAbyss, smoothstep(0.35, 1.0, depth));

        // Sun Glint Specular on Water (Calibrated microfacet reflection)
        vec3 halfVec = normalize(lightDir + viewDir);
        float specAngle = max(dot(normal, halfVec), 0.0);
        specular = pow(specAngle, 54.0) * 1.15 * dayFactor;
      } else {
        // --- CONTINENTAL LANDMASS & MOUNTAINS ---
        float landHeight = smoothstep(0.06, 0.52, elevation);
        vec3 lowValleys = vec3(0.06, 0.24, 0.12);   // Temperate lush forest
        vec3 savanna = vec3(0.26, 0.32, 0.15);      // Warm savanna grasslands
        vec3 plateaus = vec3(0.38, 0.30, 0.20);     // Highland stone
        vec3 snowPeaks = vec3(0.92, 0.95, 0.98);    // Glacial snowcaps
        
        surfaceColor = mix(lowValleys, savanna, smoothstep(0.0, 0.35, landHeight));
        surfaceColor = mix(surfaceColor, plateaus, smoothstep(0.35, 0.72, landHeight));
        surfaceColor = mix(surfaceColor, snowPeaks, smoothstep(0.72, 0.96, landHeight));
      }

      // --- DYNAMIC CLOUDS WITH REAL DROP SHADOWS ---
      float t = uTime * 0.016;
      vec3 cloudCoord = vPosition * 3.8 + vec3(t * 1.2, t * 0.5, t * 0.8);
      float cloudDensity = smoothstep(0.24, 0.68, fbm3D(cloudCoord, 4));

      // Cloud shadow projection along tangent light direction
      vec3 shadowOffset = -(T * dot(lightDir, T) + B * dot(lightDir, B)) * 0.05;
      vec3 shadowCoord = vPosition * 3.8 + shadowOffset + vec3(t * 1.2, t * 0.5, t * 0.8);
      float cloudShadow = smoothstep(0.24, 0.70, fbm3D(shadowCoord, 4));

      surfaceColor *= (1.0 - cloudShadow * 0.48 * dayFactor);
      vec3 cloudColor = vec3(0.96, 0.98, 1.0);
      surfaceColor = mix(surfaceColor, cloudColor, cloudDensity * 0.88);

      // --- NIGHT-SIDE WARM CITY LIGHTS ---
      float nightFactor = 1.0 - dayFactor;
      float cityNetwork = 0.0;
      if (elevation >= 0.05 && elevation <= 0.28) {
        float clusters = smoothstep(0.60, 0.84, snoise(vPosition * 16.0) * snoise(vPosition * 32.0));
        cityNetwork = clusters * smoothstep(0.05, 0.12, elevation);
      }
      vec3 cityGlow = vec3(1.0, 0.82, 0.45) * cityNetwork * 1.6 * nightFactor * (1.0 - cloudDensity * 0.8);

      // Polar Auroral Ribbons
      float auroraLat = smoothstep(0.74, 0.95, abs(vPosition.y));
      float auroraWave = sin(vPosition.x * 12.0 + uTime * 1.4) * 0.5 + 0.5;
      vec3 auroraGlow = vec3(0.12, 0.95, 0.52) * auroraLat * auroraWave * 0.55 * nightFactor;

      // Twilight warming
      vec3 twilightColor = vec3(0.96, 0.45, 0.12) * twilight * 0.40;

      // Total diffuse composite
      vec3 ambientCosmic = vec3(0.015, 0.022, 0.035);
      vec3 finalColor = surfaceColor * (ambientCosmic + dayFactor * 1.12) + twilightColor;
      finalColor += vec3(1.0, 0.96, 0.88) * specular * (1.0 - cloudDensity);
      finalColor += cityGlow + auroraGlow;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},Je={uniforms:{uTime:{value:0},uSunPosition:{value:new v(0,0,0)}},vertexShader:Y,fragmentShader:`
    precision highp float;
    ${K}

    uniform float uTime;
    uniform vec3 uSunPosition;

    varying vec3 vPosition;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    void main() {
      vec3 normal = vWorldNormal;
      vec3 viewDir = vViewDir;
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);

      // Physical day/night terminator in world space
      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.10, 0.25, NdotL);
      float twilight = smoothstep(-0.25, 0.06, NdotL) * (1.0 - smoothstep(0.0, 0.30, NdotL));

      // Zonal jet streams rotating in 3D Cartesian coordinates
      float lat = vPosition.y;
      float drift = uTime * 0.035;
      float ca = cos(drift);
      float sa = sin(drift);
      vec3 rotP = vec3(vPosition.x * ca - vPosition.z * sa, vPosition.y, vPosition.x * sa + vPosition.z * ca);

      // Latitudinal shear offsets (Bounded Kelvin-Helmholtz wave offsets)
      float shearOffset = sin(lat * 8.0) * 0.35 + sin(lat * 16.0) * 0.12;
      float ca2 = cos(shearOffset);
      float sa2 = sin(shearOffset);
      vec3 shearedPos = vec3(rotP.x * ca2 - rotP.z * sa2, rotP.y, rotP.x * sa2 + rotP.z * ca2);

      // Silk domain warping for smooth marble-like cloud eddies (Zero Moiré)
      vec3 warp = vec3(
        snoise(shearedPos * 1.5 + vec3(0.0, uTime * 0.025, 0.0)),
        snoise(shearedPos * 1.5 + vec3(3.2, 0.0, uTime * 0.025)),
        snoise(shearedPos * 1.5 + vec3(0.0, 6.7, uTime * 0.025))
      );
      vec3 warpedPos = shearedPos + warp * 0.15;

      // Broad, silky Jovian latitudinal cloud bands (10-14 majestic belts and zones)
      float latVal = warpedPos.y;
      float primaryBands = sin(latVal * 9.0) * 0.45 + sin(latVal * 18.0 + warp.x * 0.5) * 0.20;
      float billows = snoise(warpedPos * 1.5) * 0.12;
      float bandVal = primaryBands + billows;

      // The Great Amber Vortex (Anti-cyclonic storm at lat -0.32)
      vec3 spotCenter = normalize(vec3(0.60, -0.32, 0.72));
      float frontFacing = dot(vPosition, spotCenter);
      float spotMask = 0.0;
      float spiral = 0.0;
      if (frontFacing > 0.65) {
        vec3 spotUp = vec3(0.0, 1.0, 0.0);
        vec3 spotT = normalize(cross(spotUp, spotCenter));
        vec3 spotB = cross(spotCenter, spotT);

        vec3 toP = vPosition - spotCenter;
        float spotX = dot(toP, spotT);
        float spotY = dot(toP, spotB);

        float dElliptic = length(vec2(spotX * 0.85, spotY * 1.75));
        spotMask = 1.0 - smoothstep(0.04, 0.22, dElliptic);

        float spotAngle = atan(spotY, spotX);
        spiral = sin(dElliptic * 24.0 - spotAngle * 2.0 - uTime * 1.2);
      }

      // Jovian Atmospheric Color Palette (Silky, broad color blends)
      vec3 bandDeepUmber = vec3(0.28, 0.12, 0.04);
      vec3 bandBronze = vec3(0.60, 0.30, 0.12);
      vec3 bandHoneyAmber = vec3(0.88, 0.60, 0.24);
      vec3 bandCream = vec3(0.95, 0.88, 0.74);
      vec3 bandWhiteCirrus = vec3(0.98, 0.95, 0.90);

      float tNorm = clamp(bandVal * 0.5 + 0.5, 0.0, 1.0);
      vec3 beltColor = mix(bandDeepUmber, bandBronze, smoothstep(0.05, 0.35, tNorm));
      beltColor = mix(beltColor, bandHoneyAmber, smoothstep(0.35, 0.60, tNorm));
      beltColor = mix(beltColor, bandCream, smoothstep(0.60, 0.82, tNorm));
      beltColor = mix(beltColor, bandWhiteCirrus, smoothstep(0.82, 0.98, tNorm));

      // Polar hoods (hazy bluish-slate)
      float polarHood = smoothstep(0.68, 0.92, abs(lat));
      vec3 polarColor = vec3(0.34, 0.40, 0.48);
      vec3 surfaceColor = mix(beltColor, polarColor, polarHood * 0.60);

      // Great Amber Vortex
      vec3 eyeColor = vec3(0.90, 0.35, 0.08);
      vec3 eyeCirrus = vec3(0.98, 0.94, 0.86);
      vec3 stormMix = mix(eyeColor, eyeCirrus, smoothstep(0.1, 0.7, spiral));
      surfaceColor = mix(surfaceColor, stormMix, spotMask * 0.90);

      // Volumetric limb darkening
      float mu = clamp(dot(normal, viewDir), 0.0, 1.0);
      float gasLimb = 0.58 + 0.42 * pow(mu, 0.75);

      // Final Lighting
      vec3 ambient = vec3(0.015, 0.012, 0.010);
      vec3 twilightColor = vec3(0.95, 0.45, 0.10) * twilight * 0.48;
      vec3 finalColor = surfaceColor * gasLimb * (ambient + dayFactor * 1.15) + twilightColor;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},et={uniforms:{uTime:{value:0},uSunPosition:{value:new v(0,0,0)}},vertexShader:Y,fragmentShader:`
    precision highp float;
    ${K}

    uniform float uTime;
    uniform vec3 uSunPosition;

    varying vec3 vPosition;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    float rustElevation(vec3 p) {
      float base = fbm3D(p * 2.8, 4);
      
      // Impact Craters with raised rims
      vec2 v = voronoi3D(p * 4.8);
      float craterRim = smoothstep(0.04, 0.12, v.x) * (1.0 - smoothstep(0.12, 0.24, v.x)) * 0.28;
      float craterPit = -(1.0 - smoothstep(0.02, 0.12, v.x)) * 0.20;

      // Valles Marineris Tectonic Rift Chasms
      float chasmNoise = abs(snoise(p * 2.2 + vec3(1.2, 0.5, 0.8)));
      float chasm = (1.0 - smoothstep(0.0, 0.16, chasmNoise));
      chasm = pow(chasm, 2.4) * 0.48;

      return base + craterRim + craterPit - chasm;
    }

    vec3 calculateRustNormal(vec3 p, vec3 geomWorldNormal, vec3 viewDir, out float outElevation) {
      vec3 up = abs(geomWorldNormal.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
      vec3 T = normalize(cross(up, geomWorldNormal));
      vec3 B = cross(geomWorldNormal, T);

      vec3 localUp = abs(p.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
      vec3 localT = normalize(cross(localUp, p));
      vec3 localB = cross(p, localT);

      float pixelWidth = length(fwidth(p));
      float eps = max(0.012, pixelWidth * 1.6);

      float h0 = rustElevation(p);
      float hT = rustElevation(normalize(p + localT * eps));
      float hB = rustElevation(normalize(p + localB * eps));
      outElevation = h0;

      float dHdT = clamp((hT - h0) / eps, -1.6, 1.6);
      float dHdB = clamp((hB - h0) / eps, -1.6, 1.6);

      vec3 perturbed = normalize(geomWorldNormal - (T * dHdT + B * dHdB) * 0.16);

      float limbFactor = clamp(dot(geomWorldNormal, viewDir), 0.0, 1.0);
      float normalWeight = smoothstep(0.04, 0.30, limbFactor);
      return normalize(mix(geomWorldNormal, perturbed, normalWeight));
    }

    void main() {
      vec3 geomNormal = vWorldNormal;
      vec3 viewDir = vViewDir;
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);

      float elevation = 0.0;
      vec3 normal = calculateRustNormal(vPosition, geomNormal, viewDir, elevation);

      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.08, 0.22, NdotL);
      float twilight = smoothstep(-0.25, 0.05, NdotL) * (1.0 - smoothstep(0.0, 0.30, NdotL));

      // Color Palette: Oxidized hematite red, desert terracotta, basalt basin
      vec3 ironRed = vec3(0.70, 0.26, 0.10);
      vec3 desertTerracotta = vec3(0.86, 0.48, 0.20);
      vec3 basaltBasin = vec3(0.20, 0.14, 0.11);
      vec3 copperVerdigris = vec3(0.22, 0.52, 0.45);

      vec3 surfaceColor = mix(ironRed, desertTerracotta, smoothstep(-0.20, 0.35, elevation));
      surfaceColor = mix(basaltBasin, surfaceColor, smoothstep(-0.45, -0.05, elevation));

      // Stratified canyon walls with geological strata
      if (elevation < -0.08) {
        float strata = sin(vPosition.y * 45.0 + snoise(vPosition * 8.0) * 1.5) * 0.5 + 0.5;
        surfaceColor = mix(surfaceColor, desertTerracotta * 0.72, strata * 0.45);
      }

      // Verdigris mineral seams
      float mineralEdge = smoothstep(-0.15, 0.05, elevation) * (1.0 - smoothstep(0.05, 0.20, elevation));
      surfaceColor = mix(surfaceColor, copperVerdigris, mineralEdge * 0.30);

      // --- POLAR ICE CAPS (Dry-ice CO2 & Water Frost) ---
      float polarLat = smoothstep(0.76, 0.94, abs(vPosition.y));
      float polarSpiral = sin(atan(vPosition.z, vPosition.x) * 4.0 + fbm3D(vPosition * 8.0, 3) * 3.0);
      vec3 polarFrost = vec3(0.94, 0.97, 1.0);
      surfaceColor = mix(surfaceColor, polarFrost, polarLat * (0.80 + 0.20 * polarSpiral));

      // Drifting iron dust storms
      float dustHaze = smoothstep(0.35, 0.75, fbm3D(vPosition * 5.5 + vec3(uTime * 0.015), 3));
      surfaceColor = mix(surfaceColor, desertTerracotta * 1.10, dustHaze * 0.25);

      // Martian Blue Sunset: Forward dust scattering creates cool blue twilight
      vec3 blueSunset = vec3(0.20, 0.52, 0.88) * twilight * 0.65;

      vec3 ambient = vec3(0.015, 0.012, 0.015);
      vec3 finalColor = surfaceColor * (ambient + dayFactor * 1.10) + blueSunset;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},tt={uniforms:{uTime:{value:0},uSunPosition:{value:new v(0,0,0)},uPlanetPosition:{value:new v(0,0,0)},uRingInnerRadius:{value:20*1.45},uRingOuterRadius:{value:20*2.5}},vertexShader:Y,fragmentShader:`
    precision highp float;
    ${K}

    uniform float uTime;
    uniform vec3 uSunPosition;
    uniform vec3 uPlanetPosition;
    uniform float uRingInnerRadius;
    uniform float uRingOuterRadius;

    varying vec3 vPosition;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    void main() {
      vec3 normal = vWorldNormal;
      vec3 viewDir = vViewDir;
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);

      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.08, 0.22, NdotL);
      float twilight = smoothstep(-0.25, 0.05, NdotL) * (1.0 - smoothstep(0.0, 0.30, NdotL));

      // Glacial pressure ridges & cryo-ocean flow
      float iceFlow = fbm3D(vPosition * 3.4 + snoise(vPosition * 2.2) * 0.35, 4);
      float striations = sin(vPosition.y * 24.0 + iceFlow * 4.0) * 0.5 + 0.5;

      vec3 deepCobalt = vec3(0.05, 0.20, 0.46);
      vec3 glacialCyan = vec3(0.20, 0.68, 0.88);
      vec3 frostWhite = vec3(0.92, 0.97, 1.0);

      vec3 surfaceColor = mix(deepCobalt, glacialCyan, smoothstep(-0.25, 0.30, iceFlow));
      surfaceColor = mix(surfaceColor, frostWhite, smoothstep(0.30, 0.78, iceFlow + striations * 0.25));

      // Specular Ice Glint (Softer, realistic)
      vec3 halfVec = normalize(lightDir + viewDir);
      float spec = pow(max(dot(normal, halfVec), 0.0), 54.0) * 0.85 * dayFactor;

      // Analytical Ring Shadow on Planet Surface (World space ray-plane intersection):
      float ringShadow = 1.0;
      vec3 ringNormal = vec3(-0.218, 0.976, 0.0);
      float denom = dot(lightDir, ringNormal);
      if (abs(denom) > 0.001) {
        float t = dot(uPlanetPosition - vWorldPosition, ringNormal) / denom;
        if (t > 0.0) {
          vec3 hitPoint = vWorldPosition + lightDir * t;
          float hitDist = length(hitPoint - uPlanetPosition);
          if (hitDist >= uRingInnerRadius && hitDist <= uRingOuterRadius) {
            float normR = (hitDist - uRingInnerRadius) / (uRingOuterRadius - uRingInnerRadius);
            float cassini = smoothstep(0.015, 0.040, abs(normR - 0.64));
            float ringEdge = smoothstep(uRingInnerRadius, uRingInnerRadius * 1.03, hitDist)
                           * (1.0 - smoothstep(uRingOuterRadius * 0.97, uRingOuterRadius, hitDist));
            ringShadow = mix(1.0, 0.22 + 0.45 * (1.0 - cassini), ringEdge);
          }
        }
      }

      vec3 ambient = vec3(0.015, 0.030, 0.055);
      vec3 twilightColor = vec3(0.35, 0.82, 1.0) * twilight * 0.45;
      vec3 finalColor = surfaceColor * (ambient + dayFactor * 1.12 * ringShadow) + twilightColor;
      finalColor += vec3(0.75, 0.94, 1.0) * spec * ringShadow;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},ot={uniforms:{uTime:{value:0},uSunPosition:{value:new v(0,0,0)}},vertexShader:Y,fragmentShader:`
    precision highp float;
    ${K}

    uniform float uTime;
    uniform vec3 uSunPosition;

    varying vec3 vPosition;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    void main() {
      vec3 normal = vWorldNormal;
      vec3 viewDir = vViewDir;
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);

      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.10, 0.25, NdotL);

      // Cracked obsidian crust using Voronoi edge distance (d2 - d1)
      vec3 p = vPosition * 4.2 + snoise(vPosition * 8.0) * 0.25;
      vec2 v = voronoi3D(p);
      float edgeDist = v.y - v.x; // Exact distance to plate boundary

      // Jagged magma fissures between basalt plates
      float fissure = 1.0 - smoothstep(0.015, 0.09, edgeDist);
      float coreLava = 1.0 - smoothstep(0.005, 0.035, edgeDist);

      // Obsidian Basalt Crust
      vec3 basaltCharcoal = vec3(0.08, 0.08, 0.09);
      vec3 basaltSlate = vec3(0.16, 0.16, 0.17);
      vec3 crustColor = mix(basaltCharcoal, basaltSlate, smoothstep(0.1, 0.45, edgeDist));

      // Thermal underglow in crust near fissures
      float thermalGlow = 1.0 - smoothstep(0.07, 0.20, edgeDist);
      crustColor += vec3(0.55, 0.10, 0.01) * thermalGlow * 0.45;

      // Convective Breathing Magma Pulse & Boiling Lava Veins
      float boiling = snoise(vPosition * 16.0 + vec3(0.0, uTime * 0.9, 0.0)) * 0.5 + 0.5;
      float pulse = 0.92 + 0.18 * sin(uTime * 3.2 + snoise(vPosition * 5.0) * 3.14);

      vec3 magmaYellow = vec3(1.0, 0.98, 0.70) * 2.8;
      vec3 magmaOrange = vec3(1.0, 0.45, 0.04) * 2.2;
      vec3 magmaVermilion = vec3(0.82, 0.12, 0.02) * 1.6;

      vec3 moltenColor = mix(magmaVermilion, magmaOrange, fissure);
      moltenColor = mix(moltenColor, magmaYellow, coreLava);
      moltenColor *= (pulse * (0.85 + 0.30 * boiling));

      // Magma glows on BOTH day and night hemispheres (internal core heat)
      vec3 ambient = vec3(0.015, 0.015, 0.02);
      vec3 finalColor = crustColor * (ambient + dayFactor * 1.05) + moltenColor * fissure;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},it={python:be,csharp:Je,rust:et,typescript:tt,cpp:ot},ue={python:{color:new v(.12,.65,.82),twilight:new v(.92,.45,.12),power:5.5,intensity:.65},csharp:{color:new v(.72,.48,.22),twilight:new v(.95,.55,.15),power:5,intensity:.55},rust:{color:new v(.85,.42,.15),twilight:new v(.25,.55,.88),power:5.8,intensity:.48},typescript:{color:new v(.25,.75,.95),twilight:new v(.35,.82,1),power:5.2,intensity:.58},cpp:{color:new v(.88,.25,.12),twilight:new v(1,.4,.08),power:5.8,intensity:.5}};function at(n){const e=(n.id||n.name).toLowerCase(),o=new j;o.name=`Planet_${n.name}`;const t=it[e]||be,i=new q(n.radius,96,96),a=new O({uniforms:U.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),r=new z(i,a);r.castShadow=!1,r.receiveShadow=!1,r.userData={isPlanet:!0,planetId:n.id,name:n.name,orbitRadius:n.orbitRadius,priority:n.priority},o.add(r);const s=ue[e]||ue.python,l=new q(n.radius*1.022,64,64),m=U.clone(te.uniforms);m.uColor.value.copy(s.color),m.uTwilightColor.value.copy(s.twilight),m.uAtmospherePower.value=s.power,m.uAtmosphereIntensity.value=s.intensity;const c=new O({uniforms:m,vertexShader:te.vertexShader,fragmentShader:te.fragmentShader,side:Ee,blending:H,transparent:!0,depthWrite:!1}),u=new z(l,c);o.add(u);let f=null,g=null;if(n.hasRings){const x=n.radius*1.45,C=n.radius*2.5,T=new Le(x,C,96);T.rotateX(Math.PI*.5);const E=U.clone(oe.uniforms);E.uPlanetRadius.value=n.radius,E.uInnerRadius.value=x,E.uOuterRadius.value=C,g=new O({uniforms:E,vertexShader:oe.vertexShader,fragmentShader:oe.fragmentShader,side:fe,transparent:!0,depthWrite:!1}),f=new z(T,g),f.rotation.z=.22,o.add(f)}const P=[],w=128;for(let x=0;x<=w;x++){const C=x/w*Math.PI*2;P.push(new v(Math.cos(C)*n.orbitRadius,Math.sin(C)*n.orbitRadius*(n.inclination||.05),Math.sin(C)*n.orbitRadius))}const y=new $().setFromPoints(P),S=new ge({color:9741240,transparent:!0,opacity:.18,depthWrite:!1}),d=new ye(y,S);d.matrixAutoUpdate=!1,d.updateMatrix();let p=n.initialAngle||0;const b=n.orbitRadius,h=n.orbitSpeed,M=n.rotationSpeed||.004;return{group:o,orbitLine:d,config:n,mesh:r,atmoMesh:u,ringMesh:f,surfaceMaterial:a,highlight(x){S.color.set(x?n.color||16096779:9741240),S.opacity=x?.85:.18,m.uAtmosphereIntensity.value=x?s.intensity*2:s.intensity},update(x,C=0,T=new v(0,0,0)){p+=h*x;const E=Math.cos(p)*b,G=Math.sin(p)*b*(n.inclination||.05),N=Math.sin(p)*b;o.position.set(E,G,N),r.rotation.y+=M*x;const B=C*.001;a.uniforms.uTime&&(a.uniforms.uTime.value=B),a.uniforms.uSunPosition&&a.uniforms.uSunPosition.value.copy(T),a.uniforms.uPlanetPosition&&a.uniforms.uPlanetPosition.value.copy(o.position),m.uSunPosition.value.copy(T),g&&(g.uniforms.uSunPosition.value.copy(T),g.uniforms.uPlanetPosition.value.copy(o.position))},getPosition(){return o.position}}}const st=`
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;

  void main() {
    vPosition = normalize(position);
    vNormal = normalize(normalMatrix * normal);

    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;

    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPos.xyz;

    gl_Position = projectionMatrix * mvPos;
  }
`,rt=`
  precision highp float;

  uniform float uTime;
  uniform vec3 uSunPosition;
  uniform vec3 uPlanetPosition;
  uniform vec3 uBeaconColor;
  uniform vec3 uPlanetColor;
  uniform int uTerrainType;     // 0: anorthosite, 1: europa_ice, 2: volcanic_iron, 3: regolith_crater
  uniform float uKeyLight;      // 0.0 -> 1.0 during inspection / night mode
  uniform float uHighlight;     // 0.0 -> 1.0 during hover

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;

  // ---------------------------------------------------------------------
  // 3D Simplex Noise & Hash Utilities
  // ---------------------------------------------------------------------
  vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  float fbm3D(vec3 p, int octaves) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    for (int i = 0; i < 4; ++i) {
      if (i >= octaves) break;
      v += a * snoise(p);
      p = p * 2.04 + shift;
      a *= 0.5;
    }
    return v;
  }

  vec3 hash33(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.xxy + p.yxx) * p.zyx);
  }

  // Polynomial smooth minimum to eliminate derivative discontinuities at cell boundaries
  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  // C1-Smooth 3D Voronoi Cellular Distance
  float smoothVoronoi3D(vec3 p) {
    vec3 b = floor(p);
    vec3 f = fract(p);
    float d = 1.0;
    for (int z = -1; z <= 1; z++) {
      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec3 lattice = vec3(float(x), float(y), float(z));
          vec3 offset = hash33(b + lattice);
          vec3 diff = lattice + offset - f;
          d = smin(d, length(diff), 0.14);
        }
      }
    }
    return d;
  }

  // ---------------------------------------------------------------------
  // Natural Crater Morphology with Rounded Ejecta Slopes
  // ---------------------------------------------------------------------
  float singleCrater(vec3 p, float scale, float rimSteepness) {
    float d = smoothVoronoi3D(p * scale);
    const float R = 0.40;

    // Soft parabolic excavation bowl
    float bowl = smoothstep(R, 0.08, d);

    // Natural dust-covered rounded Gaussian rim
    float rimDelta = (d - R) * rimSteepness;
    float rim = exp(-rimDelta * rimDelta);

    // Central rebound peak for large basins
    float peak = exp(-pow(d * 12.0, 2.0)) * 0.25;

    return (rim * 0.30 + peak * 0.15) - (bowl * 0.36);
  }

  // Planetary elevation with dynamic SSAA LOD attenuation
  float moonElevation(vec3 p, int terrainType, float lodAttenuation) {
    float h = 0.0;

    if (terrainType == 1) {
      // --- 1: EUROPA ICE ---
      float ridgeA = abs(snoise(p * 3.6));
      float ridgeB = abs(snoise(p * 7.5 + vec3(3.2, 5.8, 1.4)));
      float cracks = 1.0 - smoothstep(0.04, 0.32, ridgeA * ridgeB);
      float microIce = fbm3D(p * 4.2, 3) * 0.14 * lodAttenuation;
      float crater = singleCrater(p, 2.8, 7.5) * 0.20;
      h = cracks * 0.28 + microIce - crater;
    } else if (terrainType == 2) {
      // --- 2: VOLCANIC IRON / BASALT (Knox) ---
      float c1 = singleCrater(p, 2.4, 7.5);
      float c2 = singleCrater(p + vec3(1.7, 4.3, 8.1), 5.2, 9.5) * lodAttenuation;
      float rough = fbm3D(p * 3.8, 3) * 0.16 * lodAttenuation;
      h = c1 * 0.55 + c2 * 0.32 + rough;
    } else {
      // --- 0: ANORTHOSITE (Luna) & 3: REGOLITH CRATER (SyGriffin) ---
      float c1 = singleCrater(p, 2.6, 7.5);
      float c2 = singleCrater(p + vec3(3.2, 7.1, 1.9), 5.6, 9.5) * lodAttenuation;
      float regolith = fbm3D(p * 4.5, 3) * 0.14 * lodAttenuation;
      h = c1 * 0.58 + c2 * 0.34 + regolith;
    }

    return h;
  }

  // ---------------------------------------------------------------------
  // Screen-Space Antialiased Normal Bump Calculation
  // ---------------------------------------------------------------------
  vec3 calculateSurfaceNormal(vec3 p, vec3 geomNormal, vec3 viewDir, int terrainType, out float outElevation) {
    vec3 up = abs(geomNormal.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 T = normalize(cross(up, geomNormal));
    vec3 B = cross(geomNormal, T);

    // Screen-space derivative anti-aliasing
    float pixelWidth = length(fwidth(p));
    float lodAttenuation = 1.0 - smoothstep(0.015, 0.055, pixelWidth);

    // Finite-difference epsilon tracks screen pixel footprint
    float eps = max(0.015, pixelWidth * 1.8);

    float h0 = moonElevation(p, terrainType, lodAttenuation);
    float hT = moonElevation(normalize(p + T * eps), terrainType, lodAttenuation);
    float hB = moonElevation(normalize(p + B * eps), terrainType, lodAttenuation);

    outElevation = h0;

    float dHdT = clamp((hT - h0) / eps, -1.4, 1.4);
    float dHdB = clamp((hB - h0) / eps, -1.4, 1.4);

    // Soft-calibrated bump scale (0.07–0.09) for stable, smooth lunar relief
    float bumpScale = (terrainType == 1) ? 0.07 : 0.09;
    vec3 perturbedNormal = normalize(geomNormal - (T * dHdT + B * dHdB) * bumpScale);

    // Silhouette Fresnel Limb Attenuation
    float limbFactor = clamp(dot(geomNormal, viewDir), 0.0, 1.0);
    float normalWeight = smoothstep(0.04, 0.32, limbFactor);

    return normalize(mix(geomNormal, perturbedNormal, normalWeight));
  }

  // ---------------------------------------------------------------------
  // Geological Surface Color (Albedo)
  // ---------------------------------------------------------------------
  vec3 getLunarAlbedo(vec3 p, float elevation, int terrainType) {
    if (terrainType == 1) {
      vec3 icyCrust = vec3(0.86, 0.91, 0.97);
      vec3 deepCrevasse = vec3(0.42, 0.24, 0.18);
      vec3 cryoShallow = vec3(0.68, 0.78, 0.88);
      float crackMask = smoothstep(0.05, 0.30, elevation);
      return mix(deepCrevasse, mix(cryoShallow, icyCrust, smoothstep(-0.1, 0.2, elevation)), crackMask);
    } else if (terrainType == 2) {
      vec3 darkBasalt = vec3(0.09, 0.09, 0.10);
      vec3 ironHighland = vec3(0.24, 0.18, 0.15);
      vec3 slagRim = vec3(0.38, 0.28, 0.18);
      float elevFactor = smoothstep(-0.25, 0.35, elevation);
      float rimFactor = smoothstep(0.18, 0.42, elevation);
      vec3 base = mix(darkBasalt, ironHighland, elevFactor);
      return mix(base, slagRim, rimFactor);
    } else if (terrainType == 3) {
      vec3 darkMelt = vec3(0.13, 0.14, 0.15);
      vec3 regolith = vec3(0.36, 0.38, 0.41);
      vec3 brightEjecta = vec3(0.72, 0.75, 0.79);
      float mariaBlend = smoothstep(-0.20, 0.25, elevation);
      float ejectaBlend = smoothstep(0.20, 0.45, elevation);
      return mix(darkMelt, mix(regolith, brightEjecta, ejectaBlend), mariaBlend);
    } else {
      float mariaNoise = fbm3D(p * 1.5, 3);
      float isMaria = smoothstep(0.08, -0.15, mariaNoise + elevation * 0.35);

      vec3 darkMaria = vec3(0.12, 0.13, 0.14);
      vec3 highland = vec3(0.56, 0.58, 0.61);
      vec3 rayEjecta = vec3(0.78, 0.80, 0.84);

      float rayDetail = smoothstep(0.22, 0.50, elevation);
      vec3 landAlbedo = mix(highland, rayEjecta, rayDetail);
      return mix(landAlbedo, darkMaria, isMaria);
    }
  }

  void main() {
    vec3 geomNormal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // 1. Anti-aliased terrain elevation and limb-stabilized perturbed normal
    float elevation = 0.0;
    vec3 surfNormal = calculateSurfaceNormal(vPosition, geomNormal, viewDir, uTerrainType, elevation);

    // 2. Base Albedo
    vec3 albedo = getLunarAlbedo(vPosition, elevation, uTerrainType);

    // 3. Physical Celestial Lighting: Sun Terminator & Grazing Shadows
    vec3 sunLightDir = normalize(uSunPosition - vWorldPosition);
    float NdotL = dot(surfNormal, sunLightDir);

    float sunDiffuse = smoothstep(-0.02, 0.12, NdotL);
    float grazingRim = smoothstep(-0.14, 0.02, NdotL) * smoothstep(0.20, 0.02, NdotL) * max(elevation, 0.0);
    vec3 sunLightColor = vec3(1.0, 0.98, 0.94);

    // 4. Secondary Planetshine (Earthshine) on Night Hemisphere
    vec3 planetDir = normalize(uPlanetPosition - vWorldPosition);
    float NdotP = max(dot(surfNormal, planetDir), 0.0);
    vec3 planetshine = uPlanetColor * NdotP * 0.30 * (1.0 - sunDiffuse * 0.85);

    // 5. Cinematic Oblique Inspection Key-Light
    vec3 keyLightDir = normalize(viewDir + vec3(0.9, 0.5, 0.8));
    float NdotKey = max(dot(surfNormal, keyLightDir), 0.0);
    vec3 inspectionLight = vec3(0.94, 0.97, 1.0) * pow(NdotKey, 1.4) * 0.45 * uKeyLight;

    // Cosmic background ambient
    vec3 cosmicAmbient = vec3(0.012, 0.015, 0.020);

    // Total diffuse illumination
    vec3 totalDiffuse = sunDiffuse * sunLightColor + planetshine + inspectionLight + cosmicAmbient;

    // 6. Surface Tech Telemetry Outpost Array
    vec3 outpostCenter = normalize(vec3(0.52, 0.38, 0.76));
    float distToOutpost = length(vPosition - outpostCenter);
    const float outpostRadius = 0.14;

    float outpostMask = smoothstep(outpostRadius, 0.02, distToOutpost);

    // Clean anti-aliased concentric runway telemetry rings (zero Moiré distortion)
    float r1 = smoothstep(0.007, 0.001, abs(distToOutpost - 0.042));
    float r2 = smoothstep(0.006, 0.001, abs(distToOutpost - 0.082));
    float r3 = smoothstep(0.005, 0.001, abs(distToOutpost - 0.122));
    float spokePattern = smoothstep(0.85, 0.98, abs(sin(atan(vPosition.y - outpostCenter.y, vPosition.x - outpostCenter.x) * 4.0)));
    float telemetryGrid = (r1 + r2 * 0.75 + r3 * 0.45 + spokePattern * 0.35) * outpostMask;

    // Central beacon LED array with pulsating rhythm
    float beaconPulse = sin(uTime * 3.8) * 0.5 + 0.5;
    float centerBeacon = smoothstep(0.026, 0.003, distToOutpost) * (0.85 + 0.95 * beaconPulse);

    float activeBoost = 1.0 + 1.2 * max(uKeyLight, uHighlight);
    vec3 outpostGlow = uBeaconColor * (centerBeacon * 2.8 + telemetryGrid * 0.9) * activeBoost;

    // 7. Final Color Synthesis with Soft Luminance Compression
    vec3 surfaceColor = albedo * totalDiffuse;
    surfaceColor += grazingRim * 0.35 * vec3(1.0, 0.96, 0.88);
    surfaceColor += outpostGlow;

    surfaceColor = clamp(surfaceColor, 0.0, 1.35);

    gl_FragColor = vec4(surfaceColor, 1.0);
  }
`,ie={uniforms:{uTime:{value:0},uSunPosition:{value:new v(0,0,0)},uPlanetPosition:{value:new v(0,0,0)},uBeaconColor:{value:new I(11032055)},uPlanetColor:{value:new I(11032055)},uTerrainType:{value:0},uKeyLight:{value:0},uHighlight:{value:0}},vertexShader:st,fragmentShader:rt},nt={python:58777,csharp:11032055,"c#":11032055,"c# / .net":11032055,rust:16347926,typescript:61695,cpp:15680580,"c++":15680580},me={anorthosite:0,europa_ice:1,volcanic_iron:2,regolith_crater:3};function lt(n,e){const o=new j;o.name="Moon_"+n.id;const t=n.radius||1.6,i=(e.config.id||e.config.name||"python").toLowerCase(),a=nt[i]||16096779,r=e.config.color||9741240,s=new q(t,64,48),l=U.clone(ie.uniforms);l.uBeaconColor.value.set(a),l.uPlanetColor.value.set(r);const m=me[n.terrainType]!==void 0?me[n.terrainType]:i==="csharp"?0:i==="rust"?2:i==="typescript"?1:0;l.uTerrainType.value=m;const c=new O({uniforms:l,vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader}),u=new z(s,c);u.castShadow=!0,u.receiveShadow=!0,u.userData={isMoon:!0,moonId:n.id,config:n},o.add(u);const f=new v(.52,.38,.76).normalize(),g=new j;g.position.copy(f.clone().multiplyScalar(t*.99)),g.quaternion.setFromUnitVectors(new v(0,1,0),f);const P=new ke(t*.015,t*.025,t*.14,6),w=new J({color:9741240}),y=new z(P,w);y.position.y=t*.07,g.add(y);const S=new Ae(t*.06,t*.035,8,1,!0),d=new J({color:14870768,side:fe}),p=new z(S,d);p.position.y=t*.14,p.rotation.x=Math.PI,g.add(p);const b=new q(t*.038,8,8),h=new J({color:a}),M=new z(b,h);M.position.y=t*.17,g.add(M),u.add(g);const x=84,C=[],T=[],E=new I(a),G=new I(3359061);for(let L=0;L<=x;L++){const W=L/x*Math.PI*2;C.push(new v(Math.cos(W)*n.orbitRadius,Math.sin(W)*n.orbitRadius*(n.inclination||.1),Math.sin(W)*n.orbitRadius));const _=G.clone().lerp(E,Math.sin(W*2)*.3+.3);T.push(_.r,_.g,_.b)}const N=new $().setFromPoints(C);N.setAttribute("color",new ze(T,3));const B=new ge({vertexColors:!0,transparent:!0,opacity:n.isMajor?.55:.25,depthWrite:!1}),V=new ye(N,B);let X=n.initialAngle||Math.random()*Math.PI*2;const Q=n.orbitRadius,we=n.orbitSpeed;return{group:o,mesh:u,material:c,stationGroup:g,trailLine:V,config:n,parentPlanet:e,highlight(L){B.opacity=L?.95:n.isMajor?.55:.25,c.uniforms.uHighlight.value=L?1:0},update(L,W=0,_=new v(0,0,0)){X+=we*L;const Z=W*.001;u.rotation.y+=.02*L,u.rotation.x=Math.sin(Z*.2)*.04;const xe=1+Math.sin(Z*3.8)*.28;M.scale.setScalar(xe);const Pe=Math.cos(X)*Q,Ce=Math.sin(X)*Q*(n.inclination||.1),Se=Math.sin(X)*Q;o.position.set(Pe,Ce,Se),c.uniforms.uTime.value=Z,c.uniforms.uSunPosition.value.copy(_);const Me=e.getPosition?e.getPosition():e.group.position;c.uniforms.uPlanetPosition.value.copy(Me)},getPosition(){const L=new v;return o.getWorldPosition(L),L}}}class ct{constructor(e,o){this.container=e,this.labelContainer=o,this.width=window.innerWidth,this.height=window.innerHeight,this.isMobile=window.innerWidth<768,this.maxDpr=this.isMobile?1.5:2,this.dpr=Math.min(window.devicePixelRatio||1,this.maxDpr),this.scene=new Ie,this.scene.fog=new Re(263690,35e-5),this.camera=new Ne(45,this.width/this.height,.5,3500),this.camera.position.set(0,180,420),this.camera.up.set(0,1,0),this.renderer=new Be({powerPreference:"high-performance",antialias:!1,stencil:!1,depth:!0,alpha:!1}),this.renderer.setSize(this.width,this.height),this.renderer.setPixelRatio(this.dpr),this.renderer.toneMapping=We,this.renderer.toneMappingExposure=1.08,this.renderer.outputColorSpace=Fe,this.container.appendChild(this.renderer.domElement);const t=new Oe(263954,.18);this.scene.add(t),this.starfield=Qe(this.isMobile?1800:3400),this.scene.add(this.starfield.group),this.sun=Ze(A.sun.radius),this.scene.add(this.sun.group),this.planets={},this.moons={},this.clickableObjects=[],this.setupPlanetarySystem(),this.raycaster=new Ge,this.pickingPointer=new he(-999,-999),this.parallax=new he(0,0),this.hasPointerMoved=!1,this.isCoarsePointer=window.matchMedia("(pointer: coarse)").matches,this.hoveredObject=null,this.focusedTarget=null,this.mode="guided",this.exploreTarget=new v(0,0,0),this.exploreSpherical=new Ve(420,Math.PI*.35,0),this.isDragging=!1,this.previousPointerPos={x:0,y:0},this.flightSpline=this.createFlightSpline(),this.splineProgress=0,this.currentCamPos=new v().copy(this.camera.position),this.targetCamPos=new v().copy(this.camera.position),this.currentLookAt=new v(0,0,0),this.targetLookAt=new v(0,0,0),this.tempVec=new v,this.ignitionProgress=0,this.isIgnited=!1,this.activeNightMoon=null,this.nightTween=null,this.timeDilation=1,this.bindEvents()}setupPlanetarySystem(){A.planets.forEach(e=>{const o=at(e);this.planets[e.id]=o,this.scene.add(o.group),this.scene.add(o.orbitLine),this.clickableObjects.push(o.mesh)}),A.moons.forEach(e=>{const o=this.planets[e.parentPlanetId];if(!o)return;const t=lt(e,o);this.moons[e.id]=t,o.group.add(t.group),o.group.add(t.trailLine),this.clickableObjects.push(t.mesh)})}createFlightSpline(){const e=A.splineWaypoints.map(o=>new v(o.x,o.y,o.z));return new _e(e,!1,"centripetal",.5)}bindEvents(){const e=this.renderer.domElement,o=new Map;let t=0,i=0,a=0;window.addEventListener("pointermove",s=>{const l=performance.now();if(!(l-a<16)){if(a=l,this.pickingPointer.x=s.clientX/this.width*2-1,this.pickingPointer.y=-(s.clientY/this.height)*2+1,this.hasPointerMoved=!0,this.isCoarsePointer||(this.parallax.x=k.clamp(this.pickingPointer.x,-1,1),this.parallax.y=k.clamp(this.pickingPointer.y,-1,1)),this.mode==="explore"&&o.has(s.pointerId)&&(o.set(s.pointerId,{x:s.clientX,y:s.clientY}),o.size===2&&t>0)){const[m,c]=Array.from(o.values()),u=Math.hypot(m.x-c.x,m.y-c.y);if(u>0){const f=t/u;this.exploreSpherical.radius=k.clamp(i*f,35,800),this.updateExploreCameraPosition()}return}if(this.mode==="explore"&&this.isDragging){const m=s.clientX-this.previousPointerPos.x,c=s.clientY-this.previousPointerPos.y;this.previousPointerPos={x:s.clientX,y:s.clientY};const u=.005;this.exploreSpherical.theta-=m*u,this.exploreSpherical.phi-=c*u,this.exploreSpherical.phi=k.clamp(this.exploreSpherical.phi,.15,Math.PI-.2),this.updateExploreCameraPosition()}}},{passive:!0}),e.addEventListener("pointerdown",s=>{if(this.mode==="explore"){if(o.set(s.pointerId,{x:s.clientX,y:s.clientY}),o.size===1)this.isDragging=!0,this.previousPointerPos={x:s.clientX,y:s.clientY};else if(o.size===2){this.isDragging=!1;const[l,m]=Array.from(o.values());t=Math.hypot(l.x-m.x,l.y-m.y),i=this.exploreSpherical.radius}}});const r=s=>{if(o.delete(s.pointerId),o.size===0)this.isDragging=!1,t=0;else if(o.size===1){const l=Array.from(o.values())[0];this.previousPointerPos={x:l.x,y:l.y},this.isDragging=!0}};window.addEventListener("pointerup",r),window.addEventListener("pointercancel",r),e.addEventListener("wheel",s=>{if(this.mode==="explore"){s.preventDefault();const l=s.deltaY>0?1.08:.92;this.exploreSpherical.radius=k.clamp(this.exploreSpherical.radius*l,35,800),this.updateExploreCameraPosition()}},{passive:!1}),window.addEventListener("click",s=>{var m,c,u;if(s.target.closest("button, a, dialog, input, .ui-panel, .explore-hud")||this.pickingPointer.x===-999)return;this.raycaster.setFromCamera(this.pickingPointer,this.camera);const l=this.raycaster.intersectObjects(this.clickableObjects);if(l.length>0){const f=l[0].object;if((m=f.userData)!=null&&m.isMoon)window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:f.userData.moonId}}));else if((c=f.userData)!=null&&c.isPlanet||f.parent&&f.parent.name.startsWith("Planet_")){const g=((u=f.userData)==null?void 0:u.planetId)||f.parent.name.replace("Planet_","").toLowerCase();window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:g}}))}}}),window.addEventListener("keydown",s=>{s.key==="Escape"&&this.mode==="explore"&&this.setMode("guided")}),window.addEventListener("resize",()=>this.resize(),{passive:!0})}setMode(e){if(this.mode!==e)if(this.mode=e,window.dispatchEvent(new CustomEvent("universe:mode-changed",{detail:{mode:e}})),e==="explore"){D.to(this,{timeDilation:1,duration:.6,ease:"power2.out"}),this.focusedTarget||this.exploreTarget.set(0,0,0);const o=new v().subVectors(this.currentCamPos,this.exploreTarget);this.exploreSpherical.setFromVector3(o),this.exploreSpherical.radius=k.clamp(this.exploreSpherical.radius,35,800),this.exploreSpherical.phi=k.clamp(this.exploreSpherical.phi,.15,Math.PI-.2)}else this.clearFocus()}updateExploreCameraPosition(){this.exploreSpherical.makeSafe(),this.targetCamPos.setFromSpherical(this.exploreSpherical).add(this.exploreTarget),this.targetLookAt.copy(this.exploreTarget)}zoomIn(){this.exploreSpherical.radius=Math.max(35,this.exploreSpherical.radius*.8),this.updateExploreCameraPosition()}zoomOut(){this.exploreSpherical.radius=Math.min(800,this.exploreSpherical.radius*1.25),this.updateExploreCameraPosition()}resetHome(){this.clearFocus(),this.exploreTarget.set(0,0,0),this.exploreSpherical.set(420,Math.PI*.35,0),this.updateExploreCameraPosition()}setFlightProgress(e){this.splineProgress=k.clamp(e,0,1)}setQualityScale(e){const o=Math.max(1,this.dpr*e);this.renderer.setPixelRatio(o)}resize(){this.width=window.innerWidth,this.height=window.innerHeight,this.isMobile=this.width<768,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)}calculateComposedFraming(e,o){var S,d,p,b;const t=e.getPosition(),i=!!((d=(S=e.mesh)==null?void 0:S.userData)!=null&&d.isMoon||(p=e.config)!=null&&p.parentPlanetId),a=((b=e.config)==null?void 0:b.radius)||12,s=((o==null?void 0:o.elevationDeg)||(i?28:22))*Math.PI/180,l=(o==null?void 0:o.distance)||(i?18:a*3.2),m=this.width>=768,c=Math.atan2(t.z,t.x),u=i?c+.45:c+Math.PI-.55,f=t.x+Math.cos(u)*l*Math.cos(s),g=t.y+l*Math.sin(s),P=t.z+Math.sin(u)*l*Math.cos(s),w=new v(f,g,P),y=t.clone();if(m){const h=new v().subVectors(t,w).normalize(),M=new v().crossVectors(h,new v(0,1,0)).normalize();y.addScaledVector(M,l*.32)}return{cameraPos:w,lookAt:y}}enterNightMode(e){var o,t,i,a;this.nightTween&&this.nightTween.kill(),this.activeNightMoon=e,this.nightTween=D.timeline({defaults:{duration:1.2,ease:"power2.out"}}),this.sun.light&&this.nightTween.to(this.sun.light,{intensity:.55},0),(o=this.sun.coronaSprite)!=null&&o.material&&this.nightTween.to(this.sun.coronaSprite.material,{opacity:.12},0),this.renderer&&this.nightTween.to(this.renderer,{toneMappingExposure:.92},0),(i=(t=e.material)==null?void 0:t.uniforms)!=null&&i.uKeyLight?this.nightTween.to(e.material.uniforms.uKeyLight,{value:1},0):((a=e.material)==null?void 0:a.emissiveIntensity)!==void 0&&this.nightTween.to(e.material,{emissiveIntensity:1.25},0)}exitNightMode(){var o,t,i,a,r;if(!this.activeNightMoon)return;this.nightTween&&this.nightTween.kill();const e=this.activeNightMoon;if(this.activeNightMoon=null,this.nightTween=D.timeline({defaults:{duration:.9,ease:"power2.inOut"}}),this.sun.light&&this.nightTween.to(this.sun.light,{intensity:2.8},0),(o=this.sun.coronaSprite)!=null&&o.material&&this.nightTween.to(this.sun.coronaSprite.material,{opacity:.5},0),this.renderer&&this.nightTween.to(this.renderer,{toneMappingExposure:1.08},0),(i=(t=e.material)==null?void 0:t.uniforms)!=null&&i.uKeyLight)this.nightTween.to(e.material.uniforms.uKeyLight,{value:0},0);else if(((a=e.material)==null?void 0:a.emissiveIntensity)!==void 0){const s=(r=e.config)!=null&&r.isMajor?.55:.35;this.nightTween.to(e.material,{emissiveIntensity:s},0)}}focusOnBody(e,o){var a,r,s;if(e==="sun"){this.exitNightMode(),this.focusedTarget={getPosition:()=>new v(0,0,0),offset:new v(0,28,65),isSun:!0},this.exploreTarget.set(0,0,0),D.to(this,{timeDilation:1,duration:.8,ease:"power2.inOut"});return}let t=null,i=!1;typeof e=="string"?(t=this.moons[e]||this.planets[e],i=!!this.moons[e]):e&&typeof e.getPosition=="function"?(t=e,i=!!((r=(a=t.mesh)==null?void 0:a.userData)!=null&&r.isMoon||(s=t.config)!=null&&s.parentPlanetId)):e!=null&&e.id&&(t=this.moons[e.id]||this.planets[e.id],i=!!this.moons[e.id]),t&&(i?(this.activeNightMoon!==t&&this.enterNightMode(t),D.to(this,{timeDilation:.35,duration:.8,ease:"power2.out"})):(this.exitNightMode(),D.to(this,{timeDilation:1,duration:.8,ease:"power2.inOut"})),this.focusedTarget={targetObj:t,customFraming:o,getPosition:()=>t.getPosition()},this.exploreTarget.copy(t.getPosition()))}clearFocus(){this.focusedTarget=null,this.exitNightMode(),D.to(this,{timeDilation:1,duration:.8,ease:"power2.inOut"})}update(e,o){var l,m;this.sun.update(o,this.camera,!!this.focusedTarget),this.starfield.update(o);const t=e*this.timeDilation,i=((m=(l=this.sun)==null?void 0:l.group)==null?void 0:m.position)||this.tempVec.set(0,0,0);if(Object.values(this.planets).forEach(c=>c.update(t,o,i)),Object.values(this.moons).forEach(c=>c.update(t,o,i)),this.hasPointerMoved&&this.pickingPointer.x!==-999){this.raycaster.setFromCamera(this.pickingPointer,this.camera);const c=this.raycaster.intersectObjects(this.clickableObjects);if(c.length>0){const u=c[0].object;this.hoveredObject!==u&&(this.hoveredObject=u,document.body.style.cursor="pointer")}else this.hoveredObject&&(document.body.style.cursor="default",this.hoveredObject=null)}if(this.mode==="explore")this.updateExploreCameraPosition();else if(this.focusedTarget)if(this.focusedTarget.isSun)this.targetCamPos.set(0,28,65),this.targetLookAt.set(0,0,0);else{const c=this.calculateComposedFraming(this.focusedTarget.targetObj,this.focusedTarget.customFraming);this.targetCamPos.copy(c.cameraPos),this.targetLookAt.copy(c.lookAt)}else{const c=this.flightSpline.getPointAt(this.splineProgress),u=this.hasPointerMoved?this.parallax.x*12:0,f=this.hasPointerMoved?this.parallax.y*8:0;this.targetCamPos.copy(c).add(this.tempVec.set(u,f,0));const g=Math.min(1,this.splineProgress+.08),P=this.flightSpline.getPointAt(g);this.splineProgress<.12?this.targetLookAt.set(0,-30,0):this.targetLookAt.copy(P)}const a=Math.min(e,.1),r=1-Math.exp(-4.5*a),s=1-Math.exp(-5.5*a);this.currentCamPos.lerp(this.targetCamPos,r),this.currentLookAt.lerp(this.targetLookAt,s),this.camera.position.copy(this.currentCamPos),this.camera.lookAt(this.currentLookAt)}dispose(){this.renderer.dispose(),this.scene.clear()}}function dt(n,e,o){let t=null,i=null,a=!0;try{t=new He(n,{multisampling:0,frameBufferType:Ue});const r=new je(e,o);t.addPass(r),i=new qe({luminanceThreshold:.85,luminanceSmoothing:.2,intensity:1,mipmapBlur:!0});const s=new Ke({esv:!1,offset:.32,darkness:.42}),l=new Ye,m=new Xe(o,i,s,l);t.addPass(m)}catch(r){if(console.warn("Post-processing fallback to standard pipeline:",r),t){try{t.dispose()}catch{}t=null}a=!1}return{composer:t,isEnabled(){return a},setQuality(r){!a||!i||(r==="low"?i.intensity=.6:r==="medium"?i.intensity=.85:i.intensity=1)},resize(r,s){t&&t.setSize(r,s)},render(r){if(a&&t)try{t.render(r)}catch(s){console.warn("Post-processing runtime error, falling back to standard renderer:",s),a=!1;try{t.dispose()}catch{}t=null,n.render(e,o)}else n.render(e,o)},dispose(){t&&t.dispose()}}}class ht{constructor(e={}){this.onQualityChange=e.onQualityChange||(()=>{}),this.historySize=60,this.frameTimes=new Float32Array(this.historySize),this.frameIndex=0,this.totalSamples=0,this.lastTimestamp=0,this.currentTier="high",this.stableGoodFrames=0,this.fps=60,this.longStallCount=0,this.maxObservedFrameTime=0,this.isSuspended=!1}notifySuspension(){this.isSuspended=!0,this.lastTimestamp=0}resumeClock(e=performance.now()){this.isSuspended=!1,this.lastTimestamp=e}tick(e){if(!this.lastTimestamp||this.isSuspended){this.lastTimestamp=e,this.isSuspended=!1;return}const o=e-this.lastTimestamp;if(this.lastTimestamp=e,o>120){this.longStallCount++,this.maxObservedFrameTime=Math.max(this.maxObservedFrameTime,o);const a=Math.min(o,160);this.recordSample(a)}else this.recordSample(o);let t=0;for(let a=0;a<this.totalSamples;a++)t+=this.frameTimes[a];const i=t/this.totalSamples;this.fps=Math.round(1e3/Math.max(1,i)),this.totalSamples>=30&&(i>20||this.longStallCount>3?(this.stableGoodFrames=0,this.currentTier==="high"?this.setTier("medium"):this.currentTier==="medium"&&(i>24||this.longStallCount>5)&&this.setTier("low")):i<16.8&&this.longStallCount===0&&(this.stableGoodFrames++,this.stableGoodFrames>180&&(this.currentTier==="low"?this.setTier("medium"):this.currentTier==="medium"&&this.setTier("high"),this.stableGoodFrames=0)))}recordSample(e){this.frameTimes[this.frameIndex]=e,this.frameIndex=(this.frameIndex+1)%this.historySize,this.totalSamples<this.historySize&&this.totalSamples++}setTier(e){if(this.currentTier===e)return;this.currentTier=e;let o=1;e==="medium"&&(o=.85),e==="low"&&(o=.72),this.onQualityChange(e,o)}getPercentiles(){if(this.totalSamples===0)return{p50:16.6,p95:16.6,p99:16.6,maxFrameTime:0,longStalls:0,fps:60};const e=Array.from(this.frameTimes.slice(0,this.totalSamples)).sort((a,r)=>a-r),o=e[Math.floor(e.length*.5)],t=e[Math.min(e.length-1,Math.floor(e.length*.95))],i=e[Math.min(e.length-1,Math.floor(e.length*.99))];return{p50:Number(o.toFixed(2)),p95:Number(t.toFixed(2)),p99:Number(i.toFixed(2)),maxFrameTime:Number(this.maxObservedFrameTime.toFixed(2)),longStalls:this.longStallCount,fps:this.fps}}getMetrics(){const e=this.getPercentiles();return{fps:this.fps,tier:this.currentTier,longStallCount:this.longStallCount,maxObservedFrameTime:this.maxObservedFrameTime,percentiles:e}}}class ut{constructor(e){this.container=e,this.items=[],this.tempVec=new v,this.visibleRects=[],this.exclusionZones=[],this.selectedId=null,document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>this.remeasure())}register(e,o,t,i,a,r){const s=document.createElement("button");s.type="button",s.className=`celestial-3d-label label-${t} priority-${i}`,s.dataset.id=e,s.setAttribute("aria-label",`Navigate to ${o}`),s.tabIndex=0;const l=document.createElement("span");l.className="label-indicator";const m=document.createElement("span");m.className="label-text",m.textContent=o,s.appendChild(l),s.appendChild(m),r&&s.addEventListener("click",()=>r(e)),this.container.appendChild(s);const c={id:e,name:o,type:t,priority:i,basePriority:i,getPosition:a,element:s,width:0,height:0,isVisible:!0};return this.items.push(c),s}setSelected(e){this.selectedId=e,this.items.forEach(o=>{o.priority=o.id===e?1e3:o.basePriority})}remeasure(){this.items.forEach(e=>{const o=e.element.getBoundingClientRect();o.width>0&&(e.width=o.width,e.height=o.height)})}updateExclusionZones(e,o){this.exclusionZones.length=0;const t=document.querySelector(".nav-header");if(t){const r=t.getBoundingClientRect();r.height>0&&this.exclusionZones.push({left:0,right:e,top:0,bottom:r.bottom+8})}const i=document.querySelector(".hero-cinematic-content");if(i){const r=i.getBoundingClientRect();r.top<o&&r.bottom>0&&this.exclusionZones.push({left:r.left-12,right:r.right+12,top:r.top-12,bottom:r.bottom+12})}const a=document.querySelector(".flight-case-card.is-active-flight");if(a){const r=a.getBoundingClientRect();r.top<o&&r.bottom>0&&this.exclusionZones.push({left:r.left-16,right:r.right+16,top:r.top-16,bottom:r.bottom+16})}}hideItem(e){e.element.style.opacity="0",e.element.style.pointerEvents="none",e.element.setAttribute("aria-hidden","true"),e.element.tabIndex=-1,e.isVisible=!1}showItem(e,o,t,i,a){e.element.style.transform=`translate3d(${(o-i*.5).toFixed(1)}px, ${(t-a*.5).toFixed(1)}px, 0)`,e.element.style.opacity="1",e.element.style.pointerEvents="auto",e.element.removeAttribute("aria-hidden"),e.element.tabIndex=0,e.isVisible=!0}update(e,o,t){this.visibleRects.length=0,this.updateExclusionZones(o,t),this.items.sort((i,a)=>a.priority-i.priority);for(let i=0;i<this.items.length;i++){const a=this.items[i],r=a.getPosition(),s=new v().subVectors(r,e.position),l=e.getWorldDirection(new v);if(s.dot(l)<=e.near+.5){this.hideItem(a);continue}if(a.type!=="sun"){const d=s.length(),p=s.clone().normalize(),b=e.position.clone().negate(),h=b.dot(p);if(h>0&&h<d&&b.lengthSq()-h*h<576&&a.priority<1e3){this.hideItem(a);continue}}if(this.tempVec.copy(r),this.tempVec.project(e),this.tempVec.z>.98||this.tempVec.z<-1){this.hideItem(a);continue}const c=(this.tempVec.x*.5+.5)*o,u=(-(this.tempVec.y*.5)+.5)*t,f=20;if(c<f||c>o-f||u<f||u>t-f){this.hideItem(a);continue}if(!a.width){const d=a.element.getBoundingClientRect();a.width=d.width||80,a.height=d.height||26}const g=a.width,P=a.height,w={left:c-g*.5-6,right:c+g*.5+6,top:u-P*.5-4,bottom:u+P*.5+4};let y=!1;for(let d=0;d<this.exclusionZones.length;d++){const p=this.exclusionZones[d];if(w.left<p.right&&w.right>p.left&&w.top<p.bottom&&w.bottom>p.top){y=!0;break}}if(y&&a.priority<1e3){this.hideItem(a);continue}let S=!1;for(let d=0;d<this.visibleRects.length;d++){const p=this.visibleRects[d];if(w.left<p.right&&w.right>p.left&&w.top<p.bottom&&w.bottom>p.top){S=!0;break}}S&&a.priority<1e3?this.hideItem(a):(this.visibleRects.push(w),this.showItem(a,c,u,g,P))}}dispose(){this.items.forEach(e=>{e.element&&e.element.parentNode&&e.element.parentNode.removeChild(e.element)}),this.items=[]}}const R={sun:{id:"sun",name:"Diwakar Venkat Peddada",classification:"Identity & Overview",orbit:"System Center",status:"AI Developer",problem:"Software portfolios often rely on static screenshots and shallow lists that fail to communicate architectural depth.",whatItDoes:"Central overview orchestrating real-time 3D Keplerian orbital physics, adaptive GPU governance, and cinematic lighting across all technology domains.",stack:["Three.js","WebGL 2","GSAP","Lenis","Vite","postprocessing"],metric:"Real-time 60fps WebGL 3D system, under 100 draw calls, sub-3MB bundle with adaptive GPU governance.",sourceUrl:"https://github.com/Diva143V/myselfdiva"},python:{id:"python",name:"Python",classification:"Primary Language · Biomedical AI",orbit:"Orbit 1 · Python",status:"Core Stack",problem:"Biomedical knowledge graphs and clinical trial registries require robust deterministic pipelines and asynchronous literature collection.",whatItDoes:"Core language for AI literature synthesis, local embedding models, graph traversal algorithms, and automated bioinformatics pipelines.",stack:["Python 3.11+","FastAPI","ChromaDB","Reflex","Pytest"],metric:"Powers Griffin Bio (10 modular collectors) and SyGriffin neoantigen discovery tools.",sourceUrl:"https://github.com/Diva143V/Griffin"},csharp:{id:"csharp",name:"C# / .NET",classification:"Primary Language · Desktop Systems",orbit:"Orbit 2 · C# / .NET",status:"Core Stack",problem:"Windows system audio and Live Captions hooks require low-overhead native interop and high-frequency UI updates without dropping frames.",whatItDoes:"Architecture anchor for native Windows accessibility software, WPF overlays, hardware acceleration, and multi-threaded desktop software.",stack:["C#",".NET 8","WPF","Windows API","SQLite"],metric:"Powers LiveSubs single self-contained .exe with real-time API translation hooks.",sourceUrl:"https://github.com/Diva143V/LiveSubs",releaseUrl:"https://github.com/Diva143V/LiveSubs/releases"},rust:{id:"rust",name:"Rust",classification:"Primary Language · Systems & MCP",orbit:"Orbit 3 · Rust",status:"Core Stack",problem:"LLM agents suffer from catastrophic memory loss across sessions, losing architectural context and human edits.",whatItDoes:"Foundation for high-performance systems programming, MCP protocol servers, graph database indexing, and Tauri cross-platform software.",stack:["Rust 1.85+","PetGraph","SQLite FTS5","Tauri v2","Tokio"],metric:"Powers Knox MCP server with 8 focused tools and strict token budgets.",sourceUrl:"https://github.com/Diva143V/Knox"},typescript:{id:"typescript",name:"TypeScript",classification:"Primary Language · Interfaces & WebGL",orbit:"Orbit 4 · TypeScript",status:"Core Stack",problem:"Interactive 3D environments demand strict type-safety across custom shader uniforms, physics loops, and complex DOM overlays.",whatItDoes:"Powers modern frontend architecture, Three.js 3D graphics, reactive user interfaces, and client-side tooling.",stack:["TypeScript","Three.js","Vite","React 19","GSAP"],metric:"Architectural foundation for myselfdiva 3D universe and interactive web applications.",sourceUrl:"https://github.com/Diva143V/myselfdiva"},cpp:{id:"cpp",name:"C++",classification:"Primary Language · Algorithms & Performance",orbit:"Orbit 5 · C++",status:"Core Stack",problem:"Time-critical algorithmic competitions require microsecond-level cache locality and manual memory optimization.",whatItDoes:"High-performance competitive programming, custom search data structures, branch-prediction tuning, and memory layout optimization.",stack:["C++20","Data Structures","Competitive Programming","Algorithms"],metric:"1st place solver in HackMe 2024 optimization challenge.",sourceUrl:"https://github.com/Diva143V"},livesubs:{id:"livesubs",name:"LiveSubs",classification:"Project · Real-Time Windows Subtitle Overlay",orbit:"Orbit 2 · C# / .NET",status:"Shipped",problem:"Speech in meetings, video calls, and streams moves faster than users can read or translate using conventional transcription windows.",whatItDoes:"Captures Windows Live Captions in real time, translates recognized speech through 9+ API backends (Google, DeepL, OpenAI, Ollama, LM Studio), and renders a responsive, always-on-top customizable subtitle bar over any active window or call.",stack:["C#",".NET 8","WPF","Windows Live Captions API","SQLite"],metric:"9+ translation backends supported; self-contained single .exe (Windows x64) with zero runtime install; settings persisted in %AppData%\\LiveSubs\\setting.json; optional SQLite translation history database.",sourceUrl:"https://github.com/Diva143V/LiveSubs",releaseUrl:"https://github.com/Diva143V/LiveSubs/releases"},griffin:{id:"griffin",name:"Griffin Bio",classification:"Project · Scientific Evidence Synthesis",orbit:"Orbit 1 · Python",status:"Active",problem:"Biomedical research papers are scattered across fragmented databases with conflicting clinical claims that take weeks to manually cross-check.",whatItDoes:"Collects literature and scientific data from 10 modular source collectors, merges and deduplicates entries, generates sentence embeddings, and executes an automated Mixture-of-LLMs pipeline for claim extraction, Oxford evidence ranking, contradiction detection, and consensus synthesis surfaced through a Reflex web dashboard.",stack:["Python","ChromaDB","Ollama","Graph RAG","Reflex","Mixture of LLMs"],metric:"10 modular source collectors (PubMed, Europe PMC, Semantic Scholar, OpenAlex, ClinicalTrials, bioRxiv, ChEMBL, UniProt, PubChem, dbSNP); Oxford Levels of Evidence ranking; 7 specialized reasoning agents.",sourceUrl:"https://github.com/Diva143V/Griffin"},knox:{id:"knox",name:"Knox",classification:"Project · Causal Knowledge Graph & MCP Server",orbit:"Orbit 3 · Rust",status:"Shipped",problem:"AI coding agents suffer from catastrophic amnesia, losing architectural rationale, design decisions, and constraints across sessions and tool switches.",whatItDoes:"A persistent, cross-platform causal knowledge graph and Model Context Protocol (MCP) server built in Rust. It captures architectural decisions, pre-flight constraints, and developer human edits across disparate coding sessions (Antigravity, Cursor, Claude Code, Gemini CLI), giving AI agents long-term causal memory.",stack:["Rust 1.85+","SQLite WAL & FTS5","PetGraph","Tauri v2","React 19","Tailwind v4","D3 Physics"],metric:"8 focused MCP tools (knox_begin, knox_context, knox_check, knox_trace, knox_record, knox_handoff, knox_ask, knox_update); tool definition footprint budgeted <= 850 tokens; 50-pair calibrated guardrail with 0.60 overlap threshold; 5.46 MB LZMA setup wizard.",sourceUrl:"https://github.com/Diva143V/Knox"},sygriffin:{id:"sygriffin",name:"SyGriffin",classification:"Project · Neoantigen Discovery Engine",orbit:"Orbit 1 · Python",status:"Active · Scientific MVP",problem:"Identifying clinically viable neoantigen candidates from raw tumor mutations requires complex, opaque computational biology pipelines.",whatItDoes:"A CLI-first AI bioinformatics platform and life-sciences research companion that parses tumor VCF files, predicts vaccine-relevant peptide targets, ranks candidates with transparent scoring, and preserves reproducible audit records for cancer vaccine research.",stack:["Python 3.11","Bun 1.3+","VEP","MHCflurry","uv","pytest","mypy"],metric:"Predicts peptide candidates matched to specific HLA alleles (e.g. HLA-A*02:01, melanoma, GRCh37); automated RNA-seq run validation checking matrix structure, sample-ID alignment, replicate counts, and batch-confounding.",sourceUrl:"https://github.com/Diva143V/SyGriffin"},polaris:{id:"polaris",name:"Polaris (Kg-Library-API)",classification:"Project · Think-on-Graph Library",orbit:"Orbit 1 · Python",status:"Active",problem:"High LLM inference cost and latency during multi-hop graph queries over complex factual networks.",whatItDoes:"Modular, storage-agnostic Knowledge Graph library with deterministic Python graph traversal and credit-controlled AI escalation.",stack:["Python","FastAPI","Poetry","Think-on-Graph","Pytest"],metric:"Deterministic graph traversal executes in < 5ms; 3-perspective synthesis (Knowledge, Expert, Combined); pluggable Domain Packs for external MCP tools.",sourceUrl:"https://github.com/Diva143V/Kg-Library-API"},sita:{id:"sita",name:"Sita",classification:"Project · Precursor Evidence Pipeline",orbit:"Orbit 1 · Python",status:"Shipped",problem:"Synthesizing disparate clinical evidence on metformin therapy in breast cancer.",whatItDoes:"End-to-end evidence ingestion and contradiction pipeline that laid the architectural foundation for Griffin Bio.",stack:["Python","Embeddings","PubMed API","Semantic Search"],metric:"Aggregated 3 medical databases and resolved semantic contradictions; precursor to Griffin Bio.",sourceUrl:"https://github.com/Diva143V/Sita"},myselfdiva:{id:"myselfdiva",name:"myselfdiva",classification:"Project · 3D Portfolio Universe",orbit:"Orbit 4 · TypeScript",status:"Live",problem:"Flat 2D diagram portfolios fail to communicate real-time systems depth.",whatItDoes:"Rebuilds personal portfolio as a realistic cinematic WebGL 3D universe with PBR materials and Keplerian orbital physics.",stack:["Three.js","Vite","GSAP","Lenis","postprocessing"],metric:"Architectural targets: 60fps simulation budget, under 100 draw calls, and total bundle payload < 3 MB; dynamically governed by AdaptiveGovernor.",sourceUrl:"https://github.com/Diva143V/myselfdiva"},hackme:{id:"hackme",name:"HackMe 2024 Solver",classification:"Competition · 1st Place Win",orbit:"Orbit 5 · C++",status:"First Place",problem:"Naive graph search algorithms timed out under strict competition time constraints.",whatItDoes:"First-place winning algorithmic optimization in C++ redesigning search data structures and pruning redundant search passes.",stack:["C++","Algorithms","Data Structures","Competitive Programming"],metric:"Cut runtime from timeout to sub-second evaluation, winning 1st place at HackMe 2024.",sourceUrl:"https://github.com/Diva143V/myselfdiva"}};R["c#"]=R.csharp;R["c# / .net"]=R.csharp;R["c++"]=R.cpp;class mt{constructor(e){var o;this.universe=e,this.modal=document.getElementById("probe-modal"),this.titleEl=document.getElementById("probe-title"),this.classEl=document.getElementById("probe-classification"),this.problemEl=document.getElementById("probe-problem"),this.actionEl=document.getElementById("probe-action"),this.metricEl=document.getElementById("probe-metric"),this.stackEl=document.getElementById("probe-stack"),this.sourceLinkEl=document.getElementById("probe-source-link"),this.releaseLinkEl=document.getElementById("probe-release-link"),this.closeBtn=(o=this.modal)==null?void 0:o.querySelector(".probe-close-btn"),this.invokerElement=null,this.bindEvents()}bindEvents(){if(!this.modal)return;let e=!1;const o=t=>{const i=this.modal.getBoundingClientRect();return t.clientX<i.left||t.clientX>i.right||t.clientY<i.top||t.clientY>i.bottom};this.modal.addEventListener("pointerdown",t=>{e=o(t)}),this.modal.addEventListener("pointerup",t=>{e&&o(t)&&this.close()}),this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.modal.addEventListener("close",()=>{this.modal.returnValue="",this.universe.clearFocus(),this.invokerElement&&(this.invokerElement.focus(),this.invokerElement=null)}),window.addEventListener("universe:select-moon",t=>{this.open(t.detail.moonId)}),window.addEventListener("universe:select-planet",t=>{this.open(t.detail.planetId)}),document.querySelectorAll("[data-inspect-celestial]").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault(),this.invokerElement=t,this.open(t.dataset.inspectCelestial)})})}open(e){const o=(e||"").toLowerCase().trim(),t=R[o];!t||!this.modal||(this.titleEl&&(this.titleEl.textContent=t.name),this.classEl&&(this.classEl.textContent=`${t.classification} · ${t.orbit}`),this.problemEl&&(this.problemEl.textContent=t.problem),this.actionEl&&(this.actionEl.textContent=t.whatItDoes),this.metricEl&&(this.metricEl.textContent=t.metric),this.stackEl&&(this.stackEl.innerHTML="",(t.stack||[]).forEach(i=>{const a=document.createElement("span");a.className="probe-tag",a.textContent=i,this.stackEl.appendChild(a)})),this.sourceLinkEl&&(this.sourceLinkEl.href=t.sourceUrl||"#",this.sourceLinkEl.hidden=!t.sourceUrl),this.releaseLinkEl&&(this.releaseLinkEl.href=t.releaseUrl||"#",this.releaseLinkEl.hidden=!t.releaseUrl),this.universe.focusOnBody(e),this.modal.open||this.modal.showModal())}close(){this.modal&&this.modal.open&&this.modal.close()}}D.registerPlugin(ne);class pt{constructor(e,o){if(this.universe=e,this.probe=o,this.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.lenis=null,this.masterTrigger=null,this.currentCaseIndex=-1,this.caseStudies=A.caseStudies,this.initLenis(),this.initScrollFlight(),this.initCardSteppers(),this.initMagneticButtons(),this.syncCaseCards(this.masterTrigger?this.masterTrigger.progress:0),window.addEventListener("resize",()=>{this.syncCaseCards(this.masterTrigger?this.masterTrigger.progress:0)},{passive:!0}),this.initHashNavigation(),!this.reducedMotion)this.playStagedIgnition();else{const t=document.getElementById("ignition-curtain");t&&(t.style.opacity="0",t.style.display="none")}}initLenis(){this.reducedMotion||(this.lenis=new $e({duration:1.25,easing:e=>Math.min(1,1.001-Math.pow(2,-10*e)),orientation:"vertical",smoothWheel:!0}),this.lenis.on("scroll",ne.update),D.ticker.add(e=>{this.lenis.raf(e*1e3)}),D.ticker.lagSmoothing(0))}initScrollFlight(){const e=document.getElementById("scroll-flight-track");e&&(this.masterTrigger=ne.create({trigger:e,start:"top top",end:"bottom bottom",scrub:1,onUpdate:o=>{const t=o.progress;this.universe.mode==="guided"&&this.universe.setFlightProgress(t),this.syncCaseCards(t)}}),document.querySelectorAll("[data-flight-step]").forEach(o=>{o.addEventListener("click",t=>{const i=parseFloat(o.dataset.flightStep)||0;t.preventDefault(),this.flyToProgress(i)})}),document.querySelectorAll('a[href="#hero"]').forEach(o=>{o.addEventListener("click",t=>{t.preventDefault(),this.flyToTop()})}),document.querySelectorAll('a[href^="#case-"]').forEach(o=>{o.addEventListener("click",t=>{const i=o.getAttribute("href"),a=i.replace("#case-",""),r=this.caseStudies.findIndex(s=>s.id===a);r!==-1&&(t.preventDefault(),this.navigateToCase(r),history.pushState(null,"",i))})}))}syncCaseCards(e){var r;const o=window.innerWidth>=768,t=document.querySelectorAll(".flight-case-card"),i=document.querySelector(".flight-deck");if(!o){t.forEach(s=>{s.style.display="block",s.style.opacity="1",s.removeAttribute("inert")}),i&&(i.style.opacity="1",i.style.pointerEvents="auto");return}if(e<=.08||e>=.99){i&&(i.style.opacity="0",i.style.pointerEvents="none"),t.forEach(s=>{s.style.display="none",s.classList.remove("is-active-flight"),s.setAttribute("inert","")}),this.currentCaseIndex!==-1&&(this.currentCaseIndex=-1,this.universe.clearFocus());return}i&&(i.style.opacity="1",i.style.pointerEvents="auto");let a=-1;for(let s=0;s<this.caseStudies.length;s++){const l=this.caseStudies[s];if(e>=l.progressMin&&e<=l.progressMax){a=s;break}}if(a===-1&&e>.08&&e<.99){let s=1/0;this.caseStudies.forEach((l,m)=>{const c=(l.progressMin+l.progressMax)*.5,u=Math.abs(e-c);u<s&&(s=u,a=m)})}if(t.forEach((s,l)=>{l===a?(s.style.display="block",s.classList.add("is-active-flight"),s.removeAttribute("inert"),s.style.opacity="1",s.style.pointerEvents="auto"):(s.style.display="none",s.classList.remove("is-active-flight"),s.setAttribute("inert",""),s.style.opacity="0",s.style.pointerEvents="none")}),a!==this.currentCaseIndex&&a!==-1){this.currentCaseIndex=a;const s=this.caseStudies[a];this.universe.focusOnBody(s.targetBodyId,s.cameraFraming),(r=window.__UNIVERSE__)!=null&&r.labelManager&&window.__UNIVERSE__.labelManager.setSelected(s.targetBodyId)}}initCardSteppers(){document.querySelectorAll(".flight-case-card").forEach((e,o)=>{const t=e.querySelector(".stepper-prev"),i=e.querySelector(".stepper-next");t&&t.addEventListener("click",a=>{a.preventDefault(),o>0?this.navigateToCase(o-1):this.flyToTop()}),i&&i.addEventListener("click",a=>{if(a.preventDefault(),o<this.caseStudies.length-1)this.navigateToCase(o+1);else{const r=document.getElementById("experience");r&&(this.lenis?this.lenis.scrollTo(r,{duration:1.4}):r.scrollIntoView({behavior:"smooth"}))}})})}navigateToCase(e){if(e<0||e>=this.caseStudies.length)return;const o=window.innerWidth>=768,i=document.querySelectorAll(".flight-case-card")[e];if(o){const a=this.caseStudies[e],r=(a.progressMin+a.progressMax)*.5;this.flyToProgress(r)}else i&&(this.lenis?this.lenis.scrollTo(i,{offset:-80,duration:1.2}):i.scrollIntoView({behavior:"smooth"}))}initHashNavigation(){const e=(o,t=!1)=>{if(!o)return;if(o==="#hero"){this.flyToTop();return}if(o.startsWith("#case-")){const a=o.replace("#case-",""),r=this.caseStudies.findIndex(s=>s.id===a);if(r!==-1){this.navigateToCase(r);return}}const i=document.querySelector(o);i&&(this.lenis?this.lenis.scrollTo(i,{immediate:t,duration:1.4}):i.scrollIntoView({behavior:t?"auto":"smooth"}))};window.location.hash&&setTimeout(()=>e(window.location.hash,!0),150),window.addEventListener("popstate",()=>{e(window.location.hash,!1)})}flyToTop(){this.lenis?this.lenis.scrollTo(0,{duration:1.4}):window.scrollTo({top:0,behavior:"smooth"}),history.pushState(null,"","#hero")}flyToProgress(e){if(e<=0){this.flyToTop();return}const o=document.getElementById("scroll-flight-track");if(!o)return;const t=window.innerWidth>=768;let i;if(t?i=o.offsetTop+(o.offsetHeight-window.innerHeight)*e:i=o.offsetTop-70,this.reducedMotion){window.scrollTo({top:i,behavior:"auto"});return}this.lenis?this.lenis.scrollTo(i,{duration:1.6}):window.scrollTo({top:i,behavior:"smooth"})}playStagedIgnition(){const e=document.getElementById("ignition-curtain"),o=document.querySelector(".hero-cinematic-content"),t=document.querySelectorAll(".hero-word"),i=document.querySelectorAll(".hero-badge, .hero-status-pill, .hero-positioning, .hero-meta-status, .hero-actions"),a=this.reducedMotion||window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=D.timeline({defaults:{ease:"power3.out"}});r.to(this.universe.sun.light,{intensity:3.2,duration:1.8,delay:.2}).to(e,{opacity:0,duration:1.4,onComplete:()=>{e&&(e.style.display="none")}},"-=1.2"),!a&&t.length>0?r.from(t,{y:35,opacity:0,filter:"blur(10px)",duration:1.3,stagger:.16,ease:"power3.out"},"-=1.0").from(i,{y:20,opacity:0,duration:.9,stagger:.1,ease:"power2.out"},"-=0.8"):r.from(o,{opacity:0,duration:.8},"-=0.8")}initMagneticButtons(){if(this.reducedMotion||!window.matchMedia("(hover: hover)").matches)return;document.querySelectorAll(".btn-magnetic").forEach(o=>{let t=null;o.addEventListener("pointerenter",()=>{t=o.getBoundingClientRect()}),o.addEventListener("pointermove",i=>{t||(t=o.getBoundingClientRect());const a=t.left+t.width*.5,r=t.top+t.height*.5,s=(i.clientX-a)*.26,l=(i.clientY-r)*.26;D.to(o,{x:s,y:l,duration:.3,ease:"power2.out"})}),o.addEventListener("pointerleave",()=>{D.to(o,{x:0,y:0,duration:.6,ease:"elastic.out(1, 0.4)"}),t=null})})}destroy(){this.lenis&&this.lenis.destroy(),this.masterTrigger&&this.masterTrigger.kill()}}function vt(){try{const n=document.createElement("canvas");return!!(window.WebGL2RenderingContext&&n.getContext("webgl2"))}catch{return!1}}function pe(){const n=document.getElementById("webgl-universe-container"),e=document.getElementById("labels-3d-overlay");if(!n||!e)return;const o=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!vt()||o){document.body.classList.add("is-static-fallback"),console.info("Serving static complete version (WebGL fallback / prefers-reduced-motion active)."),ve(),ae(),se();return}let t,i,a,r,s,l;try{t=new ct(n,e),i=dt(t.renderer,t.scene,t.camera),a=new ht({onQualityChange:(d,p)=>{t.setQualityScale(p),i.setQuality(d),console.info(`Adaptive Governor: Quality adjusted to [${d}] (scale: ${p})`)}}),r=new ut(e),r.register(A.sun.id,A.sun.name,"sun",A.sun.priority,()=>t.sun.group.position,d=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:d}}))}),A.planets.forEach(d=>{r.register(d.id,`${d.name} (Orbit ${d.orbitIndex})`,"planet",d.priority,()=>t.planets[d.id].getPosition(),p=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:p}}))})}),A.moons.forEach(d=>{const p=d.isMajor?"moon-major":"moon-minor";r.register(d.id,d.name,p,d.priority,()=>t.moons[d.id].getPosition(),b=>{window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:b}}))})}),s=new mt(t),l=new pt(t,s),ft(t,s),ae(),se(),window.__UNIVERSE__={universeScene:t,postProcessing:i,governor:a,labelManager:r,flightController:l,probeModal:s}}catch(d){console.error("WebGL 3D Universe initialization failed, falling back to static presentation:",d),document.body.classList.add("is-static-fallback"),ve(),ae(),se();const p=document.getElementById("ignition-curtain");p&&(p.style.opacity="0",p.style.display="none");return}let m=null,c=performance.now(),u=!1,f=!1,g=document.hidden;function P(d){if(!u)return;const p=Math.min((d-c)/1e3,.1);c=d,a.tick(d),t.update(p,d),r.update(t.camera,t.width,t.height),i.render(p),m=requestAnimationFrame(P)}function w(){const d=!f&&!g;d&&!u?(u=!0,c=performance.now(),a.resumeClock(c),m=requestAnimationFrame(P)):!d&&u&&(u=!1,a.notifySuspension(),m&&(cancelAnimationFrame(m),m=null))}w(),document.addEventListener("visibilitychange",()=>{g=document.hidden,w()}),window.addEventListener("resize",()=>{t.resize(),i.resize(t.width,t.height),r.remeasure()},{passive:!0});const y=document.getElementById("pause-motion-btn");y&&y.addEventListener("click",()=>{f=!f,f?(y.querySelector(".label").textContent="Resume Flight",y.setAttribute("aria-label","Resume orbital 3D flight"),y.classList.add("is-paused")):(y.querySelector(".label").textContent="Pause Flight",y.setAttribute("aria-label","Pause orbital 3D flight"),y.classList.remove("is-paused")),w()});const S=document.getElementById("ist-clock");if(S){const d=()=>{const p=new Date,b=5.5*60*60*1e3,h=p.getTime()+p.getTimezoneOffset()*6e4,M=new Date(h+b),x=C=>String(C).padStart(2,"0");S.textContent=`${x(M.getHours())}:${x(M.getMinutes())}:${x(M.getSeconds())} IST`};d(),setInterval(d,1e3)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",pe):pe();function ft(n,e){const o=document.getElementById("hud-mode-toggle"),t=document.getElementById("hud-controls-group"),i=document.getElementById("hud-zoom-in"),a=document.getElementById("hud-zoom-out"),r=document.getElementById("hud-home"),s=document.getElementById("hud-exit");if(!o)return;function l(m){const c=m==="explore";o.setAttribute("aria-pressed",c?"true":"false");const u=o.querySelector(".camera-dock-label, .hud-mode-text");u&&(u.textContent=c?"Orbiting":"Free Orbit"),o.classList.toggle("is-active",c),t&&(c?t.removeAttribute("hidden"):t.setAttribute("hidden","")),document.body.classList.toggle("is-explore-mode",c)}o.addEventListener("click",()=>{const m=n.mode==="explore"?"guided":"explore";n.setMode(m)}),i&&i.addEventListener("click",()=>n.zoomIn()),a&&a.addEventListener("click",()=>n.zoomOut()),r&&r.addEventListener("click",()=>n.resetHome()),s&&s.addEventListener("click",()=>n.setMode("guided")),window.addEventListener("universe:mode-changed",m=>{l(m.detail.mode)}),l(n.mode)}function ae(){const n=document.getElementById("mobile-menu-btn"),e=document.querySelector(".nav-links");!n||!e||(n.addEventListener("click",()=>{const o=n.getAttribute("aria-expanded")==="true";n.setAttribute("aria-expanded",o?"false":"true"),e.classList.toggle("is-open",!o)}),e.querySelectorAll("a").forEach(o=>{o.addEventListener("click",()=>{n.setAttribute("aria-expanded","false"),e.classList.remove("is-open")})}))}function se(){const n=document.querySelectorAll(".theme-toggle-btn");if(!n.length)return;const e="portfolio-theme-mode";let o=localStorage.getItem(e)==="monochrome";function t(i){o=i,document.documentElement.classList.toggle("is-monochrome",o),n.forEach(a=>{a.setAttribute("aria-pressed",o?"true":"false"),a.classList.toggle("is-active",o);const r=a.querySelector(".label"),s=a.querySelector(".icon");r&&(r.textContent=o?"Color Mode":"B&W Mode"),s&&(s.textContent=o?"◑":"◐"),a.setAttribute("aria-label",o?"Switch to Color mode (Press B)":"Switch to B&W monochrome mode (Press B)")});try{localStorage.setItem(e,o?"monochrome":"color")}catch{}}t(o),n.forEach(i=>{i.addEventListener("click",()=>{t(!o)})}),window.addEventListener("keydown",i=>{const a=document.activeElement;a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.isContentEditable)||(i.key==="b"||i.key==="B")&&(i.preventDefault(),t(!o))})}function ve(){const n=document.getElementById("ignition-curtain");n&&(n.style.opacity="0",n.style.display="none");const e=document.getElementById("probe-modal");e&&document.querySelectorAll("[data-inspect-celestial]").forEach(o=>{o.addEventListener("click",t=>{t.preventDefault(),e.showModal()})})}
