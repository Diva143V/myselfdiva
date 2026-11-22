/**
 * moonShader.js — 100% GPU Procedural Surface Shader for Photorealistic Celestial Moons
 * 
 * Stability & Anti-Glitch Architecture:
 * 1. C1-Smooth Voronoi with smin() polynomial blending (zero crease discontinuities).
 * 2. Majestic Macro-Crater Scale (2.6 & 5.6) with natural Gaussian ejecta slopes.
 * 3. Screen-Space Derivative Anti-Aliasing (SSAA) via native fwidth(p).
 * 4. Silhouette Fresnel Limb Attenuation blending perturbed normal to geometric sphere normal.
 * 5. Soft-calibrated bump scale (0.07–0.09) for rich, stable terminator relief without pixel jitter.
 * 6. Clean analytic telemetry rings with zero Moiré distortion.
 * 7. Physical day/night terminator from central Sun with secondary host planetshine.
 */

import * as THREE from 'three';

export const MOON_VERTEX_SHADER = /* glsl */ `
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
`;

export const MOON_FRAGMENT_SHADER = /* glsl */ `
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
`;

export const MoonShader = {
  uniforms: {
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) },
    uPlanetPosition: { value: new THREE.Vector3(0, 0, 0) },
    uBeaconColor: { value: new THREE.Color(0xa855f7) },
    uPlanetColor: { value: new THREE.Color(0xa855f7) },
    uTerrainType: { value: 0 },
    uKeyLight: { value: 0.0 },
    uHighlight: { value: 0.0 }
  },
  vertexShader: MOON_VERTEX_SHADER,
  fragmentShader: MOON_FRAGMENT_SHADER
};
