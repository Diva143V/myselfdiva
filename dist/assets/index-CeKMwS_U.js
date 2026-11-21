import{n as U,o as I,h as G,q as k,r as X,s as ce,G as H,t as de,u as V,v as W,M as T,w as J,x as Z,y as ee,z as u,f as ue,H as he,g as me,I as ne,J as se,K as pe,Q as ve,X as te,C as ie,Y as fe,e as ge,Z as ye,P as we,_ as be,$ as xe,S as Pe,a0 as Ce,a1 as Se,V as ae,a2 as Me,a3 as Ee}from"./three-DQtyl0sb.js";import{E as Ae,R as Le,B as Re,V as Te,C as De,S as Ie,a as ze}from"./postprocessing-SUE3Nl3u.js";import{g as z,S as Q}from"./gsap-Jiz4vAvE.js";import{L as ke}from"./lenis-BXjoyVLH.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();function Oe(s=3400){const t=new U,i=new Float32Array(s*3),e=new Float32Array(s*3),o=new Float32Array(s),n=new Float32Array(s*2),a=350,c=1200;for(let l=0;l<s;l++){const S=Math.random(),P=Math.random(),x=S*2*Math.PI,M=Math.acos(2*P-1),L=a+Math.random()*(c-a),D=L*Math.sin(M)*Math.cos(x),O=L*Math.sin(M)*Math.sin(x)*.45,b=L*Math.cos(M);if(i[l*3]=D,i[l*3+1]=O,i[l*3+2]=b,l<s*.65)e[l*3]=.85,e[l*3+1]=.9,e[l*3+2]=1,o[l]=1.2,n[l*2]=.8+Math.random()*1.5,n[l*2+1]=Math.random()*Math.PI*2;else if(l<s*.92){const C=Math.random()>.45;e[l*3]=C?.98:.92,e[l*3+1]=C?.72:.94,e[l*3+2]=C?.22:.98,o[l]=2,n[l*2]=1.5+Math.random()*2.5,n[l*2+1]=Math.random()*Math.PI*2}else e[l*3]=1,e[l*3+1]=.98,e[l*3+2]=.92,o[l]=3.6,n[l*2]=2+Math.random()*3,n[l*2+1]=Math.random()*Math.PI*2}t.setAttribute("position",new I(i,3)),t.setAttribute("color",new I(e,3)),t.setAttribute("size",new I(o,1)),t.setAttribute("twinkle",new I(n,2));const d=new G({uniforms:{uTime:{value:0}},vertexShader:`
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
    `,transparent:!0,depthWrite:!1,blending:k}),h=new X(t,d);h.matrixAutoUpdate=!1,h.updateMatrix();const p=450,v=new U,f=new Float32Array(p*3),m=new Float32Array(p*3);for(let l=0;l<p;l++){const S=l/p*Math.PI*2,P=550+Math.random()*300,x=(Math.random()-.5)*140;f[l*3]=Math.cos(S)*P+x,f[l*3+1]=(Math.random()-.5)*90,f[l*3+2]=Math.sin(S)*P+x,Math.random()>.6?(m[l*3]=.96*.25,m[l*3+1]=.62*.25,m[l*3+2]=.04*.25):(m[l*3]=.15*.3,m[l*3+1]=.25*.3,m[l*3+2]=.55*.3)}v.setAttribute("position",new I(f,3)),v.setAttribute("color",new I(m,3));const y=new ce({size:90,vertexColors:!0,transparent:!0,opacity:.18,depthWrite:!1,blending:k}),r=new X(v,y);r.matrixAutoUpdate=!1,r.updateMatrix();const w=new H;return w.add(h),w.add(r),{group:w,update(l){d.uniforms.uTime.value=l}}}const $={uniforms:{uTime:{value:0},uColorCore:{value:[1,.98,.88]},uColorMid:{value:[.96,.62,.04]},uColorLimb:{value:[.72,.22,.02]},uGranulationScale:{value:6.5},uTurbulenceSpeed:{value:.18}},vertexShader:`
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

      // Overdrive luminance for selective HDR bloom pass
      float bloomOverdrive = 1.8 + (1.0 - limbDarkening) * 0.8 + pow(convection, 3.0) * 0.9;
      vec3 finalColor = surfaceColor * bloomOverdrive;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `};function Ne(s=24){const t=new H;t.name="Sun";const i=new de(16775917,2.8,1800,1.2);i.position.set(0,0,0),t.add(i);const e=new V(s,64,48),o=new G({uniforms:W.clone($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader}),n=new T(e,o);t.add(n);const a=document.createElement("canvas");a.width=512,a.height=512;const c=a.getContext("2d"),d=c.createRadialGradient(256,256,0,256,256,256);d.addColorStop(0,"rgba(255, 250, 230, 0.95)"),d.addColorStop(.18,"rgba(245, 158, 11, 0.7)"),d.addColorStop(.45,"rgba(217, 119, 6, 0.28)"),d.addColorStop(.75,"rgba(180, 83, 9, 0.08)"),d.addColorStop(1,"rgba(0, 0, 0, 0)"),c.fillStyle=d,c.fillRect(0,0,512,512);const h=new J(a),p=new Z({map:h,blending:k,transparent:!0,opacity:.85,depthWrite:!1}),v=new ee(p);v.scale.set(s*4.6,s*4.6,1),t.add(v);const f=document.createElement("canvas");f.width=512,f.height=128;const m=f.getContext("2d"),y=m.createRadialGradient(256,64,0,256,64,256);y.addColorStop(0,"rgba(255, 240, 200, 0.65)"),y.addColorStop(.2,"rgba(245, 158, 11, 0.35)"),y.addColorStop(.8,"rgba(0, 0, 0, 0)"),m.fillStyle=y,m.fillRect(0,0,512,128);const r=new J(f),w=new Z({map:r,blending:k,transparent:!0,opacity:.45,depthWrite:!1}),l=new ee(w);return l.scale.set(s*9,s*1.8,1),t.add(l),{group:t,light:i,mesh:n,update(S,P){o.uniforms.uTime.value=S;const x=1+Math.sin(S*1.4)*.035;v.scale.set(s*4.6*x,s*4.6*x,1)}}}const Y={uniforms:{uColor:{value:new u(.22,.74,.97)},uTwilightColor:{value:new u(.98,.45,.12)},uSunPosition:{value:new u(0,0,0)},uAtmospherePower:{value:3.5},uAtmosphereIntensity:{value:1.6}},vertexShader:`
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
  `},K={uniforms:{uSunPosition:{value:new u(0,0,0)},uPlanetPosition:{value:new u(0,0,0)},uPlanetRadius:{value:20},uInnerRadius:{value:20*1.45},uOuterRadius:{value:20*2.5}},vertexShader:`
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
  `},B=`
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
`,j=`
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
`,re={uniforms:{uTime:{value:0},uSunPosition:{value:new u(0,0,0)}},vertexShader:j,fragmentShader:`
    ${B}

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
        // Procedural neural arteries
        float net1 = step(0.78, sin(vPosition.x * 32.0 + fbm3D(vPosition * 8.0, 3) * 6.0));
        float net2 = step(0.78, cos(vPosition.y * 32.0 + fbm3D(vPosition * 8.0, 3) * 6.0));
        circuitGrid = max(net1, net2) * smoothstep(0.04, 0.25, elevation);
      }
      vec3 bioluminescentGlow = vec3(0.0, 1.0, 0.82) * circuitGrid * 2.5 * nightFactor;

      // Twilight horizon warming (amber-gold at terminator)
      vec3 twilightColor = vec3(0.96, 0.45, 0.15) * twilight * 0.45;

      // Final Lighting Combination
      vec3 ambientCosmic = vec3(0.015, 0.025, 0.045);
      vec3 finalColor = surfaceColor * (ambientCosmic + dayFactor * 1.1) + twilightColor;
      finalColor += vec3(1.0, 0.95, 0.85) * specular;
      finalColor += bioluminescentGlow;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `},Fe={uniforms:{uTime:{value:0},uSunPosition:{value:new u(0,0,0)}},vertexShader:j,fragmentShader:`
    ${B}

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
  `},Ge={uniforms:{uTime:{value:0},uSunPosition:{value:new u(0,0,0)}},vertexShader:j,fragmentShader:`
    ${B}

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
  `},Ve={uniforms:{uTime:{value:0},uSunPosition:{value:new u(0,0,0)},uRingInnerRadius:{value:20*1.45},uRingOuterRadius:{value:20*2.5}},vertexShader:j,fragmentShader:`
    ${B}

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
  `},Be={uniforms:{uTime:{value:0},uSunPosition:{value:new u(0,0,0)}},vertexShader:j,fragmentShader:`
    ${B}

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
  `},je={python:re,csharp:Fe,rust:Ge,typescript:Ve,cpp:Be},oe={python:{color:new u(.12,.72,.96),twilight:new u(.98,.45,.12),power:3.6,intensity:1.5},csharp:{color:new u(.95,.62,.18),twilight:new u(1,.32,.05),power:3.2,intensity:1.6},rust:{color:new u(.85,.35,.14),twilight:new u(.88,.18,.06),power:4,intensity:1.4},typescript:{color:new u(.25,.82,.98),twilight:new u(.12,.95,.85),power:3.4,intensity:1.5},cpp:{color:new u(.85,.22,.05),twilight:new u(1,.55,.12),power:4.2,intensity:1.8}};function F(s){const t=new H;t.name="Planet_"+s.name;const i=(s.id||s.name).toLowerCase(),e=je[i]||re,o=s.isGasGiant?72:56,n=new V(s.radius,o,o),a=W.clone(e.uniforms);s.hasRings&&(a.uRingInnerRadius={value:s.radius*1.45},a.uRingOuterRadius={value:s.radius*2.5});const c=new G({uniforms:a,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),d=new T(n,c);d.castShadow=!0,d.receiveShadow=!0,d.userData={isPlanet:!0,planetId:i,config:s},t.add(d);const h=oe[i]||oe.python,p=new V(s.radius*1.038,48,48),v=W.clone(Y.uniforms);v.uColor.value.copy(h.color),v.uTwilightColor.value.copy(h.twilight),v.uAtmospherePower.value=h.power,v.uAtmosphereIntensity.value=h.intensity;const f=new G({uniforms:v,vertexShader:Y.vertexShader,fragmentShader:Y.fragmentShader,side:ue,blending:k,transparent:!0,depthWrite:!1}),m=new T(p,f);t.add(m);let y=null,r=null;if(s.hasRings){const b=s.radius*1.45,C=s.radius*2.5,R=new he(b,C,96);R.rotateX(Math.PI*.5);const g=W.clone(K.uniforms);g.uPlanetRadius.value=s.radius,g.uInnerRadius.value=b,g.uOuterRadius.value=C,r=new G({uniforms:g,vertexShader:K.vertexShader,fragmentShader:K.fragmentShader,side:me,transparent:!0,depthWrite:!1}),y=new T(R,r),y.rotation.z=.22,t.add(y)}const w=[],l=128;for(let b=0;b<=l;b++){const C=b/l*Math.PI*2;w.push(new u(Math.cos(C)*s.orbitRadius,Math.sin(C)*s.orbitRadius*(s.inclination||.05),Math.sin(C)*s.orbitRadius))}const S=new U().setFromPoints(w),P=new ne({color:9741240,transparent:!0,opacity:.18,depthWrite:!1}),x=new se(S,P);x.matrixAutoUpdate=!1,x.updateMatrix();let M=s.initialAngle||0;const L=s.orbitRadius,D=s.orbitSpeed,O=s.rotationSpeed||.004;return{group:t,orbitLine:x,config:s,mesh:d,atmoMesh:m,ringMesh:y,surfaceMaterial:c,highlight(b){P.color.set(b?16096779:9741240),P.opacity=b?.75:.18,v.uAtmosphereIntensity.value=b?h.intensity*1.35:h.intensity},update(b,C=0,R=new u(0,0,0)){M+=D*b;const g=Math.cos(M)*L,E=Math.sin(M)*L*(s.inclination||.05),A=Math.sin(M)*L;t.position.set(g,E,A),d.rotation.y+=O*b,c.uniforms.uTime&&(c.uniforms.uTime.value=C),c.uniforms.uSunPosition&&c.uniforms.uSunPosition.value.copy(R),v.uSunPosition.value.copy(R),r&&(r.uniforms.uSunPosition.value.copy(R),r.uniforms.uPlanetPosition.value.copy(t.position))},getPosition(){return t.position}}}const _e={python:61695,csharp:16096779,rust:16347926,typescript:3718648,cpp:15680580};function We(s,t){const i=new H;i.name="Moon_"+s.id;const e=s.radius||1.6,o=(t.config.name||"python").toLowerCase(),n=_e[o]||16096779,c=new pe(e,1).toNonIndexed(),d=c.attributes.position;for(let g=0;g<d.count;g++){const E=d.getX(g),A=d.getY(g),_=d.getZ(g),N=1+Math.sin(E*4)*Math.cos(A*4)*Math.sin(_*4)*.18;d.setXYZ(g,E*N,A*N,_*N)}c.computeVertexNormals();const h=new ve({color:s.isMajor?14870768:9741240,roughness:.35,metalness:.65,flatShading:!0}),p=new T(c,h);p.castShadow=!0,p.receiveShadow=!0,p.userData={isMoon:!0,moonId:s.id,config:s},i.add(p);const v=new V(e*.42,16,16),f=new te({color:n,transparent:!0,opacity:.95}),m=new T(v,f);i.add(m);const y=new V(e*.72,16,16),r=new te({color:n,transparent:!0,opacity:.28,blending:k}),w=new T(y,r);i.add(w);const l=84,S=[],P=[],x=new ie(n),M=new ie(3359061);for(let g=0;g<=l;g++){const E=g/l*Math.PI*2;S.push(new u(Math.cos(E)*s.orbitRadius,Math.sin(E)*s.orbitRadius*(s.inclination||.1),Math.sin(E)*s.orbitRadius)),s.isMajor;const A=M.clone().lerp(x,Math.sin(E*2)*.3+.3);P.push(A.r,A.g,A.b)}const L=new U().setFromPoints(S);L.setAttribute("color",new fe(P,3));const D=new ne({vertexColors:!0,transparent:!0,opacity:s.isMajor?.45:.18,depthWrite:!1}),O=new se(L,D);let b=s.initialAngle||Math.random()*Math.PI*2;const C=s.orbitRadius,R=s.orbitSpeed;return{group:i,mesh:p,beaconMesh:m,haloMesh:w,trailLine:O,config:s,parentPlanet:t,highlight(g){D.opacity=g?.95:s.isMajor?.45:.18,h.color.set(g?16777215:s.isMajor?14870768:9741240),f.opacity=g?1:.95,w.scale.setScalar(g?1.6:1)},update(g,E=0){b+=R*g,p.rotation.y+=.8*g,p.rotation.x=Math.sin(E*.5)*.15;const A=1+Math.sin(E*3.5+s.orbitRadius)*.22;m.scale.setScalar(A),w.scale.setScalar(A*1.15);const _=Math.cos(b)*C,N=Math.sin(b)*C*(s.inclination||.1),le=Math.sin(b)*C,q=t.getPosition();i.position.set(q.x+_,q.y+N,q.z+le)},getPosition(){return i.position}}}class Ue{constructor(t,i){this.container=t,this.labelContainer=i,this.width=window.innerWidth,this.height=window.innerHeight,this.isMobile=window.innerWidth<768,this.maxDpr=this.isMobile?1.5:2,this.dpr=Math.min(window.devicePixelRatio||1,this.maxDpr),this.scene=new ge,this.scene.fog=new ye(263690,38e-5),this.camera=new we(45,this.width/this.height,.5,3500),this.camera.position.set(0,180,420),this.renderer=new be({powerPreference:"high-performance",antialias:!1,stencil:!1,depth:!0,alpha:!1}),this.renderer.setSize(this.width,this.height),this.renderer.setPixelRatio(this.dpr),this.renderer.toneMapping=xe,this.renderer.toneMappingExposure=1.12,this.renderer.outputColorSpace=Pe,this.container.appendChild(this.renderer.domElement);const e=new Ce(263954,.18);this.scene.add(e),this.starfield=Oe(this.isMobile?1800:3400),this.scene.add(this.starfield.group),this.sun=Ne(22),this.scene.add(this.sun.group),this.planets={},this.moons={},this.clickableObjects=[],this.setupPlanetsAndMoons(),this.raycaster=new Se,this.mouse=new ae(-999,-999),this.hoveredObject=null,this.focusedTarget=null,this.flightSpline=this.createFlightSpline(),this.splineProgress=0,this.currentCamPos=new u().copy(this.camera.position),this.targetCamPos=new u().copy(this.camera.position),this.currentLookAt=new u(0,0,0),this.targetLookAt=new u(0,0,0),this.tempVec=new u,this.ignitionProgress=0,this.isIgnited=!1,this.bindEvents()}setupPlanetsAndMoons(){const t=F({name:"Python",id:"python",orbitIndex:1,radius:9.5,orbitRadius:95,orbitSpeed:.0035,initialAngle:.6,inclination:.04,rotationSpeed:.004});this.planets.python=t,this.scene.add(t.group),this.scene.add(t.orbitLine),this.clickableObjects.push(t.mesh),this.addMoon({id:"griffin",name:"Griffin Bio",parentPlanet:t,isMajor:!0,caseNumber:"02",radius:2.1,orbitRadius:22,orbitSpeed:.012,initialAngle:.8,inclination:.12}),this.addMoon({id:"sygriffin",name:"SyGriffin",parentPlanet:t,isMajor:!0,caseNumber:"04",radius:1.8,orbitRadius:32,orbitSpeed:.008,initialAngle:2.6,inclination:-.15}),this.addMoon({id:"polaris",name:"Polaris (Kg-Library-API)",parentPlanet:t,isMajor:!1,radius:1.3,orbitRadius:42,orbitSpeed:.0055,initialAngle:4.1,inclination:.08}),this.addMoon({id:"sita",name:"Sita",parentPlanet:t,isMajor:!1,radius:1.2,orbitRadius:50,orbitSpeed:.0042,initialAngle:5.4,inclination:-.09});const i=F({name:"C# / .NET",id:"csharp",orbitIndex:2,radius:14.5,orbitRadius:180,orbitSpeed:.0022,initialAngle:2.3,inclination:-.06,rotationSpeed:.007,isGasGiant:!0});this.planets.csharp=i,this.scene.add(i.group),this.scene.add(i.orbitLine),this.clickableObjects.push(i.mesh),this.addMoon({id:"livesubs",name:"LiveSubs",parentPlanet:i,isMajor:!0,caseNumber:"01",radius:2.3,orbitRadius:28,orbitSpeed:.011,initialAngle:1.2,inclination:.18});const e=F({name:"Rust",id:"rust",orbitIndex:3,radius:8.8,orbitRadius:265,orbitSpeed:.0016,initialAngle:4.2,inclination:.08,rotationSpeed:.0035});this.planets.rust=e,this.scene.add(e.group),this.scene.add(e.orbitLine),this.clickableObjects.push(e.mesh),this.addMoon({id:"knox",name:"Knox",parentPlanet:e,isMajor:!0,caseNumber:"03",radius:2.2,orbitRadius:25,orbitSpeed:.013,initialAngle:3.1,inclination:-.14});const o=F({name:"TypeScript",id:"typescript",orbitIndex:4,radius:9.2,orbitRadius:350,orbitSpeed:.0012,initialAngle:5.1,inclination:-.05,rotationSpeed:.004,hasRings:!0});this.planets.typescript=o,this.scene.add(o.group),this.scene.add(o.orbitLine),this.clickableObjects.push(o.mesh),this.addMoon({id:"myselfdiva",name:"myselfdiva",parentPlanet:o,isMajor:!1,radius:1.4,orbitRadius:24,orbitSpeed:.014,initialAngle:2.1,inclination:.1});const n=F({name:"C++",id:"cpp",orbitIndex:5,radius:8.5,orbitRadius:435,orbitSpeed:9e-4,initialAngle:1.5,inclination:.07,rotationSpeed:.003});this.planets.cpp=n,this.scene.add(n.group),this.scene.add(n.orbitLine),this.clickableObjects.push(n.mesh),this.addMoon({id:"hackme",name:"HackMe 2024",parentPlanet:n,isMajor:!1,radius:1.3,orbitRadius:22,orbitSpeed:.016,initialAngle:.4,inclination:-.12})}addMoon(t){const i=We(t,t.parentPlanet);this.moons[t.id]=i,this.scene.add(i.group),this.scene.add(i.trailLine),this.clickableObjects.push(i.mesh)}createFlightSpline(){const t=[new u(0,180,420),new u(45,65,175),new u(120,45,120),new u(160,50,-80),new u(-120,75,-220),new u(0,240,560)];return new Me(t,!1,"centripetal",.5)}bindEvents(){let t=0;window.addEventListener("pointermove",i=>{const e=performance.now();e-t<16||(t=e,this.mouse.x=i.clientX/this.width*2-1,this.mouse.y=-(i.clientY/this.height)*2+1)},{passive:!0}),window.addEventListener("click",i=>{if(i.target.closest("button, a, dialog, input, .ui-panel"))return;this.raycaster.setFromCamera(this.mouse,this.camera);const e=this.raycaster.intersectObjects(this.clickableObjects);if(e.length>0){const o=e[0].object;if(o.userData.isMoon)window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:o.userData.moonId}}));else if(o.parent&&o.parent.name.startsWith("Planet_")){const n=o.parent.name.replace("Planet_","").toLowerCase();window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:n}}))}}}),window.addEventListener("resize",()=>this.resize(),{passive:!0})}focusOnBody(t){let i=typeof t=="string"?this.moons[t]||this.planets[t]:t;if(t==="sun"){this.focusedTarget={getPosition:()=>new u(0,0,0),offset:new u(0,28,65)};return}if(!i)return;const e=i.getPosition(),o=this.sun.group.position,n=new u().subVectors(e,o).normalize(),a=new u(-n.z,.42,n.x).normalize(),c=(i.config?.radius||10)*3.5+18,d=n.clone().multiplyScalar(.65).add(a.multiplyScalar(.75)).normalize().multiplyScalar(c);this.focusedTarget={targetObj:i,getPosition:()=>i.getPosition(),offset:d},i.highlight&&i.highlight(!0)}clearFocus(){this.focusedTarget&&this.focusedTarget.targetObj&&this.focusedTarget.targetObj.highlight&&this.focusedTarget.targetObj.highlight(!1),this.focusedTarget=null}setFlightProgress(t){this.splineProgress=Math.max(0,Math.min(1,t))}setQualityScale(t){this.renderer.setPixelRatio(this.dpr*t)}resize(){this.width=window.innerWidth,this.height=window.innerHeight,this.isMobile=window.innerWidth<768,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)}update(t,i){const e=(i||performance.now())*.001,o=this.sun.group.position;Object.values(this.planets).forEach(a=>a.update(t,e,o)),Object.values(this.moons).forEach(a=>a.update(t,e)),this.sun.update(e,this.camera),this.starfield.update(e),this.raycaster.setFromCamera(this.mouse,this.camera);const n=this.raycaster.intersectObjects(this.clickableObjects);if(n.length>0){const a=n[0].object;this.hoveredObject!==a&&(this.hoveredObject&&this.hoveredObject.userData.highlightFn&&this.hoveredObject.userData.highlightFn(!1),this.hoveredObject=a,document.body.style.cursor="pointer")}else this.hoveredObject&&(document.body.style.cursor="default",this.hoveredObject=null);if(this.focusedTarget){const a=this.focusedTarget.getPosition();this.targetCamPos.copy(a).add(this.focusedTarget.offset),this.targetLookAt.copy(a),this.currentCamPos.lerp(this.targetCamPos,.06),this.currentLookAt.lerp(this.targetLookAt,.07)}else{const a=this.flightSpline.getPointAt(this.splineProgress);this.targetCamPos.copy(a).add(this.tempVec.set(this.mouse.x*12,this.mouse.y*8,0));const c=Math.min(1,this.splineProgress+.08),d=this.flightSpline.getPointAt(c);this.splineProgress<.15?this.targetLookAt.set(0,0,0):this.targetLookAt.copy(d),this.currentCamPos.lerp(this.targetCamPos,.08),this.currentLookAt.lerp(this.targetLookAt,.08)}this.camera.position.copy(this.currentCamPos),this.camera.lookAt(this.currentLookAt)}dispose(){this.renderer.dispose(),this.scene.clear()}}function He(s,t,i){let e=null,o=null,n=!0;try{e=new Ae(s,{multisampling:0,frameBufferType:Ee});const a=new Le(t,i);e.addPass(a),o=new Re({luminanceThreshold:.82,luminanceSmoothing:.25,intensity:1.6,mipmapBlur:!0});const c=new Te({esv:!1,offset:.28,darkness:.48}),d=new De({offset:new ae(.0012,.0012),radialModulation:!0,modulationOffset:.25}),h=new Ie,p=new ze(i,o,d,c,h);e.addPass(p)}catch(a){console.warn("Post-processing fallback to standard pipeline:",a),n=!1}return{composer:e,isEnabled(){return n},setQuality(a){!n||!o||(a==="low"?o.intensity=.8:a==="medium"?o.intensity=1.2:o.intensity=1.6)},resize(a,c){e&&e.setSize(a,c)},render(a){n&&e?e.render(a):s.render(t,i)},dispose(){e&&e.dispose()}}}class qe{constructor(t={}){this.onQualityChange=t.onQualityChange||(()=>{}),this.historySize=60,this.frameTimes=new Float32Array(this.historySize),this.frameIndex=0,this.totalSamples=0,this.lastTimestamp=0,this.currentTier="high",this.stableGoodFrames=0,this.fps=60}tick(t){if(!this.lastTimestamp){this.lastTimestamp=t;return}const i=t-this.lastTimestamp;if(this.lastTimestamp=t,i>120)return;this.frameTimes[this.frameIndex]=i,this.frameIndex=(this.frameIndex+1)%this.historySize,this.totalSamples<this.historySize&&this.totalSamples++;let e=0;for(let n=0;n<this.totalSamples;n++)e+=this.frameTimes[n];const o=e/this.totalSamples;this.fps=Math.round(1e3/Math.max(1,o)),this.totalSamples>=30&&(o>20?(this.stableGoodFrames=0,this.currentTier==="high"?this.setTier("medium"):this.currentTier==="medium"&&o>24&&this.setTier("low")):o<16.5&&(this.stableGoodFrames++,this.stableGoodFrames>180&&(this.currentTier==="low"?this.setTier("medium"):this.currentTier==="medium"&&this.setTier("high"),this.stableGoodFrames=0)))}setTier(t){if(this.currentTier===t)return;this.currentTier=t;let i=1;t==="medium"&&(i=.85),t==="low"&&(i=.72),this.onQualityChange(t,i)}getMetrics(){return{fps:this.fps,tier:this.currentTier}}}class $e{constructor(t){this.container=t,this.items=[],this.tempVec=new u,this.visibleRects=[]}register(t,i,e,o,n,a){const c=document.createElement("button");c.type="button",c.className=`celestial-3d-label label-${e} priority-${o}`,c.dataset.id=t,c.setAttribute("aria-label",`Navigate to ${i}`);const d=document.createElement("span");d.className="label-indicator";const h=document.createElement("span");return h.className="label-text",h.textContent=i,c.appendChild(d),c.appendChild(h),a&&c.addEventListener("click",()=>a(t)),this.container.appendChild(c),this.items.push({id:t,name:i,type:e,priority:o,getPosition:n,element:c,width:0,height:0,isVisible:!0}),c}update(t,i,e){this.visibleRects.length=0,this.items.sort((o,n)=>n.priority-o.priority);for(let o=0;o<this.items.length;o++){const n=this.items[o],a=n.getPosition();if(this.tempVec.copy(a),this.tempVec.project(t),this.tempVec.z>1){n.element.style.opacity="0",n.element.style.pointerEvents="none";continue}const c=(this.tempVec.x*.5+.5)*i,d=(-(this.tempVec.y*.5)+.5)*e,h=60;if(c<-h||c>i+h||d<-h||d>e+h){n.element.style.opacity="0",n.element.style.pointerEvents="none";continue}if(!n.width){const y=n.element.getBoundingClientRect();n.width=y.width||75,n.height=y.height||24}const p=n.width,v=n.height,f={left:c-p*.5-6,right:c+p*.5+6,top:d-v*.5-4,bottom:d+v*.5+4};let m=!1;for(let y=0;y<this.visibleRects.length;y++){const r=this.visibleRects[y];if(f.left<r.right&&f.right>r.left&&f.top<r.bottom&&f.bottom>r.top){m=!0;break}}m?(n.element.style.opacity="0",n.element.style.pointerEvents="none"):(this.visibleRects.push(f),n.element.style.transform=`translate3d(${c.toFixed(1)}px, ${d.toFixed(1)}px, 0)`,n.element.style.opacity="1",n.element.style.pointerEvents="auto")}}dispose(){this.items.forEach(t=>{t.element&&t.element.parentNode&&t.element.parentNode.removeChild(t.element)}),this.items=[]}}const Ye={livesubs:{id:"livesubs",name:"LiveSubs",classification:"MAJOR MOON // REAL-TIME OVERLAY",orbit:"Orbit 2 · C# / .NET",status:"Shipped // Self-Contained .exe",problem:"Speech in meetings and video streams moves faster than users can read or translate using conventional transcription windows.",whatItDoes:"Captures Windows Live Captions in real time, translates recognized speech through 9+ API backends (Google, DeepL, OpenAI, Ollama, LM Studio), and renders a responsive, always-on-top customizable subtitle bar over any active window or call.",stack:["C#",".NET 8","WPF","Windows Live Captions API","SQLite"],metric:"9+ translation backends supported; self-contained single .exe (Windows x64) with zero runtime install; settings persisted in %AppData%\\LiveSubs\\setting.json; optional SQLite translation history database.",sourceUrl:"https://github.com/Diva143V/LiveSubs",releaseUrl:"https://github.com/Diva143V/LiveSubs/releases"},griffin:{id:"griffin",name:"Griffin Bio",classification:"MAJOR MOON // BIOMEDICAL WORKBENCH",orbit:"Orbit 1 · Python",status:"Active // Production RAG",problem:"Biomedical research papers are scattered across fragmented silos with conflicting clinical claims that take weeks to manually synthesize.",whatItDoes:"Collects literature and scientific data from 10 modular source collectors, merges and deduplicates entries, generates sentence embeddings, and executes an automated Mixture-of-LLMs pipeline for claim extraction, Oxford evidence ranking, contradiction detection, and consensus synthesis surfaced through a Reflex web dashboard.",stack:["Python","ChromaDB","Ollama","Graph RAG","Reflex","Mixture of LLMs"],metric:"10 modular source collectors (PubMed, Europe PMC, Semantic Scholar, OpenAlex, ClinicalTrials, bioRxiv, ChEMBL, UniProt, PubChem, dbSNP); Oxford Levels of Evidence ranking; 7 specialized reasoning agents.",sourceUrl:"https://github.com/Diva143V/Griffin"},knox:{id:"knox",name:"Knox",classification:"MAJOR MOON // CAUSAL KNOWLEDGE GRAPH",orbit:"Orbit 3 · Rust",status:"Shipped // v2.1.0 NSIS Wizard",problem:"AI coding agents suffer from catastrophic amnesia, losing architectural rationale, design decisions, and constraints across sessions and tool switches.",whatItDoes:"A persistent, cross-platform causal knowledge graph and Model Context Protocol (MCP) server built in Rust. It captures architectural decisions, pre-flight constraints, and developer human edits across disparate coding sessions (Antigravity, Cursor, Claude Code, Gemini CLI), giving AI agents long-term causal memory.",stack:["Rust 1.85+","SQLite WAL & FTS5","PetGraph","Tauri v2","React 19","Tailwind v4","D3 Physics"],metric:"8 focused MCP tools (knox_begin, knox_context, knox_check, knox_trace, knox_record, knox_handoff, knox_ask, knox_update); tool definition footprint budgeted <= 850 tokens; 50-pair calibrated guardrail with 0.60 overlap threshold; 5.46 MB LZMA setup wizard.",sourceUrl:"https://github.com/Diva143V/Knox"},sygriffin:{id:"sygriffin",name:"SyGriffin",classification:"MAJOR MOON // NEOANTIGEN DISCOVERY",orbit:"Orbit 1 · Python",status:"Active // Scientific MVP",problem:"Identifying clinically viable neoantigen candidates from raw tumor mutations requires complex, opaque computational biology pipelines.",whatItDoes:"A CLI-first AI bioinformatics platform and life-sciences research companion that parses tumor VCF files, predicts vaccine-relevant peptide targets, ranks candidates with transparent scoring, and preserves reproducible audit records for cancer vaccine research.",stack:["Python 3.11","Bun 1.3+","VEP","MHCflurry","uv","pytest","mypy"],metric:"Predicts peptide candidates matched to specific HLA alleles (e.g. HLA-A*02:01, melanoma, GRCh37); automated RNA-seq run validation checking matrix structure, sample-ID alignment, replicate counts, and batch-confounding.",sourceUrl:"https://github.com/Diva143V/SyGriffin"},polaris:{id:"polaris",name:"Polaris (Kg-Library-API)",classification:"SUPPORTING MOON // THINK-ON-GRAPH",orbit:"Orbit 1 · Python",status:"Active // Core Library",problem:"High LLM inference cost and latency during multi-hop graph queries over complex factual networks.",whatItDoes:"Modular, storage-agnostic Knowledge Graph library with deterministic Python graph traversal and credit-controlled AI escalation.",stack:["Python","FastAPI","Poetry","Think-on-Graph","Pytest"],metric:"Deterministic graph traversal executes in < 5ms; 3-perspective synthesis (Knowledge, Expert, Combined); pluggable Domain Packs for external MCP tools.",sourceUrl:"https://github.com/Diva143V/Kg-Library-API"},sita:{id:"sita",name:"Sita",classification:"SUPPORTING MOON // PRECURSOR PIPELINE",orbit:"Orbit 1 · Python",status:"Shipped // Historical Precursor",problem:"Synthesizing disparate clinical evidence on metformin therapy in breast cancer.",whatItDoes:"End-to-end evidence ingestion and contradiction pipeline that laid the architectural foundation for Griffin Bio.",stack:["Python","Embeddings","PubMed API","Semantic Search"],metric:"Aggregated 3 medical databases and resolved semantic contradictions; precursor to Griffin Bio.",sourceUrl:"https://github.com/Diva143V/Sita"},myselfdiva:{id:"myselfdiva",name:"myselfdiva",classification:"SUPPORTING MOON // PERSONAL UNIVERSE",orbit:"Orbit 4 · TypeScript",status:"Production // Live Site",problem:"Flat 2D diagram portfolios fail to communicate real-time systems depth.",whatItDoes:"Rebuilds personal identity as a realistic cinematic WebGL 3D universe with PBR atmospheres and Keplerian orbital drift.",stack:["Three.js","Vite","GSAP","Lenis","postprocessing"],metric:"Full 60fps orbital physics simulation; adaptive quality governor; under 100 draw calls; total page payload < 3 MB.",sourceUrl:"https://github.com/Diva143V/myselfdiva"},hackme:{id:"hackme",name:"HackMe 2024 Solver",classification:"SUPPORTING MOON // 1ST PLACE WIN",orbit:"Orbit 5 · C++",status:"First Place // Competition Win",problem:"Naive graph search algorithms timed out under strict competition time constraints.",whatItDoes:"First-place winning algorithmic optimization in C++ redesigning search data structures and pruning redundant search passes.",stack:["C++","Algorithms","Data Structures","Competitive Programming"],metric:"Cut runtime from timeout to sub-second evaluation, winning 1st place at HackMe 2024.",sourceUrl:"https://github.com/Diva143V/myselfdiva"}};class Ke{constructor(t){this.universe=t,this.modal=document.getElementById("probe-modal"),this.titleEl=document.getElementById("probe-title"),this.classEl=document.getElementById("probe-classification"),this.problemEl=document.getElementById("probe-problem"),this.actionEl=document.getElementById("probe-action"),this.metricEl=document.getElementById("probe-metric"),this.stackEl=document.getElementById("probe-stack"),this.sourceLinkEl=document.getElementById("probe-source-link"),this.releaseLinkEl=document.getElementById("probe-release-link"),this.closeBtn=this.modal?.querySelector(".probe-close-btn"),this.invokerElement=null,this.bindEvents()}bindEvents(){if(!this.modal)return;let t=!1;const i=e=>{const o=this.modal.getBoundingClientRect();return e.clientX<o.left||e.clientX>o.right||e.clientY<o.top||e.clientY>o.bottom};this.modal.addEventListener("pointerdown",e=>{t=i(e)}),this.modal.addEventListener("pointerup",e=>{t&&i(e)&&this.close()}),this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.close()),this.modal.addEventListener("close",()=>{this.modal.returnValue="",this.universe.clearFocus(),this.invokerElement&&(this.invokerElement.focus(),this.invokerElement=null)}),window.addEventListener("universe:select-moon",e=>{this.open(e.detail.moonId)}),window.addEventListener("universe:select-planet",e=>{this.open(e.detail.planetId)}),document.querySelectorAll("[data-inspect-celestial]").forEach(e=>{e.addEventListener("click",o=>{o.preventDefault(),this.invokerElement=e,this.open(e.dataset.inspectCelestial)})})}open(t){const i=Ye[t];!i||!this.modal||(this.titleEl&&(this.titleEl.textContent=i.name),this.classEl&&(this.classEl.textContent=`${i.classification} · ${i.orbit}`),this.problemEl&&(this.problemEl.textContent=i.problem),this.actionEl&&(this.actionEl.textContent=i.whatItDoes),this.metricEl&&(this.metricEl.innerHTML=`<b>Measurable Detail:</b> ${i.metric}`),this.stackEl&&(this.stackEl.innerHTML="",(i.stack||[]).forEach(e=>{const o=document.createElement("span");o.className="probe-tag",o.textContent=e,this.stackEl.appendChild(o)})),this.sourceLinkEl&&(this.sourceLinkEl.href=i.sourceUrl||"#",this.sourceLinkEl.hidden=!i.sourceUrl),this.releaseLinkEl&&(this.releaseLinkEl.href=i.releaseUrl||"#",this.releaseLinkEl.hidden=!i.releaseUrl),this.universe.focusOnBody(t),this.modal.open||this.modal.showModal())}close(){this.modal&&this.modal.open&&this.modal.close()}}z.registerPlugin(Q);class Qe{constructor(t,i){this.universe=t,this.probe=i,this.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.lenis=null,this.masterTrigger=null,this.initLenis(),this.initScrollFlight(),this.initMagneticButtons(),this.reducedMotion||this.playStagedIgnition()}initLenis(){this.reducedMotion||(this.lenis=new ke({duration:1.25,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),orientation:"vertical",smoothWheel:!0}),this.lenis.on("scroll",Q.update),z.ticker.add(t=>{this.lenis.raf(t*1e3)}),z.ticker.lagSmoothing(0))}initScrollFlight(){const t=document.getElementById("scroll-flight-track");t&&(this.masterTrigger=Q.create({trigger:t,start:"top top",end:"bottom bottom",scrub:1,onUpdate:i=>{const e=i.progress;this.universe.setFlightProgress(e),this.syncCaseCards(e)}}),document.querySelectorAll("[data-flight-step]").forEach(i=>{i.addEventListener("click",e=>{e.preventDefault();const o=parseFloat(i.dataset.flightStep)||0;this.flyToProgress(o)})}))}syncCaseCards(t){document.querySelectorAll(".flight-case-card").forEach(e=>{const o=parseFloat(e.dataset.progressMin)||0,n=parseFloat(e.dataset.progressMax)||1,a=t>=o&&t<=n;e.classList.toggle("is-active-flight",a)})}flyToProgress(t){if(this.reducedMotion){const e=document.getElementById("scroll-flight-track");if(e){const o=e.offsetTop+e.offsetHeight*t;window.scrollTo({top:o,behavior:"auto"})}return}const i=document.getElementById("scroll-flight-track");if(i&&this.lenis){const e=i.offsetTop+(i.offsetHeight-window.innerHeight)*t;this.lenis.scrollTo(e,{duration:1.6})}}playStagedIgnition(){const t=document.getElementById("ignition-curtain"),i=document.querySelector(".hero-cinematic-content");z.timeline({defaults:{ease:"power3.out"}}).to(this.universe.sun.light,{intensity:3.2,duration:1.8,delay:.2}).to(t,{opacity:0,duration:1.4,onComplete:()=>{t&&(t.style.display="none")}},"-=1.2").from(i,{y:40,opacity:0,duration:1.2},"-=0.8")}initMagneticButtons(){if(this.reducedMotion||!window.matchMedia("(hover: hover)").matches)return;document.querySelectorAll(".btn-magnetic").forEach(i=>{let e=null;i.addEventListener("pointerenter",()=>{e=i.getBoundingClientRect()}),i.addEventListener("pointermove",o=>{e||(e=i.getBoundingClientRect());const n=e.left+e.width*.5,a=e.top+e.height*.5,c=(o.clientX-n)*.26,d=(o.clientY-a)*.26;z.to(i,{x:c,y:d,duration:.3,ease:"power2.out"})}),i.addEventListener("pointerleave",()=>{z.to(i,{x:0,y:0,duration:.6,ease:"elastic.out(1, 0.4)"}),e=null})})}destroy(){this.lenis&&this.lenis.destroy(),this.masterTrigger&&this.masterTrigger.kill()}}function Xe(){try{const s=document.createElement("canvas");return!!(window.WebGL2RenderingContext&&s.getContext("webgl2"))}catch{return!1}}document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("webgl-universe-container"),t=document.getElementById("labels-3d-overlay");if(!s||!t)return;const i=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!Xe()||i){document.body.classList.add("is-static-fallback"),console.info("Serving static complete version (WebGL fallback / prefers-reduced-motion active)."),Je();return}const e=new Ue(s,t),o=He(e.renderer,e.scene,e.camera),n=new qe({onQualityChange:(r,w)=>{e.setQualityScale(w),o.setQuality(r),console.info(`Adaptive Governor: Quality adjusted to [${r}] (scale: ${w})`)}}),a=new $e(t);a.register("sun","Sun // Diwakar","sun",100,()=>e.sun.group.position,r=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:r}}))}),a.register("python","Python (Orbit 1)","planet",80,()=>e.planets.python.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:r}}))}),a.register("csharp","C# / .NET (Orbit 2)","planet",80,()=>e.planets.csharp.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:r}}))}),a.register("rust","Rust (Orbit 3)","planet",80,()=>e.planets.rust.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:r}}))}),a.register("typescript","TypeScript (Orbit 4)","planet",80,()=>e.planets.typescript.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:r}}))}),a.register("cpp","C++ (Orbit 5)","planet",80,()=>e.planets.cpp.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-planet",{detail:{planetId:r}}))}),a.register("livesubs","LiveSubs","moon-major",90,()=>e.moons.livesubs.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:r}}))}),a.register("griffin","Griffin Bio","moon-major",90,()=>e.moons.griffin.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:r}}))}),a.register("knox","Knox","moon-major",90,()=>e.moons.knox.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:r}}))}),a.register("sygriffin","SyGriffin","moon-major",90,()=>e.moons.sygriffin.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:r}}))}),a.register("polaris","Polaris","moon-minor",50,()=>e.moons.polaris.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:r}}))}),a.register("sita","Sita","moon-minor",50,()=>e.moons.sita.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:r}}))}),a.register("myselfdiva","myselfdiva","moon-minor",50,()=>e.moons.myselfdiva.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:r}}))}),a.register("hackme","HackMe","moon-minor",50,()=>e.moons.hackme.getPosition(),r=>{window.dispatchEvent(new CustomEvent("universe:select-moon",{detail:{moonId:r}}))});const c=new Ke(e),d=new Qe(e,c);window.__UNIVERSE__={universeScene:e,postProcessing:o,governor:n,labelManager:a,flightController:d,probeModal:c};let h=null,p=performance.now(),v=!0;function f(r){if(!v)return;const w=Math.min((r-p)/1e3,.1);p=r,n.tick(r),e.update(w,r),a.update(e.camera,e.width,e.height),o.render(w),h=requestAnimationFrame(f)}h=requestAnimationFrame(f),document.addEventListener("visibilitychange",()=>{document.hidden?(v=!1,h&&cancelAnimationFrame(h)):(v=!0,p=performance.now(),h=requestAnimationFrame(f))}),window.addEventListener("resize",()=>{e.resize(),o.resize(e.width,e.height)},{passive:!0});const m=document.getElementById("pause-motion-btn");if(m){let r=!1;m.addEventListener("click",()=>{r=!r,r?(v=!1,m.querySelector(".label").textContent="Resume Flight",m.setAttribute("aria-label","Resume orbital 3D flight")):(v=!0,p=performance.now(),h=requestAnimationFrame(f),m.querySelector(".label").textContent="Pause Flight",m.setAttribute("aria-label","Pause orbital 3D flight"))})}const y=document.getElementById("ist-clock");if(y){const r=()=>{const w=new Date,l=5.5*60*60*1e3,S=w.getTime()+w.getTimezoneOffset()*6e4,P=new Date(S+l),x=M=>String(M).padStart(2,"0");y.textContent=`${x(P.getHours())}:${x(P.getMinutes())}:${x(P.getSeconds())} IST`};r(),setInterval(r,1e3)}});function Je(){const s=document.getElementById("probe-modal");s&&document.querySelectorAll("[data-inspect-celestial]").forEach(t=>{t.addEventListener("click",i=>{i.preventDefault(),s.showModal()})})}
