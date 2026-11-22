import{n as X,o as G,h as V,q as j,r as ae,s as oe,t as we,G as U,u as Pe,v as H,w as W,M as N,x as re,y as ne,z as p,f as Se,H as Ce,g as he,I as ue,J as me,C as Q,K as Me,Q as Z,X as Te,Y as Le,e as De,Z as Ee,P as Ae,_ as ke,$ as Ie,S as ze,a0 as Re,a1 as Ne,V as le,a2 as Fe,a3 as Be,a4 as R,a5 as Oe}from"./three-YwLCJ5jb.js";import{g as L,S as se}from"./gsap-Jiz4vAvE.js";import{E as Ge,R as Ve,B as _e,V as We,S as je,a as Ue}from"./postprocessing-whLzqpjz.js";import{L as He}from"./lenis-BXjoyVLH.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();const I={sun:{id:"sun",name:"Diwakar",radius:22,priority:100},planets:[{id:"python",name:"Python",clusterId:"research",orbitIndex:1,radius:9.5,orbitRadius:95,orbitSpeed:.224,initialAngle:.6,inclination:.04,rotationSpeed:.015,color:58777,priority:80,classification:"Primary Language · Biomedical AI",orbit:"Orbit 1 · Python",problem:"Biomedical knowledge graphs and clinical trial registries require robust deterministic pipelines and asynchronous literature collection.",whatItDoes:"Core language for AI literature synthesis, local embedding models, graph traversal algorithms, and automated bioinformatics pipelines.",metric:"Powers Griffin Bio (10 modular collectors) and SyGriffin neoantigen discovery tools.",tags:["Python 3.11+","FastAPI","ChromaDB","Reflex","Pytest"],sourceUrl:"https://github.com/Diva143V/Griffin",description:"Biomedical RAG, local models, and multi-source data pipelines."},{id:"csharp",name:"C# / .NET",clusterId:"realtime",orbitIndex:2,radius:10.5,orbitRadius:175,orbitSpeed:.165,initialAngle:2.4,inclination:-.06,rotationSpeed:.012,color:11032055,priority:80,classification:"Primary Language · Desktop Systems",orbit:"Orbit 2 · C# / .NET",problem:"Windows system audio and Live Captions hooks require low-overhead native interop and high-frequency UI updates without dropping frames.",whatItDoes:"Architecture anchor for native Windows accessibility software, WPF overlays, hardware acceleration, and multi-threaded desktop software.",metric:"Powers LiveSubs single self-contained .exe with real-time API translation hooks.",tags:["C#",".NET 8","WPF","Windows API","SQLite"],sourceUrl:"https://github.com/Diva143V/LiveSubs",description:"Windows accessibility overlays, Live Captions hooks, and WPF software."},{id:"rust",name:"Rust",clusterId:"infrastructure",orbitIndex:3,radius:9,orbitRadius:260,orbitSpeed:.125,initialAngle:4.2,inclination:.08,rotationSpeed:.014,color:16347926,priority:80,classification:"Primary Language · Systems & MCP",orbit:"Orbit 3 · Rust",problem:"LLM agents suffer from catastrophic memory loss across sessions, losing architectural context and human edits.",whatItDoes:"Foundation for high-performance systems programming, MCP protocol servers, graph database indexing, and Tauri cross-platform software.",metric:"Powers Knox MCP server with 8 focused tools and strict token budgets.",tags:["Rust 1.85+","PetGraph","SQLite FTS5","Tauri v2","Tokio"],sourceUrl:"https://github.com/Diva143V/Knox",description:"MCP server stdio engine, causal graph algorithms, and Tauri desktop integration."},{id:"typescript",name:"TypeScript",clusterId:"infrastructure",orbitIndex:4,radius:8,orbitRadius:345,orbitSpeed:.098,initialAngle:5.5,inclination:-.05,rotationSpeed:.012,hasRings:!0,color:61695,priority:80,classification:"Primary Language · Interfaces & WebGL",orbit:"Orbit 4 · TypeScript",problem:"Interactive 3D environments demand strict type-safety across custom shader uniforms, physics loops, and complex DOM overlays.",whatItDoes:"Powers modern frontend architecture, Three.js 3D graphics, reactive user interfaces, and client-side tooling.",metric:"Architectural foundation for myselfdiva 3D universe and interactive web applications.",tags:["TypeScript","Three.js","Vite","React 19","GSAP"],sourceUrl:"https://github.com/Diva143V/myselfdiva",description:"Three.js, WebGL shaders, interface architecture, and modern web apps."},{id:"cpp",name:"C++",clusterId:"infrastructure",orbitIndex:5,radius:8.5,orbitRadius:435,orbitSpeed:.08,initialAngle:1.5,inclination:.07,rotationSpeed:.01,color:15680580,priority:80,classification:"Primary Language · Algorithms & Performance",orbit:"Orbit 5 · C++",problem:"Time-critical algorithmic competitions require microsecond-level cache locality and manual memory optimization.",whatItDoes:"High-performance competitive programming, custom search data structures, branch-prediction tuning, and memory layout optimization.",metric:"1st place solver in HackMe 2024 optimization challenge.",tags:["C++20","Data Structures","Competitive Programming","Algorithms"],sourceUrl:"https://github.com/Diva143V",description:"Algorithmic complexity reduction and high-performance search data structures."}],moons:[{id:"livesubs",name:"LiveSubs",caseId:"livesubs",parentPlanetId:"csharp",isMajor:!0,caseNumber:"01",status:"Shipped",terrainType:"anorthosite",radius:3.5,orbitRadius:26,orbitSpeed:.628,initialAngle:1.2,inclination:.15,priority:95},{id:"griffin",name:"Griffin Bio",caseId:"griffin",parentPlanetId:"python",isMajor:!0,caseNumber:"02",status:"Active",terrainType:"europa_ice",radius:3.5,orbitRadius:24,orbitSpeed:.698,initialAngle:.8,inclination:.12,priority:95},{id:"knox",name:"Knox",caseId:"knox",parentPlanetId:"rust",isMajor:!0,caseNumber:"03",status:"Shipped",terrainType:"volcanic_iron",radius:3.4,orbitRadius:22,orbitSpeed:.571,initialAngle:2.9,inclination:-.16,priority:95},{id:"sygriffin",name:"SyGriffin",caseId:"sygriffin",parentPlanetId:"python",isMajor:!0,caseNumber:"04",status:"Scientific MVP",terrainType:"regolith_crater",radius:3.2,orbitRadius:36,orbitSpeed:.449,initialAngle:3.4,inclination:-.18,priority:95},{id:"polaris",name:"Polaris",parentPlanetId:"python",isMajor:!1,terrainType:"volcanic_iron",radius:2.3,orbitRadius:46,orbitSpeed:.393,initialAngle:5.1,inclination:.1,priority:45},{id:"sita",name:"Sita",parentPlanetId:"python",isMajor:!1,terrainType:"anorthosite",radius:2.2,orbitRadius:56,orbitSpeed:.349,initialAngle:1.9,inclination:-.14,priority:40},{id:"myselfdiva",name:"myselfdiva",parentPlanetId:"typescript",isMajor:!1,terrainType:"europa_ice",radius:2.4,orbitRadius:26,orbitSpeed:.524,initialAngle:2.1,inclination:.1,priority:45},{id:"hackme",name:"HackMe 2024",parentPlanetId:"cpp",isMajor:!1,terrainType:"volcanic_iron",radius:2.3,orbitRadius:24,orbitSpeed:.628,initialAngle:.4,inclination:-.12,priority:45}],caseStudies:[{id:"livesubs",caseNumber:"01",title:"LiveSubs",orbitLabel:"Orbit 2 · C# / .NET",statusLabel:"Shipped",targetBodyId:"livesubs",parentPlanetId:"csharp",problem:"Speech in live streams, lectures, and calls moves faster than users can follow or translate using clumsy floating web translation windows.",description:"Captures Windows Live Captions in real time, translates recognized speech through 9+ API backends (Google, DeepL, OpenAI, Ollama, LM Studio), and renders a responsive, always-on-top customizable subtitle bar over any active window or call.",metric:"9+ translation backends supported; self-contained single .exe (Windows x64) with zero runtime install; settings persisted in %AppData%\\LiveSubs\\setting.json; optional SQLite translation history database.",tags:["C#",".NET 8","WPF","Windows Live Captions","SQLite"],sourceUrl:"https://github.com/Diva143V/LiveSubs",releaseUrl:"https://github.com/Diva143V/LiveSubs/releases",progressMin:.14,progressMax:.33,cameraFraming:{elevationDeg:28,distance:36,targetOffsetX:-14,targetOffsetY:3}},{id:"griffin",caseNumber:"02",title:"Griffin Bio",orbitLabel:"Orbit 1 · Python",statusLabel:"Active",targetBodyId:"griffin",parentPlanetId:"python",problem:"Biomedical research papers are scattered across fragmented databases with conflicting clinical claims that take weeks to manually cross-check.",description:"Scientific evidence synthesis and contradiction workbench. Collects literature from 10 modular source collectors, merges and deduplicates entries, generates sentence embeddings, and executes an automated Mixture-of-LLMs pipeline for claim extraction, Oxford evidence ranking, and consensus reports surfaced in Reflex.",metric:"10 modular source collectors (PubMed, Europe PMC, Semantic Scholar, OpenAlex, ClinicalTrials, bioRxiv, ChEMBL, UniProt, PubChem, dbSNP); Oxford Levels of Evidence ranking; 7 specialized reasoning agents with automated priority fallback.",tags:["Python","ChromaDB","Ollama","Graph RAG","Reflex","Mixture of LLMs"],sourceUrl:"https://github.com/Diva143V/Griffin",progressMin:.35,progressMax:.54,cameraFraming:{elevationDeg:30,distance:38,targetOffsetX:-15,targetOffsetY:3}},{id:"knox",caseNumber:"03",title:"Knox",orbitLabel:"Orbit 3 · Rust",statusLabel:"Shipped",targetBodyId:"knox",parentPlanetId:"rust",problem:"AI coding agents suffer from catastrophic amnesia, losing architectural rationale, design decisions, and constraints across sessions.",description:"Persistent, cross-platform causal knowledge graph and Model Context Protocol (MCP) server in Rust. Captures architectural decisions, pre-flight constraints, and Git human edits, giving AI agents long-term causal memory across sessions.",metric:"8 focused MCP tools (knox_begin, knox_context, knox_check, knox_trace, knox_record, knox_handoff, knox_ask, knox_update); tool definition footprint budgeted <= 850 tokens; 50-pair calibrated guardrail with 0.60 overlap threshold; 5.46 MB LZMA setup wizard.",tags:["Rust 1.85+","SQLite WAL & FTS5","PetGraph","Tauri v2","React 19","D3 Physics"],sourceUrl:"https://github.com/Diva143V/Knox",progressMin:.56,progressMax:.75,cameraFraming:{elevationDeg:28,distance:35,targetOffsetX:-14,targetOffsetY:3}},{id:"sygriffin",caseNumber:"04",title:"SyGriffin",orbitLabel:"Orbit 1 · Python",statusLabel:"Scientific MVP",targetBodyId:"sygriffin",parentPlanetId:"python",problem:"Identifying clinically viable neoantigen candidates from raw tumor sequencing requires complex, opaque computational biology pipelines.",description:"CLI-first AI bioinformatics platform and life-sciences research companion that parses tumor VCF files, predicts vaccine-relevant peptide targets, ranks candidates with transparent scoring, and preserves reproducible audit records for cancer vaccine research.",metric:"Predicts peptide candidates matched to specific HLA alleles (e.g. HLA-A*02:01, melanoma, GRCh37); automated RNA-seq run validation checking matrix structure, sample-ID alignment, and batch-confounding.",tags:["Python 3.11","Bun 1.3+","VEP","MHCflurry","uv","pytest","mypy"],sourceUrl:"https://github.com/Diva143V/SyGriffin",progressMin:.77,progressMax:.98,cameraFraming:{elevationDeg:34,distance:44,targetOffsetX:-14,targetOffsetY:2}}],splineWaypoints:[{x:0,y:220,z:460},{x:45,y:65,z:175},{x:120,y:45,z:120},{x:160,y:50,z:-80},{x:-120,y:75,z:-220},{x:0,y:240,z:560}]};function qe(r=3400){const e=new X,i=new Float32Array(r*3),t=new Float32Array(r*3),o=new Float32Array(r),a=new Float32Array(r*2),s=480,n=1400;for(let d=0;d<r;d++){const S=Math.random(),T=Math.random(),D=S*2*Math.PI,w=Math.acos(2*T-1),M=s+Math.random()*(n-s),k=M*Math.sin(w)*Math.cos(D),A=M*Math.sin(w)*Math.sin(D)*.45,O=M*Math.cos(w);if(i[d*3]=k,i[d*3+1]=A,i[d*3+2]=O,d<r*.65)t[d*3]=.85,t[d*3+1]=.9,t[d*3+2]=1,o[d]=1,a[d*2]=.8+Math.random()*1.5,a[d*2+1]=Math.random()*Math.PI*2;else if(d<r*.92){const F=Math.random()>.45;t[d*3]=F?.98:.92,t[d*3+1]=F?.72:.94,t[d*3+2]=F?.22:.98,o[d]=1.6,a[d*2]=1.5+Math.random()*2.5,a[d*2+1]=Math.random()*Math.PI*2}else t[d*3]=1,t[d*3+1]=.98,t[d*3+2]=.92,o[d]=2.4,a[d*2]=2+Math.random()*3,a[d*2+1]=Math.random()*Math.PI*2}e.setAttribute("position",new G(i,3)),e.setAttribute("color",new G(t,3)),e.setAttribute("size",new G(o,1)),e.setAttribute("twinkle",new G(a,2));const l=new V({uniforms:{uTime:{value:0}},vertexShader:`
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
    `,transparent:!0,depthWrite:!1,blending:j}),c=new ae(e,l);c.matrixAutoUpdate=!1,c.updateMatrix();const m=450,h=new X,g=new Float32Array(m*3),f=new Float32Array(m*3);for(let d=0;d<m;d++){const S=d/m*Math.PI*2,T=550+Math.random()*300,D=(Math.random()-.5)*140;g[d*3]=Math.cos(S)*T+D,g[d*3+1]=(Math.random()-.5)*90,g[d*3+2]=Math.sin(S)*T+D,Math.random()>.6?(f[d*3]=.96*.25,f[d*3+1]=.62*.25,f[d*3+2]=.04*.25):(f[d*3]=.15*.3,f[d*3+1]=.25*.3,f[d*3+2]=.55*.3)}h.setAttribute("position",new G(g,3)),h.setAttribute("color",new G(f,3));const x=document.createElement("canvas");x.width=64,x.height=64;const y=x.getContext("2d"),b=y.createRadialGradient(32,32,0,32,32,32);b.addColorStop(0,"rgba(255, 255, 255, 0.85)"),b.addColorStop(.35,"rgba(255, 255, 255, 0.35)"),b.addColorStop(.7,"rgba(255, 255, 255, 0.08)"),b.addColorStop(1,"rgba(255, 255, 255, 0)"),y.fillStyle=b,y.fillRect(0,0,64,64);const C=new oe(x),u=new we({size:28,map:C,vertexColors:!0,transparent:!0,opacity:.09,depthWrite:!1,blending:j}),v=new ae(h,u);v.matrixAutoUpdate=!1,v.updateMatrix();const P=new U;return P.add(c),P.add(v),{group:P,update(d){l.uniforms.uTime.value=d}}}const J={uniforms:{uTime:{value:0},uColorCore:{value:[1,.98,.88]},uColorMid:{value:[.96,.62,.04]},uColorLimb:{value:[.72,.22,.02]},uGranulationScale:{value:6.5},uTurbulenceSpeed:{value:.18}},vertexShader:`
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,fragmentShader:`
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

    // Fast 3D Simplex Noise
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

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

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
      return 42.0 * dot(m * m, vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    }

    // Fractal Brownian Motion for rich solar convection granulation
    float fbm(vec3 p) {
      float total = 0.0;
      float amp = 0.55;
      float freq = 1.0;
      for (int i = 0; i < 4; i++) {
        total += snoise(p * freq) * amp;
        freq *= 2.08;
        amp *= 0.48;
      }
      return total;
    }

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      // Astrophysical Limb Darkening factor: 1.0 at center, 0.0 at grazing edge
      float NdotV = max(dot(normal, viewDir), 0.0);
      float limbDarkening = pow(NdotV, 0.65);

      // Convective Granulation Coordinates moving across spherical domain
      float t = uTime * uTurbulenceSpeed;
      vec3 p = normalize(vPosition) * uGranulationScale;
      
      // Dual-phase swirling noise for boiling plasma look
      float noise1 = fbm(p + vec3(t * 0.4, t * 0.2, t * 0.15));
      float noise2 = fbm(p * 1.8 - vec3(t * 0.25, -t * 0.35, t * 0.1));
      float convection = (noise1 * 0.65 + noise2 * 0.35) * 0.5 + 0.5;

      // Color thermal gradient: Core -> Mid -> Limb
      vec3 surfaceColor = mix(uColorMid, uColorCore, pow(convection, 1.4));
      surfaceColor = mix(uColorLimb, surfaceColor, limbDarkening);

      // Controlled emission preserving convective detail and amber limb without white-out clipping
      float emission = 1.05 + pow(convection, 2.2) * 0.35 + (1.0 - limbDarkening) * 0.25;
      vec3 finalColor = surfaceColor * emission;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `};function Ke(r=24){const e=new U;e.name="Sun";const i=new Pe(16775917,2.8,1800,1.2);i.position.set(0,0,0),e.add(i);const t=new H(r,64,48),o=new V({uniforms:W.clone(J.uniforms),vertexShader:J.vertexShader,fragmentShader:J.fragmentShader}),a=new N(t,o);e.add(a);const s=document.createElement("canvas");s.width=512,s.height=512;const n=s.getContext("2d"),l=n.createRadialGradient(256,256,0,256,256,256);l.addColorStop(0,"rgba(255, 250, 230, 0.95)"),l.addColorStop(.18,"rgba(245, 158, 11, 0.7)"),l.addColorStop(.45,"rgba(217, 119, 6, 0.28)"),l.addColorStop(.75,"rgba(180, 83, 9, 0.08)"),l.addColorStop(1,"rgba(0, 0, 0, 0)"),n.fillStyle=l,n.fillRect(0,0,512,512);const c=new oe(s),m=new re({map:c,blending:j,transparent:!0,opacity:.5,depthWrite:!1}),h=new ne(m);h.scale.set(r*2.6,r*2.6,1),e.add(h);const g=document.createElement("canvas");g.width=512,g.height=128;const f=g.getContext("2d"),x=f.createRadialGradient(256,64,0,256,64,256);x.addColorStop(0,"rgba(255, 240, 200, 0.45)"),x.addColorStop(.2,"rgba(245, 158, 11, 0.22)"),x.addColorStop(.8,"rgba(0, 0, 0, 0)"),f.fillStyle=x,f.fillRect(0,0,512,128);const y=new oe(g),b=new re({map:y,blending:j,transparent:!0,opacity:.35,depthWrite:!1}),C=new ne(b);return C.scale.set(r*6.5,r*1.4,1),e.add(C),{group:e,light:i,mesh:a,coronaSprite:h,streakSprite:C,update(u,v){o.uniforms.uTime.value=u;const P=1+Math.sin(u*1.4)*.035;h.scale.set(r*2.6*P,r*2.6*P,1)}}}const ee={uniforms:{uColor:{value:new p(.22,.74,.97)},uTwilightColor:{value:new p(.98,.45,.12)},uSunPosition:{value:new p(0,0,0)},uAtmospherePower:{value:3.5},uAtmosphereIntensity:{value:1.6}},vertexShader:`
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;

      gl_Position = projectionMatrix * mvPosition;
    }
  `,fragmentShader:`
    uniform vec3 uColor;
    uniform vec3 uTwilightColor;
    uniform vec3 uSunPosition;
    uniform float uAtmospherePower;
    uniform float uAtmosphereIntensity;

    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      // Inverted Fresnel for back-face atmosphere shell: brightest at the grazing horizon
      float fresnel = 1.0 - max(dot(normal, viewDir), 0.0);
      fresnel = pow(fresnel, uAtmospherePower);

      // Light direction from planetary surface to the Sun at (0, 0, 0)
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);
      
      // Rayleigh day/night limb modulation: atmosphere glows on the sun-facing limb
      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.2, 0.35, NdotL);
      float twilightFactor = smoothstep(-0.25, 0.05, NdotL) * smoothstep(0.4, 0.0, NdotL);

      // Alpha falls off on the night side so the atmosphere doesn't glow in dark shadow
      float alpha = fresnel * (0.08 + 0.92 * dayFactor) * uAtmosphereIntensity;
      
      // Shift towards twilight amber/vermilion at grazing terminator
      vec3 finalColor = mix(uColor, uTwilightColor, twilightFactor * 0.75);
      finalColor *= (0.8 + 0.5 * dayFactor);

      gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
    }
  `},te={uniforms:{uSunPosition:{value:new p(0,0,0)},uPlanetPosition:{value:new p(0,0,0)},uPlanetRadius:{value:20},uInnerRadius:{value:20*1.45},uOuterRadius:{value:20*2.5}},vertexShader:`
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    varying vec3 vLocalPosition;

    void main() {
      vUv = uv;
      vLocalPosition = position;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,fragmentShader:`
    uniform vec3 uSunPosition;
    uniform vec3 uPlanetPosition;
    uniform float uPlanetRadius;
    uniform float uInnerRadius;
    uniform float uOuterRadius;

    varying vec3 vWorldPosition;
    varying vec2 vUv;
    varying vec3 vLocalPosition;

    void main() {
      float r = length(vLocalPosition.xy);
      if (r < uInnerRadius || r > uOuterRadius) {
        discard;
      }

      // Normalized radial coordinate across ring breadth (0.0 at inner, 1.0 at outer)
      float normR = (r - uInnerRadius) / (uOuterRadius - uInnerRadius);

      // Procedural Concentric Ring Bands & Cassini-style Divisions
      float bands = sin(normR * 68.0) * 0.5 + 0.5;
      float microGrooves = sin(normR * 240.0) * 0.25 + 0.75;
      
      // Major Division (Gap) around 0.65
      float gap = smoothstep(0.015, 0.04, abs(normR - 0.64));

      float density = bands * microGrooves * gap;
      float alpha = clamp(0.35 + density * 0.55, 0.0, 0.88);

      // Color Palette: Glacial Cyan-Ice, Frost Silver, Pale Gold Dust
      vec3 innerDust = vec3(0.55, 0.85, 1.0);
      vec3 midIce = vec3(0.85, 0.95, 1.0);
      vec3 outerRing = vec3(0.42, 0.72, 0.92);

      vec3 ringColor = mix(innerDust, midIce, smoothstep(0.0, 0.5, normR));
      ringColor = mix(ringColor, outerRing, smoothstep(0.5, 1.0, normR));

      // --- ANALYTICAL PLANET SHADOW CASTING ---
      // Vector from Sun to Ring Fragment
      vec3 sunToFrag = vWorldPosition - uSunPosition;
      vec3 rayDir = normalize(sunToFrag);

      // Vector from Sun to Planet Center
      vec3 sunToPlanet = uPlanetPosition - uSunPosition;

      // Project Planet Center onto the Sun-to-Fragment Ray
      float t = dot(sunToPlanet, rayDir);

      // Check if ring fragment is behind the planet relative to the Sun
      float shadowFactor = 1.0;
      if (t > 0.0 && length(sunToFrag) > t) {
        // Closest approach vector from planet center to ray
        vec3 closestPoint = uSunPosition + rayDir * t;
        float distToRay = length(closestPoint - uPlanetPosition);

        // Soft penumbra edge at planet radius
        shadowFactor = smoothstep(uPlanetRadius * 0.96, uPlanetRadius * 1.04, distToRay);
      }

      // Lighting calculation
      vec3 ambient = vec3(0.04, 0.06, 0.08);
      vec3 litColor = ringColor * (ambient + shadowFactor * 1.15);

      gl_FragColor = vec4(litColor, alpha * (0.2 + 0.8 * shadowFactor));
    }
  `},q=`
  // Mod289 and permute utilities
  vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  // 3D Simplex Noise by Ian McEwan, Ashima Arts / Stefan Gustavson
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

  // 3D Fractal Brownian Motion
  float fbm3D(vec3 p, int octaves) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    for (int i = 0; i < 6; ++i) {
      if (i >= octaves) break;
      v += a * snoise(p);
      p = p * 2.05 + shift;
      a *= 0.5;
    }
    return v;
  }

  // Fast 3D Hash
  vec3 hash33(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.xxy + p.yxx) * p.zyx);
  }

  // 3D Voronoi Cellular Distance
  float voronoi3D(vec3 p) {
    vec3 b = floor(p);
    vec3 f = fract(p);
    float d = 1.0;
    for (int z = -1; z <= 1; z++) {
      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec3 lattice = vec3(float(x), float(y), float(z));
          vec3 offset = hash33(b + lattice);
          vec3 diff = lattice + offset - f;
          d = min(d, length(diff));
        }
      }
    }
    return d;
  }
`,K=`
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
`,pe={uniforms:{uTime:{value:0},uSunPosition:{value:new p(0,0,0)}},vertexShader:K,fragmentShader:`
    ${q}

    uniform float uTime;
    uniform vec3 uSunPosition;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);

      // Light angle & twilight terminator
      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.15, 0.25, NdotL);
      float twilight = smoothstep(-0.25, 0.1, NdotL) * smoothstep(0.35, 0.0, NdotL);

      // 3D Procedural Terrain Elevation
      vec3 p = vPosition * 3.4;
      float elevation = fbm3D(p, 5);

      vec3 surfaceColor;
      float specular = 0.0;

      if (elevation < 0.08) {
        // --- OCEAN ABYSS ---
        float depth = smoothstep(0.08, -0.4, elevation);
        vec3 deepAbyss = vec3(0.02, 0.06, 0.16);
        vec3 coastalShallow = vec3(0.0, 0.72, 0.88);
        surfaceColor = mix(coastalShallow, deepAbyss, depth);

        // Sun Glint Specular on Water
        vec3 halfVec = normalize(lightDir + viewDir);
        float specAngle = max(dot(normal, halfVec), 0.0);
        specular = pow(specAngle, 48.0) * 1.8 * dayFactor;
      } else {
        // --- CONTINENTAL LANDMASS ---
        float landHeight = smoothstep(0.08, 0.45, elevation);
        vec3 lowLands = vec3(0.04, 0.14, 0.16);
        vec3 highPlateaus = vec3(0.08, 0.22, 0.24);
        surfaceColor = mix(lowLands, highPlateaus, landHeight);
      }

      // --- DYNAMIC CLOUD LAYER (3D Simplex Drift) ---
      vec3 cloudCoord = vPosition * 4.2 + vec3(uTime * 0.018, uTime * 0.008, uTime * 0.012);
      float cloudDensity = smoothstep(0.12, 0.65, fbm3D(cloudCoord, 4));
      vec3 cloudColor = vec3(0.92, 0.96, 1.0);

      // Shadow cast by clouds onto land
      surfaceColor *= (1.0 - cloudDensity * 0.42 * dayFactor);
      surfaceColor = mix(surfaceColor, cloudColor, cloudDensity * 0.85);

      // --- NIGHT-SIDE BIOLUMINESCENT ENERGY GRID ---
      float nightFactor = 1.0 - dayFactor;
      float circuitGrid = 0.0;
      if (elevation >= 0.04) {
        // Antialiased subtle neural arteries
        float net1 = smoothstep(0.72, 0.88, sin(vPosition.x * 20.0 + fbm3D(vPosition * 6.0, 3) * 4.0));
        float net2 = smoothstep(0.72, 0.88, cos(vPosition.y * 20.0 + fbm3D(vPosition * 6.0, 3) * 4.0));
        circuitGrid = max(net1, net2) * smoothstep(0.04, 0.25, elevation);
      }
      vec3 bioluminescentGlow = vec3(0.02, 0.65, 0.55) * circuitGrid * 0.65 * nightFactor;

      // Twilight horizon warming (amber-gold at terminator)
      vec3 twilightColor = vec3(0.96, 0.45, 0.15) * twilight * 0.45;

      // Final Lighting Combination
      vec3 ambientCosmic = vec3(0.015, 0.025, 0.045);
      vec3 finalColor = surfaceColor * (ambientCosmic + dayFactor * 1.1) + twilightColor;
      finalColor += vec3(1.0, 0.95, 0.85) * specular;
      finalColor += bioluminescentGlow;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},Ye={uniforms:{uTime:{value:0},uSunPosition:{value:new p(0,0,0)}},vertexShader:K,fragmentShader:`
    ${q}

    uniform float uTime;
    uniform vec3 uSunPosition;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);

      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.12, 0.28, NdotL);
      float twilight = smoothstep(-0.25, 0.08, NdotL) * smoothstep(0.35, 0.0, NdotL);

      // Latitudinal shear flow (opposing jet streams)
      float lat = vPosition.y;
      float shearSpeed = sin(lat * 16.0) * 0.06;
      vec3 flowPos = vPosition;
      flowPos.x += uTime * shearSpeed;
      flowPos.z += uTime * shearSpeed * 0.5;

      // Multi-octave domain warping for turbulent storm clouds
      vec3 warpedPos = flowPos * 4.0;
      float warp = fbm3D(warpedPos, 4);
      float bands = fbm3D(warpedPos + warp * 0.65, 5);

      // The Great Amber Vortex (Swirling Storm Eye at lat -0.32)
      vec3 spotCenter = vec3(0.65, -0.32, 0.68);
      float distToSpot = length(vPosition - spotCenter);
      float vortexFactor = smoothstep(0.42, 0.05, distToSpot);
      float vortexSwirl = sin(distToSpot * 24.0 - uTime * 2.2) * vortexFactor;

      // Sci-Fi Jovian Color Palette
      vec3 bandDeepUmber = vec3(0.24, 0.10, 0.03);
      vec3 bandHoneyAmber = vec3(0.96, 0.62, 0.12);
      vec3 bandCream = vec3(0.98, 0.88, 0.65);
      vec3 bandBronze = vec3(0.52, 0.28, 0.08);

      vec3 surfaceColor = mix(bandDeepUmber, bandBronze, smoothstep(-0.4, 0.1, bands));
      surfaceColor = mix(surfaceColor, bandHoneyAmber, smoothstep(0.1, 0.55, bands));
      surfaceColor = mix(surfaceColor, bandCream, smoothstep(0.55, 0.85, bands));

      // Inject Great Amber Vortex
      vec3 eyeColor = vec3(1.0, 0.35, 0.05) * 1.8;
      surfaceColor = mix(surfaceColor, eyeColor, vortexFactor * 0.85 + vortexSwirl * 0.25);

      // Internal Core Radiance (Warm glow penetrating atmosphere)
      vec3 coreRadiance = vec3(0.85, 0.35, 0.05) * 0.15;

      // Final Lighting
      vec3 ambient = vec3(0.02, 0.015, 0.01);
      vec3 twilightColor = vec3(1.0, 0.38, 0.08) * twilight * 0.5;
      vec3 finalColor = surfaceColor * (ambient + dayFactor * 1.15) + coreRadiance + twilightColor;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},Xe={uniforms:{uTime:{value:0},uSunPosition:{value:new p(0,0,0)}},vertexShader:K,fragmentShader:`
    ${q}

    uniform float uTime;
    uniform vec3 uSunPosition;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);

      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.1, 0.22, NdotL);
      float twilight = smoothstep(-0.25, 0.05, NdotL) * smoothstep(0.3, 0.0, NdotL);

      // Inverted Ridge FBM for Sharp Tectonic Canyons & Craters
      vec3 p = vPosition * 4.5;
      float baseNoise = fbm3D(p, 5);
      float ridge = 1.0 - abs(snoise(p * 2.2));
      ridge = pow(ridge, 3.2); // Knife-edge chasms

      // Color Palette: Iron-oxide red, copper dust, scorched basalt
      vec3 ironRed = vec3(0.68, 0.22, 0.08);
      vec3 desertTerracotta = vec3(0.88, 0.44, 0.18);
      vec3 chasmBlack = vec3(0.12, 0.08, 0.06);
      vec3 copperVerdigris = vec3(0.15, 0.52, 0.48); // Subtle copper veins

      vec3 surfaceColor = mix(ironRed, desertTerracotta, smoothstep(-0.3, 0.4, baseNoise));
      surfaceColor = mix(surfaceColor, chasmBlack, ridge * 0.85);

      // Verdigris mineral deposits along canyon edges
      float mineralEdge = smoothstep(0.4, 0.6, ridge) * smoothstep(0.8, 0.6, ridge);
      surfaceColor = mix(surfaceColor, copperVerdigris, mineralEdge * 0.45);

      // Dust storms (drifting iron-sand haze)
      float dustHaze = smoothstep(0.35, 0.75, fbm3D(vPosition * 6.0 + vec3(uTime * 0.015), 3));
      surfaceColor = mix(surfaceColor, desertTerracotta * 1.15, dustHaze * 0.35);

      // Final Lighting
      vec3 ambient = vec3(0.015, 0.01, 0.01);
      vec3 twilightColor = vec3(0.95, 0.25, 0.08) * twilight * 0.4;
      vec3 finalColor = surfaceColor * (ambient + dayFactor * 1.08) + twilightColor;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},Qe={uniforms:{uTime:{value:0},uSunPosition:{value:new p(0,0,0)},uRingInnerRadius:{value:20*1.45},uRingOuterRadius:{value:20*2.5}},vertexShader:K,fragmentShader:`
    ${q}

    uniform float uTime;
    uniform vec3 uSunPosition;
    uniform float uRingInnerRadius;
    uniform float uRingOuterRadius;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);

      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.1, 0.22, NdotL);
      float twilight = smoothstep(-0.25, 0.05, NdotL) * smoothstep(0.3, 0.0, NdotL);

      // Glacial Voronoi Crystalline Crust
      vec3 p = vPosition * 5.2;
      float cellDist = voronoi3D(p);
      float iceNoise = fbm3D(p, 4);

      // Pale Cerulean & Deep Cryogenic Cobalt
      vec3 deepCobalt = vec3(0.04, 0.22, 0.52);
      vec3 glacialCyan = vec3(0.25, 0.75, 0.98);
      vec3 frostWhite = vec3(0.92, 0.98, 1.0);

      vec3 surfaceColor = mix(deepCobalt, glacialCyan, smoothstep(0.1, 0.55, cellDist));
      surfaceColor = mix(surfaceColor, frostWhite, smoothstep(0.3, 0.75, iceNoise));

      // Specular Ice Glint
      vec3 halfVec = normalize(lightDir + viewDir);
      float spec = pow(max(dot(normal, halfVec), 0.0), 36.0) * 1.4 * dayFactor;

      // Analytical Ring Shadow on Planet:
      // Check if light ray from sun passes through the ring's equatorial plane (Y = 0)
      float ringShadow = 1.0;
      if (lightDir.y != 0.0) {
        float t = -vWorldPosition.y / lightDir.y;
        if (t > 0.0) {
          vec3 hitPoint = vWorldPosition + lightDir * t;
          float hitDist = length(hitPoint.xz);
          if (hitDist >= uRingInnerRadius && hitDist <= uRingOuterRadius) {
            ringShadow = 0.28; // Deep shadow cast by rings onto planet
          }
        }
      }

      // Final Lighting
      vec3 ambient = vec3(0.015, 0.03, 0.06);
      vec3 twilightColor = vec3(0.35, 0.82, 1.0) * twilight * 0.45;
      vec3 finalColor = surfaceColor * (ambient + dayFactor * 1.12 * ringShadow) + twilightColor;
      finalColor += vec3(0.7, 0.92, 1.0) * spec * ringShadow;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},$e={uniforms:{uTime:{value:0},uSunPosition:{value:new p(0,0,0)}},vertexShader:K,fragmentShader:`
    ${q}

    uniform float uTime;
    uniform vec3 uSunPosition;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);

      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.15, 0.25, NdotL);

      // Voronoi Tectonic Plates
      vec3 p = vPosition * 4.2;
      float vDist = voronoi3D(p);

      // Fissure distance: sharp boundaries between tectonic plates
      float fissure = smoothstep(0.16, 0.02, vDist);

      // Obsidian Basalt Crust
      vec3 basaltCharcoal = vec3(0.08, 0.09, 0.11);
      vec3 basaltPlate = vec3(0.14, 0.15, 0.18);
      vec3 crustColor = mix(basaltCharcoal, basaltPlate, smoothstep(0.2, 0.6, vDist));

      // Convective Breathing Magma Pulse
      float pulse = 0.85 + 0.35 * sin(uTime * 2.8 + snoise(vPosition * 8.0) * 3.14);
      vec3 magmaYellow = vec3(1.0, 0.95, 0.45);
      vec3 magmaOrange = vec3(1.0, 0.35, 0.02);
      vec3 magmaVermilion = vec3(0.85, 0.08, 0.02);

      vec3 moltenColor = mix(magmaVermilion, magmaOrange, smoothstep(0.0, 0.5, fissure));
      moltenColor = mix(moltenColor, magmaYellow, smoothstep(0.5, 1.0, fissure));
      moltenColor *= (2.4 * pulse); // Intense emissive output for Bloom pass

      // Magma glows on BOTH day and night hemispheres (internal thermal heat)
      vec3 ambient = vec3(0.015, 0.015, 0.02);
      vec3 finalColor = crustColor * (ambient + dayFactor * 0.95) + moltenColor * fissure;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},Ze={python:pe,csharp:Ye,rust:Xe,typescript:Qe,cpp:$e},ce={python:{color:new p(0,.9,.6),twilight:new p(.2,1,.45),power:3.6,intensity:1.8},csharp:{color:new p(.66,.33,.97),twilight:new p(.85,.45,1),power:3.2,intensity:1.8},rust:{color:new p(.98,.45,.09),twilight:new p(1,.25,.05),power:4,intensity:1.7},typescript:{color:new p(0,.94,1),twilight:new p(.15,.75,1),power:3.4,intensity:1.8},cpp:{color:new p(.94,.25,.25),twilight:new p(1,.45,.15),power:4.2,intensity:2}};function Je(r){const e=(r.id||r.name).toLowerCase(),i=new U;i.name="Planet_"+e;const t=Ze[e]||pe,o=r.isGasGiant?72:56,a=new H(r.radius,o,o),s=W.clone(t.uniforms);r.hasRings&&(s.uRingInnerRadius={value:r.radius*1.45},s.uRingOuterRadius={value:r.radius*2.5});const n=new V({uniforms:s,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),l=new N(a,n);l.castShadow=!0,l.receiveShadow=!0,l.userData={isPlanet:!0,planetId:e,config:r},i.add(l);const c=ce[e]||ce.python,m=new H(r.radius*1.038,48,48),h=W.clone(ee.uniforms);h.uColor.value.copy(c.color),h.uTwilightColor.value.copy(c.twilight),h.uAtmospherePower.value=c.power,h.uAtmosphereIntensity.value=c.intensity;const g=new V({uniforms:h,vertexShader:ee.vertexShader,fragmentShader:ee.fragmentShader,side:Se,blending:j,transparent:!0,depthWrite:!1}),f=new N(m,g);i.add(f);let x=null,y=null;if(r.hasRings){const w=r.radius*1.45,M=r.radius*2.5,k=new Ce(w,M,96);k.rotateX(Math.PI*.5);const A=W.clone(te.uniforms);A.uPlanetRadius.value=r.radius,A.uInnerRadius.value=w,A.uOuterRadius.value=M,y=new V({uniforms:A,vertexShader:te.vertexShader,fragmentShader:te.fragmentShader,side:he,transparent:!0,depthWrite:!1}),x=new N(k,y),x.rotation.z=.22,i.add(x)}const b=[],C=128;for(let w=0;w<=C;w++){const M=w/C*Math.PI*2;b.push(new p(Math.cos(M)*r.orbitRadius,Math.sin(M)*r.orbitRadius*(r.inclination||.05),Math.sin(M)*r.orbitRadius))}const u=new X().setFromPoints(b),v=new ue({color:9741240,transparent:!0,opacity:.18,depthWrite:!1}),P=new me(u,v);P.matrixAutoUpdate=!1,P.updateMatrix();let d=r.initialAngle||0;const S=r.orbitRadius,T=r.orbitSpeed,D=r.rotationSpeed||.004;return{group:i,orbitLine:P,config:r,mesh:l,atmoMesh:f,ringMesh:x,surfaceMaterial:n,highlight(w){v.color.set(w?r.color||16096779:9741240),v.opacity=w?.85:.18,h.uAtmosphereIntensity.value=w?c.intensity*2.2:c.intensity},update(w,M=0,k=new p(0,0,0)){d+=T*w;const A=Math.cos(d)*S,O=Math.sin(d)*S*(r.inclination||.05),F=Math.sin(d)*S;i.position.set(A,O,F),l.rotation.y+=D*w,n.uniforms.uTime&&(n.uniforms.uTime.value=M),n.uniforms.uSunPosition&&n.uniforms.uSunPosition.value.copy(k),h.uSunPosition.value.copy(k),y&&(y.uniforms.uSunPosition.value.copy(k),y.uniforms.uPlanetPosition.value.copy(i.position))},getPosition(){return i.position}}}const et=`
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
`,tt=`
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
      p = p * 2.06 + shift;
      a *= 0.5;
    }
    return v;
  }

  vec3 hash33(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.xxy + p.yxx) * p.zyx);
  }

  // 3D Voronoi Cellular Distance
  float voronoi3D(vec3 p) {
    vec3 b = floor(p);
    vec3 f = fract(p);
    float d = 1.0;
    for (int z = -1; z <= 1; z++) {
      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec3 lattice = vec3(float(x), float(y), float(z));
          vec3 offset = hash33(b + lattice);
          vec3 diff = lattice + offset - f;
          d = min(d, length(diff));
        }
      }
    }
    return d;
  }

  // ---------------------------------------------------------------------
  // Crater Morphology Model with Natural Rounded Curvature
  // Excavates smooth parabolic bowl, raises rounded rim, and central peak
  // ---------------------------------------------------------------------
  float singleCrater(vec3 p, float scale, float rimSteepness) {
    float d = voronoi3D(p * scale);
    const float R = 0.40;

    // Excavated interior bowl (negative elevation) with soft bottom
    float bowl = smoothstep(R, 0.08, d);

    // Raised rim lip with soft, natural Gaussian curvature
    float rimDelta = (d - R) * rimSteepness;
    float rim = exp(-rimDelta * rimDelta);

    // Central rebound peak for large impact basins
    float peak = exp(-pow(d * 14.0, 2.0)) * 0.30;

    return (rim * 0.35 + peak * 0.18) - (bowl * 0.42);
  }

  // Multi-octave planetary terrain elevation with dynamic LOD attenuation
  float moonElevation(vec3 p, int terrainType, float lodAttenuation) {
    float h = 0.0;

    if (terrainType == 1) {
      // --- 1: EUROPA ICE ---
      // Cryo-fissures, cycloid fracture lines, and gentle impact scars
      float ridgeA = abs(snoise(p * 4.2));
      float ridgeB = abs(snoise(p * 9.5 + vec3(3.2, 5.8, 1.4)));
      float cracks = 1.0 - smoothstep(0.02, 0.28, ridgeA * ridgeB);
      float microIce = fbm3D(p * 5.0, 3) * 0.16 * lodAttenuation;
      float crater = singleCrater(p, 3.4, 9.0) * 0.22;
      h = cracks * 0.30 + microIce - crater;
    } else if (terrainType == 2) {
      // --- 2: VOLCANIC IRON / BASALT (Knox) ---
      // Caldera basins, volcanic fractures, smooth crater scarring
      float c1 = singleCrater(p, 2.8, 8.5);
      float c2 = singleCrater(p + vec3(1.7, 4.3, 8.1), 6.5, 11.0);
      float c3 = singleCrater(p + vec3(9.2, 2.3, 5.4), 13.5, 14.0) * lodAttenuation;
      float rough = fbm3D(p * 4.5, 3) * 0.18 * lodAttenuation;
      h = c1 * 0.50 + c2 * 0.32 + c3 * 0.15 + rough;
    } else {
      // --- 0: ANORTHOSITE (Luna) & 3: REGOLITH CRATER (SyGriffin) ---
      // Rounded multi-scale impact cratering with natural dust-softened slopes
      float c1 = singleCrater(p, 3.0, 8.5);
      float c2 = singleCrater(p + vec3(3.2, 7.1, 1.9), 6.8, 11.0);
      float c3 = singleCrater(p + vec3(8.5, 2.4, 6.1), 13.5, 14.0) * lodAttenuation;
      float regolith = fbm3D(p * 5.5, 3) * 0.14 * lodAttenuation;
      h = c1 * 0.52 + c2 * 0.34 + c3 * 0.16 + regolith;
    }

    return h;
  }

  // ---------------------------------------------------------------------
  // Anti-Aliased Normal Bump Calculation with Screen-Space Derivative (SSAA)
  // and Silhouette Fresnel Limb Attenuation
  // ---------------------------------------------------------------------
  vec3 calculateSurfaceNormal(vec3 p, vec3 geomNormal, vec3 viewDir, int terrainType, out float outElevation) {
    vec3 up = abs(geomNormal.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 T = normalize(cross(up, geomNormal));
    vec3 B = cross(geomNormal, T);

    // Screen-space derivative anti-aliasing (SSAA):
    // Measures local pixel footprint on the sphere surface in model space
    float pixelWidth = length(fwidth(p));
    float lodAttenuation = 1.0 - smoothstep(0.015, 0.055, pixelWidth);

    // Dynamic epsilon matching local screen pixel footprint
    float eps = max(0.012, pixelWidth * 1.6);

    float h0 = moonElevation(p, terrainType, lodAttenuation);
    float hT = moonElevation(normalize(p + T * eps), terrainType, lodAttenuation);
    float hB = moonElevation(normalize(p + B * eps), terrainType, lodAttenuation);

    outElevation = h0;

    float dHdT = (hT - h0) / eps;
    float dHdB = (hB - h0) / eps;

    // Clamp derivatives to physically realistic slope bounds (< 52 degrees)
    dHdT = clamp(dHdT, -1.6, 1.6);
    dHdB = clamp(dHdB, -1.6, 1.6);

    float bumpScale = (terrainType == 1) ? 0.15 : 0.20;
    vec3 perturbedNormal = normalize(geomNormal - (T * dHdT + B * dHdB) * bumpScale);

    // Silhouette Fresnel Limb Attenuation:
    // Near the grazing silhouette edge of the sphere (geomNormal · viewDir -> 0),
    // smoothly blend the perturbed normal back to geomNormal.
    // This mathematically eliminates black edge tearing and pixel stair-stepping on the sphere boundary!
    float limbFactor = clamp(dot(geomNormal, viewDir), 0.0, 1.0);
    float normalWeight = smoothstep(0.04, 0.30, limbFactor);

    return normalize(mix(geomNormal, perturbedNormal, normalWeight));
  }

  // ---------------------------------------------------------------------
  // Geological Surface Color (Albedo)
  // ---------------------------------------------------------------------
  vec3 getLunarAlbedo(vec3 p, float elevation, int terrainType) {
    if (terrainType == 1) {
      // Europa Ice: pristine bluish-white ice crust with reddish-brown mineral veins in cracks
      vec3 icyCrust = vec3(0.86, 0.91, 0.97);
      vec3 deepCrevasse = vec3(0.42, 0.24, 0.18); // Tholin salts
      vec3 cryoShallow = vec3(0.68, 0.78, 0.88);
      float crackMask = smoothstep(0.05, 0.30, elevation);
      return mix(deepCrevasse, mix(cryoShallow, icyCrust, smoothstep(-0.1, 0.2, elevation)), crackMask);
    } else if (terrainType == 2) {
      // Volcanic Iron: charred basalt with rusty hematite highlands and sulfurous crater lips
      vec3 darkBasalt = vec3(0.09, 0.09, 0.10);
      vec3 ironHighland = vec3(0.24, 0.18, 0.15);
      vec3 slagRim = vec3(0.38, 0.28, 0.18);
      float elevFactor = smoothstep(-0.25, 0.35, elevation);
      float rimFactor = smoothstep(0.18, 0.42, elevation);
      vec3 base = mix(darkBasalt, ironHighland, elevFactor);
      return mix(base, slagRim, rimFactor);
    } else if (terrainType == 3) {
      // Regolith Crater (SyGriffin): dense silver-gray regolith with brilliant ejecta rays
      vec3 darkMelt = vec3(0.13, 0.14, 0.15);
      vec3 regolith = vec3(0.36, 0.38, 0.41);
      vec3 brightEjecta = vec3(0.72, 0.75, 0.79);
      float mariaBlend = smoothstep(-0.20, 0.25, elevation);
      float ejectaBlend = smoothstep(0.20, 0.45, elevation);
      return mix(darkMelt, mix(regolith, brightEjecta, ejectaBlend), mariaBlend);
    } else {
      // 0: Classic Luna Anorthosite (LiveSubs / Sita)
      // Basaltic lowlands (maria) vs anorthosite bright crater highlands (Tycho/Copernicus rays)
      float mariaNoise = fbm3D(p * 1.6, 3);
      float isMaria = smoothstep(0.08, -0.15, mariaNoise + elevation * 0.4);

      vec3 darkMaria = vec3(0.12, 0.13, 0.14);
      vec3 highland = vec3(0.56, 0.58, 0.61);
      vec3 rayEjecta = vec3(0.80, 0.82, 0.86);

      float highlandDetail = smoothstep(-0.15, 0.35, elevation);
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

    // -----------------------------------------------------------------
    // 3. Physical Celestial Lighting: Sun Terminator & Grazing Shadows
    // -----------------------------------------------------------------
    vec3 sunLightDir = normalize(uSunPosition - vWorldPosition);
    float NdotL = dot(surfNormal, sunLightDir);

    // Unforgiving celestial terminator (sharp transition from direct sunlight into pitch shadow)
    float sunDiffuse = smoothstep(-0.02, 0.12, NdotL);

    // Grazing sunlight on elevated crater rims near and slightly past the terminator
    float grazingRim = smoothstep(-0.14, 0.02, NdotL) * smoothstep(0.20, 0.02, NdotL) * max(elevation, 0.0);
    vec3 sunLightColor = vec3(1.0, 0.98, 0.94);

    // -----------------------------------------------------------------
    // 4. Secondary Planetshine (Earthshine) on Night Hemisphere
    // -----------------------------------------------------------------
    vec3 planetDir = normalize(uPlanetPosition - vWorldPosition);
    float NdotP = max(dot(surfNormal, planetDir), 0.0);
    // Planetshine softly bathes the dark hemisphere with the host planet's atmospheric hue
    vec3 planetshine = uPlanetColor * NdotP * 0.30 * (1.0 - sunDiffuse * 0.85);

    // -----------------------------------------------------------------
    // 5. Cinematic Oblique Inspection Key-Light
    // Smoothly illuminates crater relief from the camera's oblique angle when inspecting
    // -----------------------------------------------------------------
    vec3 keyLightDir = normalize(viewDir + vec3(0.9, 0.5, 0.8));
    float NdotKey = max(dot(surfNormal, keyLightDir), 0.0);
    vec3 inspectionLight = vec3(0.94, 0.97, 1.0) * pow(NdotKey, 1.4) * 0.48 * uKeyLight;

    // Deep cosmic background ambient (so dark side is not completely 100% clipped)
    vec3 cosmicAmbient = vec3(0.012, 0.015, 0.020);

    // Total diffuse illumination
    vec3 totalDiffuse = sunDiffuse * sunLightColor + planetshine + inspectionLight + cosmicAmbient;

    // -----------------------------------------------------------------
    // 6. Surface Tech Telemetry Outpost Array
    // Localized surface research post in signature project stack color
    // -----------------------------------------------------------------
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

    // -----------------------------------------------------------------
    // 7. Final Color Synthesis with Soft Luminance Compression
    // -----------------------------------------------------------------
    vec3 surfaceColor = albedo * totalDiffuse;
    surfaceColor += grazingRim * 0.38 * vec3(1.0, 0.96, 0.88); // Warm crater rim highlight
    surfaceColor += outpostGlow;

    // Softly compress any isolated sub-pixel spikes below the 0.85 bloom threshold
    surfaceColor = clamp(surfaceColor, 0.0, 1.4);

    gl_FragColor = vec4(surfaceColor, 1.0);
  }
`,ie={uniforms:{uTime:{value:0},uSunPosition:{value:new p(0,0,0)},uPlanetPosition:{value:new p(0,0,0)},uBeaconColor:{value:new Q(11032055)},uPlanetColor:{value:new Q(11032055)},uTerrainType:{value:0},uKeyLight:{value:0},uHighlight:{value:0}},vertexShader:et,fragmentShader:tt},it={python:58777,csharp:11032055,"c#":11032055,"c# / .net":11032055,rust:16347926,typescript:61695,cpp:15680580,"c++":15680580},de={anorthosite:0,europa_ice:1,volcanic_iron:2,regolith_crater:3};function ot(r,e){const i=new U;i.name="Moon_"+r.id;const t=r.radius||1.6,o=(e.config.id||e.config.name||"python").toLowerCase(),a=it[o]||16096779,s=e.config.color||9741240,n=new H(t,64,48),l=W.clone(ie.uniforms);l.uBeaconColor.value.set(a),l.uPlanetColor.value.set(s);const c=de[r.terrainType]!==void 0?de[r.terrainType]:o==="csharp"?0:o==="rust"?2:o==="typescript"?1:0;l.uTerrainType.value=c;const m=new V({uniforms:l,vertexShader:ie.vertexShader,fragmentShader:ie.fragmentShader}),h=new N(n,m);h.castShadow=!0,h.receiveShadow=!0,h.userData={isMoon:!0,moonId:r.id,config:r},i.add(h);const g=new p(.52,.38,.76).normalize(),f=new U;f.position.copy(g.clone().multiplyScalar(t*.99)),f.quaternion.setFromUnitVectors(new p(0,1,0),g);const x=new Me(t*.015,t*.025,t*.14,6),y=new Z({color:9741240}),b=new N(x,y);b.position.y=t*.07,f.add(b);const C=new Te(t*.06,t*.035,8,1,!0),u=new Z({color:14870768,side:he}),v=new N(C,u);v.position.y=t*.14,v.rotation.x=Math.PI,f.add(v);const P=new H(t*.038,8,8),d=new Z({color:a}),S=new N(P,d);S.position.y=t*.17,f.add(S),h.add(f);const T=84,D=[],w=[],M=new Q(a),k=new Q(3359061);for(let E=0;E<=T;E++){const z=E/T*Math.PI*2;D.push(new p(Math.cos(z)*r.orbitRadius,Math.sin(z)*r.orbitRadius*(r.inclination||.1),Math.sin(z)*r.orbitRadius));const _=k.clone().lerp(M,Math.sin(z*2)*.3+.3);w.push(_.r,_.g,_.b)}const A=new X().setFromPoints(D);A.setAttribute("color",new Le(w,3));const O=new ue({vertexColors:!0,transparent:!0,opacity:r.isMajor?.55:.25,depthWrite:!1}),F=new me(A,O);let Y=r.initialAngle||Math.random()*Math.PI*2;const $=r.orbitRadius,ve=r.orbitSpeed;return{group:i,mesh:h,material:m,stationGroup:f,trailLine:F,config:r,parentPlanet:e,highlight(E){O.opacity=E?.95:r.isMajor?.55:.25,m.uniforms.uHighlight.value=E?1:0},update(E,z=0,_=new p(0,0,0)){Y+=ve*E,h.rotation.y+=.45*E,h.rotation.x=Math.sin(z*.4)*.08;const fe=1+Math.sin(z*3.8)*.28;S.scale.setScalar(fe);const ge=Math.cos(Y)*$,ye=Math.sin(Y)*$*(r.inclination||.1),be=Math.sin(Y)*$;i.position.set(ge,ye,be),m.uniforms.uTime.value=z,m.uniforms.uSunPosition.value.copy(_);const xe=e.getPosition?e.getPosition():e.group.position;m.uniforms.uPlanetPosition.value.copy(xe)},getPosition(){const E=new p;return i.getWorldPosition(E),E}}}class st{constructor(e,i){this.container=e,this.labelContainer=i,this.width=window.innerWidth,this.height=window.innerHeight,this.isMobile=window.innerWidth<768,this.maxDpr=this.isMobile?1.5:2,this.dpr=Math.min(window.devicePixelRatio||1,this.maxDpr),this.scene=new De,this.scene.fog=new Ee(263690,35e-5),this.camera=new Ae(45,this.width/this.height,.5,3500),this.camera.position.set(0,180,420),this.camera.up.set(0,1,0),this.renderer=new ke({powerPreference:"high-performance",antialias:!1,stencil:!1,depth:!0,alpha:!1}),this.renderer.setSize(this.width,this.height),this.renderer.setPixelRatio(this.dpr),this.renderer.toneMapping=Ie,this.renderer.toneMappingExposure=1.08,this.renderer.outputColorSpace=ze,this.container.appendChild(this.renderer.domElement);const t=new Re(263954,.18);this.scene.add(t),this.starfield=qe(this.isMobile?1800:3400),this.scene.add(this.starfield.group),this.sun=Ke(I.sun.radius),this.scene.add(this.sun.group),this.planets={},this.moons={},this.clickableObjects=[],this.setupPlanetarySystem(),this.raycaster=new Ne,this.pickingPointer=new le(-999,-999),this.parallax=new le(0,0),this.hasPointerMoved=!1,this.isCoarsePointer=window.matchMedia("(pointer: coarse)").matches,this.hoveredObject=null,this.focusedTarget=null,this.mode="guided",this.exploreTarget=new p(0,0,0),this.exploreSpherical=new Fe(420,Math.PI*.35,0),this.isDragging=!1,this.previousPointerPos={x:0,y:0},this.flightSpline=this.createFlightSpline(),this.splineProgress=0,this.currentCamPos=new p().copy(this.camera.position),this.targetCamPos=new p().copy(this.camera.position),this.currentLookAt=new p(0,0,0),this.targetLookAt=new p(0,0,0),this.tempVec=new p,this.ignitionProgress=0,this.isIgnited=!1,this.activeNightMoon=null,this.nightTween=null,this.timeDilation=1,this.bindEvents()}setupPlanetarySystem(){I.planets.forEach(e=>{const i=Je(e);this.planets[e.id]=i,this.scene.add(i.group),this.scene.add(i.orbitLine),this.clickableObjects.push(i.mesh)}),I.moons.forEach(e=>{const i=this.planets[e.parentPlanetId];if(!i)return;const t=ot(e,i);this.moons[e.id]=t,i.group.add(t.group),i.group.add(t.trailLine),this.clickableObjects.push(t.mesh)})}createFlightSpline(){const e=I.splineWaypoints.map(i=>new p(i.x,i.y,i.z));return new Be(e,!1,"centripetal",.5)}bindEvents(){const e=this.renderer.domElement,i=new Map;let t=0,o=0,a=0;window.addEventListener("pointermove",n=>{const l=performance.now();if(!(l-a<16)){if(a=l,this.pickingPointer.x=n.clientX/this.width*2-1,this.pickingPointer.y=-(n.clientY/this.height)*2+1,this.hasPointerMoved=!0,this.isCoarsePointer||(this.parallax.x=R.clamp(this.pickingPointer.x,-1,1),this.parallax.y=R.clamp(this.pickingPointer.y,-1,1)),this.mode==="explore"&&i.has(n.pointerId)&&(i.set(n.pointerId,{x:n.clientX,y:n.clientY}),i.size===2&&t>0)){const[c,m]=Array.from(i.values()),h=Math.hypot(c.x-m.x,c.y-m.y);if(h>0){const g=t/h;this.exploreSpherical.radius=R.clamp(o*g,35,800),this.updateExploreCameraPosition()}return}if(this.mode==="explore"&&this.isDragging){const c=n.clientX-this.previousPointerPos.x,m=n.clientY-this.previousPointerPos.y;this.previousPointerPos={x:n.clientX,y:n.clientY};const h=.005;this.exploreSpherical.theta-=c*h,this.exploreSpherical.phi-=m*h,this.exploreSpherical.phi=R.clamp(this.exploreSpherical.phi,.15,Math.PI-.2),this.updateExploreCameraPosition()}}},{passive:!0}),e.addEventListener("pointerdown",n=>{if(this.mode==="explore"){if(i.set(n.pointerId,{x:n.clientX,y:n.clientY}),i.size===1)this.isDragging=!0,this.previousPointerPos={x:n.clientX,y:n.clientY};else if(i.size===2){this.isDragging=!1;const[l,c]=Array.from(i.values());t=Math.hypot(l.x-c.x,l.y-c.y),o=this.exploreSpherical.radius}}});const s=n=>{if(i.delete(n.pointerId),i.size===0)this.isDragging=!1,t=0;else if(i.size===1){const l=Array.from(i.values())[0];this.previousPointerPos={x:l.x,y:l.y},this.isDragging=!0}};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s),e.addEventListener("wheel",n=>{if(this.mode==="explore"){n.preventDefault();const l=n.deltaY>0?1.08:.92;this.exploreSpherical.radius=R.clamp(this.exploreSpherical.radius*l,35,800),this.updateExploreCameraPosition()}},{passive:!1}),window.addEventListener("click",n=>{if(n.target.closest("button, a, dialog, input, .ui-panel, .explore-hud")||this.pickingPointer.x===-999)return;this.raycaster.setFromCamera(this.pickingPointer,this.camera);const l=this.raycaster.intersectObjects(this.clickableObjects);if(l.length>0){const c=l[0].object;if(c.userData?.isMoon)window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:c.userData.moonId}}));else if(c.userData?.isPlanet||c.parent&&c.parent.name.startsWith("Planet_")){const m=c.userData?.planetId||c.parent.name.replace("Planet_","").toLowerCase();window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:m}}))}}}),window.addEventListener("keydown",n=>{n.key==="Escape"&&this.mode==="explore"&&this.setMode("guided")}),window.addEventListener("resize",()=>this.resize(),{passive:!0})}setMode(e){if(this.mode!==e)if(this.mode=e,window.dispatchEvent(new CustomEvent("universe:mode-changed",{detail:{mode:e}})),e==="explore"){L.to(this,{timeDilation:1,duration:.6,ease:"power2.out"}),this.focusedTarget||this.exploreTarget.set(0,0,0);const i=new p().subVectors(this.currentCamPos,this.exploreTarget);this.exploreSpherical.setFromVector3(i),this.exploreSpherical.radius=R.clamp(this.exploreSpherical.radius,35,800),this.exploreSpherical.phi=R.clamp(this.exploreSpherical.phi,.15,Math.PI-.2)}else this.clearFocus()}updateExploreCameraPosition(){this.exploreSpherical.makeSafe(),this.targetCamPos.setFromSpherical(this.exploreSpherical).add(this.exploreTarget),this.targetLookAt.copy(this.exploreTarget)}zoomIn(){this.exploreSpherical.radius=Math.max(35,this.exploreSpherical.radius*.8),this.updateExploreCameraPosition()}zoomOut(){this.exploreSpherical.radius=Math.min(800,this.exploreSpherical.radius*1.25),this.updateExploreCameraPosition()}resetHome(){this.clearFocus(),this.exploreTarget.set(0,0,0),this.exploreSpherical.set(420,Math.PI*.35,0),this.updateExploreCameraPosition()}setFlightProgress(e){this.splineProgress=R.clamp(e,0,1)}setQualityScale(e){const i=Math.max(1,this.dpr*e);this.renderer.setPixelRatio(i)}resize(){this.width=window.innerWidth,this.height=window.innerHeight,this.isMobile=this.width<768,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)}calculateComposedFraming(e,i){const t=e.getPosition(),a=(i?.elevationDeg||30)*Math.PI/180,s=i?.distance||38,n=this.width>=768,c=Math.atan2(t.z,t.x)+.45,m=t.x+Math.cos(c)*s*Math.cos(a),h=t.y+s*Math.sin(a),g=t.z+Math.sin(c)*s*Math.cos(a),f=new p(m,h,g),x=t.clone();if(n){const y=new p().subVectors(t,f).normalize(),b=new p().crossVectors(y,new p(0,1,0)).normalize();x.addScaledVector(b,s*.32)}return{cameraPos:f,lookAt:x}}enterNightMode(e){this.nightTween&&this.nightTween.kill(),this.activeNightMoon=e,this.nightTween=L.timeline({defaults:{duration:1.2,ease:"power2.out"}}),this.sun.light&&this.nightTween.to(this.sun.light,{intensity:.55},0),this.sun.coronaSprite?.material&&this.nightTween.to(this.sun.coronaSprite.material,{opacity:.12},0),this.renderer&&this.nightTween.to(this.renderer,{toneMappingExposure:.92},0),e.material?.uniforms?.uKeyLight?this.nightTween.to(e.material.uniforms.uKeyLight,{value:1},0):e.material?.emissiveIntensity!==void 0&&this.nightTween.to(e.material,{emissiveIntensity:1.25},0)}exitNightMode(){if(!this.activeNightMoon)return;this.nightTween&&this.nightTween.kill();const e=this.activeNightMoon;if(this.activeNightMoon=null,this.nightTween=L.timeline({defaults:{duration:.9,ease:"power2.inOut"}}),this.sun.light&&this.nightTween.to(this.sun.light,{intensity:2.8},0),this.sun.coronaSprite?.material&&this.nightTween.to(this.sun.coronaSprite.material,{opacity:.5},0),this.renderer&&this.nightTween.to(this.renderer,{toneMappingExposure:1.08},0),e.material?.uniforms?.uKeyLight)this.nightTween.to(e.material.uniforms.uKeyLight,{value:0},0);else if(e.material?.emissiveIntensity!==void 0){const i=e.config?.isMajor?.55:.35;this.nightTween.to(e.material,{emissiveIntensity:i},0)}}focusOnBody(e,i){if(e==="sun"){this.exitNightMode(),this.focusedTarget={getPosition:()=>new p(0,0,0),offset:new p(0,28,65),isSun:!0},this.exploreTarget.set(0,0,0),L.to(this,{timeDilation:1,duration:.8,ease:"power2.inOut"});return}let t=null,o=!1;typeof e=="string"?(t=this.moons[e]||this.planets[e],o=!!this.moons[e]):e&&typeof e.getPosition=="function"?(t=e,o=!!(t.mesh?.userData?.isMoon||t.config?.parentPlanetId)):e?.id&&(t=this.moons[e.id]||this.planets[e.id],o=!!this.moons[e.id]),t&&(o?(this.activeNightMoon!==t&&this.enterNightMode(t),L.to(this,{timeDilation:.35,duration:.8,ease:"power2.out"})):(this.exitNightMode(),L.to(this,{timeDilation:1,duration:.8,ease:"power2.inOut"})),this.focusedTarget={targetObj:t,customFraming:i,getPosition:()=>t.getPosition()},this.exploreTarget.copy(t.getPosition()))}clearFocus(){this.focusedTarget=null,this.exitNightMode(),L.to(this,{timeDilation:1,duration:.8,ease:"power2.inOut"})}update(e,i){this.sun.update(i,this.camera),this.starfield.update(i);const t=e*this.timeDilation,o=this.sun?.group?.position||this.tempVec.set(0,0,0);if(Object.values(this.planets).forEach(l=>l.update(t,i,o)),Object.values(this.moons).forEach(l=>l.update(t,i,o)),this.hasPointerMoved&&this.pickingPointer.x!==-999){this.raycaster.setFromCamera(this.pickingPointer,this.camera);const l=this.raycaster.intersectObjects(this.clickableObjects);if(l.length>0){const c=l[0].object;this.hoveredObject!==c&&(this.hoveredObject=c,document.body.style.cursor="pointer")}else this.hoveredObject&&(document.body.style.cursor="default",this.hoveredObject=null)}if(this.mode==="explore")this.updateExploreCameraPosition();else if(this.focusedTarget)if(this.focusedTarget.isSun)this.targetCamPos.set(0,28,65),this.targetLookAt.set(0,0,0);else{const l=this.calculateComposedFraming(this.focusedTarget.targetObj,this.focusedTarget.customFraming);this.targetCamPos.copy(l.cameraPos),this.targetLookAt.copy(l.lookAt)}else{const l=this.flightSpline.getPointAt(this.splineProgress),c=this.hasPointerMoved?this.parallax.x*12:0,m=this.hasPointerMoved?this.parallax.y*8:0;this.targetCamPos.copy(l).add(this.tempVec.set(c,m,0));const h=Math.min(1,this.splineProgress+.08),g=this.flightSpline.getPointAt(h);this.splineProgress<.12?this.targetLookAt.set(0,-30,0):this.targetLookAt.copy(g)}const a=Math.min(e,.1),s=1-Math.exp(-4.5*a),n=1-Math.exp(-5.5*a);this.currentCamPos.lerp(this.targetCamPos,s),this.currentLookAt.lerp(this.targetLookAt,n),this.camera.position.copy(this.currentCamPos),this.camera.lookAt(this.currentLookAt)}dispose(){this.renderer.dispose(),this.scene.clear()}}function at(r,e,i){let t=null,o=null,a=!0;try{t=new Ge(r,{multisampling:0,frameBufferType:Oe});const s=new Ve(e,i);t.addPass(s),o=new _e({luminanceThreshold:.85,luminanceSmoothing:.2,intensity:1,mipmapBlur:!0});const n=new We({esv:!1,offset:.32,darkness:.42}),l=new je,c=new Ue(i,o,n,l);t.addPass(c)}catch(s){if(console.warn("Post-processing fallback to standard pipeline:",s),t){try{t.dispose()}catch{}t=null}a=!1}return{composer:t,isEnabled(){return a},setQuality(s){!a||!o||(s==="low"?o.intensity=.6:s==="medium"?o.intensity=.85:o.intensity=1)},resize(s,n){t&&t.setSize(s,n)},render(s){if(a&&t)try{t.render(s)}catch(n){console.warn("Post-processing runtime error, falling back to standard renderer:",n),a=!1;try{t.dispose()}catch{}t=null,r.render(e,i)}else r.render(e,i)},dispose(){t&&t.dispose()}}}class rt{constructor(e={}){this.onQualityChange=e.onQualityChange||(()=>{}),this.historySize=60,this.frameTimes=new Float32Array(this.historySize),this.frameIndex=0,this.totalSamples=0,this.lastTimestamp=0,this.currentTier="high",this.stableGoodFrames=0,this.fps=60,this.longStallCount=0,this.maxObservedFrameTime=0,this.isSuspended=!1}notifySuspension(){this.isSuspended=!0,this.lastTimestamp=0}resumeClock(e=performance.now()){this.isSuspended=!1,this.lastTimestamp=e}tick(e){if(!this.lastTimestamp||this.isSuspended){this.lastTimestamp=e,this.isSuspended=!1;return}const i=e-this.lastTimestamp;if(this.lastTimestamp=e,i>120){this.longStallCount++,this.maxObservedFrameTime=Math.max(this.maxObservedFrameTime,i);const a=Math.min(i,160);this.recordSample(a)}else this.recordSample(i);let t=0;for(let a=0;a<this.totalSamples;a++)t+=this.frameTimes[a];const o=t/this.totalSamples;this.fps=Math.round(1e3/Math.max(1,o)),this.totalSamples>=30&&(o>20||this.longStallCount>3?(this.stableGoodFrames=0,this.currentTier==="high"?this.setTier("medium"):this.currentTier==="medium"&&(o>24||this.longStallCount>5)&&this.setTier("low")):o<16.8&&this.longStallCount===0&&(this.stableGoodFrames++,this.stableGoodFrames>180&&(this.currentTier==="low"?this.setTier("medium"):this.currentTier==="medium"&&this.setTier("high"),this.stableGoodFrames=0)))}recordSample(e){this.frameTimes[this.frameIndex]=e,this.frameIndex=(this.frameIndex+1)%this.historySize,this.totalSamples<this.historySize&&this.totalSamples++}setTier(e){if(this.currentTier===e)return;this.currentTier=e;let i=1;e==="medium"&&(i=.85),e==="low"&&(i=.72),this.onQualityChange(e,i)}getPercentiles(){if(this.totalSamples===0)return{p50:16.6,p95:16.6,p99:16.6,maxFrameTime:0,longStalls:0,fps:60};const e=Array.from(this.frameTimes.slice(0,this.totalSamples)).sort((a,s)=>a-s),i=e[Math.floor(e.length*.5)],t=e[Math.min(e.length-1,Math.floor(e.length*.95))],o=e[Math.min(e.length-1,Math.floor(e.length*.99))];return{p50:Number(i.toFixed(2)),p95:Number(t.toFixed(2)),p99:Number(o.toFixed(2)),maxFrameTime:Number(this.maxObservedFrameTime.toFixed(2)),longStalls:this.longStallCount,fps:this.fps}}getMetrics(){const e=this.getPercentiles();return{fps:this.fps,tier:this.currentTier,longStallCount:this.longStallCount,maxObservedFrameTime:this.maxObservedFrameTime,percentiles:e}}}class nt{constructor(e){this.container=e,this.items=[],this.tempVec=new p,this.visibleRects=[],this.exclusionZones=[],this.selectedId=null,document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>this.remeasure())}register(e,i,t,o,a,s){const n=document.createElement("button");n.type="button",n.className=`celestial-3d-label label-${t} priority-${o}`,n.dataset.id=e,n.setAttribute("aria-label",`Navigate to ${i}`),n.tabIndex=0;const l=document.createElement("span");l.className="label-indicator";const c=document.createElement("span");c.className="label-text",c.textContent=i,n.appendChild(l),n.appendChild(c),s&&n.addEventListener("click",()=>s(e)),this.container.appendChild(n);const m={id:e,name:i,type:t,priority:o,basePriority:o,getPosition:a,element:n,width:0,height:0,isVisible:!0};return this.items.push(m),n}setSelected(e){this.selectedId=e,this.items.forEach(i=>{i.priority=i.id===e?1e3:i.basePriority})}remeasure(){this.items.forEach(e=>{const i=e.element.getBoundingClientRect();i.width>0&&(e.width=i.width,e.height=i.height)})}updateExclusionZones(e,i){this.exclusionZones.length=0;const t=document.querySelector(".nav-header");if(t){const s=t.getBoundingClientRect();s.height>0&&this.exclusionZones.push({left:0,right:e,top:0,bottom:s.bottom+8})}const o=document.querySelector(".hero-cinematic-content");if(o){const s=o.getBoundingClientRect();s.top<i&&s.bottom>0&&this.exclusionZones.push({left:s.left-12,right:s.right+12,top:s.top-12,bottom:s.bottom+12})}const a=document.querySelector(".flight-case-card.is-active-flight");if(a){const s=a.getBoundingClientRect();s.top<i&&s.bottom>0&&this.exclusionZones.push({left:s.left-16,right:s.right+16,top:s.top-16,bottom:s.bottom+16})}}hideItem(e){e.element.style.opacity="0",e.element.style.pointerEvents="none",e.element.setAttribute("aria-hidden","true"),e.element.tabIndex=-1,e.isVisible=!1}showItem(e,i,t,o,a){e.element.style.transform=`translate3d(${(i-o*.5).toFixed(1)}px, ${(t-a*.5).toFixed(1)}px, 0)`,e.element.style.opacity="1",e.element.style.pointerEvents="auto",e.element.removeAttribute("aria-hidden"),e.element.tabIndex=0,e.isVisible=!0}update(e,i,t){this.visibleRects.length=0,this.updateExclusionZones(i,t),this.items.sort((o,a)=>a.priority-o.priority);for(let o=0;o<this.items.length;o++){const a=this.items[o],s=a.getPosition(),n=new p().subVectors(s,e.position),l=e.getWorldDirection(new p);if(n.dot(l)<=e.near+.5){this.hideItem(a);continue}if(a.type!=="sun"){const u=n.length(),v=n.clone().normalize(),P=e.position.clone().negate(),d=P.dot(v);if(d>0&&d<u&&P.lengthSq()-d*d<576&&a.priority<1e3){this.hideItem(a);continue}}if(this.tempVec.copy(s),this.tempVec.project(e),this.tempVec.z>.98||this.tempVec.z<-1){this.hideItem(a);continue}const m=(this.tempVec.x*.5+.5)*i,h=(-(this.tempVec.y*.5)+.5)*t,g=20;if(m<g||m>i-g||h<g||h>t-g){this.hideItem(a);continue}if(!a.width){const u=a.element.getBoundingClientRect();a.width=u.width||80,a.height=u.height||26}const f=a.width,x=a.height,y={left:m-f*.5-6,right:m+f*.5+6,top:h-x*.5-4,bottom:h+x*.5+4};let b=!1;for(let u=0;u<this.exclusionZones.length;u++){const v=this.exclusionZones[u];if(y.left<v.right&&y.right>v.left&&y.top<v.bottom&&y.bottom>v.top){b=!0;break}}if(b&&a.priority<1e3){this.hideItem(a);continue}let C=!1;for(let u=0;u<this.visibleRects.length;u++){const v=this.visibleRects[u];if(y.left<v.right&&y.right>v.left&&y.top<v.bottom&&y.bottom>v.top){C=!0;break}}C&&a.priority<1e3?this.hideItem(a):(this.visibleRects.push(y),this.showItem(a,m,h,f,x))}}dispose(){this.items.forEach(e=>{e.element&&e.element.parentNode&&e.element.parentNode.removeChild(e.element)}),this.items=[]}}const B={sun:{id:"sun",name:"Diwakar Venkat Peddada",classification:"Identity & Overview",orbit:"System Center",status:"AI Developer",problem:"Software portfolios often rely on static screenshots and shallow lists that fail to communicate architectural depth.",whatItDoes:"Central overview orchestrating real-time 3D Keplerian orbital physics, adaptive GPU governance, and cinematic lighting across all technology domains.",stack:["Three.js","WebGL 2","GSAP","Lenis","Vite","postprocessing"],metric:"Real-time 60fps WebGL 3D system, under 100 draw calls, sub-3MB bundle with adaptive GPU governance.",sourceUrl:"https://github.com/Diva143V/myselfdiva"},python:{id:"python",name:"Python",classification:"Primary Language · Biomedical AI",orbit:"Orbit 1 · Python",status:"Core Stack",problem:"Biomedical knowledge graphs and clinical trial registries require robust deterministic pipelines and asynchronous literature collection.",whatItDoes:"Core language for AI literature synthesis, local embedding models, graph traversal algorithms, and automated bioinformatics pipelines.",stack:["Python 3.11+","FastAPI","ChromaDB","Reflex","Pytest"],metric:"Powers Griffin Bio (10 modular collectors) and SyGriffin neoantigen discovery tools.",sourceUrl:"https://github.com/Diva143V/Griffin"},csharp:{id:"csharp",name:"C# / .NET",classification:"Primary Language · Desktop Systems",orbit:"Orbit 2 · C# / .NET",status:"Core Stack",problem:"Windows system audio and Live Captions hooks require low-overhead native interop and high-frequency UI updates without dropping frames.",whatItDoes:"Architecture anchor for native Windows accessibility software, WPF overlays, hardware acceleration, and multi-threaded desktop software.",stack:["C#",".NET 8","WPF","Windows API","SQLite"],metric:"Powers LiveSubs single self-contained .exe with real-time API translation hooks.",sourceUrl:"https://github.com/Diva143V/LiveSubs",releaseUrl:"https://github.com/Diva143V/LiveSubs/releases"},rust:{id:"rust",name:"Rust",classification:"Primary Language · Systems & MCP",orbit:"Orbit 3 · Rust",status:"Core Stack",problem:"LLM agents suffer from catastrophic memory loss across sessions, losing architectural context and human edits.",whatItDoes:"Foundation for high-performance systems programming, MCP protocol servers, graph database indexing, and Tauri cross-platform software.",stack:["Rust 1.85+","PetGraph","SQLite FTS5","Tauri v2","Tokio"],metric:"Powers Knox MCP server with 8 focused tools and strict token budgets.",sourceUrl:"https://github.com/Diva143V/Knox"},typescript:{id:"typescript",name:"TypeScript",classification:"Primary Language · Interfaces & WebGL",orbit:"Orbit 4 · TypeScript",status:"Core Stack",problem:"Interactive 3D environments demand strict type-safety across custom shader uniforms, physics loops, and complex DOM overlays.",whatItDoes:"Powers modern frontend architecture, Three.js 3D graphics, reactive user interfaces, and client-side tooling.",stack:["TypeScript","Three.js","Vite","React 19","GSAP"],metric:"Architectural foundation for myselfdiva 3D universe and interactive web applications.",sourceUrl:"https://github.com/Diva143V/myselfdiva"},cpp:{id:"cpp",name:"C++",classification:"Primary Language · Algorithms & Performance",orbit:"Orbit 5 · C++",status:"Core Stack",problem:"Time-critical algorithmic competitions require microsecond-level cache locality and manual memory optimization.",whatItDoes:"High-performance competitive programming, custom search data structures, branch-prediction tuning, and memory layout optimization.",stack:["C++20","Data Structures","Competitive Programming","Algorithms"],metric:"1st place solver in HackMe 2024 optimization challenge.",sourceUrl:"https://github.com/Diva143V"},livesubs:{id:"livesubs",name:"LiveSubs",classification:"Project · Real-Time Windows Subtitle Overlay",orbit:"Orbit 2 · C# / .NET",status:"Shipped",problem:"Speech in meetings, video calls, and streams moves faster than users can read or translate using conventional transcription windows.",whatItDoes:"Captures Windows Live Captions in real time, translates recognized speech through 9+ API backends (Google, DeepL, OpenAI, Ollama, LM Studio), and renders a responsive, always-on-top customizable subtitle bar over any active window or call.",stack:["C#",".NET 8","WPF","Windows Live Captions API","SQLite"],metric:"9+ translation backends supported; self-contained single .exe (Windows x64) with zero runtime install; settings persisted in %AppData%\\LiveSubs\\setting.json; optional SQLite translation history database.",sourceUrl:"https://github.com/Diva143V/LiveSubs",releaseUrl:"https://github.com/Diva143V/LiveSubs/releases"},griffin:{id:"griffin",name:"Griffin Bio",classification:"Project · Scientific Evidence Synthesis",orbit:"Orbit 1 · Python",status:"Active",problem:"Biomedical research papers are scattered across fragmented databases with conflicting clinical claims that take weeks to manually cross-check.",whatItDoes:"Collects literature and scientific data from 10 modular source collectors, merges and deduplicates entries, generates sentence embeddings, and executes an automated Mixture-of-LLMs pipeline for claim extraction, Oxford evidence ranking, contradiction detection, and consensus synthesis surfaced through a Reflex web dashboard.",stack:["Python","ChromaDB","Ollama","Graph RAG","Reflex","Mixture of LLMs"],metric:"10 modular source collectors (PubMed, Europe PMC, Semantic Scholar, OpenAlex, ClinicalTrials, bioRxiv, ChEMBL, UniProt, PubChem, dbSNP); Oxford Levels of Evidence ranking; 7 specialized reasoning agents.",sourceUrl:"https://github.com/Diva143V/Griffin"},knox:{id:"knox",name:"Knox",classification:"Project · Causal Knowledge Graph & MCP Server",orbit:"Orbit 3 · Rust",status:"Shipped",problem:"AI coding agents suffer from catastrophic amnesia, losing architectural rationale, design decisions, and constraints across sessions and tool switches.",whatItDoes:"A persistent, cross-platform causal knowledge graph and Model Context Protocol (MCP) server built in Rust. It captures architectural decisions, pre-flight constraints, and developer human edits across disparate coding sessions (Antigravity, Cursor, Claude Code, Gemini CLI), giving AI agents long-term causal memory.",stack:["Rust 1.85+","SQLite WAL & FTS5","PetGraph","Tauri v2","React 19","Tailwind v4","D3 Physics"],metric:"8 focused MCP tools (knox_begin, knox_context, knox_check, knox_trace, knox_record, knox_handoff, knox_ask, knox_update); tool definition footprint budgeted <= 850 tokens; 50-pair calibrated guardrail with 0.60 overlap threshold; 5.46 MB LZMA setup wizard.",sourceUrl:"https://github.com/Diva143V/Knox"},sygriffin:{id:"sygriffin",name:"SyGriffin",classification:"Project · Neoantigen Discovery Engine",orbit:"Orbit 1 · Python",status:"Active · Scientific MVP",problem:"Identifying clinically viable neoantigen candidates from raw tumor mutations requires complex, opaque computational biology pipelines.",whatItDoes:"A CLI-first AI bioinformatics platform and life-sciences research companion that parses tumor VCF files, predicts vaccine-relevant peptide targets, ranks candidates with transparent scoring, and preserves reproducible audit records for cancer vaccine research.",stack:["Python 3.11","Bun 1.3+","VEP","MHCflurry","uv","pytest","mypy"],metric:"Predicts peptide candidates matched to specific HLA alleles (e.g. HLA-A*02:01, melanoma, GRCh37); automated RNA-seq run validation checking matrix structure, sample-ID alignment, replicate counts, and batch-confounding.",sourceUrl:"https://github.com/Diva143V/SyGriffin"},polaris:{id:"polaris",name:"Polaris (Kg-Library-API)",classification:"Project · Think-on-Graph Library",orbit:"Orbit 1 · Python",status:"Active",problem:"High LLM inference cost and latency during multi-hop graph queries over complex factual networks.",whatItDoes:"Modular, storage-agnostic Knowledge Graph library with deterministic Python graph traversal and credit-controlled AI escalation.",stack:["Python","FastAPI","Poetry","Think-on-Graph","Pytest"],metric:"Deterministic graph traversal executes in < 5ms; 3-perspective synthesis (Knowledge, Expert, Combined); pluggable Domain Packs for external MCP tools.",sourceUrl:"https://github.com/Diva143V/Kg-Library-API"},sita:{id:"sita",name:"Sita",classification:"Project · Precursor Evidence Pipeline",orbit:"Orbit 1 · Python",status:"Shipped",problem:"Synthesizing disparate clinical evidence on metformin therapy in breast cancer.",whatItDoes:"End-to-end evidence ingestion and contradiction pipeline that laid the architectural foundation for Griffin Bio.",stack:["Python","Embeddings","PubMed API","Semantic Search"],metric:"Aggregated 3 medical databases and resolved semantic contradictions; precursor to Griffin Bio.",sourceUrl:"https://github.com/Diva143V/Sita"},myselfdiva:{id:"myselfdiva",name:"myselfdiva",classification:"Project · 3D Portfolio Universe",orbit:"Orbit 4 · TypeScript",status:"Live",problem:"Flat 2D diagram portfolios fail to communicate real-time systems depth.",whatItDoes:"Rebuilds personal portfolio as a realistic cinematic WebGL 3D universe with PBR materials and Keplerian orbital physics.",stack:["Three.js","Vite","GSAP","Lenis","postprocessing"],metric:"Architectural targets: 60fps simulation budget, under 100 draw calls, and total bundle payload < 3 MB; dynamically governed by AdaptiveGovernor.",sourceUrl:"https://github.com/Diva143V/myselfdiva"},hackme:{id:"hackme",name:"HackMe 2024 Solver",classification:"Competition · 1st Place Win",orbit:"Orbit 5 · C++",status:"First Place",problem:"Naive graph search algorithms timed out under strict competition time constraints.",whatItDoes:"First-place winning algorithmic optimization in C++ redesigning search data structures and pruning redundant search passes.",stack:["C++","Algorithms","Data Structures","Competitive Programming"],metric:"Cut runtime from timeout to sub-second evaluation, winning 1st place at HackMe 2024.",sourceUrl:"https://github.com/Diva143V/myselfdiva"}};B["c#"]=B.csharp;B["c# / .net"]=B.csharp;B["c++"]=B.cpp;class lt{constructor(e){this.universe=e,this.modal=document.getElementById("probe-modal"),this.titleEl=document.getElementById("probe-title"),this.classEl=document.getElementById("probe-classification"),this.problemEl=document.getElementById("probe-problem"),this.actionEl=document.getElementById("probe-action"),this.metricEl=document.getElementById("probe-metric"),this.stackEl=document.getElementById("probe-stack"),this.sourceLinkEl=document.getElementById("probe-source-link"),this.releaseLinkEl=document.getElementById("probe-release-link"),this.closeBtn=this.modal?.querySelector(".probe-close-btn"),this.invokerElement=null,this.bindEvents()}bindEvents(){if(!this.modal)return;let e=!1;const i=t=>{const o=this.modal.getBoundingClientRect();return t.clientX<o.left||t.clientX>o.right||t.clientY<o.top||t.clientY>o.bottom};this.modal.addEventListener("pointerdown",t=>{e=i(t)}),this.modal.addEventListener("pointerup",t=>{e&&i(t)&&this.close()}),this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.modal.addEventListener("close",()=>{this.modal.returnValue="",this.universe.clearFocus(),this.invokerElement&&(this.invokerElement.focus(),this.invokerElement=null)}),window.addEventListener("universe:select-moon",t=>{this.open(t.detail.moonId)}),window.addEventListener("universe:select-planet",t=>{this.open(t.detail.planetId)}),document.querySelectorAll("[data-inspect-celestial]").forEach(t=>{t.addEventListener("click",o=>{o.preventDefault(),this.invokerElement=t,this.open(t.dataset.inspectCelestial)})})}open(e){const i=(e||"").toLowerCase().trim(),t=B[i];!t||!this.modal||(this.titleEl&&(this.titleEl.textContent=t.name),this.classEl&&(this.classEl.textContent=`${t.classification} · ${t.orbit}`),this.problemEl&&(this.problemEl.textContent=t.problem),this.actionEl&&(this.actionEl.textContent=t.whatItDoes),this.metricEl&&(this.metricEl.textContent=t.metric),this.stackEl&&(this.stackEl.innerHTML="",(t.stack||[]).forEach(o=>{const a=document.createElement("span");a.className="probe-tag",a.textContent=o,this.stackEl.appendChild(a)})),this.sourceLinkEl&&(this.sourceLinkEl.href=t.sourceUrl||"#",this.sourceLinkEl.hidden=!t.sourceUrl),this.releaseLinkEl&&(this.releaseLinkEl.href=t.releaseUrl||"#",this.releaseLinkEl.hidden=!t.releaseUrl),this.universe.focusOnBody(e),this.modal.open||this.modal.showModal())}close(){this.modal&&this.modal.open&&this.modal.close()}}L.registerPlugin(se);class ct{constructor(e,i){this.universe=e,this.probe=i,this.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.lenis=null,this.masterTrigger=null,this.currentCaseIndex=-1,this.caseStudies=I.caseStudies,this.initLenis(),this.initScrollFlight(),this.initCardSteppers(),this.initMagneticButtons(),this.syncCaseCards(this.masterTrigger?this.masterTrigger.progress:0),window.addEventListener("resize",()=>{this.syncCaseCards(this.masterTrigger?this.masterTrigger.progress:0)},{passive:!0}),this.initHashNavigation(),this.reducedMotion||this.playStagedIgnition()}initLenis(){this.reducedMotion||(this.lenis=new He({duration:1.25,easing:e=>Math.min(1,1.001-Math.pow(2,-10*e)),orientation:"vertical",smoothWheel:!0}),this.lenis.on("scroll",se.update),L.ticker.add(e=>{this.lenis.raf(e*1e3)}),L.ticker.lagSmoothing(0))}initScrollFlight(){const e=document.getElementById("scroll-flight-track");e&&(this.masterTrigger=se.create({trigger:e,start:"top top",end:"bottom bottom",scrub:1,onUpdate:i=>{const t=i.progress;this.universe.mode==="guided"&&this.universe.setFlightProgress(t),this.syncCaseCards(t)}}),document.querySelectorAll("[data-flight-step]").forEach(i=>{i.addEventListener("click",t=>{const o=parseFloat(i.dataset.flightStep)||0;t.preventDefault(),this.flyToProgress(o)})}),document.querySelectorAll('a[href="#hero"]').forEach(i=>{i.addEventListener("click",t=>{t.preventDefault(),this.flyToTop()})}),document.querySelectorAll('a[href^="#case-"]').forEach(i=>{i.addEventListener("click",t=>{const o=i.getAttribute("href"),a=o.replace("#case-",""),s=this.caseStudies.findIndex(n=>n.id===a);s!==-1&&(t.preventDefault(),this.navigateToCase(s),history.pushState(null,"",o))})}))}syncCaseCards(e){const i=window.innerWidth>=768,t=document.querySelectorAll(".flight-case-card"),o=document.querySelector(".flight-deck");if(!i){t.forEach(s=>{s.style.display="block",s.style.opacity="1",s.removeAttribute("inert")}),o&&(o.style.opacity="1",o.style.pointerEvents="auto");return}if(e<=.08||e>=.99){o&&(o.style.opacity="0",o.style.pointerEvents="none"),t.forEach(s=>{s.style.display="none",s.classList.remove("is-active-flight"),s.setAttribute("inert","")}),this.currentCaseIndex!==-1&&(this.currentCaseIndex=-1,this.universe.clearFocus());return}o&&(o.style.opacity="1",o.style.pointerEvents="auto");let a=-1;for(let s=0;s<this.caseStudies.length;s++){const n=this.caseStudies[s];if(e>=n.progressMin&&e<=n.progressMax){a=s;break}}if(a===-1&&e>.08&&e<.99){let s=1/0;this.caseStudies.forEach((n,l)=>{const c=(n.progressMin+n.progressMax)*.5,m=Math.abs(e-c);m<s&&(s=m,a=l)})}if(t.forEach((s,n)=>{n===a?(s.style.display="block",s.classList.add("is-active-flight"),s.removeAttribute("inert"),s.style.opacity="1",s.style.pointerEvents="auto"):(s.style.display="none",s.classList.remove("is-active-flight"),s.setAttribute("inert",""),s.style.opacity="0",s.style.pointerEvents="none")}),a!==this.currentCaseIndex&&a!==-1){this.currentCaseIndex=a;const s=this.caseStudies[a];this.universe.focusOnBody(s.targetBodyId,s.cameraFraming),window.__UNIVERSE__?.labelManager&&window.__UNIVERSE__.labelManager.setSelected(s.targetBodyId)}}initCardSteppers(){document.querySelectorAll(".flight-case-card").forEach((e,i)=>{const t=e.querySelector(".stepper-prev"),o=e.querySelector(".stepper-next");t&&t.addEventListener("click",a=>{a.preventDefault(),i>0?this.navigateToCase(i-1):this.flyToTop()}),o&&o.addEventListener("click",a=>{if(a.preventDefault(),i<this.caseStudies.length-1)this.navigateToCase(i+1);else{const s=document.getElementById("experience");s&&(this.lenis?this.lenis.scrollTo(s,{duration:1.4}):s.scrollIntoView({behavior:"smooth"}))}})})}navigateToCase(e){if(e<0||e>=this.caseStudies.length)return;const i=window.innerWidth>=768,o=document.querySelectorAll(".flight-case-card")[e];if(i){const a=this.caseStudies[e],s=(a.progressMin+a.progressMax)*.5;this.flyToProgress(s)}else o&&(this.lenis?this.lenis.scrollTo(o,{offset:-80,duration:1.2}):o.scrollIntoView({behavior:"smooth"}))}initHashNavigation(){const e=(i,t=!1)=>{if(!i)return;if(i==="#hero"){this.flyToTop();return}if(i.startsWith("#case-")){const a=i.replace("#case-",""),s=this.caseStudies.findIndex(n=>n.id===a);if(s!==-1){this.navigateToCase(s);return}}const o=document.querySelector(i);o&&(this.lenis?this.lenis.scrollTo(o,{immediate:t,duration:1.4}):o.scrollIntoView({behavior:t?"auto":"smooth"}))};window.location.hash&&setTimeout(()=>e(window.location.hash,!0),150),window.addEventListener("popstate",()=>{e(window.location.hash,!1)})}flyToTop(){this.lenis?this.lenis.scrollTo(0,{duration:1.4}):window.scrollTo({top:0,behavior:"smooth"}),history.pushState(null,"","#hero")}flyToProgress(e){if(e<=0){this.flyToTop();return}const i=document.getElementById("scroll-flight-track");if(!i)return;const t=window.innerWidth>=768;let o;if(t?o=i.offsetTop+(i.offsetHeight-window.innerHeight)*e:o=i.offsetTop-70,this.reducedMotion){window.scrollTo({top:o,behavior:"auto"});return}this.lenis?this.lenis.scrollTo(o,{duration:1.6}):window.scrollTo({top:o,behavior:"smooth"})}playStagedIgnition(){const e=document.getElementById("ignition-curtain"),i=document.querySelector(".hero-cinematic-content");L.timeline({defaults:{ease:"power3.out"}}).to(this.universe.sun.light,{intensity:2.8,duration:1.8,delay:.2}).to(e,{opacity:0,duration:1.4,onComplete:()=>{e&&(e.style.display="none")}},"-=1.2").from(i,{y:40,opacity:0,duration:1.2},"-=0.8")}initMagneticButtons(){if(this.reducedMotion||!window.matchMedia("(hover: hover)").matches)return;document.querySelectorAll(".btn-magnetic").forEach(i=>{let t=null;i.addEventListener("pointerenter",()=>{t=i.getBoundingClientRect()}),i.addEventListener("pointermove",o=>{t||(t=i.getBoundingClientRect());const a=t.left+t.width*.5,s=t.top+t.height*.5,n=(o.clientX-a)*.26,l=(o.clientY-s)*.26;L.to(i,{x:n,y:l,duration:.3,ease:"power2.out"})}),i.addEventListener("pointerleave",()=>{L.to(i,{x:0,y:0,duration:.6,ease:"elastic.out(1, 0.4)"}),t=null})})}destroy(){this.lenis&&this.lenis.destroy(),this.masterTrigger&&this.masterTrigger.kill()}}function dt(){try{const r=document.createElement("canvas");return!!(window.WebGL2RenderingContext&&r.getContext("webgl2"))}catch{return!1}}document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("webgl-universe-container"),e=document.getElementById("labels-3d-overlay");if(!r||!e)return;const i=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!dt()||i){document.body.classList.add("is-static-fallback"),console.info("Serving static complete version (WebGL fallback / prefers-reduced-motion active)."),mt();return}const t=new st(r,e),o=at(t.renderer,t.scene,t.camera),a=new rt({onQualityChange:(u,v)=>{t.setQualityScale(v),o.setQuality(u),console.info(`Adaptive Governor: Quality adjusted to [${u}] (scale: ${v})`)}}),s=new nt(e);s.register(I.sun.id,I.sun.name,"sun",I.sun.priority,()=>t.sun.group.position,u=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:u}}))}),I.planets.forEach(u=>{s.register(u.id,`${u.name} (Orbit ${u.orbitIndex})`,"planet",u.priority,()=>t.planets[u.id].getPosition(),v=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:v}}))})}),I.moons.forEach(u=>{const v=u.isMajor?"moon-major":"moon-minor";s.register(u.id,u.name,v,u.priority,()=>t.moons[u.id].getPosition(),P=>{window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:P}}))})});const n=new lt(t),l=new ct(t,n);ht(t),ut(),window.__UNIVERSE__={universeScene:t,postProcessing:o,governor:a,labelManager:s,flightController:l,probeModal:n};let c=null,m=performance.now(),h=!1,g=!1,f=document.hidden;function x(u){if(!h)return;const v=Math.min((u-m)/1e3,.1);m=u,a.tick(u),t.update(v,u),s.update(t.camera,t.width,t.height),o.render(v),c=requestAnimationFrame(x)}function y(){const u=!g&&!f;u&&!h?(h=!0,m=performance.now(),a.resumeClock(m),c=requestAnimationFrame(x)):!u&&h&&(h=!1,a.notifySuspension(),c&&(cancelAnimationFrame(c),c=null))}y(),document.addEventListener("visibilitychange",()=>{f=document.hidden,y()}),window.addEventListener("resize",()=>{t.resize(),o.resize(t.width,t.height),s.remeasure()},{passive:!0});const b=document.getElementById("pause-motion-btn");b&&b.addEventListener("click",()=>{g=!g,g?(b.querySelector(".label").textContent="Resume Flight",b.setAttribute("aria-label","Resume orbital 3D flight"),b.classList.add("is-paused")):(b.querySelector(".label").textContent="Pause Flight",b.setAttribute("aria-label","Pause orbital 3D flight"),b.classList.remove("is-paused")),y()});const C=document.getElementById("ist-clock");if(C){const u=()=>{const v=new Date,P=5.5*60*60*1e3,d=v.getTime()+v.getTimezoneOffset()*6e4,S=new Date(d+P),T=D=>String(D).padStart(2,"0");C.textContent=`${T(S.getHours())}:${T(S.getMinutes())}:${T(S.getSeconds())} IST`};u(),setInterval(u,1e3)}});function ht(r,e){const i=document.getElementById("hud-mode-toggle"),t=document.getElementById("hud-controls-group"),o=document.getElementById("hud-zoom-in"),a=document.getElementById("hud-zoom-out"),s=document.getElementById("hud-home"),n=document.getElementById("hud-exit");if(!i)return;function l(c){const m=c==="explore";i.setAttribute("aria-pressed",m?"true":"false");const h=i.querySelector(".camera-dock-label, .hud-mode-text");h&&(h.textContent=m?"Orbiting":"Free Orbit"),i.classList.toggle("is-active",m),t&&(m?t.removeAttribute("hidden"):t.setAttribute("hidden","")),document.body.classList.toggle("is-explore-mode",m)}i.addEventListener("click",()=>{const c=r.mode==="explore"?"guided":"explore";r.setMode(c)}),o&&o.addEventListener("click",()=>r.zoomIn()),a&&a.addEventListener("click",()=>r.zoomOut()),s&&s.addEventListener("click",()=>r.resetHome()),n&&n.addEventListener("click",()=>r.setMode("guided")),window.addEventListener("universe:mode-changed",c=>{l(c.detail.mode)}),l(r.mode)}function ut(){const r=document.getElementById("mobile-menu-btn"),e=document.querySelector(".nav-links");!r||!e||(r.addEventListener("click",()=>{const i=r.getAttribute("aria-expanded")==="true";r.setAttribute("aria-expanded",i?"false":"true"),e.classList.toggle("is-open",!i)}),e.querySelectorAll("a").forEach(i=>{i.addEventListener("click",()=>{r.setAttribute("aria-expanded","false"),e.classList.remove("is-open")})}))}function mt(){const r=document.getElementById("probe-modal");r&&document.querySelectorAll("[data-inspect-celestial]").forEach(e=>{e.addEventListener("click",i=>{i.preventDefault(),r.showModal()})})}
