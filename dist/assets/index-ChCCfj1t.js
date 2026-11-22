import{n as X,o as G,h as j,q as W,r as ae,s as K,t as ue,G as $,u as me,v as Q,w as Y,M as V,x as ie,y as oe,z as p,f as pe,H as fe,g as ve,I as le,J as ce,K as ge,Q as ye,C as Z,X as be,Y as we,e as xe,Z as Pe,P as Se,_ as Ce,$ as Me,S as Le,a0 as Ee,a1 as De,V as ne,a2 as Te,a3 as Ie,a4 as F,a5 as ke}from"./three-D4IYXcvp.js";import{g as D,S as se}from"./gsap-Jiz4vAvE.js";import{E as Ae,R as ze,B as Re,V as Fe,S as Ne,a as Oe}from"./postprocessing-CaCgoWDu.js";import{L as Be}from"./lenis-BXjoyVLH.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();const R={sun:{id:"sun",name:"Diwakar",radius:22,priority:100},planets:[{id:"python",name:"Python",clusterId:"research",orbitIndex:1,radius:9.5,orbitRadius:95,orbitSpeed:.224,initialAngle:.6,inclination:.04,rotationSpeed:.015,color:58777,priority:80,classification:"Primary Language · Biomedical AI",orbit:"Orbit 1 · Python",problem:"Biomedical knowledge graphs and clinical trial registries require robust deterministic pipelines and asynchronous literature collection.",whatItDoes:"Core language for AI literature synthesis, local embedding models, graph traversal algorithms, and automated bioinformatics pipelines.",metric:"Powers Griffin Bio (10 modular collectors) and SyGriffin neoantigen discovery tools.",tags:["Python 3.11+","FastAPI","ChromaDB","Reflex","Pytest"],sourceUrl:"https://github.com/Diva143V/Griffin",description:"Biomedical RAG, local models, and multi-source data pipelines."},{id:"csharp",name:"C# / .NET",clusterId:"realtime",orbitIndex:2,radius:10.5,orbitRadius:175,orbitSpeed:.165,initialAngle:2.4,inclination:-.06,rotationSpeed:.012,color:11032055,priority:80,classification:"Primary Language · Desktop Systems",orbit:"Orbit 2 · C# / .NET",problem:"Windows system audio and Live Captions hooks require low-overhead native interop and high-frequency UI updates without dropping frames.",whatItDoes:"Architecture anchor for native Windows accessibility software, WPF overlays, hardware acceleration, and multi-threaded desktop software.",metric:"Powers LiveSubs single self-contained .exe with real-time API translation hooks.",tags:["C#",".NET 8","WPF","Windows API","SQLite"],sourceUrl:"https://github.com/Diva143V/LiveSubs",description:"Windows accessibility overlays, Live Captions hooks, and WPF software."},{id:"rust",name:"Rust",clusterId:"infrastructure",orbitIndex:3,radius:9,orbitRadius:260,orbitSpeed:.125,initialAngle:4.2,inclination:.08,rotationSpeed:.014,color:16347926,priority:80,classification:"Primary Language · Systems & MCP",orbit:"Orbit 3 · Rust",problem:"LLM agents suffer from catastrophic memory loss across sessions, losing architectural context and human edits.",whatItDoes:"Foundation for high-performance systems programming, MCP protocol servers, graph database indexing, and Tauri cross-platform software.",metric:"Powers Knox MCP server with 8 focused tools and strict token budgets.",tags:["Rust 1.85+","PetGraph","SQLite FTS5","Tauri v2","Tokio"],sourceUrl:"https://github.com/Diva143V/Knox",description:"MCP server stdio engine, causal graph algorithms, and Tauri desktop integration."},{id:"typescript",name:"TypeScript",clusterId:"infrastructure",orbitIndex:4,radius:8,orbitRadius:345,orbitSpeed:.098,initialAngle:5.5,inclination:-.05,rotationSpeed:.012,hasRings:!0,color:61695,priority:80,classification:"Primary Language · Interfaces & WebGL",orbit:"Orbit 4 · TypeScript",problem:"Interactive 3D environments demand strict type-safety across custom shader uniforms, physics loops, and complex DOM overlays.",whatItDoes:"Powers modern frontend architecture, Three.js 3D graphics, reactive user interfaces, and client-side tooling.",metric:"Architectural foundation for myselfdiva 3D universe and interactive web applications.",tags:["TypeScript","Three.js","Vite","React 19","GSAP"],sourceUrl:"https://github.com/Diva143V/myselfdiva",description:"Three.js, WebGL shaders, interface architecture, and modern web apps."},{id:"cpp",name:"C++",clusterId:"infrastructure",orbitIndex:5,radius:8.5,orbitRadius:435,orbitSpeed:.08,initialAngle:1.5,inclination:.07,rotationSpeed:.01,color:15680580,priority:80,classification:"Primary Language · Algorithms & Performance",orbit:"Orbit 5 · C++",problem:"Time-critical algorithmic competitions require microsecond-level cache locality and manual memory optimization.",whatItDoes:"High-performance competitive programming, custom search data structures, branch-prediction tuning, and memory layout optimization.",metric:"1st place solver in HackMe 2024 optimization challenge.",tags:["C++20","Data Structures","Competitive Programming","Algorithms"],sourceUrl:"https://github.com/Diva143V",description:"Algorithmic complexity reduction and high-performance search data structures."}],moons:[{id:"livesubs",name:"LiveSubs",caseId:"livesubs",parentPlanetId:"csharp",isMajor:!0,caseNumber:"01",status:"Shipped",radius:3.5,orbitRadius:26,orbitSpeed:.628,initialAngle:1.2,inclination:.15,priority:95},{id:"griffin",name:"Griffin Bio",caseId:"griffin",parentPlanetId:"python",isMajor:!0,caseNumber:"02",status:"Active",radius:3.5,orbitRadius:24,orbitSpeed:.698,initialAngle:.8,inclination:.12,priority:95},{id:"knox",name:"Knox",caseId:"knox",parentPlanetId:"rust",isMajor:!0,caseNumber:"03",status:"Shipped",radius:3.4,orbitRadius:22,orbitSpeed:.571,initialAngle:2.9,inclination:-.16,priority:95},{id:"sygriffin",name:"SyGriffin",caseId:"sygriffin",parentPlanetId:"python",isMajor:!0,caseNumber:"04",status:"Scientific MVP",radius:3.2,orbitRadius:36,orbitSpeed:.449,initialAngle:3.4,inclination:-.18,priority:95},{id:"polaris",name:"Polaris",parentPlanetId:"python",isMajor:!1,radius:2.3,orbitRadius:46,orbitSpeed:.393,initialAngle:5.1,inclination:.1,priority:45},{id:"sita",name:"Sita",parentPlanetId:"python",isMajor:!1,radius:2.2,orbitRadius:56,orbitSpeed:.349,initialAngle:1.9,inclination:-.14,priority:40},{id:"myselfdiva",name:"myselfdiva",parentPlanetId:"typescript",isMajor:!1,radius:2.4,orbitRadius:26,orbitSpeed:.524,initialAngle:2.1,inclination:.1,priority:45},{id:"hackme",name:"HackMe 2024",parentPlanetId:"cpp",isMajor:!1,radius:2.3,orbitRadius:24,orbitSpeed:.628,initialAngle:.4,inclination:-.12,priority:45}],caseStudies:[{id:"livesubs",caseNumber:"01",title:"LiveSubs",orbitLabel:"Orbit 2 · C# / .NET",statusLabel:"Shipped",targetBodyId:"livesubs",parentPlanetId:"csharp",problem:"Speech in live streams, lectures, and calls moves faster than users can follow or translate using clumsy floating web translation windows.",description:"Captures Windows Live Captions in real time, translates recognized speech through 9+ API backends (Google, DeepL, OpenAI, Ollama, LM Studio), and renders a responsive, always-on-top customizable subtitle bar over any active window or call.",metric:"9+ translation backends supported; self-contained single .exe (Windows x64) with zero runtime install; settings persisted in %AppData%\\LiveSubs\\setting.json; optional SQLite translation history database.",tags:["C#",".NET 8","WPF","Windows Live Captions","SQLite"],sourceUrl:"https://github.com/Diva143V/LiveSubs",releaseUrl:"https://github.com/Diva143V/LiveSubs/releases",progressMin:.14,progressMax:.33,cameraFraming:{elevationDeg:28,distance:36,targetOffsetX:-14,targetOffsetY:3}},{id:"griffin",caseNumber:"02",title:"Griffin Bio",orbitLabel:"Orbit 1 · Python",statusLabel:"Active",targetBodyId:"griffin",parentPlanetId:"python",problem:"Biomedical research papers are scattered across fragmented databases with conflicting clinical claims that take weeks to manually cross-check.",description:"Scientific evidence synthesis and contradiction workbench. Collects literature from 10 modular source collectors, merges and deduplicates entries, generates sentence embeddings, and executes an automated Mixture-of-LLMs pipeline for claim extraction, Oxford evidence ranking, and consensus reports surfaced in Reflex.",metric:"10 modular source collectors (PubMed, Europe PMC, Semantic Scholar, OpenAlex, ClinicalTrials, bioRxiv, ChEMBL, UniProt, PubChem, dbSNP); Oxford Levels of Evidence ranking; 7 specialized reasoning agents with automated priority fallback.",tags:["Python","ChromaDB","Ollama","Graph RAG","Reflex","Mixture of LLMs"],sourceUrl:"https://github.com/Diva143V/Griffin",progressMin:.35,progressMax:.54,cameraFraming:{elevationDeg:30,distance:38,targetOffsetX:-15,targetOffsetY:3}},{id:"knox",caseNumber:"03",title:"Knox",orbitLabel:"Orbit 3 · Rust",statusLabel:"Shipped",targetBodyId:"knox",parentPlanetId:"rust",problem:"AI coding agents suffer from catastrophic amnesia, losing architectural rationale, design decisions, and constraints across sessions.",description:"Persistent, cross-platform causal knowledge graph and Model Context Protocol (MCP) server in Rust. Captures architectural decisions, pre-flight constraints, and Git human edits, giving AI agents long-term causal memory across sessions.",metric:"8 focused MCP tools (knox_begin, knox_context, knox_check, knox_trace, knox_record, knox_handoff, knox_ask, knox_update); tool definition footprint budgeted <= 850 tokens; 50-pair calibrated guardrail with 0.60 overlap threshold; 5.46 MB LZMA setup wizard.",tags:["Rust 1.85+","SQLite WAL & FTS5","PetGraph","Tauri v2","React 19","D3 Physics"],sourceUrl:"https://github.com/Diva143V/Knox",progressMin:.56,progressMax:.75,cameraFraming:{elevationDeg:28,distance:35,targetOffsetX:-14,targetOffsetY:3}},{id:"sygriffin",caseNumber:"04",title:"SyGriffin",orbitLabel:"Orbit 1 · Python",statusLabel:"Scientific MVP",targetBodyId:"sygriffin",parentPlanetId:"python",problem:"Identifying clinically viable neoantigen candidates from raw tumor sequencing requires complex, opaque computational biology pipelines.",description:"CLI-first AI bioinformatics platform and life-sciences research companion that parses tumor VCF files, predicts vaccine-relevant peptide targets, ranks candidates with transparent scoring, and preserves reproducible audit records for cancer vaccine research.",metric:"Predicts peptide candidates matched to specific HLA alleles (e.g. HLA-A*02:01, melanoma, GRCh37); automated RNA-seq run validation checking matrix structure, sample-ID alignment, and batch-confounding.",tags:["Python 3.11","Bun 1.3+","VEP","MHCflurry","uv","pytest","mypy"],sourceUrl:"https://github.com/Diva143V/SyGriffin",progressMin:.77,progressMax:.98,cameraFraming:{elevationDeg:34,distance:44,targetOffsetX:-14,targetOffsetY:2}}],splineWaypoints:[{x:0,y:220,z:460},{x:45,y:65,z:175},{x:120,y:45,z:120},{x:160,y:50,z:-80},{x:-120,y:75,z:-220},{x:0,y:240,z:560}]};function Ge(r=3400){const e=new X,i=new Float32Array(r*3),t=new Float32Array(r*3),o=new Float32Array(r),a=new Float32Array(r*2),s=480,n=1400;for(let d=0;d<r;d++){const M=Math.random(),T=Math.random(),I=M*2*Math.PI,P=Math.acos(2*T-1),L=s+Math.random()*(n-s),k=L*Math.sin(P)*Math.cos(I),E=L*Math.sin(P)*Math.sin(I)*.45,N=L*Math.cos(P);if(i[d*3]=k,i[d*3+1]=E,i[d*3+2]=N,d<r*.65)t[d*3]=.85,t[d*3+1]=.9,t[d*3+2]=1,o[d]=1,a[d*2]=.8+Math.random()*1.5,a[d*2+1]=Math.random()*Math.PI*2;else if(d<r*.92){const O=Math.random()>.45;t[d*3]=O?.98:.92,t[d*3+1]=O?.72:.94,t[d*3+2]=O?.22:.98,o[d]=1.6,a[d*2]=1.5+Math.random()*2.5,a[d*2+1]=Math.random()*Math.PI*2}else t[d*3]=1,t[d*3+1]=.98,t[d*3+2]=.92,o[d]=2.4,a[d*2]=2+Math.random()*3,a[d*2+1]=Math.random()*Math.PI*2}e.setAttribute("position",new G(i,3)),e.setAttribute("color",new G(t,3)),e.setAttribute("size",new G(o,1)),e.setAttribute("twinkle",new G(a,2));const l=new j({uniforms:{uTime:{value:0}},vertexShader:`
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
    `,transparent:!0,depthWrite:!1,blending:W}),c=new ae(e,l);c.matrixAutoUpdate=!1,c.updateMatrix();const h=450,m=new X,b=new Float32Array(h*3),w=new Float32Array(h*3);for(let d=0;d<h;d++){const M=d/h*Math.PI*2,T=550+Math.random()*300,I=(Math.random()-.5)*140;b[d*3]=Math.cos(M)*T+I,b[d*3+1]=(Math.random()-.5)*90,b[d*3+2]=Math.sin(M)*T+I,Math.random()>.6?(w[d*3]=.96*.25,w[d*3+1]=.62*.25,w[d*3+2]=.04*.25):(w[d*3]=.15*.3,w[d*3+1]=.25*.3,w[d*3+2]=.55*.3)}m.setAttribute("position",new G(b,3)),m.setAttribute("color",new G(w,3));const y=document.createElement("canvas");y.width=64,y.height=64;const v=y.getContext("2d"),g=v.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,"rgba(255, 255, 255, 0.85)"),g.addColorStop(.35,"rgba(255, 255, 255, 0.35)"),g.addColorStop(.7,"rgba(255, 255, 255, 0.08)"),g.addColorStop(1,"rgba(255, 255, 255, 0)"),v.fillStyle=g,v.fillRect(0,0,64,64);const C=new K(y),u=new ue({size:28,map:C,vertexColors:!0,transparent:!0,opacity:.09,depthWrite:!1,blending:W}),f=new ae(m,u);f.matrixAutoUpdate=!1,f.updateMatrix();const S=new $;return S.add(c),S.add(f),{group:S,update(d){l.uniforms.uTime.value=d}}}const J={uniforms:{uTime:{value:0},uColorCore:{value:[1,.98,.88]},uColorMid:{value:[.96,.62,.04]},uColorLimb:{value:[.72,.22,.02]},uGranulationScale:{value:6.5},uTurbulenceSpeed:{value:.18}},vertexShader:`
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
  `};function Ve(r=24){const e=new $;e.name="Sun";const i=new me(16775917,2.8,1800,1.2);i.position.set(0,0,0),e.add(i);const t=new Q(r,64,48),o=new j({uniforms:Y.clone(J.uniforms),vertexShader:J.vertexShader,fragmentShader:J.fragmentShader}),a=new V(t,o);e.add(a);const s=document.createElement("canvas");s.width=512,s.height=512;const n=s.getContext("2d"),l=n.createRadialGradient(256,256,0,256,256,256);l.addColorStop(0,"rgba(255, 250, 230, 0.95)"),l.addColorStop(.18,"rgba(245, 158, 11, 0.7)"),l.addColorStop(.45,"rgba(217, 119, 6, 0.28)"),l.addColorStop(.75,"rgba(180, 83, 9, 0.08)"),l.addColorStop(1,"rgba(0, 0, 0, 0)"),n.fillStyle=l,n.fillRect(0,0,512,512);const c=new K(s),h=new ie({map:c,blending:W,transparent:!0,opacity:.5,depthWrite:!1}),m=new oe(h);m.scale.set(r*2.6,r*2.6,1),e.add(m);const b=document.createElement("canvas");b.width=512,b.height=128;const w=b.getContext("2d"),y=w.createRadialGradient(256,64,0,256,64,256);y.addColorStop(0,"rgba(255, 240, 200, 0.45)"),y.addColorStop(.2,"rgba(245, 158, 11, 0.22)"),y.addColorStop(.8,"rgba(0, 0, 0, 0)"),w.fillStyle=y,w.fillRect(0,0,512,128);const v=new K(b),g=new ie({map:v,blending:W,transparent:!0,opacity:.35,depthWrite:!1}),C=new oe(g);return C.scale.set(r*6.5,r*1.4,1),e.add(C),{group:e,light:i,mesh:a,coronaSprite:m,streakSprite:C,update(u,f){o.uniforms.uTime.value=u;const S=1+Math.sin(u*1.4)*.035;m.scale.set(r*2.6*S,r*2.6*S,1)}}}const ee={uniforms:{uColor:{value:new p(.22,.74,.97)},uTwilightColor:{value:new p(.98,.45,.12)},uSunPosition:{value:new p(0,0,0)},uAtmospherePower:{value:3.5},uAtmosphereIntensity:{value:1.6}},vertexShader:`
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
  `},U=`
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
`,q=`
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
`,de={uniforms:{uTime:{value:0},uSunPosition:{value:new p(0,0,0)}},vertexShader:q,fragmentShader:`
    ${U}

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
  `},We={uniforms:{uTime:{value:0},uSunPosition:{value:new p(0,0,0)}},vertexShader:q,fragmentShader:`
    ${U}

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
  `},_e={uniforms:{uTime:{value:0},uSunPosition:{value:new p(0,0,0)}},vertexShader:q,fragmentShader:`
    ${U}

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
  `},je={uniforms:{uTime:{value:0},uSunPosition:{value:new p(0,0,0)},uRingInnerRadius:{value:20*1.45},uRingOuterRadius:{value:20*2.5}},vertexShader:q,fragmentShader:`
    ${U}

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
  `},Ue={uniforms:{uTime:{value:0},uSunPosition:{value:new p(0,0,0)}},vertexShader:q,fragmentShader:`
    ${U}

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
  `},qe={python:de,csharp:We,rust:_e,typescript:je,cpp:Ue},re={python:{color:new p(0,.9,.6),twilight:new p(.2,1,.45),power:3.6,intensity:1.8},csharp:{color:new p(.66,.33,.97),twilight:new p(.85,.45,1),power:3.2,intensity:1.8},rust:{color:new p(.98,.45,.09),twilight:new p(1,.25,.05),power:4,intensity:1.7},typescript:{color:new p(0,.94,1),twilight:new p(.15,.75,1),power:3.4,intensity:1.8},cpp:{color:new p(.94,.25,.25),twilight:new p(1,.45,.15),power:4.2,intensity:2}};function He(r){const e=(r.id||r.name).toLowerCase(),i=new $;i.name="Planet_"+e;const t=qe[e]||de,o=r.isGasGiant?72:56,a=new Q(r.radius,o,o),s=Y.clone(t.uniforms);r.hasRings&&(s.uRingInnerRadius={value:r.radius*1.45},s.uRingOuterRadius={value:r.radius*2.5});const n=new j({uniforms:s,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),l=new V(a,n);l.castShadow=!0,l.receiveShadow=!0,l.userData={isPlanet:!0,planetId:e,config:r},i.add(l);const c=re[e]||re.python,h=new Q(r.radius*1.038,48,48),m=Y.clone(ee.uniforms);m.uColor.value.copy(c.color),m.uTwilightColor.value.copy(c.twilight),m.uAtmospherePower.value=c.power,m.uAtmosphereIntensity.value=c.intensity;const b=new j({uniforms:m,vertexShader:ee.vertexShader,fragmentShader:ee.fragmentShader,side:pe,blending:W,transparent:!0,depthWrite:!1}),w=new V(h,b);i.add(w);let y=null,v=null;if(r.hasRings){const P=r.radius*1.45,L=r.radius*2.5,k=new fe(P,L,96);k.rotateX(Math.PI*.5);const E=Y.clone(te.uniforms);E.uPlanetRadius.value=r.radius,E.uInnerRadius.value=P,E.uOuterRadius.value=L,v=new j({uniforms:E,vertexShader:te.vertexShader,fragmentShader:te.fragmentShader,side:ve,transparent:!0,depthWrite:!1}),y=new V(k,v),y.rotation.z=.22,i.add(y)}const g=[],C=128;for(let P=0;P<=C;P++){const L=P/C*Math.PI*2;g.push(new p(Math.cos(L)*r.orbitRadius,Math.sin(L)*r.orbitRadius*(r.inclination||.05),Math.sin(L)*r.orbitRadius))}const u=new X().setFromPoints(g),f=new le({color:9741240,transparent:!0,opacity:.18,depthWrite:!1}),S=new ce(u,f);S.matrixAutoUpdate=!1,S.updateMatrix();let d=r.initialAngle||0;const M=r.orbitRadius,T=r.orbitSpeed,I=r.rotationSpeed||.004;return{group:i,orbitLine:S,config:r,mesh:l,atmoMesh:w,ringMesh:y,surfaceMaterial:n,highlight(P){f.color.set(P?r.color||16096779:9741240),f.opacity=P?.85:.18,m.uAtmosphereIntensity.value=P?c.intensity*2.2:c.intensity},update(P,L=0,k=new p(0,0,0)){d+=T*P;const E=Math.cos(d)*M,N=Math.sin(d)*M*(r.inclination||.05),O=Math.sin(d)*M;i.position.set(E,N,O),l.rotation.y+=I*P,n.uniforms.uTime&&(n.uniforms.uTime.value=L),n.uniforms.uSunPosition&&n.uniforms.uSunPosition.value.copy(k),m.uSunPosition.value.copy(k),v&&(v.uniforms.uSunPosition.value.copy(k),v.uniforms.uPlanetPosition.value.copy(i.position))},getPosition(){return i.position}}}const Ye={python:58777,csharp:11032055,"c#":11032055,"c# / .net":11032055,rust:16347926,typescript:61695,cpp:15680580,"c++":15680580};function Xe(r,e){const i=new $;i.name="Moon_"+r.id;const t=r.radius||1.6,o=(e.config.id||e.config.name||"python").toLowerCase(),a=Ye[o]||16096779,s=new ge(t,1),n=s.index?s.toNonIndexed():s,l=n.attributes.position;for(let x=0;x<l.count;x++){const A=l.getX(x),z=l.getY(x),H=l.getZ(x),_=1+Math.sin(A*4)*Math.cos(z*4)*Math.sin(H*4)*.18;l.setXYZ(x,A*_,z*_,H*_)}n.computeVertexNormals();const c=new ye({color:r.isMajor?16317180:13358561,roughness:.32,metalness:.65,flatShading:!0,emissive:new Z(a),emissiveIntensity:r.isMajor?.55:.35}),h=new V(n,c);h.castShadow=!0,h.receiveShadow=!0,h.userData={isMoon:!0,moonId:r.id,config:r},i.add(h);const m=new Q(t*.52,16,16),b=new be({color:a,transparent:!0,opacity:.95}),w=new V(m,b);i.add(w);const y=document.createElement("canvas");y.width=128,y.height=128;const v=y.getContext("2d"),g=v.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,"rgba(255, 255, 255, 0.95)"),g.addColorStop(.22,"rgba(255, 255, 255, 0.65)"),g.addColorStop(.55,"rgba(255, 255, 255, 0.18)"),g.addColorStop(1,"rgba(0, 0, 0, 0)"),v.fillStyle=g,v.fillRect(0,0,128,128);const C=new K(y),u=new ie({map:C,color:a,blending:W,transparent:!0,opacity:r.isMajor?.8:.5,depthWrite:!1}),f=new oe(u);f.scale.set(t*3.6,t*3.6,1),i.add(f);const S=84,d=[],M=[],T=new Z(a),I=new Z(3359061);for(let x=0;x<=S;x++){const A=x/S*Math.PI*2;d.push(new p(Math.cos(A)*r.orbitRadius,Math.sin(A)*r.orbitRadius*(r.inclination||.1),Math.sin(A)*r.orbitRadius)),r.isMajor;const z=I.clone().lerp(T,Math.sin(A*2)*.3+.3);M.push(z.r,z.g,z.b)}const P=new X().setFromPoints(d);P.setAttribute("color",new we(M,3));const L=new le({vertexColors:!0,transparent:!0,opacity:r.isMajor?.55:.25,depthWrite:!1}),k=new ce(P,L);let E=r.initialAngle||Math.random()*Math.PI*2;const N=r.orbitRadius,O=r.orbitSpeed;return{group:i,mesh:h,material:c,beaconMesh:w,haloSprite:f,trailLine:k,config:r,parentPlanet:e,highlight(x){L.opacity=x?.95:r.isMajor?.55:.25,c.color.set(x?16777215:r.isMajor?16317180:13358561),b.opacity=x?1:.95,f.scale.set(t*(x?5:3.6),t*(x?5:3.6),1)},update(x,A=0){E+=O*x,h.rotation.y+=.8*x,h.rotation.x=Math.sin(A*.5)*.15;const z=1+Math.sin(A*3.5+r.orbitRadius)*.18;w.scale.setScalar(z),f.scale.set(t*3.6*z,t*3.6*z,1);const H=Math.cos(E)*N,_=Math.sin(E)*N*(r.inclination||.1),he=Math.sin(E)*N;i.position.set(H,_,he)},getPosition(){const x=new p;return i.getWorldPosition(x),x}}}class Ke{constructor(e,i){this.container=e,this.labelContainer=i,this.width=window.innerWidth,this.height=window.innerHeight,this.isMobile=window.innerWidth<768,this.maxDpr=this.isMobile?1.5:2,this.dpr=Math.min(window.devicePixelRatio||1,this.maxDpr),this.scene=new xe,this.scene.fog=new Pe(263690,35e-5),this.camera=new Se(45,this.width/this.height,.5,3500),this.camera.position.set(0,180,420),this.camera.up.set(0,1,0),this.renderer=new Ce({powerPreference:"high-performance",antialias:!1,stencil:!1,depth:!0,alpha:!1}),this.renderer.setSize(this.width,this.height),this.renderer.setPixelRatio(this.dpr),this.renderer.toneMapping=Me,this.renderer.toneMappingExposure=1.08,this.renderer.outputColorSpace=Le,this.container.appendChild(this.renderer.domElement);const t=new Ee(263954,.18);this.scene.add(t),this.starfield=Ge(this.isMobile?1800:3400),this.scene.add(this.starfield.group),this.sun=Ve(R.sun.radius),this.scene.add(this.sun.group),this.planets={},this.moons={},this.clickableObjects=[],this.setupPlanetarySystem(),this.raycaster=new De,this.pickingPointer=new ne(-999,-999),this.parallax=new ne(0,0),this.hasPointerMoved=!1,this.isCoarsePointer=window.matchMedia("(pointer: coarse)").matches,this.hoveredObject=null,this.focusedTarget=null,this.mode="guided",this.exploreTarget=new p(0,0,0),this.exploreSpherical=new Te(420,Math.PI*.35,0),this.isDragging=!1,this.previousPointerPos={x:0,y:0},this.flightSpline=this.createFlightSpline(),this.splineProgress=0,this.currentCamPos=new p().copy(this.camera.position),this.targetCamPos=new p().copy(this.camera.position),this.currentLookAt=new p(0,0,0),this.targetLookAt=new p(0,0,0),this.tempVec=new p,this.ignitionProgress=0,this.isIgnited=!1,this.activeNightMoon=null,this.nightTween=null,this.timeDilation=1,this.bindEvents()}setupPlanetarySystem(){R.planets.forEach(e=>{const i=He(e);this.planets[e.id]=i,this.scene.add(i.group),this.scene.add(i.orbitLine),this.clickableObjects.push(i.mesh)}),R.moons.forEach(e=>{const i=this.planets[e.parentPlanetId];if(!i)return;const t=Xe(e,i);this.moons[e.id]=t,i.group.add(t.group),i.group.add(t.trailLine),this.clickableObjects.push(t.mesh)})}createFlightSpline(){const e=R.splineWaypoints.map(i=>new p(i.x,i.y,i.z));return new Ie(e,!1,"centripetal",.5)}bindEvents(){const e=this.renderer.domElement,i=new Map;let t=0,o=0,a=0;window.addEventListener("pointermove",n=>{const l=performance.now();if(!(l-a<16)){if(a=l,this.pickingPointer.x=n.clientX/this.width*2-1,this.pickingPointer.y=-(n.clientY/this.height)*2+1,this.hasPointerMoved=!0,this.isCoarsePointer||(this.parallax.x=F.clamp(this.pickingPointer.x,-1,1),this.parallax.y=F.clamp(this.pickingPointer.y,-1,1)),this.mode==="explore"&&i.has(n.pointerId)&&(i.set(n.pointerId,{x:n.clientX,y:n.clientY}),i.size===2&&t>0)){const[c,h]=Array.from(i.values()),m=Math.hypot(c.x-h.x,c.y-h.y);if(m>0){const b=t/m;this.exploreSpherical.radius=F.clamp(o*b,35,800),this.updateExploreCameraPosition()}return}if(this.mode==="explore"&&this.isDragging){const c=n.clientX-this.previousPointerPos.x,h=n.clientY-this.previousPointerPos.y;this.previousPointerPos={x:n.clientX,y:n.clientY};const m=.005;this.exploreSpherical.theta-=c*m,this.exploreSpherical.phi-=h*m,this.exploreSpherical.phi=F.clamp(this.exploreSpherical.phi,.15,Math.PI-.2),this.updateExploreCameraPosition()}}},{passive:!0}),e.addEventListener("pointerdown",n=>{if(this.mode==="explore"){if(i.set(n.pointerId,{x:n.clientX,y:n.clientY}),i.size===1)this.isDragging=!0,this.previousPointerPos={x:n.clientX,y:n.clientY};else if(i.size===2){this.isDragging=!1;const[l,c]=Array.from(i.values());t=Math.hypot(l.x-c.x,l.y-c.y),o=this.exploreSpherical.radius}}});const s=n=>{if(i.delete(n.pointerId),i.size===0)this.isDragging=!1,t=0;else if(i.size===1){const l=Array.from(i.values())[0];this.previousPointerPos={x:l.x,y:l.y},this.isDragging=!0}};window.addEventListener("pointerup",s),window.addEventListener("pointercancel",s),e.addEventListener("wheel",n=>{if(this.mode==="explore"){n.preventDefault();const l=n.deltaY>0?1.08:.92;this.exploreSpherical.radius=F.clamp(this.exploreSpherical.radius*l,35,800),this.updateExploreCameraPosition()}},{passive:!1}),window.addEventListener("click",n=>{if(n.target.closest("button, a, dialog, input, .ui-panel, .explore-hud")||this.pickingPointer.x===-999)return;this.raycaster.setFromCamera(this.pickingPointer,this.camera);const l=this.raycaster.intersectObjects(this.clickableObjects);if(l.length>0){const c=l[0].object;if(c.userData?.isMoon)window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:c.userData.moonId}}));else if(c.userData?.isPlanet||c.parent&&c.parent.name.startsWith("Planet_")){const h=c.userData?.planetId||c.parent.name.replace("Planet_","").toLowerCase();window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:h}}))}}}),window.addEventListener("keydown",n=>{n.key==="Escape"&&this.mode==="explore"&&this.setMode("guided")}),window.addEventListener("resize",()=>this.resize(),{passive:!0})}setMode(e){if(this.mode!==e)if(this.mode=e,window.dispatchEvent(new CustomEvent("universe:mode-changed",{detail:{mode:e}})),e==="explore"){D.to(this,{timeDilation:1,duration:.6,ease:"power2.out"}),this.focusedTarget||this.exploreTarget.set(0,0,0);const i=new p().subVectors(this.currentCamPos,this.exploreTarget);this.exploreSpherical.setFromVector3(i),this.exploreSpherical.radius=F.clamp(this.exploreSpherical.radius,35,800),this.exploreSpherical.phi=F.clamp(this.exploreSpherical.phi,.15,Math.PI-.2)}else this.clearFocus()}updateExploreCameraPosition(){this.exploreSpherical.makeSafe(),this.targetCamPos.setFromSpherical(this.exploreSpherical).add(this.exploreTarget),this.targetLookAt.copy(this.exploreTarget)}zoomIn(){this.exploreSpherical.radius=Math.max(35,this.exploreSpherical.radius*.8),this.updateExploreCameraPosition()}zoomOut(){this.exploreSpherical.radius=Math.min(800,this.exploreSpherical.radius*1.25),this.updateExploreCameraPosition()}resetHome(){this.clearFocus(),this.exploreTarget.set(0,0,0),this.exploreSpherical.set(420,Math.PI*.35,0),this.updateExploreCameraPosition()}setFlightProgress(e){this.splineProgress=F.clamp(e,0,1)}setQualityScale(e){const i=Math.max(1,this.dpr*e);this.renderer.setPixelRatio(i)}resize(){this.width=window.innerWidth,this.height=window.innerHeight,this.isMobile=this.width<768,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)}calculateComposedFraming(e,i){const t=e.getPosition(),a=(i?.elevationDeg||30)*Math.PI/180,s=i?.distance||38,n=this.width>=768,c=Math.atan2(t.z,t.x)+.45,h=t.x+Math.cos(c)*s*Math.cos(a),m=t.y+s*Math.sin(a),b=t.z+Math.sin(c)*s*Math.cos(a),w=new p(h,m,b),y=t.clone();if(n){const v=new p().subVectors(t,w).normalize(),g=new p().crossVectors(v,new p(0,1,0)).normalize();y.addScaledVector(g,s*.32)}return{cameraPos:w,lookAt:y}}enterNightMode(e){this.nightTween&&this.nightTween.kill(),this.activeNightMoon=e,this.nightTween=D.timeline({defaults:{duration:1.2,ease:"power2.out"}}),this.sun.light&&this.nightTween.to(this.sun.light,{intensity:.55},0),this.sun.coronaSprite?.material&&this.nightTween.to(this.sun.coronaSprite.material,{opacity:.12},0),this.renderer&&this.nightTween.to(this.renderer,{toneMappingExposure:.92},0),e.material&&this.nightTween.to(e.material,{emissiveIntensity:1.25},0)}exitNightMode(){if(!this.activeNightMoon)return;this.nightTween&&this.nightTween.kill();const e=this.activeNightMoon;if(this.activeNightMoon=null,this.nightTween=D.timeline({defaults:{duration:.9,ease:"power2.inOut"}}),this.sun.light&&this.nightTween.to(this.sun.light,{intensity:2.8},0),this.sun.coronaSprite?.material&&this.nightTween.to(this.sun.coronaSprite.material,{opacity:.5},0),this.renderer&&this.nightTween.to(this.renderer,{toneMappingExposure:1.08},0),e.material){const i=e.config?.isMajor?.55:.35;this.nightTween.to(e.material,{emissiveIntensity:i},0)}}focusOnBody(e,i){if(e==="sun"){this.exitNightMode(),this.focusedTarget={getPosition:()=>new p(0,0,0),offset:new p(0,28,65),isSun:!0},this.exploreTarget.set(0,0,0),D.to(this,{timeDilation:1,duration:.8,ease:"power2.inOut"});return}let t=null,o=!1;typeof e=="string"?(t=this.moons[e]||this.planets[e],o=!!this.moons[e]):e&&typeof e.getPosition=="function"?(t=e,o=!!(t.mesh?.userData?.isMoon||t.config?.parentPlanetId)):e?.id&&(t=this.moons[e.id]||this.planets[e.id],o=!!this.moons[e.id]),t&&(o?(this.activeNightMoon!==t&&this.enterNightMode(t),D.to(this,{timeDilation:.35,duration:.8,ease:"power2.out"})):(this.exitNightMode(),D.to(this,{timeDilation:1,duration:.8,ease:"power2.inOut"})),this.focusedTarget={targetObj:t,customFraming:i,getPosition:()=>t.getPosition()},this.exploreTarget.copy(t.getPosition()))}clearFocus(){this.focusedTarget=null,this.exitNightMode(),D.to(this,{timeDilation:1,duration:.8,ease:"power2.inOut"})}update(e,i){this.sun.update(i,this.camera),this.starfield.update(i);const t=e*this.timeDilation;if(Object.values(this.planets).forEach(n=>n.update(t,i)),Object.values(this.moons).forEach(n=>n.update(t,i)),this.hasPointerMoved&&this.pickingPointer.x!==-999){this.raycaster.setFromCamera(this.pickingPointer,this.camera);const n=this.raycaster.intersectObjects(this.clickableObjects);if(n.length>0){const l=n[0].object;this.hoveredObject!==l&&(this.hoveredObject=l,document.body.style.cursor="pointer")}else this.hoveredObject&&(document.body.style.cursor="default",this.hoveredObject=null)}if(this.mode==="explore")this.updateExploreCameraPosition();else if(this.focusedTarget)if(this.focusedTarget.isSun)this.targetCamPos.set(0,28,65),this.targetLookAt.set(0,0,0);else{const n=this.calculateComposedFraming(this.focusedTarget.targetObj,this.focusedTarget.customFraming);this.targetCamPos.copy(n.cameraPos),this.targetLookAt.copy(n.lookAt)}else{const n=this.flightSpline.getPointAt(this.splineProgress),l=this.hasPointerMoved?this.parallax.x*12:0,c=this.hasPointerMoved?this.parallax.y*8:0;this.targetCamPos.copy(n).add(this.tempVec.set(l,c,0));const h=Math.min(1,this.splineProgress+.08),m=this.flightSpline.getPointAt(h);this.splineProgress<.12?this.targetLookAt.set(0,-30,0):this.targetLookAt.copy(m)}const o=Math.min(e,.1),a=1-Math.exp(-4.5*o),s=1-Math.exp(-5.5*o);this.currentCamPos.lerp(this.targetCamPos,a),this.currentLookAt.lerp(this.targetLookAt,s),this.camera.position.copy(this.currentCamPos),this.camera.lookAt(this.currentLookAt)}dispose(){this.renderer.dispose(),this.scene.clear()}}function Qe(r,e,i){let t=null,o=null,a=!0;try{t=new Ae(r,{multisampling:0,frameBufferType:ke});const s=new ze(e,i);t.addPass(s),o=new Re({luminanceThreshold:.85,luminanceSmoothing:.2,intensity:1,mipmapBlur:!0});const n=new Fe({esv:!1,offset:.32,darkness:.42}),l=new Ne,c=new Oe(i,o,n,l);t.addPass(c)}catch(s){if(console.warn("Post-processing fallback to standard pipeline:",s),t){try{t.dispose()}catch{}t=null}a=!1}return{composer:t,isEnabled(){return a},setQuality(s){!a||!o||(s==="low"?o.intensity=.6:s==="medium"?o.intensity=.85:o.intensity=1)},resize(s,n){t&&t.setSize(s,n)},render(s){if(a&&t)try{t.render(s)}catch(n){console.warn("Post-processing runtime error, falling back to standard renderer:",n),a=!1;try{t.dispose()}catch{}t=null,r.render(e,i)}else r.render(e,i)},dispose(){t&&t.dispose()}}}class $e{constructor(e={}){this.onQualityChange=e.onQualityChange||(()=>{}),this.historySize=60,this.frameTimes=new Float32Array(this.historySize),this.frameIndex=0,this.totalSamples=0,this.lastTimestamp=0,this.currentTier="high",this.stableGoodFrames=0,this.fps=60,this.longStallCount=0,this.maxObservedFrameTime=0,this.isSuspended=!1}notifySuspension(){this.isSuspended=!0,this.lastTimestamp=0}resumeClock(e=performance.now()){this.isSuspended=!1,this.lastTimestamp=e}tick(e){if(!this.lastTimestamp||this.isSuspended){this.lastTimestamp=e,this.isSuspended=!1;return}const i=e-this.lastTimestamp;if(this.lastTimestamp=e,i>120){this.longStallCount++,this.maxObservedFrameTime=Math.max(this.maxObservedFrameTime,i);const a=Math.min(i,160);this.recordSample(a)}else this.recordSample(i);let t=0;for(let a=0;a<this.totalSamples;a++)t+=this.frameTimes[a];const o=t/this.totalSamples;this.fps=Math.round(1e3/Math.max(1,o)),this.totalSamples>=30&&(o>20||this.longStallCount>3?(this.stableGoodFrames=0,this.currentTier==="high"?this.setTier("medium"):this.currentTier==="medium"&&(o>24||this.longStallCount>5)&&this.setTier("low")):o<16.8&&this.longStallCount===0&&(this.stableGoodFrames++,this.stableGoodFrames>180&&(this.currentTier==="low"?this.setTier("medium"):this.currentTier==="medium"&&this.setTier("high"),this.stableGoodFrames=0)))}recordSample(e){this.frameTimes[this.frameIndex]=e,this.frameIndex=(this.frameIndex+1)%this.historySize,this.totalSamples<this.historySize&&this.totalSamples++}setTier(e){if(this.currentTier===e)return;this.currentTier=e;let i=1;e==="medium"&&(i=.85),e==="low"&&(i=.72),this.onQualityChange(e,i)}getPercentiles(){if(this.totalSamples===0)return{p50:16.6,p95:16.6,p99:16.6,maxFrameTime:0,longStalls:0,fps:60};const e=Array.from(this.frameTimes.slice(0,this.totalSamples)).sort((a,s)=>a-s),i=e[Math.floor(e.length*.5)],t=e[Math.min(e.length-1,Math.floor(e.length*.95))],o=e[Math.min(e.length-1,Math.floor(e.length*.99))];return{p50:Number(i.toFixed(2)),p95:Number(t.toFixed(2)),p99:Number(o.toFixed(2)),maxFrameTime:Number(this.maxObservedFrameTime.toFixed(2)),longStalls:this.longStallCount,fps:this.fps}}getMetrics(){const e=this.getPercentiles();return{fps:this.fps,tier:this.currentTier,longStallCount:this.longStallCount,maxObservedFrameTime:this.maxObservedFrameTime,percentiles:e}}}class Ze{constructor(e){this.container=e,this.items=[],this.tempVec=new p,this.visibleRects=[],this.exclusionZones=[],this.selectedId=null,document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>this.remeasure())}register(e,i,t,o,a,s){const n=document.createElement("button");n.type="button",n.className=`celestial-3d-label label-${t} priority-${o}`,n.dataset.id=e,n.setAttribute("aria-label",`Navigate to ${i}`),n.tabIndex=0;const l=document.createElement("span");l.className="label-indicator";const c=document.createElement("span");c.className="label-text",c.textContent=i,n.appendChild(l),n.appendChild(c),s&&n.addEventListener("click",()=>s(e)),this.container.appendChild(n);const h={id:e,name:i,type:t,priority:o,basePriority:o,getPosition:a,element:n,width:0,height:0,isVisible:!0};return this.items.push(h),n}setSelected(e){this.selectedId=e,this.items.forEach(i=>{i.priority=i.id===e?1e3:i.basePriority})}remeasure(){this.items.forEach(e=>{const i=e.element.getBoundingClientRect();i.width>0&&(e.width=i.width,e.height=i.height)})}updateExclusionZones(e,i){this.exclusionZones.length=0;const t=document.querySelector(".nav-header");if(t){const s=t.getBoundingClientRect();s.height>0&&this.exclusionZones.push({left:0,right:e,top:0,bottom:s.bottom+8})}const o=document.querySelector(".hero-cinematic-content");if(o){const s=o.getBoundingClientRect();s.top<i&&s.bottom>0&&this.exclusionZones.push({left:s.left-12,right:s.right+12,top:s.top-12,bottom:s.bottom+12})}const a=document.querySelector(".flight-case-card.is-active-flight");if(a){const s=a.getBoundingClientRect();s.top<i&&s.bottom>0&&this.exclusionZones.push({left:s.left-16,right:s.right+16,top:s.top-16,bottom:s.bottom+16})}}hideItem(e){e.element.style.opacity="0",e.element.style.pointerEvents="none",e.element.setAttribute("aria-hidden","true"),e.element.tabIndex=-1,e.isVisible=!1}showItem(e,i,t,o,a){e.element.style.transform=`translate3d(${(i-o*.5).toFixed(1)}px, ${(t-a*.5).toFixed(1)}px, 0)`,e.element.style.opacity="1",e.element.style.pointerEvents="auto",e.element.removeAttribute("aria-hidden"),e.element.tabIndex=0,e.isVisible=!0}update(e,i,t){this.visibleRects.length=0,this.updateExclusionZones(i,t),this.items.sort((o,a)=>a.priority-o.priority);for(let o=0;o<this.items.length;o++){const a=this.items[o],s=a.getPosition(),n=new p().subVectors(s,e.position),l=e.getWorldDirection(new p);if(n.dot(l)<=e.near+.5){this.hideItem(a);continue}if(a.type!=="sun"){const u=n.length(),f=n.clone().normalize(),S=e.position.clone().negate(),d=S.dot(f);if(d>0&&d<u&&S.lengthSq()-d*d<576&&a.priority<1e3){this.hideItem(a);continue}}if(this.tempVec.copy(s),this.tempVec.project(e),this.tempVec.z>.98||this.tempVec.z<-1){this.hideItem(a);continue}const h=(this.tempVec.x*.5+.5)*i,m=(-(this.tempVec.y*.5)+.5)*t,b=20;if(h<b||h>i-b||m<b||m>t-b){this.hideItem(a);continue}if(!a.width){const u=a.element.getBoundingClientRect();a.width=u.width||80,a.height=u.height||26}const w=a.width,y=a.height,v={left:h-w*.5-6,right:h+w*.5+6,top:m-y*.5-4,bottom:m+y*.5+4};let g=!1;for(let u=0;u<this.exclusionZones.length;u++){const f=this.exclusionZones[u];if(v.left<f.right&&v.right>f.left&&v.top<f.bottom&&v.bottom>f.top){g=!0;break}}if(g&&a.priority<1e3){this.hideItem(a);continue}let C=!1;for(let u=0;u<this.visibleRects.length;u++){const f=this.visibleRects[u];if(v.left<f.right&&v.right>f.left&&v.top<f.bottom&&v.bottom>f.top){C=!0;break}}C&&a.priority<1e3?this.hideItem(a):(this.visibleRects.push(v),this.showItem(a,h,m,w,y))}}dispose(){this.items.forEach(e=>{e.element&&e.element.parentNode&&e.element.parentNode.removeChild(e.element)}),this.items=[]}}const B={sun:{id:"sun",name:"Diwakar Venkat Peddada",classification:"Identity & Overview",orbit:"System Center",status:"AI Developer",problem:"Software portfolios often rely on static screenshots and shallow lists that fail to communicate architectural depth.",whatItDoes:"Central overview orchestrating real-time 3D Keplerian orbital physics, adaptive GPU governance, and cinematic lighting across all technology domains.",stack:["Three.js","WebGL 2","GSAP","Lenis","Vite","postprocessing"],metric:"Real-time 60fps WebGL 3D system, under 100 draw calls, sub-3MB bundle with adaptive GPU governance.",sourceUrl:"https://github.com/Diva143V/myselfdiva"},python:{id:"python",name:"Python",classification:"Primary Language · Biomedical AI",orbit:"Orbit 1 · Python",status:"Core Stack",problem:"Biomedical knowledge graphs and clinical trial registries require robust deterministic pipelines and asynchronous literature collection.",whatItDoes:"Core language for AI literature synthesis, local embedding models, graph traversal algorithms, and automated bioinformatics pipelines.",stack:["Python 3.11+","FastAPI","ChromaDB","Reflex","Pytest"],metric:"Powers Griffin Bio (10 modular collectors) and SyGriffin neoantigen discovery tools.",sourceUrl:"https://github.com/Diva143V/Griffin"},csharp:{id:"csharp",name:"C# / .NET",classification:"Primary Language · Desktop Systems",orbit:"Orbit 2 · C# / .NET",status:"Core Stack",problem:"Windows system audio and Live Captions hooks require low-overhead native interop and high-frequency UI updates without dropping frames.",whatItDoes:"Architecture anchor for native Windows accessibility software, WPF overlays, hardware acceleration, and multi-threaded desktop software.",stack:["C#",".NET 8","WPF","Windows API","SQLite"],metric:"Powers LiveSubs single self-contained .exe with real-time API translation hooks.",sourceUrl:"https://github.com/Diva143V/LiveSubs",releaseUrl:"https://github.com/Diva143V/LiveSubs/releases"},rust:{id:"rust",name:"Rust",classification:"Primary Language · Systems & MCP",orbit:"Orbit 3 · Rust",status:"Core Stack",problem:"LLM agents suffer from catastrophic memory loss across sessions, losing architectural context and human edits.",whatItDoes:"Foundation for high-performance systems programming, MCP protocol servers, graph database indexing, and Tauri cross-platform software.",stack:["Rust 1.85+","PetGraph","SQLite FTS5","Tauri v2","Tokio"],metric:"Powers Knox MCP server with 8 focused tools and strict token budgets.",sourceUrl:"https://github.com/Diva143V/Knox"},typescript:{id:"typescript",name:"TypeScript",classification:"Primary Language · Interfaces & WebGL",orbit:"Orbit 4 · TypeScript",status:"Core Stack",problem:"Interactive 3D environments demand strict type-safety across custom shader uniforms, physics loops, and complex DOM overlays.",whatItDoes:"Powers modern frontend architecture, Three.js 3D graphics, reactive user interfaces, and client-side tooling.",stack:["TypeScript","Three.js","Vite","React 19","GSAP"],metric:"Architectural foundation for myselfdiva 3D universe and interactive web applications.",sourceUrl:"https://github.com/Diva143V/myselfdiva"},cpp:{id:"cpp",name:"C++",classification:"Primary Language · Algorithms & Performance",orbit:"Orbit 5 · C++",status:"Core Stack",problem:"Time-critical algorithmic competitions require microsecond-level cache locality and manual memory optimization.",whatItDoes:"High-performance competitive programming, custom search data structures, branch-prediction tuning, and memory layout optimization.",stack:["C++20","Data Structures","Competitive Programming","Algorithms"],metric:"1st place solver in HackMe 2024 optimization challenge.",sourceUrl:"https://github.com/Diva143V"},livesubs:{id:"livesubs",name:"LiveSubs",classification:"Project · Real-Time Windows Subtitle Overlay",orbit:"Orbit 2 · C# / .NET",status:"Shipped",problem:"Speech in meetings, video calls, and streams moves faster than users can read or translate using conventional transcription windows.",whatItDoes:"Captures Windows Live Captions in real time, translates recognized speech through 9+ API backends (Google, DeepL, OpenAI, Ollama, LM Studio), and renders a responsive, always-on-top customizable subtitle bar over any active window or call.",stack:["C#",".NET 8","WPF","Windows Live Captions API","SQLite"],metric:"9+ translation backends supported; self-contained single .exe (Windows x64) with zero runtime install; settings persisted in %AppData%\\LiveSubs\\setting.json; optional SQLite translation history database.",sourceUrl:"https://github.com/Diva143V/LiveSubs",releaseUrl:"https://github.com/Diva143V/LiveSubs/releases"},griffin:{id:"griffin",name:"Griffin Bio",classification:"Project · Scientific Evidence Synthesis",orbit:"Orbit 1 · Python",status:"Active",problem:"Biomedical research papers are scattered across fragmented databases with conflicting clinical claims that take weeks to manually cross-check.",whatItDoes:"Collects literature and scientific data from 10 modular source collectors, merges and deduplicates entries, generates sentence embeddings, and executes an automated Mixture-of-LLMs pipeline for claim extraction, Oxford evidence ranking, contradiction detection, and consensus synthesis surfaced through a Reflex web dashboard.",stack:["Python","ChromaDB","Ollama","Graph RAG","Reflex","Mixture of LLMs"],metric:"10 modular source collectors (PubMed, Europe PMC, Semantic Scholar, OpenAlex, ClinicalTrials, bioRxiv, ChEMBL, UniProt, PubChem, dbSNP); Oxford Levels of Evidence ranking; 7 specialized reasoning agents.",sourceUrl:"https://github.com/Diva143V/Griffin"},knox:{id:"knox",name:"Knox",classification:"Project · Causal Knowledge Graph & MCP Server",orbit:"Orbit 3 · Rust",status:"Shipped",problem:"AI coding agents suffer from catastrophic amnesia, losing architectural rationale, design decisions, and constraints across sessions and tool switches.",whatItDoes:"A persistent, cross-platform causal knowledge graph and Model Context Protocol (MCP) server built in Rust. It captures architectural decisions, pre-flight constraints, and developer human edits across disparate coding sessions (Antigravity, Cursor, Claude Code, Gemini CLI), giving AI agents long-term causal memory.",stack:["Rust 1.85+","SQLite WAL & FTS5","PetGraph","Tauri v2","React 19","Tailwind v4","D3 Physics"],metric:"8 focused MCP tools (knox_begin, knox_context, knox_check, knox_trace, knox_record, knox_handoff, knox_ask, knox_update); tool definition footprint budgeted <= 850 tokens; 50-pair calibrated guardrail with 0.60 overlap threshold; 5.46 MB LZMA setup wizard.",sourceUrl:"https://github.com/Diva143V/Knox"},sygriffin:{id:"sygriffin",name:"SyGriffin",classification:"Project · Neoantigen Discovery Engine",orbit:"Orbit 1 · Python",status:"Active · Scientific MVP",problem:"Identifying clinically viable neoantigen candidates from raw tumor mutations requires complex, opaque computational biology pipelines.",whatItDoes:"A CLI-first AI bioinformatics platform and life-sciences research companion that parses tumor VCF files, predicts vaccine-relevant peptide targets, ranks candidates with transparent scoring, and preserves reproducible audit records for cancer vaccine research.",stack:["Python 3.11","Bun 1.3+","VEP","MHCflurry","uv","pytest","mypy"],metric:"Predicts peptide candidates matched to specific HLA alleles (e.g. HLA-A*02:01, melanoma, GRCh37); automated RNA-seq run validation checking matrix structure, sample-ID alignment, replicate counts, and batch-confounding.",sourceUrl:"https://github.com/Diva143V/SyGriffin"},polaris:{id:"polaris",name:"Polaris (Kg-Library-API)",classification:"Project · Think-on-Graph Library",orbit:"Orbit 1 · Python",status:"Active",problem:"High LLM inference cost and latency during multi-hop graph queries over complex factual networks.",whatItDoes:"Modular, storage-agnostic Knowledge Graph library with deterministic Python graph traversal and credit-controlled AI escalation.",stack:["Python","FastAPI","Poetry","Think-on-Graph","Pytest"],metric:"Deterministic graph traversal executes in < 5ms; 3-perspective synthesis (Knowledge, Expert, Combined); pluggable Domain Packs for external MCP tools.",sourceUrl:"https://github.com/Diva143V/Kg-Library-API"},sita:{id:"sita",name:"Sita",classification:"Project · Precursor Evidence Pipeline",orbit:"Orbit 1 · Python",status:"Shipped",problem:"Synthesizing disparate clinical evidence on metformin therapy in breast cancer.",whatItDoes:"End-to-end evidence ingestion and contradiction pipeline that laid the architectural foundation for Griffin Bio.",stack:["Python","Embeddings","PubMed API","Semantic Search"],metric:"Aggregated 3 medical databases and resolved semantic contradictions; precursor to Griffin Bio.",sourceUrl:"https://github.com/Diva143V/Sita"},myselfdiva:{id:"myselfdiva",name:"myselfdiva",classification:"Project · 3D Portfolio Universe",orbit:"Orbit 4 · TypeScript",status:"Live",problem:"Flat 2D diagram portfolios fail to communicate real-time systems depth.",whatItDoes:"Rebuilds personal portfolio as a realistic cinematic WebGL 3D universe with PBR materials and Keplerian orbital physics.",stack:["Three.js","Vite","GSAP","Lenis","postprocessing"],metric:"Architectural targets: 60fps simulation budget, under 100 draw calls, and total bundle payload < 3 MB; dynamically governed by AdaptiveGovernor.",sourceUrl:"https://github.com/Diva143V/myselfdiva"},hackme:{id:"hackme",name:"HackMe 2024 Solver",classification:"Competition · 1st Place Win",orbit:"Orbit 5 · C++",status:"First Place",problem:"Naive graph search algorithms timed out under strict competition time constraints.",whatItDoes:"First-place winning algorithmic optimization in C++ redesigning search data structures and pruning redundant search passes.",stack:["C++","Algorithms","Data Structures","Competitive Programming"],metric:"Cut runtime from timeout to sub-second evaluation, winning 1st place at HackMe 2024.",sourceUrl:"https://github.com/Diva143V/myselfdiva"}};B["c#"]=B.csharp;B["c# / .net"]=B.csharp;B["c++"]=B.cpp;class Je{constructor(e){this.universe=e,this.modal=document.getElementById("probe-modal"),this.titleEl=document.getElementById("probe-title"),this.classEl=document.getElementById("probe-classification"),this.problemEl=document.getElementById("probe-problem"),this.actionEl=document.getElementById("probe-action"),this.metricEl=document.getElementById("probe-metric"),this.stackEl=document.getElementById("probe-stack"),this.sourceLinkEl=document.getElementById("probe-source-link"),this.releaseLinkEl=document.getElementById("probe-release-link"),this.closeBtn=this.modal?.querySelector(".probe-close-btn"),this.invokerElement=null,this.bindEvents()}bindEvents(){if(!this.modal)return;let e=!1;const i=t=>{const o=this.modal.getBoundingClientRect();return t.clientX<o.left||t.clientX>o.right||t.clientY<o.top||t.clientY>o.bottom};this.modal.addEventListener("pointerdown",t=>{e=i(t)}),this.modal.addEventListener("pointerup",t=>{e&&i(t)&&this.close()}),this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.modal.addEventListener("close",()=>{this.modal.returnValue="",this.universe.clearFocus(),this.invokerElement&&(this.invokerElement.focus(),this.invokerElement=null)}),window.addEventListener("universe:select-moon",t=>{this.open(t.detail.moonId)}),window.addEventListener("universe:select-planet",t=>{this.open(t.detail.planetId)}),document.querySelectorAll("[data-inspect-celestial]").forEach(t=>{t.addEventListener("click",o=>{o.preventDefault(),this.invokerElement=t,this.open(t.dataset.inspectCelestial)})})}open(e){const i=(e||"").toLowerCase().trim(),t=B[i];!t||!this.modal||(this.titleEl&&(this.titleEl.textContent=t.name),this.classEl&&(this.classEl.textContent=`${t.classification} · ${t.orbit}`),this.problemEl&&(this.problemEl.textContent=t.problem),this.actionEl&&(this.actionEl.textContent=t.whatItDoes),this.metricEl&&(this.metricEl.textContent=t.metric),this.stackEl&&(this.stackEl.innerHTML="",(t.stack||[]).forEach(o=>{const a=document.createElement("span");a.className="probe-tag",a.textContent=o,this.stackEl.appendChild(a)})),this.sourceLinkEl&&(this.sourceLinkEl.href=t.sourceUrl||"#",this.sourceLinkEl.hidden=!t.sourceUrl),this.releaseLinkEl&&(this.releaseLinkEl.href=t.releaseUrl||"#",this.releaseLinkEl.hidden=!t.releaseUrl),this.universe.focusOnBody(e),this.modal.open||this.modal.showModal())}close(){this.modal&&this.modal.open&&this.modal.close()}}D.registerPlugin(se);class et{constructor(e,i){this.universe=e,this.probe=i,this.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.lenis=null,this.masterTrigger=null,this.currentCaseIndex=-1,this.caseStudies=R.caseStudies,this.initLenis(),this.initScrollFlight(),this.initCardSteppers(),this.initMagneticButtons(),this.syncCaseCards(this.masterTrigger?this.masterTrigger.progress:0),window.addEventListener("resize",()=>{this.syncCaseCards(this.masterTrigger?this.masterTrigger.progress:0)},{passive:!0}),this.initHashNavigation(),this.reducedMotion||this.playStagedIgnition()}initLenis(){this.reducedMotion||(this.lenis=new Be({duration:1.25,easing:e=>Math.min(1,1.001-Math.pow(2,-10*e)),orientation:"vertical",smoothWheel:!0}),this.lenis.on("scroll",se.update),D.ticker.add(e=>{this.lenis.raf(e*1e3)}),D.ticker.lagSmoothing(0))}initScrollFlight(){const e=document.getElementById("scroll-flight-track");e&&(this.masterTrigger=se.create({trigger:e,start:"top top",end:"bottom bottom",scrub:1,onUpdate:i=>{const t=i.progress;this.universe.mode==="guided"&&this.universe.setFlightProgress(t),this.syncCaseCards(t)}}),document.querySelectorAll("[data-flight-step]").forEach(i=>{i.addEventListener("click",t=>{const o=parseFloat(i.dataset.flightStep)||0;t.preventDefault(),this.flyToProgress(o)})}),document.querySelectorAll('a[href="#hero"]').forEach(i=>{i.addEventListener("click",t=>{t.preventDefault(),this.flyToTop()})}),document.querySelectorAll('a[href^="#case-"]').forEach(i=>{i.addEventListener("click",t=>{const o=i.getAttribute("href"),a=o.replace("#case-",""),s=this.caseStudies.findIndex(n=>n.id===a);s!==-1&&(t.preventDefault(),this.navigateToCase(s),history.pushState(null,"",o))})}))}syncCaseCards(e){const i=window.innerWidth>=768,t=document.querySelectorAll(".flight-case-card"),o=document.querySelector(".flight-deck");if(!i){t.forEach(s=>{s.style.display="block",s.style.opacity="1",s.removeAttribute("inert")}),o&&(o.style.opacity="1",o.style.pointerEvents="auto");return}if(e<=.08||e>=.99){o&&(o.style.opacity="0",o.style.pointerEvents="none"),t.forEach(s=>{s.style.display="none",s.classList.remove("is-active-flight"),s.setAttribute("inert","")}),this.currentCaseIndex!==-1&&(this.currentCaseIndex=-1,this.universe.clearFocus());return}o&&(o.style.opacity="1",o.style.pointerEvents="auto");let a=-1;for(let s=0;s<this.caseStudies.length;s++){const n=this.caseStudies[s];if(e>=n.progressMin&&e<=n.progressMax){a=s;break}}if(a===-1&&e>.08&&e<.99){let s=1/0;this.caseStudies.forEach((n,l)=>{const c=(n.progressMin+n.progressMax)*.5,h=Math.abs(e-c);h<s&&(s=h,a=l)})}if(t.forEach((s,n)=>{n===a?(s.style.display="block",s.classList.add("is-active-flight"),s.removeAttribute("inert"),s.style.opacity="1",s.style.pointerEvents="auto"):(s.style.display="none",s.classList.remove("is-active-flight"),s.setAttribute("inert",""),s.style.opacity="0",s.style.pointerEvents="none")}),a!==this.currentCaseIndex&&a!==-1){this.currentCaseIndex=a;const s=this.caseStudies[a];this.universe.focusOnBody(s.targetBodyId,s.cameraFraming),window.__UNIVERSE__?.labelManager&&window.__UNIVERSE__.labelManager.setSelected(s.targetBodyId)}}initCardSteppers(){document.querySelectorAll(".flight-case-card").forEach((e,i)=>{const t=e.querySelector(".stepper-prev"),o=e.querySelector(".stepper-next");t&&t.addEventListener("click",a=>{a.preventDefault(),i>0?this.navigateToCase(i-1):this.flyToTop()}),o&&o.addEventListener("click",a=>{if(a.preventDefault(),i<this.caseStudies.length-1)this.navigateToCase(i+1);else{const s=document.getElementById("experience");s&&(this.lenis?this.lenis.scrollTo(s,{duration:1.4}):s.scrollIntoView({behavior:"smooth"}))}})})}navigateToCase(e){if(e<0||e>=this.caseStudies.length)return;const i=window.innerWidth>=768,o=document.querySelectorAll(".flight-case-card")[e];if(i){const a=this.caseStudies[e],s=(a.progressMin+a.progressMax)*.5;this.flyToProgress(s)}else o&&(this.lenis?this.lenis.scrollTo(o,{offset:-80,duration:1.2}):o.scrollIntoView({behavior:"smooth"}))}initHashNavigation(){const e=(i,t=!1)=>{if(!i)return;if(i==="#hero"){this.flyToTop();return}if(i.startsWith("#case-")){const a=i.replace("#case-",""),s=this.caseStudies.findIndex(n=>n.id===a);if(s!==-1){this.navigateToCase(s);return}}const o=document.querySelector(i);o&&(this.lenis?this.lenis.scrollTo(o,{immediate:t,duration:1.4}):o.scrollIntoView({behavior:t?"auto":"smooth"}))};window.location.hash&&setTimeout(()=>e(window.location.hash,!0),150),window.addEventListener("popstate",()=>{e(window.location.hash,!1)})}flyToTop(){this.lenis?this.lenis.scrollTo(0,{duration:1.4}):window.scrollTo({top:0,behavior:"smooth"}),history.pushState(null,"","#hero")}flyToProgress(e){if(e<=0){this.flyToTop();return}const i=document.getElementById("scroll-flight-track");if(!i)return;const t=window.innerWidth>=768;let o;if(t?o=i.offsetTop+(i.offsetHeight-window.innerHeight)*e:o=i.offsetTop-70,this.reducedMotion){window.scrollTo({top:o,behavior:"auto"});return}this.lenis?this.lenis.scrollTo(o,{duration:1.6}):window.scrollTo({top:o,behavior:"smooth"})}playStagedIgnition(){const e=document.getElementById("ignition-curtain"),i=document.querySelector(".hero-cinematic-content");D.timeline({defaults:{ease:"power3.out"}}).to(this.universe.sun.light,{intensity:2.8,duration:1.8,delay:.2}).to(e,{opacity:0,duration:1.4,onComplete:()=>{e&&(e.style.display="none")}},"-=1.2").from(i,{y:40,opacity:0,duration:1.2},"-=0.8")}initMagneticButtons(){if(this.reducedMotion||!window.matchMedia("(hover: hover)").matches)return;document.querySelectorAll(".btn-magnetic").forEach(i=>{let t=null;i.addEventListener("pointerenter",()=>{t=i.getBoundingClientRect()}),i.addEventListener("pointermove",o=>{t||(t=i.getBoundingClientRect());const a=t.left+t.width*.5,s=t.top+t.height*.5,n=(o.clientX-a)*.26,l=(o.clientY-s)*.26;D.to(i,{x:n,y:l,duration:.3,ease:"power2.out"})}),i.addEventListener("pointerleave",()=>{D.to(i,{x:0,y:0,duration:.6,ease:"elastic.out(1, 0.4)"}),t=null})})}destroy(){this.lenis&&this.lenis.destroy(),this.masterTrigger&&this.masterTrigger.kill()}}function tt(){try{const r=document.createElement("canvas");return!!(window.WebGL2RenderingContext&&r.getContext("webgl2"))}catch{return!1}}document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("webgl-universe-container"),e=document.getElementById("labels-3d-overlay");if(!r||!e)return;const i=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!tt()||i){document.body.classList.add("is-static-fallback"),console.info("Serving static complete version (WebGL fallback / prefers-reduced-motion active)."),st();return}const t=new Ke(r,e),o=Qe(t.renderer,t.scene,t.camera),a=new $e({onQualityChange:(u,f)=>{t.setQualityScale(f),o.setQuality(u),console.info(`Adaptive Governor: Quality adjusted to [${u}] (scale: ${f})`)}}),s=new Ze(e);s.register(R.sun.id,R.sun.name,"sun",R.sun.priority,()=>t.sun.group.position,u=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:u}}))}),R.planets.forEach(u=>{s.register(u.id,`${u.name} (Orbit ${u.orbitIndex})`,"planet",u.priority,()=>t.planets[u.id].getPosition(),f=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:f}}))})}),R.moons.forEach(u=>{const f=u.isMajor?"moon-major":"moon-minor";s.register(u.id,u.name,f,u.priority,()=>t.moons[u.id].getPosition(),S=>{window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:S}}))})});const n=new Je(t),l=new et(t,n);it(t),ot(),window.__UNIVERSE__={universeScene:t,postProcessing:o,governor:a,labelManager:s,flightController:l,probeModal:n};let c=null,h=performance.now(),m=!1,b=!1,w=document.hidden;function y(u){if(!m)return;const f=Math.min((u-h)/1e3,.1);h=u,a.tick(u),t.update(f,u),s.update(t.camera,t.width,t.height),o.render(f),c=requestAnimationFrame(y)}function v(){const u=!b&&!w;u&&!m?(m=!0,h=performance.now(),a.resumeClock(h),c=requestAnimationFrame(y)):!u&&m&&(m=!1,a.notifySuspension(),c&&(cancelAnimationFrame(c),c=null))}v(),document.addEventListener("visibilitychange",()=>{w=document.hidden,v()}),window.addEventListener("resize",()=>{t.resize(),o.resize(t.width,t.height),s.remeasure()},{passive:!0});const g=document.getElementById("pause-motion-btn");g&&g.addEventListener("click",()=>{b=!b,b?(g.querySelector(".label").textContent="Resume Flight",g.setAttribute("aria-label","Resume orbital 3D flight"),g.classList.add("is-paused")):(g.querySelector(".label").textContent="Pause Flight",g.setAttribute("aria-label","Pause orbital 3D flight"),g.classList.remove("is-paused")),v()});const C=document.getElementById("ist-clock");if(C){const u=()=>{const f=new Date,S=5.5*60*60*1e3,d=f.getTime()+f.getTimezoneOffset()*6e4,M=new Date(d+S),T=I=>String(I).padStart(2,"0");C.textContent=`${T(M.getHours())}:${T(M.getMinutes())}:${T(M.getSeconds())} IST`};u(),setInterval(u,1e3)}});function it(r,e){const i=document.getElementById("hud-mode-toggle"),t=document.getElementById("hud-controls-group"),o=document.getElementById("hud-zoom-in"),a=document.getElementById("hud-zoom-out"),s=document.getElementById("hud-home"),n=document.getElementById("hud-exit");if(!i)return;function l(c){const h=c==="explore";i.setAttribute("aria-pressed",h?"true":"false");const m=i.querySelector(".camera-dock-label, .hud-mode-text");m&&(m.textContent=h?"Orbiting":"Free Orbit"),i.classList.toggle("is-active",h),t&&(h?t.removeAttribute("hidden"):t.setAttribute("hidden","")),document.body.classList.toggle("is-explore-mode",h)}i.addEventListener("click",()=>{const c=r.mode==="explore"?"guided":"explore";r.setMode(c)}),o&&o.addEventListener("click",()=>r.zoomIn()),a&&a.addEventListener("click",()=>r.zoomOut()),s&&s.addEventListener("click",()=>r.resetHome()),n&&n.addEventListener("click",()=>r.setMode("guided")),window.addEventListener("universe:mode-changed",c=>{l(c.detail.mode)}),l(r.mode)}function ot(){const r=document.getElementById("mobile-menu-btn"),e=document.querySelector(".nav-links");!r||!e||(r.addEventListener("click",()=>{const i=r.getAttribute("aria-expanded")==="true";r.setAttribute("aria-expanded",i?"false":"true"),e.classList.toggle("is-open",!i)}),e.querySelectorAll("a").forEach(i=>{i.addEventListener("click",()=>{r.setAttribute("aria-expanded","false"),e.classList.remove("is-open")})}))}function st(){const r=document.getElementById("probe-modal");r&&document.querySelectorAll("[data-inspect-celestial]").forEach(e=>{e.addEventListener("click",i=>{i.preventDefault(),r.showModal()})})}
