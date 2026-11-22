/**
 * Moon.js — Chiseled Crystalline Asteroids with Glowing Core Beacons & Orbit Ribbons
 */

import * as THREE from 'three';

// Stack color palette mapping for beacons
const STACK_BEACON_COLORS = {
  python: 0x00e599,     // Electric Emerald (Griffin, SyGriffin, Sita)
  csharp: 0xa855f7,     // Vivid Amethyst (LiveSubs)
  'c#': 0xa855f7,
  'c# / .net': 0xa855f7,
  rust: 0xf97316,       // Scorched Orange (Knox)
  typescript: 0x00f0ff, // Cryogenic Cyan (myselfdiva)
  cpp: 0xef4444,        // Incandescent Vermilion (Polaris, HackMe)
  'c++': 0xef4444
};

export function createMoon(config, parentPlanet) {
  const group = new THREE.Group();
  group.name = 'Moon_' + config.id;

  const radius = config.radius || 1.6;
  const parentStack = (parentPlanet.config.id || parentPlanet.config.name || 'python').toLowerCase();
  const beaconHex = STACK_BEACON_COLORS[parentStack] || 0xf59e0b;

  // 1. Chiseled Crystalline Faceted Geometry
  const rawGeo = new THREE.IcosahedronGeometry(radius, 1);
  const facetedGeo = rawGeo.index ? rawGeo.toNonIndexed() : rawGeo; // Guarantees distinct face normals for sharp facet edges

  // Displace vertices to create geometric crystalline fractures
  const posAttr = facetedGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vy = posAttr.getY(i);
    const vz = posAttr.getZ(i);
    const noise = 1.0 + (Math.sin(vx * 4.0) * Math.cos(vy * 4.0) * Math.sin(vz * 4.0)) * 0.18;
    posAttr.setXYZ(i, vx * noise, vy * noise, vz * noise);
  }
  facetedGeo.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: config.isMajor ? 0xf8fafc : 0xcbd5e1,
    roughness: 0.32,
    metalness: 0.65,
    flatShading: true,
    emissive: new THREE.Color(beaconHex),
    emissiveIntensity: config.isMajor ? 0.55 : 0.35 // Active crystalline glow
  });

  const mesh = new THREE.Mesh(facetedGeo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = {
    isMoon: true,
    moonId: config.id,
    config: config
  };
  group.add(mesh);

  // 2. Central Glowing Core Beacon
  const beaconGeo = new THREE.SphereGeometry(radius * 0.52, 16, 16);
  const beaconMat = new THREE.MeshBasicMaterial({
    color: beaconHex,
    transparent: true,
    opacity: 0.95
  });
  const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
  group.add(beaconMesh);

  // Subtle Outer Core Glow Halo Sprite (Camera-facing billboard for distance visibility)
  const haloCanvas = document.createElement('canvas');
  haloCanvas.width = 128;
  haloCanvas.height = 128;
  const hCtx = haloCanvas.getContext('2d');
  const hGrad = hCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
  hGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  hGrad.addColorStop(0.22, 'rgba(255, 255, 255, 0.65)');
  hGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.18)');
  hGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  hCtx.fillStyle = hGrad;
  hCtx.fillRect(0, 0, 128, 128);
  const haloTexture = new THREE.CanvasTexture(haloCanvas);

  const haloMat = new THREE.SpriteMaterial({
    map: haloTexture,
    color: beaconHex,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: config.isMajor ? 0.80 : 0.50,
    depthWrite: false
  });
  const haloSprite = new THREE.Sprite(haloMat);
  haloSprite.scale.set(radius * 3.6, radius * 3.6, 1);
  group.add(haloSprite);

  // 3. Luminous Fading Orbit Ribbon around parent planet
  const trailSegments = 84;
  const trailPoints = [];
  const trailColors = [];
  const baseColor = new THREE.Color(beaconHex);
  const dimColor = new THREE.Color(0x334155);

  for (let i = 0; i <= trailSegments; i++) {
    const theta = (i / trailSegments) * Math.PI * 2;
    trailPoints.push(new THREE.Vector3(
      Math.cos(theta) * config.orbitRadius,
      Math.sin(theta) * config.orbitRadius * (config.inclination || 0.1),
      Math.sin(theta) * config.orbitRadius
    ));

    // Gradient along arc: brighter near major nodes
    const alpha = config.isMajor ? 0.35 : 0.15;
    const c = dimColor.clone().lerp(baseColor, Math.sin(theta * 2.0) * 0.3 + 0.3);
    trailColors.push(c.r, c.g, c.b);
  }

  const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
  trailGeo.setAttribute('color', new THREE.Float32BufferAttribute(trailColors, 3));

  const trailMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: config.isMajor ? 0.55 : 0.25,
    depthWrite: false
  });
  const trailLine = new THREE.Line(trailGeo, trailMat);

  let currentAngle = config.initialAngle || Math.random() * Math.PI * 2;
  const orbitRadius = config.orbitRadius;
  const orbitSpeed = config.orbitSpeed;

  return {
    group,
    mesh,
    material,
    beaconMesh,
    haloSprite,
    trailLine,
    config,
    parentPlanet,
    highlight(active) {
      trailMat.opacity = active ? 0.95 : (config.isMajor ? 0.55 : 0.25);
      material.color.set(active ? 0xffffff : (config.isMajor ? 0xf8fafc : 0xcbd5e1));
      beaconMat.opacity = active ? 1.0 : 0.95;
      haloSprite.scale.set(radius * (active ? 5.0 : 3.6), radius * (active ? 5.0 : 3.6), 1);
    },
    update(dt, time = 0) {
      currentAngle += orbitSpeed * dt;

      // Tidal lock rotation + slight axial precession
      mesh.rotation.y += 0.8 * dt;
      mesh.rotation.x = Math.sin(time * 0.5) * 0.15;

      // Beacon breathing pulse
      const pulse = 1.0 + Math.sin(time * 3.5 + config.orbitRadius) * 0.18;
      beaconMesh.scale.setScalar(pulse);
      haloSprite.scale.set(radius * 3.6 * pulse, radius * 3.6 * pulse, 1);

      // Local coordinate relative to parent planet
      const localX = Math.cos(currentAngle) * orbitRadius;
      const localY = Math.sin(currentAngle) * orbitRadius * (config.inclination || 0.1);
      const localZ = Math.sin(currentAngle) * orbitRadius;

      group.position.set(localX, localY, localZ);
    },
    getPosition() {
      const worldPos = new THREE.Vector3();
      group.getWorldPosition(worldPos);
      return worldPos;
    }
  };
}
