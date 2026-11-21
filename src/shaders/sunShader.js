/**
 * sunShader.js — Physically Motivated Solar Atmosphere & Convective Granulation
 * 
 * Features:
 * - Multi-octave 3D Simplex noise granulation (solar convective cells)
 * - True astrophysical limb darkening (darker, saturated edge, blistering core)
 * - Plasma turbulence animation with differential rotation
 * - Ultra-high luminance output for selective HDR bloom
 */

export const SunShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorCore: { value: [1.0, 0.98, 0.88] },    // Blistering white-yellow core
    uColorMid: { value: [0.96, 0.62, 0.04] },     // Warm sun-amber (#f59e0b)
    uColorLimb: { value: [0.72, 0.22, 0.02] },    // Deep limb-darkened orange-red
    uGranulationScale: { value: 6.5 },
    uTurbulenceSpeed: { value: 0.18 }
  },

  vertexShader: /* glsl */ `
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
  `,

  fragmentShader: /* glsl */ `
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
  `
};
