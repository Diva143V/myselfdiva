/**
 * planetShaders.js — 100% GPU Procedural Surface Shaders for Cinematic Sci-Fi Worlds
 * 
 * Evaluates 3D Simplex FBM and Voronoi in Cartesian (x, y, z) space on the sphere,
 * completely eliminating 2D equirectangular polar pinching and offering infinite resolution.
 */

import * as THREE from 'three';

// ---------------------------------------------------------------------
// Common GLSL Math & 3D Simplex Noise Snippets
// ---------------------------------------------------------------------
export const GLSL_COMMON_3D_NOISE = /* glsl */ `
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
`;

// Shared Vertex Shader for all spherical worlds
export const PLANET_VERTEX_SHADER = /* glsl */ `
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

// ---------------------------------------------------------------------
// 1. Python World: Ocean Abyss & Bioluminescent Continental Grid
// ---------------------------------------------------------------------
export const PythonPlanetShader = {
  uniforms: {
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) }
  },
  vertexShader: PLANET_VERTEX_SHADER,
  fragmentShader: /* glsl */ `
    ${GLSL_COMMON_3D_NOISE}

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
  `
};

// ---------------------------------------------------------------------
// 2. C# / .NET World: Banded Jovian Giant & Amber Vortex
// ---------------------------------------------------------------------
export const CSharpPlanetShader = {
  uniforms: {
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) }
  },
  vertexShader: PLANET_VERTEX_SHADER,
  fragmentShader: /* glsl */ `
    ${GLSL_COMMON_3D_NOISE}

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
  `
};

// ---------------------------------------------------------------------
// 3. Rust World: Scorched Terracotta & Chasm Rifts
// ---------------------------------------------------------------------
export const RustPlanetShader = {
  uniforms: {
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) }
  },
  vertexShader: PLANET_VERTEX_SHADER,
  fragmentShader: /* glsl */ `
    ${GLSL_COMMON_3D_NOISE}

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
  `
};

// ---------------------------------------------------------------------
// 4. TypeScript World: Cryogenic Ice World & Ring Shadow Receiving
// ---------------------------------------------------------------------
export const TypeScriptPlanetShader = {
  uniforms: {
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) },
    uRingInnerRadius: { value: 20.0 * 1.45 },
    uRingOuterRadius: { value: 20.0 * 2.5 }
  },
  vertexShader: PLANET_VERTEX_SHADER,
  fragmentShader: /* glsl */ `
    ${GLSL_COMMON_3D_NOISE}

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
  `
};

// ---------------------------------------------------------------------
// 5. C++ World: Obsidian Basalt & Convective Breathing Magma
// ---------------------------------------------------------------------
export const CppPlanetShader = {
  uniforms: {
    uTime: { value: 0 },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) }
  },
  vertexShader: PLANET_VERTEX_SHADER,
  fragmentShader: /* glsl */ `
    ${GLSL_COMMON_3D_NOISE}

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
  `
};
