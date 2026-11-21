/**
 * Starfield.js — 3-Depth Single-Draw-Call Starfield & Deep Space Nebulae
 */

import * as THREE from 'three';

export function createStarfield(count = 3400) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const twinkles = new Float32Array(count * 2);

  const radiusMin = 480;
  const radiusMax = 1400;

  for (let i = 0; i < count; i++) {
    // Spherical distribution with slight concentration towards the galactic plane
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    // Flatten slightly along galactic disk (Y axis)
    const r = radiusMin + Math.random() * (radiusMax - radiusMin);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.45; // Galactic flattening
    const z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // 3 Depth populations
    if (i < count * 0.65) {
      // Layer 1: Distant micro-stars (white-blue)
      colors[i * 3] = 0.85;
      colors[i * 3 + 1] = 0.9;
      colors[i * 3 + 2] = 1.0;
      sizes[i] = 1.0;
      twinkles[i * 2] = 0.8 + Math.random() * 1.5;
      twinkles[i * 2 + 1] = Math.random() * Math.PI * 2;
    } else if (i < count * 0.92) {
      // Layer 2: Mid-field stars (subtle amber/gold & white)
      const isAmber = Math.random() > 0.45;
      colors[i * 3] = isAmber ? 0.98 : 0.92;
      colors[i * 3 + 1] = isAmber ? 0.72 : 0.94;
      colors[i * 3 + 2] = isAmber ? 0.22 : 0.98;
      sizes[i] = 1.6;
      twinkles[i * 2] = 1.5 + Math.random() * 2.5;
      twinkles[i * 2 + 1] = Math.random() * Math.PI * 2;
    } else {
      // Layer 3: Foreground brilliant stars (restrained size)
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.98;
      colors[i * 3 + 2] = 0.92;
      sizes[i] = 2.4;
      twinkles[i * 2] = 2.0 + Math.random() * 3.0;
      twinkles[i * 2 + 1] = Math.random() * Math.PI * 2;
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('twinkle', new THREE.BufferAttribute(twinkles, 2));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: /* glsl */ `
      attribute vec3 color;
      attribute float size;
      attribute vec2 twinkle;

      uniform float uTime;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;

        // Twinkle modulation
        float tw = sin(uTime * twinkle.x + twinkle.y) * 0.35 + 0.65;
        vAlpha = tw;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (400.0 / -mvPosition.z) * tw;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        // Soft circular gaussian falloff for organic star appearance
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        float intensity = exp(-dist * dist * 10.0);
        gl_FragColor = vec4(vColor * intensity, vAlpha * intensity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const starPoints = new THREE.Points(geometry, material);
  starPoints.matrixAutoUpdate = false;
  starPoints.updateMatrix();

  // Milky Way Galactic Band (soft volumetric particles)
  const nebulaCount = 450;
  const nebulaGeo = new THREE.BufferGeometry();
  const nebPos = new Float32Array(nebulaCount * 3);
  const nebColors = new Float32Array(nebulaCount * 3);

  for (let i = 0; i < nebulaCount; i++) {
    const angle = (i / nebulaCount) * Math.PI * 2;
    const dist = 550 + Math.random() * 300;
    const spread = (Math.random() - 0.5) * 140;

    nebPos[i * 3] = Math.cos(angle) * dist + spread;
    nebPos[i * 3 + 1] = (Math.random() - 0.5) * 90;
    nebPos[i * 3 + 2] = Math.sin(angle) * dist + spread;

    // Tinted galactic dust: deep indigo to subtle amber gas
    const t = Math.random();
    if (t > 0.6) {
      nebColors[i * 3] = 0.96 * 0.25;
      nebColors[i * 3 + 1] = 0.62 * 0.25;
      nebColors[i * 3 + 2] = 0.04 * 0.25;
    } else {
      nebColors[i * 3] = 0.15 * 0.3;
      nebColors[i * 3 + 1] = 0.25 * 0.3;
      nebColors[i * 3 + 2] = 0.55 * 0.3;
    }
  }

  nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebPos, 3));
  nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebColors, 3));

  // Procedural soft circular dust texture
  const dustCanvas = document.createElement('canvas');
  dustCanvas.width = 64;
  dustCanvas.height = 64;
  const dCtx = dustCanvas.getContext('2d');
  const dGrad = dCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  dGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
  dGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.35)');
  dGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
  dGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  dCtx.fillStyle = dGrad;
  dCtx.fillRect(0, 0, 64, 64);
  const dustTexture = new THREE.CanvasTexture(dustCanvas);

  const nebulaMat = new THREE.PointsMaterial({
    size: 28,
    map: dustTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.09,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const nebulaMesh = new THREE.Points(nebulaGeo, nebulaMat);
  nebulaMesh.matrixAutoUpdate = false;
  nebulaMesh.updateMatrix();

  const group = new THREE.Group();
  group.add(starPoints);
  group.add(nebulaMesh);

  return {
    group,
    update(time) {
      material.uniforms.uTime.value = time;
    }
  };
}
