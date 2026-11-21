/**
 * moonTextures.js — Procedural Crater Normal Map for Rocky Project Moons
 */

import * as THREE from 'three';

export function createMoonNormalMap(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(size, size);
  const data = img.data;

  // Generate 25 circular crater depressions
  const craters = [];
  for (let i = 0; i < 25; i++) {
    craters.push({
      cx: Math.random() * size,
      cy: Math.random() * size,
      r: 6 + Math.random() * 22,
      depth: 0.4 + Math.random() * 0.6
    });
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let dx = 0;
      let dy = 0;

      for (let c = 0; c < craters.length; c++) {
        const crater = craters[c];
        const dist = Math.hypot(x - crater.cx, y - crater.cy);
        if (dist < crater.r) {
          const normDist = dist / crater.r;
          // Crater rim slope + basin depression
          const slope = (normDist - 0.75) * (1.0 - normDist) * 4.0 * crater.depth;
          const angle = Math.atan2(y - crater.cy, x - crater.cx);
          dx += Math.cos(angle) * slope;
          dy += Math.sin(angle) * slope;
        }
      }

      const idx = (y * size + x) * 4;
      const len = Math.sqrt(dx * dx + dy * dy + 1.0);
      data[idx] = Math.floor((-dx / len * 0.5 + 0.5) * 255);
      data[idx + 1] = Math.floor((-dy / len * 0.5 + 0.5) * 255);
      data[idx + 2] = Math.floor((1.0 / len * 0.5 + 0.5) * 255);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.anisotropy = 4;
  return texture;
}
