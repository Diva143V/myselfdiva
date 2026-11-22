/**
 * ringShader.js — Planetary Ring Shader with Analytical Planet Shadow & Forward Mie Scattering
 * 
 * Features:
 * - Correct XZ plane radial coordinates (matching RingGeometry after equatorial rotation)
 * - High-resolution Cassini division (0.64) & Encke gap (0.88)
 * - Forward Mie ice scattering (backlit brightening when looking towards the Sun)
 * - Analytical ray-sphere planet shadow notch with soft penumbra
 * - Double-sided alpha transparency
 */

import * as THREE from 'three';

export const RingShader = {
  uniforms: {
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) },
    uPlanetPosition: { value: new THREE.Vector3(0, 0, 0) },
    uPlanetRadius: { value: 20.0 },
    uInnerRadius: { value: 20.0 * 1.45 },
    uOuterRadius: { value: 20.0 * 2.5 }
  },

  vertexShader: /* glsl */ `
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    varying vec3 vLocalPosition;
    varying vec3 vViewDir;

    void main() {
      vUv = uv;
      vLocalPosition = position;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      
      // World-space view direction towards camera
      vViewDir = normalize(cameraPosition - worldPos.xyz);
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,

  fragmentShader: /* glsl */ `
    precision highp float;

    uniform vec3 uSunPosition;
    uniform vec3 uPlanetPosition;
    uniform float uPlanetRadius;
    uniform float uInnerRadius;
    uniform float uOuterRadius;

    varying vec3 vWorldPosition;
    varying vec2 vUv;
    varying vec3 vLocalPosition;
    varying vec3 vViewDir;

    void main() {
      // RingGeometry after rotateX(PI/2) lies in the XZ plane: r = length(xz)
      float r = length(vLocalPosition.xz);
      if (r < uInnerRadius || r > uOuterRadius) {
        discard;
      }

      // Normalized radial coordinate across ring breadth (0.0 at inner, 1.0 at outer)
      float normR = (r - uInnerRadius) / (uOuterRadius - uInnerRadius);

      // Multi-scale procedural concentric ring bands & micro-grooves
      float bRingDense = smoothstep(0.0, 0.60, normR) * smoothstep(0.66, 0.60, normR);
      float mainBands = sin(normR * 72.0) * 0.35 + 0.65;
      float microGrooves = sin(normR * 260.0) * 0.18 + 0.82;
      
      // Major Cassini Division (Clear gap at 0.64)
      float cassiniGap = smoothstep(0.012, 0.038, abs(normR - 0.64));

      // Minor Encke Division (Narrow gap at 0.88)
      float enckeGap = smoothstep(0.006, 0.020, abs(normR - 0.88));

      float density = mainBands * microGrooves * cassiniGap * enckeGap;
      float alpha = clamp(0.28 + density * 0.62 + bRingDense * 0.15, 0.0, 0.92);

      // Saturnian Color Palette: Glacial Cyan-Ice, Frost Silver, Pale Gold Dust
      vec3 innerCrepe = vec3(0.48, 0.75, 0.92);
      vec3 brightB = vec3(0.88, 0.96, 1.0);
      vec3 outerA = vec3(0.55, 0.82, 0.95);

      vec3 ringColor = mix(innerCrepe, brightB, smoothstep(0.05, 0.55, normR));
      ringColor = mix(ringColor, outerA, smoothstep(0.65, 0.95, normR));

      // Forward Mie Ice Scattering (Backlit glint when looking towards the Sun)
      vec3 viewDir = vViewDir;
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);
      float forwardMie = pow(max(dot(-viewDir, lightDir), 0.0), 10.0) * 2.2;

      // --- ANALYTICAL PLANET SHADOW CASTING ---
      vec3 sunToFrag = vWorldPosition - uSunPosition;
      vec3 rayDir = normalize(sunToFrag);
      vec3 sunToPlanet = uPlanetPosition - uSunPosition;

      float t = dot(sunToPlanet, rayDir);
      float shadowFactor = 1.0;
      if (t > 0.0 && length(sunToFrag) > t) {
        vec3 closestPoint = uSunPosition + rayDir * t;
        float distToRay = length(closestPoint - uPlanetPosition);
        shadowFactor = smoothstep(uPlanetRadius * 0.97, uPlanetRadius * 1.03, distToRay);
      }

      vec3 ambient = vec3(0.035, 0.055, 0.075);
      vec3 litColor = ringColor * (ambient + shadowFactor * 1.15) + vec3(0.85, 0.95, 1.0) * forwardMie * shadowFactor;

      gl_FragColor = vec4(litColor, alpha * (0.15 + 0.85 * shadowFactor));
    }
  `
};
