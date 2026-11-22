/**
 * planetShaders.js — 100% GPU Procedural Surface Shaders for Photorealistic Worlds
 * 
 * Features:
 * 1. Unified World-Space Lighting & Tangent-Space Bump Mapping (Zero View-Space Mismatch).
 * 2. Strict Gustavson mod289 Simplex Noise (Zero Precision Discontinuities on Windows/DirectX).
 * 3. Screen-Space Derivative Anti-Aliasing (fwidth) & Silhouette Fresnel Limb Attenuation.
 * 4. Python World: Continental mountain relief, bathymetric ocean depth, cloud drop shadows, night cities.
 * 5. C# World: Zonal counter-rotating jet streams, silky Jovian cloud belts, Great Amber Vortex.
 * 6. Rust World: Valles Marineris stratified tectonic chasms, crater relief bump, polar dry-ice caps, Martian blue sunset.
 * 7. TypeScript World: Glacial cyan striations, analytical ring shadow receiving, ice specular glint.
 * 8. C++ World: Drifting obsidian basalt plates, jagged convective molten magma fissures, boiling lava convection.
 */

import * as THREE from 'three';

// ---------------------------------------------------------------------
// Common GLSL Math & 3D Simplex / Voronoi Snippets
// ---------------------------------------------------------------------
export const GLSL_COMMON_3D_NOISE = /* glsl */ `
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
`;

// Shared Vertex Shader for all spherical worlds
export const PLANET_VERTEX_SHADER = /* glsl */ `
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
`;

// ---------------------------------------------------------------------
// 1. Python World: Ocean Bathymetry, Mountain Relief, Clouds & Shadows
// ---------------------------------------------------------------------
export const PythonPlanetShader = {
  uniforms: {
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) }
  },
  vertexShader: PLANET_VERTEX_SHADER,
  fragmentShader: /* glsl */ `
    precision highp float;
    ${GLSL_COMMON_3D_NOISE}

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
  `
};

// ---------------------------------------------------------------------
// 2. C# / .NET World: Zonal Jet Streams & Logarithmic Great Amber Vortex
// ---------------------------------------------------------------------
export const CSharpPlanetShader = {
  uniforms: {
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) }
  },
  vertexShader: PLANET_VERTEX_SHADER,
  fragmentShader: /* glsl */ `
    precision highp float;
    ${GLSL_COMMON_3D_NOISE}

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
  `
};

// ---------------------------------------------------------------------
// 3. Rust World: Valles Marineris Tectonic Chasms & Polar Ice Caps
// ---------------------------------------------------------------------
export const RustPlanetShader = {
  uniforms: {
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) }
  },
  vertexShader: PLANET_VERTEX_SHADER,
  fragmentShader: /* glsl */ `
    precision highp float;
    ${GLSL_COMMON_3D_NOISE}

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
  `
};

// ---------------------------------------------------------------------
// 4. TypeScript World: Glacial Cyan Striations & Ring Shadow Receiving
// ---------------------------------------------------------------------
export const TypeScriptPlanetShader = {
  uniforms: {
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) },
    uPlanetPosition: { value: new THREE.Vector3(0, 0, 0) },
    uRingInnerRadius: { value: 20.0 * 1.45 },
    uRingOuterRadius: { value: 20.0 * 2.5 }
  },
  vertexShader: PLANET_VERTEX_SHADER,
  fragmentShader: /* glsl */ `
    precision highp float;
    ${GLSL_COMMON_3D_NOISE}

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
  `
};

// ---------------------------------------------------------------------
// 5. C++ World: Convective Molten Magma & Drifting Obsidian Basalt Plates
// ---------------------------------------------------------------------
export const CppPlanetShader = {
  uniforms: {
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) }
  },
  vertexShader: PLANET_VERTEX_SHADER,
  fragmentShader: /* glsl */ `
    precision highp float;
    ${GLSL_COMMON_3D_NOISE}

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
  `
};
