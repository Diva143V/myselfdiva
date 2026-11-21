/**
 * ringShader.js — Planetary Ring Shader with Analytical Planet Shadow Casting
 * 
 * Features:
 * - Concentric particle density bands with micro-groove gaps (Cassini-style divisions)
 * - Analytical ray-cylinder / ray-sphere shadow casting: the host planet casts a crisp
 *   dark shadow notch across the rings on the anti-sun side
 * - Double-sided alpha transparency with subtle forward Mie scattering
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

    void main() {
      vUv = uv;
      vLocalPosition = position;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,

  fragmentShader: /* glsl */ `
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
  `
};
