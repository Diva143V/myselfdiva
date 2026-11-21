/**
 * Moon.js — Rocky Project Moons with Tidal Lock & Orbit Trails
 */

import * as THREE from 'three';
import { createMoonNormalMap } from '../procedural/moonTextures.js';

// Shared shared crater normal map to prevent duplicate canvas allocations
let sharedMoonNormalMap = null;

export function createMoon(config, parentPlanet) {
  if (!sharedMoonNormalMap) {
    sharedMoonNormalMap = createMoonNormalMap(256);
  }

  const group = new THREE.Group();
  group.name = 'Moon_' + config.id;

  // 1. Rocky Displaced Icosahedron Geometry
  const radius = config.radius || 1.6;
  const geometry = new THREE.IcosahedronGeometry(radius, 2);

  // Subtle procedural vertex displacement for craggy asteroid/moon look
  const posAttr = geometry.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vy = posAttr.getY(i);
    const vz = posAttr.getZ(i);
    const noise = 1.0 + (Math.sin(vx * 3.0) * Math.cos(vy * 3.0) * Math.sin(vz * 3.0)) * 0.08;
    posAttr.setXYZ(i, vx * noise, vy * noise, vz * noise);
  }
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: config.isMajor ? 0xe2e8f0 : 0x94a3b8,
    normalMap: sharedMoonNormalMap,
    normalScale: new THREE.Vector2(1.8, 1.8),
    roughness: 0.88,
    metalness: 0.12
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = {
    isMoon: true,
    moonId: config.id,
    config: config
  };
  group.add(mesh);

  // 2. Fading 3D Orbit Trail around parent planet
  const trailSegments = 64;
  const trailPoints = [];
  for (let i = 0; i <= trailSegments; i++) {
    const theta = (i / trailSegments) * Math.PI * 2;
    trailPoints.push(new THREE.Vector3(
      Math.cos(theta) * config.orbitRadius,
      Math.sin(theta) * config.orbitRadius * (config.inclination || 0.1),
      Math.sin(theta) * config.orbitRadius
    ));
  }
  const trailGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
  const trailMat = new THREE.LineBasicMaterial({
    color: 0x94a3b8,
    transparent: true,
    opacity: config.isMajor ? 0.22 : 0.08,
    depthWrite: false
  });
  const trailLine = new THREE.Line(trailGeo, trailMat);

  let currentAngle = config.initialAngle || Math.random() * Math.PI * 2;
  const orbitRadius = config.orbitRadius;
  const orbitSpeed = config.orbitSpeed;

  return {
    group,
    mesh,
    trailLine,
    config,
    parentPlanet,
    highlight(active) {
      trailMat.color.set(active ? 0xf59e0b : 0x94a3b8);
      trailMat.opacity = active ? 0.8 : (config.isMajor ? 0.22 : 0.08);
      material.color.set(active ? 0xfff5ea : (config.isMajor ? 0xe2e8f0 : 0x94a3b8));
    },
    update(dt) {
      currentAngle += orbitSpeed * dt;

      // Local coordinate relative to parent planet
      const localX = Math.cos(currentAngle) * orbitRadius;
      const localY = Math.sin(currentAngle) * orbitRadius * (config.inclination || 0.1);
      const localZ = Math.sin(currentAngle) * orbitRadius;

      const parentPos = parentPlanet.getPosition();
      group.position.set(
        parentPos.x + localX,
        parentPos.y + localY,
        parentPos.z + localZ
      );

      // Tidal lock: keep same face oriented toward parent
      mesh.rotation.y = currentAngle + Math.PI * 0.5;

      // Update trail position to follow parent planet
      trailLine.position.copy(parentPos);
    },
    getPosition() {
      return group.position;
    }
  };
}
