/**
 * atmosphereShader.js — Atmospheric Rayleigh Scattering & Fresnel Rim-Glow
 * 
 * Features:
 * - Back-face rendered shell with smooth Fresnel grazing falloff
 * - Sunlight direction awareness: scattering is brightest on the day-limb
 * - Tinted per planetary world (azure for Python, golden for C#, iron for Rust, etc.)
 * - Additive blending for soft cosmic rim illumination against deep space
 */

export const AtmosphereShader = {
  uniforms: {
    uColor: { value: [0.22, 0.74, 0.97] },       // Atmospheric tint vector
    uSunPosition: { value: [0.0, 0.0, 0.0] },    // Center sun coordinates
    uAtmospherePower: { value: 3.2 },            // Fresnel exponent
    uAtmosphereIntensity: { value: 1.5 }         // Glow multiplier
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
      float dayFactor = max(dot(normal, lightDir) * 0.5 + 0.5, 0.0);
      dayFactor = pow(dayFactor, 1.2);

      float alpha = fresnel * (0.2 + 0.8 * dayFactor) * uAtmosphereIntensity;
      
      // Tone up color on the day edge
      vec3 finalColor = uColor * (0.8 + 0.4 * dayFactor);

      gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
    }
  `
};
