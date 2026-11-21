/**
 * atmosphereShader.js — Directional Rayleigh Scattering & Twilight Horizon Shader
 * 
 * Features:
 * - Back-face rendered shell with smooth grazing horizon falloff
 * - Sunlight direction awareness: scattering is brightest on the day-limb
 * - Twilight color-shift: grazing terminator angles shift to warm amber/vermilion
 * - Additive blending for soft cosmic rim illumination against deep space
 */

import * as THREE from 'three';

export const AtmosphereShader = {
  uniforms: {
    uColor: { value: new THREE.Vector3(0.22, 0.74, 0.97) },
    uTwilightColor: { value: new THREE.Vector3(0.98, 0.45, 0.12) },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) },
    uAtmospherePower: { value: 3.5 },
    uAtmosphereIntensity: { value: 1.6 }
  },

  vertexShader: /* glsl */ `
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
  `,

  fragmentShader: /* glsl */ `
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
  `
};
