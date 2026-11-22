/**
 * moonShader.js — 100% GPU Procedural Surface Shader for Photorealistic Celestial Moons
 * 
 * Anti-Aliasing & Temporal Stability Features:
 * 1. Screen-Space Derivative Anti-Aliasing (SSAA) via native fwidth(vPosition) for dynamic LOD.
 * 2. Dynamic finite-difference epsilon matching screen pixel footprint to prevent sub-pixel normal jitter.
 * 3. Silhouette Fresnel Limb Attenuation blending perturbed normal to geometric normal near the edge.
 * 4. Multi-octave 3D Voronoi crater bowls with natural dust-softened rounded rims.
 * 5. Analytical anti-aliased concentric telemetry rings replacing high-frequency sine waves.
 * 6. Physical day/night terminator from central Sun with grazing rim highlights.
 * 7. Secondary planetshine (earthshine) from host planet on dark hemisphere.
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
