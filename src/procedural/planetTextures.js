/**
 * planetTextures.js — Procedural PBR Equirectangular Map Generator
 * 
 * Generates custom 2048x1024 / 1024x512 PBR texture sets for each distinct world:
 * 1. Python: Ocean world with continents, specular roughness, normal map, night city lights, cloud shell
 * 2. C# / .NET: Banded gas giant with latitudinal shear turbulence and Great Amber Vortex
 * 3. Rust: Rusted oxidized desert world with canyons, impact crater normal maps, and iron dust
 * 4. TypeScript: Glacial icy world with pack ice, crevasse normal maps, and translucent planetary rings
 * 5. C++: Dark obsidian basalt world with glowing emissive molten lava fissures
 */

import * as THREE from 'three';

// Fast 2D Simplex Noise for procedural texture synthesis
function createNoise2D() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const n = Math.floor(Math.random() * (i + 1));
    const q = p[i]; p[i] = p[n]; p[n] = q;
  }
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
  const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
  const grad3 = [
    1,1, -1,1, 1,-1, -1,-1,
    1,0, -1,0, 1,0, -1,0,
    0,1, 0,-1, 0,1, 0,-1
  ];

  return function noise(x, y) {
    const s = (x + y) * 0.5 * (Math.sqrt(3.0) - 1.0);
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = x - X0;
    const y0 = y - Y0;
    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + 2.0 * G2;
    const y2 = y0 - 1.0 + 2.0 * G2;
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = permMod12[ii + perm[jj]] * 2;
    const gi1 = permMod12[ii + i1 + perm[jj + j1]] * 2;
    const gi2 = permMod12[ii + 1 + perm[jj + 1]] * 2;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    const n0 = t0 < 0 ? 0 : (t0 *= t0, t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0));
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    const n1 = t1 < 0 ? 0 : (t1 *= t1, t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1));
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    const n2 = t2 < 0 ? 0 : (t2 *= t2, t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2));

    return 70.0 * (n0 + n1 + n2);
  };
}

const noise2D = createNoise2D();

function fbm(x, y, octaves = 5) {
  let val = 0;
  let amp = 0.5;
  let freq = 1.0;
  for (let i = 0; i < octaves; i++) {
    val += noise2D(x * freq, y * freq) * amp;
    freq *= 2.05;
    amp *= 0.5;
  }
  return val;
}

// Convert height map into a tangent-space normal map
function generateNormalMapFromCanvas(heightCanvas, strength = 1.8) {
  const w = heightCanvas.width;
  const h = heightCanvas.height;
  const hCtx = heightCanvas.getContext('2d');
  const hData = hCtx.getImageData(0, 0, w, h).data;

  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = w;
  normalCanvas.height = h;
  const nCtx = normalCanvas.getContext('2d');
  const normalImg = nCtx.createImageData(w, h);
  const nData = normalImg.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const left = ((y * w + Math.max(0, x - 1)) * 4);
      const right = ((y * w + Math.min(w - 1, x + 1)) * 4);
      const up = ((Math.max(0, y - 1) * w + x) * 4);
      const down = ((Math.min(h - 1, y + 1) * w + x) * 4);

      const dx = (hData[right] - hData[left]) / 255.0 * strength;
      const dy = (hData[down] - hData[up]) / 255.0 * strength;

      // Tangent space normal (dx, dy, 1.0) normalized into RGB [0..255]
      const len = Math.sqrt(dx * dx + dy * dy + 1.0);
      const nx = -dx / len;
      const ny = -dy / len;
      const nz = 1.0 / len;

      nData[idx] = Math.floor((nx * 0.5 + 0.5) * 255);
      nData[idx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      nData[idx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      nData[idx + 3] = 255;
    }
  }

  nCtx.putImageData(normalImg, 0, 0);
  const texture = new THREE.CanvasTexture(normalCanvas);
  texture.generateMipmaps = true;
  texture.anisotropy = 4;
  return texture;
}

// -------------------------------------------------------------
// 1. PYTHON: Ocean & Cloud World Maps
// -------------------------------------------------------------
export function createPythonPlanetTextures(width = 1024, height = 512) {
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const cCtx = colorCanvas.getContext('2d');
  const cImg = cCtx.createImageData(width, height);
  const cData = cImg.data;

  const heightCanvas = document.createElement('canvas');
  heightCanvas.width = width;
  heightCanvas.height = height;
  const hCtx = heightCanvas.getContext('2d');
  const hImg = hCtx.createImageData(width, height);
  const hData = hImg.data;

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = width;
  roughCanvas.height = height;
  const rCtx = roughCanvas.getContext('2d');
  const rImg = rCtx.createImageData(width, height);
  const rData = rImg.data;

  for (let y = 0; y < height; y++) {
    const lat = (y / height) * Math.PI - Math.PI * 0.5; // -PI/2 to PI/2
    const cosLat = Math.cos(lat);
    for (let x = 0; x < width; x++) {
      const lon = (x / width) * Math.PI * 2; // 0 to 2PI

      // Sphere mapping coordinates
      const nx = cosLat * Math.cos(lon);
      const ny = Math.sin(lat);
      const nz = cosLat * Math.sin(lon);

      // Continent height
      let h = fbm(nx * 2.2 + 10, ny * 2.2 + 20, 6);
      h = h * 0.5 + 0.5; // 0 to 1

      // Polar ice caps
      const polar = Math.pow(Math.abs(ny), 4.5);
      const isOcean = h < 0.52 && polar < 0.6;

      const idx = (y * width + x) * 4;

      if (polar > 0.65) {
        // Glacier Ice
        cData[idx] = 230; cData[idx + 1] = 245; cData[idx + 2] = 255; cData[idx + 3] = 255;
        rData[idx] = 65; rData[idx + 1] = 65; rData[idx + 2] = 65; rData[idx + 3] = 255;
        hData[idx] = 180;
      } else if (isOcean) {
        // Ocean Bathymetry: Deep Indigo to Shallow Cyan
        const depth = (h / 0.52);
        cData[idx] = Math.floor(10 + depth * 22);
        cData[idx + 1] = Math.floor(35 + depth * 85);
        cData[idx + 2] = Math.floor(80 + depth * 140);
        cData[idx + 3] = 255;
        // Ocean specular smoothness
        rData[idx] = 30; rData[idx + 1] = 30; rData[idx + 2] = 30; rData[idx + 3] = 255;
        hData[idx] = 40;
      } else {
        // Landmasses: Forest greens, golden savannas, mountain ridges
        const elev = (h - 0.52) / 0.48;
        if (elev > 0.6) {
          // Mountains
          cData[idx] = 140; cData[idx + 1] = 125; cData[idx + 2] = 115;
          rData[idx] = 210; rData[idx + 1] = 210; rData[idx + 2] = 210;
          hData[idx] = Math.floor(elev * 255);
        } else {
          // Lush Earth / Savanna
          cData[idx] = Math.floor(35 + elev * 80);
          cData[idx + 1] = Math.floor(75 + elev * 60);
          cData[idx + 2] = Math.floor(35 + elev * 30);
          rData[idx] = 180; rData[idx + 1] = 180; rData[idx + 2] = 180;
          hData[idx] = Math.floor(elev * 160);
        }
        cData[idx + 3] = 255;
        rData[idx + 3] = 255;
      }
    }
  }

  cCtx.putImageData(cImg, 0, 0);
  hCtx.putImageData(hImg, 0, 0);
  rCtx.putImageData(rImg, 0, 0);

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.generateMipmaps = true;
  colorMap.anisotropy = 4;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.generateMipmaps = true;

  const normalMap = generateNormalMapFromCanvas(heightCanvas, 2.2);

  return { colorMap, roughnessMap, normalMap };
}

// Clouds texture with alpha
export function createCloudTexture(width = 1024, height = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(width, height);
  const data = img.data;

  for (let y = 0; y < height; y++) {
    const lat = (y / height) * Math.PI - Math.PI * 0.5;
    const cosLat = Math.cos(lat);
    for (let x = 0; x < width; x++) {
      const lon = (x / width) * Math.PI * 2;
      const nx = cosLat * Math.cos(lon);
      const ny = Math.sin(lat);
      const nz = cosLat * Math.sin(lon);

      // Cloud swirls
      let c = fbm(nx * 2.8 + 40, ny * 2.8 + 50, 5);
      c = (c * 0.5 + 0.5);
      // Soft threshold for cloud coverage
      const alpha = Math.max(0, Math.min(1, (c - 0.42) * 2.4));

      const idx = (y * width + x) * 4;
      data[idx] = 255;
      data[idx + 1] = 255;
      data[idx + 2] = 255;
      data[idx + 3] = Math.floor(alpha * 230);
    }
  }

  ctx.putImageData(img, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.anisotropy = 4;
  return texture;
}

// -------------------------------------------------------------
// 2. C# / .NET: Banded Gas Giant Maps
// -------------------------------------------------------------
export function createCSharpGasGiantTextures(width = 1024, height = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(width, height);
  const data = img.data;

  // Color palette for alternating amber, terracotta, cream, and ochre cloud bands
  const bandColors = [
    [245, 158, 11],  // Sun-Amber
    [217, 119, 6],   // Terracotta
    [254, 243, 199], // Pale cream
    [180, 83, 9],    // Deep burnt amber
    [251, 191, 36]   // Radiant gold
  ];

  for (let y = 0; y < height; y++) {
    const normY = y / height;
    // Latitudinal shear turbulence
    const bandFreq = 16.0;
    const wave = Math.sin(normY * Math.PI * bandFreq);

    for (let x = 0; x < width; x++) {
      const normX = x / width;

      // Swirling atmospheric turbulence
      const turb = fbm(normX * 8.0, normY * 18.0, 4) * 0.35;
      const bandVal = (normY * bandFreq + wave * 0.4 + turb) % bandColors.length;
      const bandIdx = Math.floor(Math.abs(bandVal)) % bandColors.length;
      const nextIdx = (bandIdx + 1) % bandColors.length;
      const blend = Math.abs(bandVal - Math.floor(bandVal));

      const c1 = bandColors[bandIdx];
      const c2 = bandColors[nextIdx];

      // Great Amber Vortex Oval at lat ~0.65, lon ~0.4
      const dx = (normX - 0.42) * 2.5;
      const dy = (normY - 0.65) * 5.0;
      const distVortex = Math.sqrt(dx * dx + dy * dy);
      const isVortex = distVortex < 0.28;

      const idx = (y * width + x) * 4;

      if (isVortex) {
        // Red-amber cyclonic storm
        const swirl = Math.sin(distVortex * 30.0) * 0.2;
        data[idx] = Math.floor(245 + swirl * 10);
        data[idx + 1] = Math.floor(120 + swirl * 40);
        data[idx + 2] = Math.floor(25);
      } else {
        data[idx] = Math.floor(c1[0] * (1 - blend) + c2[0] * blend);
        data[idx + 1] = Math.floor(c1[1] * (1 - blend) + c2[1] * blend);
        data[idx + 2] = Math.floor(c1[2] * (1 - blend) + c2[2] * blend);
      }
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  const colorMap = new THREE.CanvasTexture(canvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.generateMipmaps = true;
  colorMap.anisotropy = 4;

  return { colorMap };
}

// -------------------------------------------------------------
// 3. RUST: Rusted Desert & Canyon World Maps
// -------------------------------------------------------------
export function createRustPlanetTextures(width = 1024, height = 512) {
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const cCtx = colorCanvas.getContext('2d');
  const cImg = cCtx.createImageData(width, height);
  const cData = cImg.data;

  const heightCanvas = document.createElement('canvas');
  heightCanvas.width = width;
  heightCanvas.height = height;
  const hCtx = heightCanvas.getContext('2d');
  const hImg = hCtx.createImageData(width, height);
  const hData = hImg.data;

  for (let y = 0; y < height; y++) {
    const lat = (y / height) * Math.PI - Math.PI * 0.5;
    const cosLat = Math.cos(lat);
    for (let x = 0; x < width; x++) {
      const lon = (x / width) * Math.PI * 2;
      const nx = cosLat * Math.cos(lon);
      const ny = Math.sin(lat);
      const nz = cosLat * Math.sin(lon);

      // Craters and canyon ridges
      const base = fbm(nx * 3.5, ny * 3.5, 6);
      const detail = fbm(nx * 14.0, ny * 14.0, 3) * 0.2;
      const h = (base + detail) * 0.5 + 0.5;

      const idx = (y * width + x) * 4;

      // Iron Oxide, Ochre, Burnt Clay
      const r = Math.floor(160 + h * 75);
      const g = Math.floor(65 + h * 55);
      const b = Math.floor(25 + h * 30);

      cData[idx] = r; cData[idx + 1] = g; cData[idx + 2] = b; cData[idx + 3] = 255;
      hData[idx] = Math.floor(h * 255);
    }
  }

  cCtx.putImageData(cImg, 0, 0);
  hCtx.putImageData(hImg, 0, 0);

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.generateMipmaps = true;
  colorMap.anisotropy = 4;

  const normalMap = generateNormalMapFromCanvas(heightCanvas, 3.0);
  return { colorMap, normalMap };
}

// -------------------------------------------------------------
// 4. TYPESCRIPT: Icy Blue Ringed World Maps
// -------------------------------------------------------------
export function createTypeScriptPlanetTextures(width = 1024, height = 512) {
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const cCtx = colorCanvas.getContext('2d');
  const cImg = cCtx.createImageData(width, height);
  const cData = cImg.data;

  const heightCanvas = document.createElement('canvas');
  heightCanvas.width = width;
  heightCanvas.height = height;
  const hCtx = heightCanvas.getContext('2d');
  const hImg = hCtx.createImageData(width, height);
  const hData = hImg.data;

  for (let y = 0; y < height; y++) {
    const lat = (y / height) * Math.PI - Math.PI * 0.5;
    const cosLat = Math.cos(lat);
    for (let x = 0; x < width; x++) {
      const lon = (x / width) * Math.PI * 2;
      const nx = cosLat * Math.cos(lon);
      const ny = Math.sin(lat);
      const nz = cosLat * Math.sin(lon);

      // Glacial ridges and pressure fractures
      const iceH = fbm(nx * 4.0, ny * 4.0, 5) * 0.5 + 0.5;

      const idx = (y * width + x) * 4;

      // Cyan to glacial white
      cData[idx] = Math.floor(180 + iceH * 75);
      cData[idx + 1] = Math.floor(220 + iceH * 35);
      cData[idx + 2] = 255;
      cData[idx + 3] = 255;

      hData[idx] = Math.floor(iceH * 255);
    }
  }

  cCtx.putImageData(cImg, 0, 0);
  hCtx.putImageData(hImg, 0, 0);

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.generateMipmaps = true;
  colorMap.anisotropy = 4;

  const normalMap = generateNormalMapFromCanvas(heightCanvas, 1.8);

  // Translucent Planetary Ring Texture
  const ringCanvas = document.createElement('canvas');
  ringCanvas.width = 512;
  ringCanvas.height = 64;
  const rCtx = ringCanvas.getContext('2d');
  const rImg = rCtx.createImageData(512, 64);
  const rData = rImg.data;

  for (let x = 0; x < 512; x++) {
    const radius = x / 512;
    // Cassini division and subtle ring dust bands
    const band = Math.sin(radius * 45.0) * 0.5 + 0.5;
    const cassini = (radius > 0.62 && radius < 0.68) ? 0.0 : 1.0;
    const alpha = Math.floor(band * cassini * 210);

    for (let y = 0; y < 64; y++) {
      const idx = (y * 512 + x) * 4;
      rData[idx] = 186;     // Ice blue tint
      rData[idx + 1] = 230;
      rData[idx + 2] = 253;
      rData[idx + 3] = alpha;
    }
  }
  rCtx.putImageData(rImg, 0, 0);
  const ringMap = new THREE.CanvasTexture(ringCanvas);
  ringMap.generateMipmaps = true;

  return { colorMap, normalMap, ringMap };
}

// -------------------------------------------------------------
// 5. C++: Dark Volcanic & Molten Lava World Maps
// -------------------------------------------------------------
export function createCppPlanetTextures(width = 1024, height = 512) {
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const cCtx = colorCanvas.getContext('2d');
  const cImg = cCtx.createImageData(width, height);
  const cData = cImg.data;

  const emissiveCanvas = document.createElement('canvas');
  emissiveCanvas.width = width;
  emissiveCanvas.height = height;
  const eCtx = emissiveCanvas.getContext('2d');
  const eImg = eCtx.createImageData(width, height);
  const eData = eImg.data;

  for (let y = 0; y < height; y++) {
    const lat = (y / height) * Math.PI - Math.PI * 0.5;
    const cosLat = Math.cos(lat);
    for (let x = 0; x < width; x++) {
      const lon = (x / width) * Math.PI * 2;
      const nx = cosLat * Math.cos(lon);
      const ny = Math.sin(lat);
      const nz = cosLat * Math.sin(lon);

      // Basalt crust
      const basalt = fbm(nx * 5.0, ny * 5.0, 5) * 0.5 + 0.5;
      
      // Tectonic fracture lines (ridged multifractal)
      let lavaNoise = Math.abs(noise2D(nx * 4.5, ny * 4.5));
      lavaNoise = 1.0 - Math.min(1.0, lavaNoise * 4.0); // Narrow fissures
      const isLava = lavaNoise > 0.45;

      const idx = (y * width + x) * 4;

      // Base Obsidian Crust
      cData[idx] = Math.floor(18 + basalt * 22);
      cData[idx + 1] = Math.floor(20 + basalt * 20);
      cData[idx + 2] = Math.floor(25 + basalt * 20);
      cData[idx + 3] = 255;

      if (isLava) {
        // Molten lava fissures
        const heat = (lavaNoise - 0.45) / 0.55;
        eData[idx] = 255;
        eData[idx + 1] = Math.floor(85 + heat * 140);
        eData[idx + 2] = Math.floor(10);
        eData[idx + 3] = 255;
      } else {
        eData[idx] = 0; eData[idx + 1] = 0; eData[idx + 2] = 0; eData[idx + 3] = 255;
      }
    }
  }

  cCtx.putImageData(cImg, 0, 0);
  eCtx.putImageData(eImg, 0, 0);

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.generateMipmaps = true;
  colorMap.anisotropy = 4;

  const emissiveMap = new THREE.CanvasTexture(emissiveCanvas);
  emissiveMap.colorSpace = THREE.SRGBColorSpace;
  emissiveMap.generateMipmaps = true;

  return { colorMap, emissiveMap };
}
