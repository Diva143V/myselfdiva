/**
 * moonShader.js — 100% GPU Procedural Surface Shader for Photorealistic Celestial Moons
 * 
 * Features:
 * 1. Multi-octave 3D Voronoi impact crater bowls, raised crater rims, and central peaks.
 * 2. High-frequency 3D Simplex FBM regolith micro-roughness.
 * 3. Analytical finite-difference normal perturbation for dramatic grazing shadows along the terminator.
 * 4. Realistic geological albedos (Anorthosite highlands vs basaltic maria, Europa ice fractures, volcanic iron).
 * 5. Physical day/night terminator from the Sun position (0, 0, 0).
 * 6. Secondary planetshine (earthshine) from host planet on the dark hemisphere.
 * 7. Discrete technological ground station outpost with pulsating beacon array in project stack color.
 * 8. Cinematic oblique inspection key-light uniform for night mode.
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
    for (int i = 0; i < 5; ++i) {
      if (i >= octaves) break;
      v += a * snoise(p);
      p = p * 2.08 + shift;
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
  // Crater Morphology Model
  // Excavates inverted parabolic bowl, raises rim lip, and raises central peak
  // ---------------------------------------------------------------------
  float singleCrater(vec3 p, float scale, float rimSteepness) {
    float d = voronoi3D(p * scale);
    const float R = 0.42;

    // Excavated interior bowl (negative elevation)
    float bowl = smoothstep(R, 0.05, d);

    // Raised rim lip (positive elevation ridge)
    float rimDelta = (d - R) * rimSteepness;
    float rim = exp(-rimDelta * rimDelta);

    // Central rebound peak for large impact basins
    float peak = exp(-pow(d * 18.0, 2.0)) * 0.35;

    return (rim * 0.38 + peak * 0.22) - (bowl * 0.48);
  }

  // Multi-octave planetary terrain elevation
  float moonElevation(vec3 p, int terrainType) {
    float h = 0.0;

    if (terrainType == 1) {
      // --- 1: EUROPA ICE ---
      // Cryo-fissures, cycloid fracture lines, and shallow impact scars
      float ridgeA = abs(snoise(p * 5.2));
      float ridgeB = abs(snoise(p * 14.0 + vec3(4.2, 8.1, 1.9)));
      float cracks = 1.0 - smoothstep(0.01, 0.22, ridgeA * ridgeB);
      float microIce = fbm3D(p * 6.0, 4) * 0.20;
      float crater = singleCrater(p, 4.0, 12.0) * 0.25;
      h = cracks * 0.35 + microIce - crater;
    } else if (terrainType == 2) {
      // --- 2: VOLCANIC IRON / BASALT (Knox) ---
      // Caldera basins, jagged volcanic fractures, heavy crater scarring
      float c1 = singleCrater(p, 3.2, 14.0);
      float c2 = singleCrater(p + vec3(1.7, 4.3, 8.1), 8.4, 18.0);
      float c3 = singleCrater(p + vec3(9.2, 2.3, 5.4), 19.0, 24.0);
      float rough = fbm3D(p * 5.5, 4) * 0.26;
      h = c1 * 0.52 + c2 * 0.30 + c3 * 0.16 + rough;
    } else {
      // --- 0: ANORTHOSITE (Luna) & 3: REGOLITH CRATER (SyGriffin) ---
      // Dense multi-scale impact cratering with prominent rims and maria
      float c1 = singleCrater(p, 3.8, 12.0);
      float c2 = singleCrater(p + vec3(3.2, 7.1, 1.9), 9.0, 16.0);
      float c3 = singleCrater(p + vec3(8.5, 2.4, 6.1), 22.0, 26.0);
      float regolith = fbm3D(p * 7.5, 4) * 0.18;
      h = c1 * 0.56 + c2 * 0.32 + c3 * 0.18 + regolith;
    }

    return h;
  }

  // ---------------------------------------------------------------------
  // Normal Bump Calculation via Tangent Basis Finite Differences
  // ---------------------------------------------------------------------
  vec3 calculateSurfaceNormal(vec3 p, vec3 geomNormal, int terrainType, out float outElevation) {
    vec3 up = abs(geomNormal.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 T = normalize(cross(up, geomNormal));
    vec3 B = cross(geomNormal, T);

    const float eps = 0.007;
    float h0 = moonElevation(p, terrainType);
    float hT = moonElevation(normalize(p + T * eps), terrainType);
    float hB = moonElevation(normalize(p + B * eps), terrainType);

    outElevation = h0;

    float dHdT = (hT - h0) / eps;
    float dHdB = (hB - h0) / eps;

    float bumpScale = (terrainType == 1) ? 0.18 : 0.26;
    return normalize(geomNormal - (T * dHdT + B * dHdB) * bumpScale);
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

    // 1. Terrain elevation and perturbed normal
    float elevation = 0.0;
    vec3 surfNormal = calculateSurfaceNormal(vPosition, geomNormal, uTerrainType, elevation);

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

    // Concentric runway telemetry rings
    float ringPattern = abs(sin(distToOutpost * 85.0));
    float spokePattern = abs(sin(atan(vPosition.y - outpostCenter.y, vPosition.x - outpostCenter.x) * 6.0));
    float telemetryGrid = smoothstep(0.70, 0.95, ringPattern * spokePattern) * outpostMask;

    // Central beacon LED array with pulsating rhythm
    float beaconPulse = sin(uTime * 3.8) * 0.5 + 0.5;
    float centerBeacon = smoothstep(0.026, 0.003, distToOutpost) * (0.85 + 0.95 * beaconPulse);

    float activeBoost = 1.0 + 1.2 * max(uKeyLight, uHighlight);
    vec3 outpostGlow = uBeaconColor * (centerBeacon * 2.8 + telemetryGrid * 0.9) * activeBoost;

    // -----------------------------------------------------------------
    // 7. Final Color Synthesis
    // -----------------------------------------------------------------
    vec3 surfaceColor = albedo * totalDiffuse;
    surfaceColor += grazingRim * 0.42 * vec3(1.0, 0.96, 0.88); // Golden crater rim highlight
    surfaceColor += outpostGlow;

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
