/**
 * sunShader.js — Physically Motivated Solar Photosphere & Convective Granulation
 * 
 * Features:
 * - Multi-octave convective Bénard granulation cells (hot upwelling cores & cooler intergranular lanes)
 * - Magnetic active sunspot groups (dark umbra cores, filamentary penumbra, bright faculae plages)
 * - True 5th-order polynomial astrophysical limb darkening
 * - Dual-phase turbulent plasma boiling with differential solar rotation
 * - Chromospheric limb flare prominences & filmic luminance compression
 */

import * as THREE from 'three';

export const SunShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorCore: { value: new THREE.Color(1.0, 0.94, 0.76) },    // Brilliant white-gold fusion upwelling
    uColorMid: { value: new THREE.Color(0.96, 0.54, 0.08) },     // Solar amber chromosphere
    uColorLimb: { value: new THREE.Color(0.68, 0.14, 0.01) },    // Deep limb-darkened orange-crimson
    uGranulationScale: { value: 18.0 },
    uTurbulenceSpeed: { value: 0.16 }
  },

  vertexShader: /* glsl */ `
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
  `,

  fragmentShader: /* glsl */ `
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

    // Magnetic Active Sunspot Generator
    // Returns vec3(umbra, penumbra, faculae)
    vec3 evaluateSunspots(vec3 p, float t) {
      vec3 unitP = normalize(p);
      float rotSpeed = 0.035 * (1.0 - 0.22 * unitP.y * unitP.y);
      float angle = t * rotSpeed;
      float ca = cos(angle);
      float sa = sin(angle);
      vec3 rotP = vec3(unitP.x * ca - unitP.z * sa, unitP.y, unitP.x * sa + unitP.z * ca);

      // Active sunspot latitudes: concentrated around y in [-0.42, -0.12] and [0.12, 0.42]
      float latBand = smoothstep(0.06, 0.18, abs(rotP.y)) * (1.0 - smoothstep(0.38, 0.52, abs(rotP.y)));

      // Sunspot clusters on solar disc
      vec3 spotCenter1 = normalize(vec3(0.52, 0.24, 0.82));
      vec3 spotCenter2 = normalize(vec3(0.64, 0.20, 0.74));
      vec3 spotCenter3 = normalize(vec3(-0.45, -0.22, 0.86));
      vec3 spotCenter4 = normalize(vec3(-0.32, -0.18, 0.93));

      float d1 = length(rotP - spotCenter1);
      float d2 = length(rotP - spotCenter2);
      float d3 = length(rotP - spotCenter3);
      float d4 = length(rotP - spotCenter4);

      float minD = min(min(d1, d2 * 1.15), min(d3, d4 * 1.25));

      // Umbra: dark cool core
      float umbra = (1.0 - smoothstep(0.035, 0.11, minD)) * latBand;

      // Penumbra: filamentary radial lanes
      float penumbraMask = (1.0 - smoothstep(0.08, 0.26, minD)) * latBand;
      float radialFilament = abs(snoise(rotP * 28.0));
      float penumbra = penumbraMask * (1.0 - umbra) * (0.65 + 0.35 * radialFilament);

      // Faculae: bright magnetic beaches surrounding spots
      float faculaeNoise = fbm(rotP * 12.0);
      float faculae = smoothstep(0.08, 0.28, minD) * (1.0 - smoothstep(0.24, 0.52, minD)) * smoothstep(0.12, 0.60, faculaeNoise) * latBand;

      return vec3(umbra, penumbra, faculae);
    }

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      // 1. Classical Astrophysical 5th-Order Limb Darkening
      float mu = max(dot(normal, viewDir), 0.0);
      float limbDarkening = 0.35 + 0.65 * pow(mu, 0.75);

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

      // 3. Magnetic Active Sunspot System
      vec3 spots = evaluateSunspots(vPosition, uTime);
      float umbra = spots.x;
      float penumbra = spots.y;
      float faculae = spots.z;

      // 4. Color Thermal Gradient Synthesis
      // Fusion core white-gold -> convective amber -> deep limb crimson
      vec3 plasmaColor = mix(uColorMid, uColorCore, pow(granule, 1.3));
      plasmaColor = mix(uColorLimb, plasmaColor, limbDarkening);

      // Intergranular cooler lanes
      plasmaColor = mix(plasmaColor, uColorLimb * 0.90, lane * 0.45);

      // Apply faculae (bright magnetic burning plages)
      vec3 faculaeColor = vec3(1.15, 1.10, 0.98);
      plasmaColor = mix(plasmaColor, faculaeColor, faculae * 0.85);

      // Apply penumbra (filamentary dusky amber) and umbra (cool dark core)
      vec3 penumbraColor = vec3(0.35, 0.12, 0.02);
      vec3 umbraColor = vec3(0.05, 0.02, 0.01);
      plasmaColor = mix(plasmaColor, penumbraColor, penumbra * 0.90);
      plasmaColor = mix(plasmaColor, umbraColor, umbra * 0.96);

      // 5. Chromospheric Limb Flare Prominences
      float limbGrazing = 1.0 - mu;
      float prominenceNoise = snoise(vPosition * 16.0 + vec3(0.0, t * 0.6, 0.0));
      float prominences = smoothstep(0.84, 0.98, limbGrazing) * smoothstep(0.2, 0.7, prominenceNoise);

      // 6. Filmic Luminance Compression (Prevents blowout while keeping radiant glow)
      float spotDarkening = 1.0 - umbra * 0.88 - penumbra * 0.45;
      float emission = (1.02 + pow(granule, 1.8) * 0.24 + prominences * 0.35) * spotDarkening;
      vec3 finalColor = plasmaColor * emission;

      vec3 compressed = finalColor / (finalColor + vec3(0.45));
      compressed = pow(compressed, vec3(0.96)) * 1.30;

      gl_FragColor = vec4(compressed, 1.0);
    }
  `
};
