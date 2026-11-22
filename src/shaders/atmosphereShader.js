/**
 * atmosphereShader.js — Directional Rayleigh Scattering & Twilight Horizon Shader
 * 
 * Features:
 * - Back-face rendered shell with smooth grazing horizon falloff
 * - Unified world-space lighting: scattering is brightest on the sunlit day-limb
 * - Twilight color-shift: grazing terminator angles shift to warm amber/vermilion
 * - Night-side fade: atmosphere naturally darkens in planetary shadow
 * - Additive blending for soft cosmic rim illumination against deep space
 */

import * as THREE from 'three';

export const AtmosphereShader = {
  uniforms: {
    uColor: { value: new THREE.Vector3(0.22, 0.74, 0.97) },
    uTwilightColor: { value: new THREE.Vector3(0.98, 0.45, 0.12) },
    uSunPosition: { value: new THREE.Vector3(0, 0, 0) },
    uAtmospherePower: { value: 4.2 },
    uAtmosphereIntensity: { value: 0.85 }
  },

  vertexShader: /* glsl */ `
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    void main() {
      // World-space normal for physical directional Rayleigh scattering
      vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;

      // World-space view direction towards camera
      vViewDir = normalize(cameraPosition - worldPosition.xyz);

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,

  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    uniform vec3 uTwilightColor;
    uniform vec3 uSunPosition;
    uniform float uAtmospherePower;
    uniform float uAtmosphereIntensity;

    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;

    void main() {
      vec3 normal = normalize(vWorldNormal);
      vec3 viewDir = normalize(vViewDir);

      // Inverted Fresnel for back-face atmosphere shell: brightest at the grazing horizon
      float fresnel = 1.0 - max(dot(normal, viewDir), 0.0);
      fresnel = pow(fresnel, uAtmospherePower);

      // Light direction from planetary surface to the Sun at (0, 0, 0)
      vec3 lightDir = normalize(uSunPosition - vWorldPosition);
      
      // Rayleigh day/night limb modulation: atmosphere glows on the sun-facing limb
      float NdotL = dot(normal, lightDir);
      float dayFactor = smoothstep(-0.20, 0.25, NdotL);
      float twilightFactor = smoothstep(-0.25, 0.05, NdotL) * smoothstep(0.35, 0.0, NdotL);

      // Atmosphere fades out on the night hemisphere so dark shadow is transparent
      float alpha = fresnel * (0.02 + 0.98 * dayFactor) * uAtmosphereIntensity;
      
      // Shift towards twilight amber/vermilion at grazing terminator
      vec3 finalColor = mix(uColor, uTwilightColor, twilightFactor * 0.75);
      finalColor *= (0.8 + 0.5 * dayFactor);

      gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
    }
  `
};
